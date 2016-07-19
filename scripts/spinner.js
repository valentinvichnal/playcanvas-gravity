pc.script.attribute('enabled', 'boolean', true, { displayName: "Enabled:" });
pc.script.attribute('target','entity',null, { displayName: "Start Target" });
pc.script.attribute('radius','number',5, { displayName: "Start Radius" });
pc.script.attribute('angle','number',0, { displayName: "Start Angle" });
pc.script.attribute('moveSpeed','number',1, { displayName: "Start Move Speed" });
pc.script.attribute('smoothFactor','number',1, { displayName: "Start Smooth Factor" });
pc.script.attribute('circleSpeed','number',1, { displayName: "Start Circle Speed" });
pc.script.attribute('offset','vec2',[0,0], { displayName: "Offset(X,Y): ", description: "Cannot be -1 !" });

pc.script.attribute('controlRotation','boolean',false, { displayName: "Control Rotation? " });
pc.script.attribute('undocked','boolean',false, { displayName: "Undocked? " });

pc.script.create('spinner', function (app) {
    // Creates a new Spinner instance
    var Spinner = function (entity) {
        this.entity = entity;
        this.mode = 'soft';
    };

    Spinner.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () 
        {
            if((this.target === null)||(this.target === ""))
            {
                alert("Initial Target not set - cannot circle around nothing");
            }
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
            if(this.angle !== 0)this.angle *=  Math.PI / 180;
        },
        
        calcPos: function()
        {
            var result = pc.Vec3(0,0,0);
            var x = this.radius * Math.cos(this.angle) * (this.offset.x + 1);
            var y = this.radius * Math.sin(this.angle) * (this.offset.y + 1);
            var z = 0;
            result = new pc.Vec3(x,y,z);
            result.add(this.target.getPosition());
            return result;
        },
        
        onKeyDown: function (event)        //IMPORTANT: REMOVE
        {
//             if(event.key == pc.KEY_UP)
//             {
//                 this.offset.y += 0.1;
//             }
            
//             if(event.key == pc.KEY_DOWN)
//             {
//                 this.offset.y -= 0.1;
//             }
            
//             if(event.key == pc.KEY_LEFT)
//             {
//                 this.offset.x += 0.1;
//             }
            
//             if(event.key == pc.KEY_RIGHT)
//             {
//                 this.offset.x -= 0.1;
//             }
        },
        
        // Called every frame, dt is time in seconds since last update
        fixedUpdate: function (dt) 
        {
            if(app.timeScale === 0)return;
            if((!this.undocked)&&(this.enabled))
            {
                this.angle += this.circleSpeed * Math.PI / 180;
                var pos = this.calcPos();
                //console.log(""+pos);
                var currentPosition = this.entity.getPosition();     
                var currentRotation = this.entity.getRotation();
                switch(this.mode)
                {
                    case "hard":            this.entity.setPosition(pos.x,pos.y,pos.z); 
    //                                         this.entity.lookAt(_settings.aim); 
                                            break;

                    case "soft":            currentPosition.lerp(this.entity.getPosition(),pos,this.smoothFactor * dt);
                                            this.entity.setPosition(currentPosition.x,currentPosition.y,currentPosition.z);
                                            if(this.controlRotation){this.entity.setEulerAngles((this.circleSpeed > 0) ? 0 : 180,(this.circleSpeed > 0) ? 0 : 180,(this.angle * 180 / Math.PI)-15);}
    //                                         this.entity.lookAt(pos);
                                            break;

                    case "constant":        var directionVec = pos.clone();
                                            directionVec.sub(currentPosition);
                                            directionVec.normalize();
                                            //directionVec.scale(_currentSmoothFactor * deltaTime);
                                            currentPosition.add(directionVec);
                                            this.entity.setPosition(currentPosition.x, currentPosition.y, currentPosition.z);
    //                                         this.entity.lookAt(_settings.aim);
                                            break;
                }
            }
            //console.log(""+this.entity.getPosition());
        }
    };

    return Spinner;
});