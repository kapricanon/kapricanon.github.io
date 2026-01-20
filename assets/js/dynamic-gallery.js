// Enhanced dynamic image loader for vision, mission, and goal galleries
// Automatically discovers images from Jekyll's static files

(function() {
  // Configuration for each gallery
  var galleries = {
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
    };

    return fallbacks[folderPath] || [];
  }

  // Initialize all galleries
  Object.keys(galleries).forEach(function(containerId) {
    // createDynamicGallery(containerId, galleries[containerId]);
  });

})();