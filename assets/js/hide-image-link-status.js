// Suppress status bar URL for images by temporarily removing href on hover
document.addEventListener('DOMContentLoaded', function() {
  function suppressStatusBarLinks(selector) {
    var links = document.querySelectorAll(selector);
    links.forEach(function(link) {
      var img = link.querySelector('img');
      if (!img) return;
      var originalHref = link.getAttribute('href');
      link.addEventListener('mouseenter', function() {
        link.setAttribute('data-original-href', originalHref);
        link.removeAttribute('href');
        link.style.cursor = 'pointer';
      });
      // On mousedown, open the link programmatically and prevent default status bar
      link.addEventListener('mousedown', function(e) {
        if (link.getAttribute('data-original-href')) {
          var href = link.getAttribute('data-original-href');
          // Only handle left click, not ctrl/cmd/shift/alt or middle/right click
          if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
            e.preventDefault();
            // For lightbox, trigger click event so lightbox still works
            if (link.hasAttribute('data-lightbox')) {
              link.setAttribute('href', href); // temporarily restore
              setTimeout(function() {
                link.removeAttribute('href');
              }, 100);
              return;
            }
            window.open(href, '_self');
          } else {
            // For other clicks, restore href so browser handles it
            link.setAttribute('href', href);
          }
        }
      });
      link.addEventListener('mouseleave', function() {
        if (link.getAttribute('data-original-href')) {
          link.setAttribute('href', link.getAttribute('data-original-href'));
          link.removeAttribute('data-original-href');
        }
        link.style.cursor = '';
      });
    });
  }
  suppressStatusBarLinks('.lazy-gallery a');
  suppressStatusBarLinks('.menu-grid a');
  suppressStatusBarLinks('.homebar-grid a');
}
);