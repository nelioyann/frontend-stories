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
    parent: All
---

<!-- <h1 class="visually-hidden">
Frontend Stories
</h1> -->

# Goal of Frontend Stories

Frontend Stories aims to provide developers with accessible research data, facts, quotes, and articles about frontend development.

Here you can find insights on addressing common issues like content improvement, accessibility enhancement, and performance optimization.
There is no rigid directives or conclusions and I try to present objective findings. I am certainly biaised by my own beliefs so do your own research when possible.

This project is maintained by [Yannick Nana](https://yannicknana.fr).

<a
  data-button="outline"
  data-props="x:center"
  href="mailto:{{ meta.author.email }}?subject=[FS Contribution] {{ story.name }}">
Email me</a>
<a data-button="outline" href="/feed.xml">RSS Feed</a>
<a data-button="outline" href="/preferences">Preferences</a>
<p>
Powered by Notion + Eleventy + GitHub + Netlify + Coffee
</p>
