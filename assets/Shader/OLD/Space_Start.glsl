// Because I am to dump to parse stuff directly into an glsl array, uniform madness *.*
uniform vec3 target0;
uniform vec3 target1;
uniform vec3 target2;
uniform vec3 target3;
//uniform vec3 target4;

uniform vec3 targetRadius0;
uniform vec3 targetRadius1;
uniform vec3 targetRadius2;
uniform vec3 targetRadius3;
//uniform vec3 targetRadius4;

// Tmp Sun Vars (should be part of the targets array)
uniform vec3 sunPosition;
uniform float sunInnerRadius;
uniform float sunOuterRadius;
uniform float sunAtmosphere;

// General Shader Vars
uniform float flareFreq;
uniform float uTime;

//uniform sampler2D gradient;

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
    vec3 targets[4];
    targets[0] = target0;
    targets[1] = target1;
    targets[2] = target2;
    targets[3] = target3;
    //targets[4] = target4;
    
    vec3 targetsRadius[4];
    targetsRadius[0] = targetRadius0;
    targetsRadius[1] = targetRadius1;
    targetsRadius[2] = targetRadius2;
    targetsRadius[3] = targetRadius3;
    //targetsRadius[4] = targetRadius4;