// Enhanced dynamic image loader for vision, mission, and goal galleries
// Automatically discovers images from Jekyll's static files

(function() {
  // Configuration for each gallery
  var galleries = {
    'vision-zigzag': '/assets/images/vision/',
    'mission-zigzag': '/assets/images/mission/', 
    'goal-zigzag': '/assets/images/goal/'
  };

  // Function to create dynamic galleries using Jekyll's site.static_files
  function createDynamicGallery(containerId, folderPath) {
    var container = document.getElementById(containerId);
    if (!container) return;

    // Try to get images dynamically via a data attribute or fallback
    var images = getImagesForFolder(folderPath);
    
    if (images.length === 0) {
      console.warn('No images found for ' + containerId);
      return;
    }

    images.forEach(function(img, i) {
      var el = document.createElement('img');
      el.src = img;
      
      // Extract filename for alt text
      var filename = img.split('/').pop().replace(/\.[^.]+$/, '');
      el.alt = filename;
      
      el.className = 'mission-img ' + (i % 2 === 0 ? 'mission-img-left' : 'mission-img-right');
      
      // Add error handling
      el.onerror = function() {
        console.warn('Image failed to load: ' + this.src);
        this.style.display = 'none';
      };
      
      // Add loading attribute for better performance
      el.loading = 'lazy';
      
      container.appendChild(el);
    });
  }

  // Function to get images for a specific folder
  function getImagesForFolder(folderPath) {
    var images = [];
    
    // Check if we have a data attribute with image list
    var galleryData = document.querySelector('[data-gallery-images]');
    if (galleryData) {
      try {
        var allImages = JSON.parse(galleryData.getAttribute('data-gallery-images'));
        images = allImages.filter(function(img) {
          return img.startsWith(folderPath);
        });
      } catch (e) {
        console.warn('Failed to parse gallery data');
      }
    }

    // Fallback to hardcoded lists if dynamic loading fails
    if (images.length === 0) {
      images = getFallbackImages(folderPath);
    }

    return images;
  }

  // Fallback image lists (updated with current files)
  function getFallbackImages(folderPath) {
    var fallbacks = {
      '/assets/images/vision/': [
        '/assets/images/vision/480788889_938607615091005_5750351739958449367_n.jpg',
        '/assets/images/vision/Housewarming.png',
        '/assets/images/vision/Red and Orange Mandala.jpg',
        '/assets/images/vision/WhatsApp Image 2023-10-17 at 10.19.31.jpeg'
      ],
      '/assets/images/goal/': [
        '/assets/images/goal/480788889_938607615091005_5750351739958449367_n.jpg',
        '/assets/images/goal/480981079_938606861757747_4591415150793126171_n.jpg',
        '/assets/images/goal/481085248_938607261757707_2668360138950638636_n.jpg',
        '/assets/images/goal/Cactus ornament.jpg',
        '/assets/images/goal/CaptainA Ornament.jpg',
        '/assets/images/goal/Housewarming.png',
        '/assets/images/goal/IMG_6218.jpg',
        '/assets/images/goal/Red and Orange Mandala.jpg',
        '/assets/images/goal/WhatsApp Image 2023-10-17 at 10.19.31.jpeg'
      ],
      '/assets/images/mission/': [
        '/assets/images/mission/Colourwheel.jpg',
        '/assets/images/mission/Eternal Lotus.jpg',
        '/assets/images/mission/Strings of Mind- Flyer.jpg'
      ]
    };

    return fallbacks[folderPath] || [];
  }

  // Initialize all galleries
  Object.keys(galleries).forEach(function(containerId) {
    createDynamicGallery(containerId, galleries[containerId]);
  });

})();