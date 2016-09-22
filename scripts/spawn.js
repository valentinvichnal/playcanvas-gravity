pc.script.attribute('template', 'entity');

pc.script.create('spawn', function (app) {
  // Creates a new Spawn instance
  var Spawn = function (entity) {
    this.entity = entity;
  };

  Spawn.prototype = {
    // Called once after all resources are loaded and before the first update
    initialize: function () {
      this.time = 0;
    },

    // Called every frame, dt is time in seconds since last update
    update: function (dt) {
      this.time += dt;
      if (this.time > 2) {
        this.spawn();
        this.time = 0;
      }
    },

    spawn: function () {
      var spawned = this.template.clone();
      spawned.setPosition(this.entity.getPosition());
      spawned.translate(0, 0, pc.math.random(-4, 4));
      spawned.rigidbody.syncEntityToBody();
      spawned.name = "Spawned";
      app.root.addChild(spawned);
    }
  };

  return Spawn;
});
