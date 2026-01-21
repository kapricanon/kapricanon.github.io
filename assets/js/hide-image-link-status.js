// Suppress status bar URL for images by temporarily removing href on hover
// Event delegation: handle all current and future gallery/menu/homebar images
document.addEventListener('mouseover', function(e) {
  var link = e.target.closest('.lazy-gallery a, .menu-grid a, .homebar-grid a');
  if (!link || !link.querySelector('img')) return;
  if (!link.hasAttribute('data-original-href')) {
    link.setAttribute('data-original-href', link.getAttribute('href'));
    link.removeAttribute('href');
    link.style.cursor = 'pointer';
  }
});
document.addEventListener('mousedown', function(e) {
  var link = e.target.closest('.lazy-gallery a, .menu-grid a, .homebar-grid a');
  if (!link || !link.hasAttribute('data-original-href')) return;
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
});
document.addEventListener('mouseout', function(e) {
  var link = e.target.closest('.lazy-gallery a, .menu-grid a, .homebar-grid a');
  if (!link || !link.hasAttribute('data-original-href')) return;
  link.setAttribute('href', link.getAttribute('data-original-href'));
  link.removeAttribute('data-original-href');
  link.style.cursor = '';
});