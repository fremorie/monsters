uniform float uTime;

uniform vec3 uBaseColor;
uniform vec3 uNoiseColor;
uniform vec3 uCenterColor;
uniform vec3 uStripesColor;
uniform float uStripesNoiseStrength;
uniform float uVignetteStrength;
uniform float uPupilRadius;
uniform float uPupilDilation;

varying vec3 vPosition;

#include "../includes/fbm.glsl"

const float IRIS_RADIUS = 0.8;
const float RELAXED_PUPIL_RADIUS = 0.2;
const float FIBRE_FOLLOW = 0.6;

void main() {
    vec3 pos = normalize(vPosition);
    vec2 uv = pos.xy / 0.5;

    vec3 background = vec3(1.0);
    vec3 color = vec3(1.0);

    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    vec2 direction = vec2(cos(angle), sin(angle));

    radius = pos.z < 0.0 ? 4.0 - radius : radius;

    if (radius < IRIS_RADIUS) {
        float breathing = 0.9;
        float pupilRadius = uPupilRadius + uPupilDilation * breathing;
        pupilRadius = clamp(pupilRadius, 0.02, IRIS_RADIUS - 0.08);

        pupilRadius *= 1.0 + 0.03 * (fbm(3.0 * direction + 17.0) - 0.5);

        float irisCoord = (radius - pupilRadius) / (IRIS_RADIUS - pupilRadius);

        float irisCompression =
            (IRIS_RADIUS - pupilRadius) / (IRIS_RADIUS - RELAXED_PUPIL_RADIUS);

        float squeezedRadius = mix(RELAXED_PUPIL_RADIUS, IRIS_RADIUS, irisCoord);
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

        mask = smoothstep(0.6, IRIS_RADIUS, radius);
        color *= 1.0 - uVignetteStrength * mask;

        mask = smoothstep(pupilRadius, pupilRadius + 0.04, radius);
        color *= mask;

        mask = smoothstep(0.7, IRIS_RADIUS, radius);
        color = mix(color, vec3(1.0), mask);
    }

    gl_FragColor = vec4(color * background, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
