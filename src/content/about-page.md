---
title: About
tags:
  - webpage
layout: layouts/nested-page-layout.njk
permalink: /about/
eleventyComputed:
  description: "About Frontend Stories. {{meta.site_description}}"
  eleventyNavigation:
    key: About
    parent: Home
---

<!-- <h1 class="visually-hidden">
Frontend Stories
</h1> -->

# Goal of Frontend Stories

The goal of Frontend Stories is to make research data, facts, quotes, and articles easily accessible to developers, so they can create their own development guidelines. We provide insights to tackle common issues, such as how to write better content, improve accessibility, or boost performance. Rather than giving definitive answers like “always do this” or “never do that,” it offers various references (mostly scientific) for readers to find their own solution, considering their context and needs.

Currently, this project is maintained by [Yannick Nana](https://yannicknana.fr).

<a
  data-button="outline"
  data-props="x:center"
  href="mailto:{{ meta.author.email }}?subject=[FS Contribution] {{ story.name }}">
Email me</a>
<a data-button="outline" href="/feed.xml">RSS Feed</a>
<a data-button="outline" href="/preferences">Preferences</a>


