pc.script.attribute('planet', 'entity');

pc.script.create('force', function (app) {
    var grav = new pc.Vec3();
    var vec = new pc.Vec3(0, 0, 0);
    // Creates a new Force instance
    var Force = function (entity) {
        this.entity = entity;
        
    };

    Force.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            this.entity.rigidbody.linearVelocity = vec;
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            grav = this.planet.getPosition().sub(this.entity.getPosition());
            grav.normalize().scale(9.8);
            this.entity.rigidbody.applyForce(grav);
        }
    };

    return Force;
});