// LATER
pc.script.create('ForceField', function (app) {
  // Creates a new ForceField instance
  var ForceField = function (entity) {
    this.entity = entity;
    this.gravity = -5;
    this.visitors = [];
  };

  ForceField.prototype = {
    // Called once after all resources are loaded and before the first update
    initialize: function () {
      this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
      this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
    },

    onTriggerEnter: function (entity) {
      this.visitors.push(entity);
    },

    onTriggerLeave: function (entity) {
      var i = this.visitors.indexOf(entity);
      var pre = this.visitors.slice(0, i);
      var post = this.visitors.slice(i + 1);
      this.visitors = pre.concat(post);
    },

    // Called every frame, dt is time in seconds since last update
    update: function (dt) {
      this.visitors.forEach(function (entity, index, array) {
        var dragVec = entity.getPosition().sub(this.entity.getPosition());
        dragVec.normalize().scale(this.gravity);
        entity.rigidbody.applyForce(dragVec.x, dragVec.y, dragVec.z, 0, 2, 0);
      }, this);
    }
  };

  return ForceField;
});
