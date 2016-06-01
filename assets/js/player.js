var player = (function() {
  var queue      = [];
  var queueIndex = 0;

  function next() {
    var nextIndex = (queueIndex + 1) % queue.length;

    containers.show(queue[queueIndex]);

    if (queue[nextIndex].type !== 'video') {
      // If we are going to load an image, wait for the transition to end
      // so it doesn't change during the transition.
      setTimeout(function() {
        containers.load(queue[nextIndex]);
      }, 1000);
    } else {
      containers.load(queue[nextIndex]);
    }

    if (++queueIndex >= queue.length) {
      utils.shuffle(queue);

      queueIndex = 0;
    }

    setTimeout(next, constants.SLIDE_TIMEOUT);
  }

  return {
    setPlaylist: function(playlist) {
      queue = playlist;

      utils.shuffle(queue);

      containers.load(queue[0]);

      next();
    }
  };
})();