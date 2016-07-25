    // Pre defined vars
    float oAlpha = 1.0;

    // Get the Sun Cutout
    float dist = length( vPositionW );
    oAlpha *= smoothstep( sunInnerRadius, sunOuterRadius, dist * sunAtmosphere);
    
    // Get the Target Cutout
    // For each target in our array
    for(int i=0; i < 3; i++)
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
                oAlpha *= smoothstep( targetsRadius[i].x , curDistance , offset); 
            }      
        } 
        
    }
    // Apply final output alpha \n";
    gl_FragColor.a = oAlpha; // + (uTime / flareFreq);

    //if(gl_FragColor.a < 0.15) discard;
    
    //vec4 result = vec4(1.0) * gl_FragColor + vec4(0.65) * gl_FragColor;    
    //gl_FragColor = result;