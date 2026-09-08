uniform float uTime;

varying vec3 vPosition;

#include "../includes/fbm.glsl"

void main() {
    vec3 localSpacePosition = position;

    float n = noise(localSpacePosition.xy * 0.6 + 0.7 * uTime);
    localSpacePosition += normal * n * 0.35;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(localSpacePosition, 1.0);

    vPosition = (modelMatrix * vec4(localSpacePosition, 1.0)).xyz;
}
