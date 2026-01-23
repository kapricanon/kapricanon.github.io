// Custom Lightbox2 close-on-anywhere-click handler
// This script closes the lightbox when clicking anywhere on the overlay or image
// Works for all images using Lightbox2 across the site

// Improved Lightbox2 close-on-anywhere-click handler
// This script closes the lightbox when clicking anywhere on the overlay or image itself (not next/prev arrows)
// Works for all images using Lightbox2 across the site

// Force Lightbox2 to close on image click instead of going to next image
// This must run after Lightbox2 is loaded

document.addEventListener('DOMContentLoaded', function() {
  if (typeof lightbox === 'undefined') return;

  // Patch Lightbox2 to close on image click
  $(document).on('click', '.lb-image', function(e) {
    // Prevent default Lightbox2 next image behavior
    e.stopPropagation();
    e.preventDefault();
    if (typeof lightbox !== 'undefined') {
      lightbox.end();
    }
    return false;
  });

  // Listen for when the lightbox is opened
  document.addEventListener('lightbox:opened', function() {
    var overlay = document.querySelector('.lightboxOverlay');
    var container = document.querySelector('.lightbox');
    if (!overlay || !container) return;

    // Handler to close lightbox only if clicking overlay or the image itself
    function closeOnOverlayOrImage(e) {
      // Only close if click is on overlay or the image (not on nav arrows, close button, or caption)
      if (
        e.target.classList.contains('lb-prev') ||
        e.target.classList.contains('lb-next') ||
        e.target.classList.contains('lb-close') ||
        e.target.classList.contains('lb-caption') ||
        e.target.closest('.lb-nav')
      ) {
        return;
      }
      // If click is on overlay or the image
      if (
        e.target.classList.contains('lightboxOverlay') ||
        e.target.classList.contains('lb-image')
      ) {
        lightbox.end();
      }
    }

    overlay.addEventListener('click', closeOnOverlayOrImage);
    container.addEventListener('click', closeOnOverlayOrImage);

    // Remove handler when lightbox closes
    document.addEventListener('lightbox:closed', function cleanup() {
      overlay.removeEventListener('click', closeOnOverlayOrImage);
      container.removeEventListener('click', closeOnOverlayOrImage);
      document.removeEventListener('lightbox:closed', cleanup);
    });
  });
});
