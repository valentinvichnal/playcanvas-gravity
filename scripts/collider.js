pc.script.create('collider', function (app) {
  // Creates a new Collider instance
  var Collider = function (entity) {
    this.entity = entity;
  };

  Collider.prototype = {
    // Called once after all resources are loaded and before the first update
    initialize: function () {
      this.entity.collision.on('triggerenter', this.onTriggerEnter, this);
      this.entity.collision.on('triggerleave', this.onTriggerLeave, this);
    },

    // Called every frame, dt is time in seconds since last update
    onTriggerEnter: function (other) {
      if (other.name == "Spawned");
      console.log("IN");
      other.script.force.insideField = true;

    },
    onTriggerLeave: function (other) {
      if (other.name == "Spawned");
      console.log("OUT");
      other.script.force.insideField = false;
    }
  };

  return Collider;
});
