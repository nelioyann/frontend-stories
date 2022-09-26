---
title: About Frontend Stories
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

# About Frontend Stories
### Goal

The aim of Frontend Stories is to facilitate access to research data, as well as facts, quotes and articles on which developers can build their own development guidelines.

It offers insights to address common concerns related to subjects such as how to write better content, improving accessibility or performance.

It does not aim to provide definitive answers such as “always do this or never do that” but instead provide various references (mostly scientific) for the reader to find his own solution while taking into account context and needs.

### The project
#### Stack
This project was built using a [JAMSTACK](https://jamstack.wtf/#what-is-jamstack) architecture.
- [Notion](https://notion.so/) - Headless CMS
- [Eleventy](https://www.11ty.dev/) - Static Site Generator
- [Netlify](https://www.netlify.com/) - Hosting

#### Overview
- Content resides in a Notion database and is made available via the Notion API.
- Eleventy, *a simpler static site generator* generates our static assets (HTML + CSS + Images).
- Hosting is done via Netlify, with a Github integration.
- New contribution are made in a Tally form, and automatically added to the Notion database.
- Entries with a tag of `Published` will then be included here 

<!-- ---

This project is maintained by [Yannick Nana](https://yannicknana.fr). -->


