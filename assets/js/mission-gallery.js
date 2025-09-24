// Dynamically load all images from the mission folder and display in zig-zag layout
(function() {
  var folder = '/assets/images/mission/';
  var container = document.getElementById('mission-zigzag');
  if (!container) return;

  // List of images in the folder (update automatically if using Jekyll plugins, else update manually)
  var images = [
    'Colourwheel.jpg',
    'Eternal Lotus.jpg',
    'Strings of Mind- Flyer.jpg'
  ];

  images.forEach(function(img, i) {
    var el = document.createElement('img');
    el.src = folder + img;
    el.alt = img.replace(/\.[^.]+$/, '');
    el.className = 'mission-img ' + (i % 2 === 0 ? 'mission-img-left' : 'mission-img-right');
    container.appendChild(el);
  });
})();
