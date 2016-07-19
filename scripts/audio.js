pc.script.create('audio', function (app) {
    // Creates a new Audio instance
    var Audio = function (entity) {
        this.entity = entity;
        this.soundPaused = false;
    };

    Audio.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
        },

        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
            if (app.keyboard.wasPressed(pc.KEY_M) && this.soundPaused) {
                this.entity.sound.resume();
                this.soundPaused = false;
            }
            else if (app.keyboard.wasPressed(pc.KEY_M) && !this.soundPaused) {
                this.entity.sound.pause();
                this.soundPaused = true;
            }
        }
    };

    return Audio;
});