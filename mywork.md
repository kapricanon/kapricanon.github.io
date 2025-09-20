---
title: MY WORK
layout: default
---

<nav style="margin-bottom:1.5em">
	<a href="/">Home</a> |
	<a href="/mywork.html">MY WORK</a> |
	<a href="/workshops.html">WORKSHOPS</a> |
	<a href="/parties.html">PARTIES</a> |
	<a href="/customartwork.html">CUSTOM ARTWORK</a> |
	<a href="/about.html">ABOUT ME</a> |
	<a href="/contact.html">CONTACT</a>
</nav>


# MY WORK

Here are some pictures for MY WORK:

{% assign images = site.static_files | where_exp: "file", "file.path contains '/assets/images/mywork/'" %}
{% for image in images %}
	<a href="{{ image.path }}" data-lightbox="mywork" data-title="{{ image.name }}">
		<img src="{{ image.path }}" alt="{{ image.name }}" width="200">
	</a>
{% endfor %}
