pc.script.attribute('speed','vec3', [0,0,0], { displayName:"Speed:" });

pc.script.create('rotate', function (app) {
    // Creates a new Rotate instance
    var Rotate = function (entity) {
        this.entity = entity;
    };

    Rotate.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            this.entity.rotate(this.speed.x*dt,this.speed.y*dt,this.speed.z*dt);
        }
    };

    return Rotate;
});