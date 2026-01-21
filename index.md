---
layout: default
title: "String Art UK | Personalised Custom String Art | UntangleMyStringArt"
description: "Professional string art artist in UK specialising in personalised custom string art, nail art workshops, handmade string art gifts, art parties & exhibitions. Bespoke string art commissions."
keywords: "string art UK, personalised string art, custom string art, nail and string art, handmade string art, string art workshops, string art artist UK, bespoke string art, string art gifts, nail art classes"
author: "UntangleMyStringArt"
image: "/assets/images/logo/logoimage.png"
---
<style>
.homebar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: calc(2em + 30px) 0;
  width: 100%;
}
  .homebar-grid img {
    width: 100%;
    height: 270px;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 4px 24px #0005;
    transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
    cursor: pointer;
  }
  .homebar-grid a:hover img {
    transform: scale(1.07);
    box-shadow: 0 8px 32px #0007;
    z-index: 2;
  }
@media (max-width: 900px) {
  .homebar-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 600px) {
  .homebar-grid {
    grid-template-columns: 1fr;
  }
}
</style>



<style>
@media (max-width: 700px) {
  .site-content-container {
    margin-top: -10px !important;
  }
}
</style>
<div class="site-content-container">
  <div class="home-title-mobile-move" style="text-align:center; margin: calc(2em - 90px) 0;">
    <h1 style="font-size: 4.25em; font-family: 'Montserrat', 'Open Sans', Arial, sans-serif; margin: 0 auto; font-weight: 700; letter-spacing: 0.04em; color: #157878;">
      <style>
      @media (max-width: 700px) {
        .home-title-mobile-move {
          margin-left: -5px !important;
        }
      }
      </style>
      <span class="untangle-mobile-font" style="display:inline-block; margin-bottom:-10px; font-size:1.22em; position:relative;">Untangle
        <style>
        @media (max-width: 700px) {
          .untangle-mobile-font {
            font-size: calc(1.22em - 10pt) !important;
          }
        }
        </style>
        <img src="/assets/images/tag/tag.png" alt="Tag" style="height:1.1em; position:absolute; left:calc(100% - 19px); top:calc(0.1em + 17px); margin-left:2px; transform: rotate(-18deg); transform-origin: left top;" />
      </span>
      <span style="font-size: 0.52em; margin-top:15px; display:block; letter-spacing:0.08em;">My String Art</span>
    </h1>
    <div style="text-align:center; font-size: 1.5em; margin-top: 15px; color: #444; margin: 0 auto;">
      <div style="font-size: 0.7em; margin-top:10px; padding: 10px 0;">Step into a world where threads become magic! Discover vibrant colors, bold textures, and unique designs—each piece is crafted to spark your imagination and brighten your day. Dive in and let creativity inspire you!</div>
    </div>
  </div>



  <div class="homebar-grid">
    {% assign homebar_images_all = site.static_files | where_exp: "file", "file.path contains '/assets/images/homebar/'" %}
    {% for image in homebar_images_all %}
      {% if image.extname == '.jpg' or image.extname == '.jpeg' or image.extname == '.png' %}
        <a href="{{ image.path }}" data-lightbox="homebar">
          <img src="{{ image.path }}" alt="String Art Homebar" />
        </a>
      {% endif %}
    {% endfor %}
  </div>



<!-- Enhanced Keywords for Local SEO -->
<div style="display:none;">
String art UK, string art England, string art Scotland, string art Wales, personalised string art, custom string art, nail and string art, handmade string art, string art workshops, string art artist UK, bespoke string art, string art gifts, nail art classes, string art commissions, UK string art, string art near me, string art London, string art Manchester, string art Birmingham, professional string art, unique string art</div>

