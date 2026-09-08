varying vec3 vPosition;

#include "../includes/remap.glsl"

void main() {
    vec3 modelColor = vec3(0.0005);

    vec3 normal = normalize(
        cross(
            dFdx(vPosition.xyz),
            dFdy(vPosition.xyz))
    );
    vec3 viewDir = normalize(cameraPosition - vPosition);

    // Diffuse lighting
    vec3 lightDir = normalize(vec3(22.0, 18.0, 30.0));
    vec3 lightColour = vec3(1.0, 0.9, 0.7);
    float dp = max(0.0, dot(lightDir, normal));
    vec3 diffuse = dp * lightColour;

    vec3 color = modelColor * diffuse;

    gl_FragColor = vec4(pow(color, vec3(1.0 / 2.2)), 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
