    gl_FragColor.rgb = combineColor(data);   
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
    gl_FragColor.a = data.alpha;

    // Pre defined vars
    float oAlpha = 1.0;
    float tDistance;
  
    // Get the Target Cutout
    // For each target in our array
    for(int i=0; i <= 4; i++)
    {       
        float offset = DistToLine( targets[i], sunPosition, gl_FragCoord.xy );

        float vDistance = distance( targets[i] , sunPosition );        
        float nDistance = distance( targets[i] , gl_FragCoord.xy);
        tDistance = distance( sunPosition , gl_FragCoord.xy);
        
        float pDistance = targetsRadius[i] + ( 0.1 * vDistance * 0.01) * nDistance * 0.25;
        if( tDistance > vDistance && tDistance > nDistance && offset < pDistance )
        {            
            oAlpha *= smoothstep( targetsRadius[i] , 1.0 + pDistance , offset);        
        }           
    }

    // Get the Sun Cutout
    float dist = length( tDistance );
    oAlpha *= smoothstep( sunInnerRadius, sunOuterRadius, dist * sunAtmosphere);

    // Apply final output alpha \n";
    gl_FragColor.a *= oAlpha; // + (uTime / flareFreq);
    //if(gl_FragColor.a < 0.1) discard;
    
    // Increase the intensity of our colors a bit
    vec4 result = vec4(1.35) * gl_FragColor + vec4( (uTime * 0.075)  * flareStrength) * gl_FragColor;   
    gl_FragColor = result;