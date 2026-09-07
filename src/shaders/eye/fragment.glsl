uniform float uTime;
uniform vec3 uBaseColor;
uniform vec3 uNoiseColor;
uniform vec3 uInnerColor;
uniform vec3 uLineColor;
uniform float uLineFactor;
uniform float uNoiseFrequency;
uniform float uNoiseStrength;

varying vec3 vPosition;

#include "../includes/fbm.glsl"

const float PI = 3.1415926535;

void main() {
    vec3 eyeColor = vec3(1.0); // white
    vec3 pupilColor = vec3(0.0); // black

    float angle = atan(vPosition.x, vPosition.y);

    // base color
    vec3 pos = normalize(vPosition);
    float d = length(pos.xy);
    // Only render the pupil on the front side of the sphere
    d = pos.z < 0.0 ? 2.0 - d : d;

    float dBase = d;
    float baseEye = smoothstep(0.355, 0.411, d);
    vec3 color = mix(uBaseColor, eyeColor, baseEye);

    // animation
    float ss = 0.5 + 0.5 * sin(4.0 * uTime);
    float animation = 1.0 + 0.1 * ss * clamp(1.0 - d, 0.0, 1.0);
    d *= animation;

    // add fbm noise to the base color
    vec3 p = normalize(vPosition);
    float u = atan(p.z, p.x) / (2.0 * PI) + 0.5;
    float v = asin(p.y) / PI + 0.5;
    float fbmNoise = fbm(uNoiseFrequency * vec2(u, v));
    color = mix(color, uNoiseColor, fbmNoise * uNoiseStrength);

    // inner subtle color around pupil
    float innerCircle = 1.0 - smoothstep(0.195, 0.368, d);
    color = mix(color, uInnerColor,  innerCircle);

    // black lines
    float blackLines = fbm(vec2(d, 100.0 * angle)) - baseEye;
    blackLines = smoothstep(0.5, 1.0, blackLines);
    color = mix(color, uLineColor, blackLines * uLineFactor);

    // // vignette
    float vignetteCircle = smoothstep(0.281, 0.389, dBase)- baseEye;
    color *= 1.0 - vignetteCircle;

    // pupil
    float pupil = smoothstep(0.216, 0.238, d);
    color *= pupil; // black

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}