uniform float uTime;

uniform vec3 uBaseColor;
uniform vec3 uNoiseColor;
uniform vec3 uCenterColor;
uniform vec3 uStripesColor;
uniform vec3 uScleraEdgeColor;
uniform float uStripesNoiseStrength;
uniform float uScleraRedness;
uniform float uScleraRednessSpread;
uniform float uVignetteStrength;
uniform float uPupilRadius;
uniform float uPupilDilation;
/** 0 constricts to uPupilRadius, 1 opens all the way to uPupilRadius + uPupilDilation. */
uniform float uPupilOpenness;
uniform float uIrisRadius;
uniform float uEyeRadius;

varying vec3 vPosition;

#include "../includes/fbm.glsl"

const float RELAXED_PUPIL_RADIUS = 0.2;
const float FIBRE_FOLLOW = 0.6;
const float LIMBUS_START = 0.8;
const float SCLERA_END = 1.14;

void main() {
    vec3 pos = vPosition / uEyeRadius;
    vec2 uv = pos.xy / 0.5;

    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    vec2 direction = vec2(cos(angle), sin(angle));

    radius = pos.z < 0.0 ? 4.0 - radius : radius;

    float scleraCoord =
        (radius - uIrisRadius * SCLERA_END) / max(uScleraRednessSpread, 0.001);
    float redness = uScleraRedness * smoothstep(0.0, 1.0, clamp(scleraCoord, 0.0, 1.0));
    vec3 sclera = mix(vec3(1.0), uScleraEdgeColor, redness);

    vec3 background = vec3(1.0);
    vec3 color = sclera;

    if (radius < uIrisRadius * SCLERA_END) {
        float pupilRadius = uPupilRadius + uPupilDilation * uPupilOpenness;
        pupilRadius = clamp(pupilRadius, 0.02, uIrisRadius - 0.08);

        pupilRadius *= 1.0 + 0.03 * (fbm(3.0 * direction + 17.0) - 0.5);

        float irisCoord = (radius - pupilRadius) / (uIrisRadius - pupilRadius);

        float irisCompression =
            (uIrisRadius - pupilRadius) / (uIrisRadius - RELAXED_PUPIL_RADIUS);

        float squeezedRadius = mix(RELAXED_PUPIL_RADIUS, uIrisRadius, irisCoord);
        float patternRadius = mix(radius, squeezedRadius, FIBRE_FOLLOW);
        vec2 patternPosition = direction * patternRadius;

        float fibreDetail = mix(0.45, 1.0, clamp(irisCompression, 0.0, 1.0));

        color = uBaseColor;
        float mask = fbm(5.0 * patternPosition);
        color = mix(color, uNoiseColor, mask);

        mask = 1.0 - smoothstep(0.0, 0.5, irisCoord);
        color = mix(color, uCenterColor, mask);

        float wobblyAngle = angle + 0.05 * fbm(20.0 * patternPosition);

        mask = smoothstep(0.3, 1.0, fbm(vec2(6.0 * patternRadius, 20.0 * wobblyAngle)));
        color = mix(color, uStripesColor, mask * fibreDetail);

        mask = smoothstep(0.4, 0.9, fbm(vec2(10.0 * patternRadius, 15.0 * wobblyAngle)));
        color *= 1.0 - uStripesNoiseStrength * mask * fibreDetail;

        float collarette = exp(-16.0 * (irisCoord - 0.3) * (irisCoord - 0.3));
        color *= 1.0 + 0.12 * collarette;

        mask = 1.0 - smoothstep(0.0, 0.12, irisCoord);
        color *= 1.0 - 0.45 * mask;

        color *= mix(0.88, 1.0, clamp(irisCompression, 0.0, 1.0));

        float limbusCoord = radius / uIrisRadius;

        mask = smoothstep(LIMBUS_START, 1.0, limbusCoord);
        color *= 1.0 - uVignetteStrength * mask;

        mask = smoothstep(pupilRadius, pupilRadius + 0.04, radius);
        color *= mask;

        mask = smoothstep(1.0, SCLERA_END, limbusCoord);
        color = mix(color, sclera, mask);
    }

    csm_DiffuseColor = vec4(color * background, 1.0);
}
