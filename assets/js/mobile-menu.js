// Mobile dropdown menu toggle
window.addEventListener('DOMContentLoaded', function() {
  var menuBtn = document.getElementById('mobile-menu-btn');
  var menuList = document.getElementById('mobile-menu-list');
  if (menuBtn && menuList) {
    menuBtn.addEventListener('click', function() {
      menuList.classList.toggle('open');
    });
  }
});