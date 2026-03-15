document.addEventListener('DOMContentLoaded', function() {
  var section = document.querySelector('.testimonials-page[data-testimonials-source]');
  if (!section) return;

  var source = section.getAttribute('data-testimonials-source');
  var list = section.querySelector('.testimonials-list');
  if (!source || !list) return;

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
        list.innerHTML = '<p class="testimonials-page__empty">Testimonials will appear here soon.</p>';
        return;
      }

      var fragment = document.createDocumentFragment();

      testimonials.forEach(function(testimonial) {
        var card = document.createElement('article');
        card.className = 'testimonials-list__card';

        var body = document.createElement('p');
        body.className = 'testimonials-list__quote';
        body.textContent = testimonial;

        card.appendChild(body);
        fragment.appendChild(card);
      });

      list.innerHTML = '';
      list.appendChild(fragment);
    })
    .catch(function() {
      list.innerHTML = '<p class="testimonials-page__empty">Testimonials are unavailable right now.</p>';
    });
});
