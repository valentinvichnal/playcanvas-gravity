    // Pre defined vars
    float oAlpha = 1.0;

    // Get the Sun Cutout
    float dist = length( vPositionW );
    oAlpha *= smoothstep( sunInnerRadius, sunOuterRadius, dist * sunAtmosphere);

    // Get the Target Cutout
    // For each target in our array
    for(int i=0; i < 4; i++)
    {       
        float offset = DistToLine( vec2(targets[i].x, targets[i].y), vec2(sunPosition.x, sunPosition.y), vec2( gl_FragCoord.x, gl_FragCoord.y) );

        float vDistance = distance( vec2(targets[i].x, targets[i].y) , vec2(sunPosition.x, sunPosition.y));
        float tDistance = distance( vec2(sunPosition.x, sunPosition.y) , gl_FragCoord.xy);
        float nDistance = distance( vec2(targets[i].x, targets[i].y) , gl_FragCoord.xy);

        if( tDistance > vDistance && tDistance > nDistance)
        {
            // float curDistance = targetsRadius[i].y + ( 0.125 + 0.5 * vDistance * 0.0005) * nDistance;
            float curDistance = targetsRadius[i].y + targetsRadius[i].z * nDistance;
            if(offset < curDistance)
            {              
                oAlpha *= 0.00 + smoothstep( targetsRadius[i].x , curDistance , offset); 
            }      
        } 
    }
    // Apply final output alpha \n";
    oAlpha = oAlpha + (uTime / flareFreq);
     
    
    gl_FragColor.rgb = combineColor(data);
    gl_FragColor.rgb += getEmission(data);
    gl_FragColor.rgb = addFog(data, gl_FragColor.rgb);
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);  

    //vec4 maskTex = texture2D(gradient, $UV);
    float maxDistance = pow( 0.01, 1.5);
    gl_FragColor.r += 255.00 * maxDistance;
    gl_FragColor.g += 181.00 * maxDistance;
    gl_FragColor.b += 0.00 * maxDistance;

    gl_FragColor *= oAlpha;

    vec4 result = vec4(1.0) * gl_FragColor + vec4(0.65) * gl_FragColor;    
    gl_FragColor = result;