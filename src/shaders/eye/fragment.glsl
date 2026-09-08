uniform float uTime;

uniform vec3 uBaseColor;
uniform vec3 uNoiseColor;
uniform vec3 uCenterColor;
uniform vec3 uStripesColor;
uniform float uStripesNoiseStrength;
uniform float uVignetteStrength;
uniform float uPupilRadius;

varying vec3 vPosition;

#include "../includes/fbm.glsl"

void main() {
    vec3 pos = normalize(vPosition);
    vec2 uv = pos.xy / 0.5;

    vec3 background = vec3(1.0);
    vec3 color = vec3(1.0);

    float r = sqrt(dot(uv, uv));
    float a = atan(uv.y, uv.x);

    r = pos.z < 0.0 ? 4.0 - r : r;

    if (r < 0.8) {
        color = uBaseColor;
        float f = fbm(5.0 * uv);
        color = mix(color, uNoiseColor, f);

        f = 1.0 - smoothstep(0.2, 0.5, r);
        color = mix(color, uCenterColor, f);

        a += 0.05 * fbm(20.0 * uv);

        f = smoothstep(0.3, 1.0, fbm(vec2(6.0 * r, 20.0 * a)));
        color = mix(color, uStripesColor, f);

        f = smoothstep(0.4, 0.9, fbm(vec2(10.0 * r, 15.0 * a)));
        color *= 1.0 - uStripesNoiseStrength * f;

        f = smoothstep(0.6, 0.8, r);
        color *= 1.0 - uVignetteStrength * f;

        f = smoothstep(uPupilRadius, uPupilRadius + 0.05, r);
        color *= f;

        f = smoothstep(0.7, 0.8, r);
        color = mix(color, vec3(1.0), f);
    }

    gl_FragColor = vec4(color * background, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
