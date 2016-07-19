// The entity to follow
pc.script.attribute('target', 'entity', null, {
    displayName: 'Target'
});

pc.script.attribute('maxElevation', 'number', 70, {
    displayName: "Max Elevation",
    min: 0,
    max: 90
});

pc.script.attribute('minElevation', 'number', 1, {
    displayName: "Min Elevation",
    min: 0,
    max: 10
});

pc.script.create("camera", function (context) {
    var Camera = function (entity) {
        this.entity = entity;

        this.viewPos = new pc.Vec3();
        this.targetViewPos = new pc.Vec3();
        this.tempVec = new pc.Vec3();
        this.targetPos = {};

        this.distance = 12;
        this.targetDistance = 12;

        this.rotX = -45;
        this.rotY = 45;
        this.targetRotX = -45;
        this.targetRotY = 45;
        this.quatX = new pc.Quat();
        this.quatY = new pc.Quat();

        this.transformStarted = false;

        // Disabling the context menu stops the browser disabling a menu when 
        // you right-click the page
        context.mouse.disableContextMenu();
    };

    Camera.prototype = {
        initialize: function () {
            context.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
            
            ////////////////////
            // Touch controls //
            ////////////////////
            var options = {
                prevent_default: true,
                drag_max_touches: 2,
                transform_min_scale: 0.08,
                transform_min_rotation: 180,
                transform_always_block: true,
                hold: false,
                release: false,
                swipe: false,
                tap: false
            };
            this.hammer = Hammer(context.graphicsDevice.canvas, options);

            // Pinch zoom
            var cachedTargetDistance;
            this.hammer.on("transformstart", function (event) {
                this.transformStarted = true;
                cachedTargetDistance = this.targetDistance;

                event.preventDefault();
                this.hammer.options.drag = false;
            }.bind(this));
            this.hammer.on("transformend", function (event) {
                this.transformStarted = false;
                this.hammer.options.drag = true;
            }.bind(this));
            this.hammer.on("transform", function (event) {
                if (this.transformStarted) {
                    var gesture = event.gesture;
                    var scale = gesture.scale;
                    this.targetDistance = cachedTargetDistance / scale;
                }
            }.bind(this));

            context.mouse.on(pc.input.EVENT_MOUSEMOVE, this.onMouseMove, this);
            context.mouse.on(pc.input.EVENT_MOUSEWHEEL, this.onMouseWheel, this);
        },
        onMouseDown: function(event) {
          if(event.button === pc.input.MOUSEBUTTON_MIDDLE){ 
              this.pointerMDown = true;
          }
        },
        dolly: function (movez) {
            // Dolly along the Z axis of the camera's local transform
            this.targetDistance += movez;
            if (this.targetDistance < 0) {
                this.targetDistance = 0;
            }
        },
        orbit: function (movex, movey) {
            this.targetRotX += movex;
            this.targetRotY += movey;
            
            if ( this.targetRotY <= this.minElevation)
                 this.targetRotY = this.minElevation;
            
            
            this.targetRotY = pc.math.clamp(this.targetRotY, -this.maxElevation, this.maxElevation);
        },
        onMouseWheel: function (event) {
            event.event.preventDefault();
            this.dolly(event.wheel * -0.25);
        },
        onMouseMove: function (event) {
            if (event.buttons[pc.input.MOUSEBUTTON_LEFT]) {
                this.orbit(event.dx * 0.2, event.dy * 0.2);
            }
        },
        update: function (dt) {
            this.targetViewPos.copy(this.target.getPosition());

            // Implement a delay in camera controls by lerping towards a target
            this.viewPos.lerp(this.viewPos, this.targetViewPos, dt / 0.1);
            this.distance = pc.math.lerp(this.distance, this.targetDistance, dt / 0.2);
            this.rotX = pc.math.lerp(this.rotX, this.targetRotX, dt / 0.2);
            this.rotY = pc.math.lerp(this.rotY, this.targetRotY, dt / 0.2);

            // Calculate the camera's rotation
            this.quatX.setFromAxisAngle(pc.Vec3.RIGHT, -this.rotY);
            this.quatY.setFromAxisAngle(pc.Vec3.UP, -this.rotX);
            this.quatY.mul(this.quatX);

            // Set the camera's current position and orientation
            this.entity.setPosition(this.viewPos);
            this.entity.setRotation(this.quatY);
            this.entity.translateLocal(0, 0, this.distance);
            
        }
    };
    
    return Camera;
});