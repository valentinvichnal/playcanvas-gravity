// Controls the movement speed
pc.script.attribute('speed', 'number', 0.1, {
    min: 0.05,
    max: 0.5,
    step: 0.05,
    decimalPrecision: 2
});

// Script Definition
pc.script.create('movement', function (app) {
    
    // Creates a new Movement instance
    var Movement = function (entity) {
        this.entity = entity;
        this.force = new pc.Vec3();
    };

    Movement.prototype = {        
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            var forceX = 0;
            var forceZ = 0;
            
            // calculate force based on pressed keys
            if (app.keyboard.isPressed(pc.KEY_LEFT)) {
                forceX = -this.speed;
            } 
            
            if (app.keyboard.isPressed(pc.KEY_RIGHT)) {
                forceX += this.speed;
            }
            
            if (app.keyboard.isPressed(pc.KEY_UP)) {
                forceZ = -this.speed;
            } 
            
            if (app.keyboard.isPressed(pc.KEY_DOWN)) {
                forceZ += this.speed;
            }
            
             if (app.keyboard.isPressed(pc.KEY_SPACE)) {
                this.entity.rigidbody.applyImpulse(0, 0.5, 0);
            }
                        
            this.force.x = forceX;
            this.force.z = forceZ;
            
            // if we have some non-zero force
            if (this.force.length()) {
                
                // calculate force vector
                var rX = Math.cos(-Math.PI * 0.25);
                var rY = Math.sin(-Math.PI * 0.25);
                this.force.set(this.force.x * rX - this.force.z * rY, 0, this.force.z * rX + this.force.x * rY);
                
                // clamp force to the speed
                if (this.force.length() > this.speed) {
                    this.force.normalize().scale(this.speed);
                }
            }
            
            // apply impulse to move the entity
            this.entity.rigidbody.applyImpulse(this.force);
        }
    };

    return Movement;
});