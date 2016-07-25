varying vec4 vVertexColor;
varying vec3 vPositionW;

uniform vec3 custom_color;
uniform vec3 view_position;
uniform float uTime;

struct psInternalData {
    vec3 albedo;
    float alpha;
};
    
float saturate(float x) {
    return clamp(x, 0.0, 1.0);
}

vec3 saturate(vec3 x) {
    return clamp(x, vec3(0.0), vec3(1.0));
}

vec3 gammaCorrectInput(vec3 color) {
    return pow(color, vec3(2.2));
}

float gammaCorrectInput(float color) {
    return pow(color, 2.2);
}

vec4 gammaCorrectInput(vec4 color) {
    return vec4(pow(color.rgb, vec3(2.2)), color.a);
}

void main(void)
{
    gl_FragColor.rgb = gammaCorrectInput(saturate(vVertexColor.rgb * custom_color.rgb));    
    gl_FragColor.a = 0.0;
    //vec4 result = vec4(1.0) * gl_FragColor + vec4(1.0) * gl_FragColor;
    //gl_FragColor = result;
}