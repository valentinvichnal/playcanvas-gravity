// The target entity where we are going to teleport
pc.script.attribute('target', 'entity', null, {
    displayName: 'Target Entity'
});

pc.script.create('teleport', function (app) {
    var Teleport = function (entity) {
        this.entity = entity;
    };

    Teleport.prototype = {
        initialize: function () {            
            if (this.target) {
                // Subscribe to the triggerenter event of this entity's collision component.
                // This will be fired when a rigid body enters this collision volume.
                this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
            }
        },
                
        onTriggerEnter: function (otherEntity) {
            // it is not teleportable
            console.log(otherEntity.script);
            if (! otherEntity.script.teleportable)
                return;
            // teleport entity to the target entity
            otherEntity.script.teleportable.teleport(this.entity, this.target);
        }
    };

    return Teleport;
});