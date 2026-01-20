---
layout: default
title: Gallery
---

<h2 style="text-align:center; color:#157878; margin-top:calc(1.5em - 40px);">Gallery</h2>
{% assign images = site.static_files | where_exp: "file", "file.path contains '/assets/images/gallery/'" %}
<div class="lazy-gallery" data-lightbox="gallery" data-images='[
	{% for image in images %}{"path": "{{ image.path }}", "name": "{{ image.name }}"}{% if forloop.last == false %},{% endif %}{% endfor %}
]' style="margin-bottom:2em;"></div>

