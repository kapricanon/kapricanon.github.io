// Dynamically load all images from the goal folder and display in zig-zag layout
(function() {
  var folder = '/assets/images/goal/';
  var container = document.getElementById('goal-zigzag');
  if (!container) return;

  var images = [
    '480788889_938607615091005_5750351739958449367_n.jpg',
    '480981079_938606861757747_4591415150793126171_n.jpg',
    '481085248_938607261757707_2668360138950638636_n.jpg',
    'Cactus ornament.jpg',
    'CaptainA Ornament.jpg',
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
