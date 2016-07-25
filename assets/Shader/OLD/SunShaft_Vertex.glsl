varying vec4 vVertexColor;
varying vec3 vPositionW;
//varying vec3 vNormalW;

attribute vec3 vertex_position;
//attribute vec3 vertex_normal;
//attribute vec4 vertex_tangent;
//attribute vec2 vertex_texCoord0;
//attribute vec2 vertex_texCoord1;
attribute vec4 vertex_color;

uniform mat4 matrix_viewProjection;
uniform mat4 matrix_model;
//uniform mat3 matrix_normal;

struct vsInternalData {
    vec3 positionW;
    mat4 modelMatrix;
    //mat3 normalMatrix;
    //vec3 lightPosW;
    //vec3 lightDirNormW;
    //vec3 normalW;
};

mat4 getModelMatrix(inout vsInternalData data) {
    return matrix_model;
}
vec4 getPosition(inout vsInternalData data) {
    data.modelMatrix = getModelMatrix(data);
    vec4 posW = data.modelMatrix * vec4(vertex_position, 1.0);
    data.positionW = posW.xyz;
    return matrix_viewProjection * posW;
}
vec3 getWorldPosition(inout vsInternalData data) {
    return data.positionW;
}

/*
vec3 getNormal(inout vsInternalData data) {
    data.normalMatrix = matrix_normal;
    return normalize(data.normalMatrix * vertex_normal);
}
*/


void main(void) 
{
    vsInternalData data;
    gl_Position     = getPosition(data);
    vPositionW      = getWorldPosition(data);
    //vNormalW        = data.normalW = getNormal(data);
    vVertexColor    = vertex_color;
}