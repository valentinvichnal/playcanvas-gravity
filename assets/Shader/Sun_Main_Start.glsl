// Because I am to dump to parse stuff directly into an glsl array, uniform madness *.*
uniform vec2 target0;
uniform vec2 target1;
uniform vec2 target2;
uniform vec2 target3;
uniform vec2 target4;

uniform float targetRadius0;
uniform float targetRadius1;
uniform float targetRadius2;
uniform float targetRadius3;
uniform float targetRadius4;

// Tmp Sun Vars (should be part of the targets array)
uniform vec2 sunPosition;
uniform float sunInnerRadius;
uniform float sunOuterRadius;
uniform float sunAtmosphere;

// General Shader Vars
uniform float flareFreq;
uniform float flareStrength;
uniform float uTime;


float DistToLine(vec2 pt1, vec2 pt2, vec2 testPt)
{
  vec2 lineDir = pt2 - pt1;
  vec2 perpDir = vec2(lineDir.y, -lineDir.x);
  vec2 dirToPt1 = pt1 - testPt;
  return abs(dot(normalize(perpDir), dirToPt1));
}

// Default base class
void main(void) {
    psInternalData data;
	data.diffuseLight = vec3(0);
	data.specularLight = vec3(0);
    data.reflection = vec4(0);
    data.specularity = vec3(0);
    
    // Store our madness into an array, yeah
    vec2 targets[5];
    targets[0] = target0;
    targets[1] = target1;
    targets[2] = target2;
    targets[3] = target3;
    targets[4] = target4;
    
    float targetsRadius[5];
    targetsRadius[0] = targetRadius0;
    targetsRadius[1] = targetRadius1;
    targetsRadius[2] = targetRadius2;
    targetsRadius[3] = targetRadius3;
    targetsRadius[4] = targetRadius4;