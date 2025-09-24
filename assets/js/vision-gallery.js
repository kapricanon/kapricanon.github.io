// Dynamically load all images from the vision folder and display in zig-zag layout
(function() {
  var folder = '/assets/images/vision/';
  var container = document.getElementById('vision-zigzag');
  if (!container) return;

  var images = [
    '480788889_938607615091005_5750351739958449367_n.jpg',
    'Housewarming.jpg',
    'Red and Orange Mandala.jpg',
    'WhatsApp Image 2023-10-17 at 10.19.31.jpeg'
  ];

  images.forEach(function(img, i) {
    var el = document.createElement('img');
    el.src = folder + img;
    el.alt = img.replace(/\.[^.]+$/, '');
    el.className = 'mission-img ' + (i % 2 === 0 ? 'mission-img-left' : 'mission-img-right');
    container.appendChild(el);
  });
})();
