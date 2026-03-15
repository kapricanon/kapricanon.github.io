document.addEventListener('DOMContentLoaded', function() {
  var section = document.querySelector('[data-testimonials-source]');
  if (!section) return;

  var source = section.getAttribute('data-testimonials-source');
  var track = section.querySelector('.testimonial-marquee__track');
  if (!source || !track) return;

  fetch(source)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Failed to load testimonials');
      }
      return response.text();
    })
    .then(function(text) {
      var testimonials = text
        .split(/\r?\n\s*\r?\n+/)
        .map(function(entry) {
          return entry.trim();
        })
        .filter(Boolean);

      if (testimonials.length === 0) {
        section.style.display = 'none';
        return;
      }

      var itemsToRender = testimonials.length > 1 ? testimonials.concat(testimonials) : testimonials;
      var fragment = document.createDocumentFragment();

      itemsToRender.forEach(function(testimonial, index) {
        var card = document.createElement('article');
        card.className = 'testimonial-card';
        if (index >= testimonials.length) {
          card.setAttribute('aria-hidden', 'true');
        }

        var quote = document.createElement('p');
        quote.className = 'testimonial-card__quote';
        quote.textContent = testimonial;
        card.appendChild(quote);
        fragment.appendChild(card);
      });

      track.innerHTML = '';
      track.appendChild(fragment);
    })
    .catch(function() {
      section.style.display = 'none';
    });
});
