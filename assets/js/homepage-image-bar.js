// Simple horizontal image scroller for homepage
// Expects a container with id 'homepage-image-bar' and child images

document.addEventListener('DOMContentLoaded', function() {
  const bar = document.getElementById('homepage-image-bar');
  if (!bar) return;

  // Make each image a full bar "page" as background
  const imgs = Array.from(bar.querySelectorAll('img'));
  if (imgs.length === 0) return;

  // Create a page container for each image
  bar.innerHTML = '';
  imgs.forEach(img => {
    const page = document.createElement('div');
    page.className = 'homebar-page';
    page.style.backgroundImage = `url('${img.src}')`;
    page.style.backgroundSize = 'cover';
    page.style.backgroundPosition = 'center';
    page.style.width = '100%';
    page.style.height = '100%';
    page.style.flex = '0 0 100%';
    page.style.display = 'flex';
    page.style.alignItems = 'flex-end';
    page.style.justifyContent = 'center';
    bar.appendChild(page);
  });

  // Set up horizontal scroll snap
  bar.style.display = 'flex';
  bar.style.overflowX = 'auto';
  bar.style.overflowY = 'hidden';
  bar.style.scrollSnapType = 'x mandatory';
  Array.from(bar.children).forEach(child => {
    child.style.scrollSnapAlign = 'start';
  });

  // Auto-scroll one page at a time
  let current = 0;
  function scrollToPage(idx) {
    const pageWidth = bar.offsetWidth;
    bar.scrollTo({ left: idx * pageWidth, behavior: 'smooth' });
  }
  let autoScrollInterval = setInterval(() => {
    current = (current + 1) % bar.children.length;
    scrollToPage(current);
  }, 2500);

  // Pause auto-scroll on hover
  bar.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  bar.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(() => {
      current = (current + 1) % bar.children.length;
      scrollToPage(current);
    }, 3500);
  });

  // Manual scroll with arrows
  const leftArrow = document.querySelector('.homebar-arrow.left');
  const rightArrow = document.querySelector('.homebar-arrow.right');
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      current = (current - 1 + bar.children.length) % bar.children.length;
      scrollToPage(current);
    });
    rightArrow.addEventListener('click', () => {
      current = (current + 1) % bar.children.length;
      scrollToPage(current);
    });
  }
});
