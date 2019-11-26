---
layout: default
title: Events
permalink: /events/
---

<div class="container highlight" data-highlight-menu="events">
  <div class="row" style="padding-top: 70px;">
    <div class="col-xs-9 col-xs-push-2">

      <div class="row" id="events-archive-container">
          <h2 class="col-xs-12">Lacuna Events Archive</h2>
          
          {% for event in site.data.events %}
          <div class="col-xs-12 col-sm-4">
            <a href="/events/{{ event.filename }}.html">
              <div class="panel panel-default" style="border:0px solid;">
                  <p class="event_month">
                      {% assign m = event.date | date: "%B" %}
                      {% case m %}
                      {% when 'April' or 'May' or 'June' or 'July' %}{{ m }}
                      {% when 'September' %}Sept
                      {% else %}{{ event.date | date: "%b" }}
                      {% endcase %}
                  </p>
                  <p class="event_day">
                      {% assign d = event.date | date: "%-d" %}
                      {% case d %}
                      {% when '1' or '21' or '31' %}{{ d }}st
                      {% when '2' or '22' %}{{ d }}nd
                      {% when '3' or '23' %}{{ d }}rd
                      {% else %}{{ d }}th
                      {% endcase %}
                  </p>

                  <p class="event_time">{{ event.time }}</p>
                  <div class="row">
                    <img src="/img/events/{{ event.image }}" class="event_image" />
                  </div>
                  <p class="event_title">{{ event.name }}</p>
                  <hr class="event_line">
                  <p class="event_location">{{ event.location }}</p>

                  <p class="event_location_city">{{ event.location-city }}</p>

                  <p class="event_description">{{ event.description }}</p>
              </div>
            </a>
          </div>
          {% endfor %}
      </div>
  </div>
</div>
