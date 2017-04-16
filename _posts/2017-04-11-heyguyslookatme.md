---
layout: blogpost
title: "Other cool things we can do"
tags: [events, video]
category: Gene
---

Another great thing is because it's jekyll, we can create our own custom includes to make it easier to make things a bit more standard. For example, I made an _include called "figure" in _includes folder which lets you embed an image with a caption which is easily centered. 

{% include figure.html path="https://c2.staticflickr.com/2/1644/26327965226_ab93e463c7_b.jpg" caption="A selfie mosaic hosted in flickr <a href=\"https://www.flickr.com/photos/genekogan/26327965226/\">[original link]</a>" %}

The embed code for this is:

{ % include figure.html path="/path/to/image" caption="my caption" % }

We can make includes for all sorts of things: vimeo/youtube embeds, javascript/p5 demos, those fancy rotating thumbnail gallery things etc etc
