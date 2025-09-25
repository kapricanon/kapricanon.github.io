// Mobile dropdown menu toggle
window.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.getElementById('mobile-menu-btn');
  var menuList = document.getElementById('mobile-menu-list');

  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', function() {
      menuList.classList.toggle('open');
      if (menuList.classList.contains('open')) {
        menuBtn.innerHTML = 'Close &#10005;'; // Change to cross icon
        document.body.addEventListener('click', closeMenuOnClickOutside);
      } else {
        menuBtn.innerHTML = 'Menu &#9776;'; // Change back to menu icon
        document.body.removeEventListener('click', closeMenuOnClickOutside);
      }
    });

    function closeMenuOnClickOutside(event) {
      if (!menuList.contains(event.target) && event.target !== menuBtn) {
        menuList.classList.remove('open');
        menuBtn.innerHTML = 'Menu &#9776;';
        document.body.removeEventListener('click', closeMenuOnClickOutside);
      }
    }
  }
});