---
layout: blogpost
title: "Invisible cities"
tags: [visual]
category: Gene
---

Some belated highlights of a collaborative project I made with [Gabriele Gambotto](http://leva.io/), [Ambhika Samsen](http://www.ambhikasamsen.com/), [Andrej Boleslavský](http://id144.org/), [Michele Ferretti](https://twitter.com/miccferr), [Damiano Gui](https://twitter.com/damianogui), and [Fabian Frei](https://twitter.com/faebser) that we called [Invisible Cities](https://opendot.github.io/ml4a-invisible-cities/). The project was made during a workshop I taught at [OpenDot Lab](http://www.opendotlab.it/) in Milan, in November 2016.

Invisible Cities was a project in which we created generative satellite imagery using a neural network architecture commonly referred to as [pix2pix](https://phillipi.github.io/pix2pix/).  The title is a reference to the [1972 book by Italo Calvino](https://en.wikipedia.org/wiki/Invisible_Cities) which inspired the project.

We trained pix2pix to translate map tiles into generative satellite images. We trained individual models for several cities–Milan, Venice, and Los Angeles, allowing us to do city map style transfer, like the following example:

![city style transfer](https://opendot.github.io/ml4a-invisible-cities/assets/images/LA-33_8203--118_1651--176_000.jpg "city style transfer" =720x)

More experimentally we could generate whole cityscapes from scratch by drawing the maps and feeding them to pix2pix, like so:

![generative city](https://opendot.github.io/ml4a-invisible-cities/assets/main.png "generative city"  =720x)

More information and a [gallery](https://opendot.github.io/ml4a-invisible-cities/gallery/) can be found on the main page: [Invisible Cities](https://opendot.github.io/ml4a-invisible-cities/).

