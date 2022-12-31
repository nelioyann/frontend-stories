---
title: Style Guide
tags:
  - webpage
layout: layouts/nested-article-layout.njk
permalink: /style-guide/
eleventyComputed:
  description: "Style guide for Frontend Stories"
  eleventyNavigation:
    key: Style Guide
    parent: Home
---

# Style Guide

Below is a minimal style guide inspired by <a target="_blank" rel="noopener nofollow noreferrer" href="https://danabyerly.com/style-guide/">Dana Byerly's Style Guide</a>.

**Table of Contents**

- [Headings](#headings)
- [Block elements](#block-elements)
- [Code](#code)
- [Lists](#lists)

<section data-layout="box" data-props="noPad">
  <header data-layout="box" data-props="invert noBorder">
<h2 id="headings" data-heading="anchor">
  <a href="#headings">Headings</a>
</h2>
  </header>

<div data-layout="box stack" data-props="noBorder">

All headings within content pages have anchors. Based on their importance, the size can be
changed with `data-heading` attribute.

# TOP LEVEL HEADER

Here's some example text with `h1`.

## SECOND LEVEL HEADER

Here's some example text with `h2`.

### THIRD LEVEL HEADER

Here's some example text with `h3`.

#### Fourth Level Header

Here's some example text with `h4`.

---

Font sizes can be controlled through the use of the `data-heading` attribute. For example:

`<h1 data-heading='4'>Top Level sized like a fourth level heading</h1>`

</div>

</section>

<section data-layout="box" data-props="noPad">
  <header data-layout="box" data-props="invert noBorder">
<h2 id="block-elements" data-heading="anchor">
  <a href="#block-elements">Block elements</a>
</h2>
  </header>

<div data-layout="box stack" data-props="noBorder">

### Blockquote

> A little learning is a dangerous thing. &mdash; Japanese Proverb

### Paragraph text

Here's an example of paragraph text that is long enough to show line-height. Here is an example of a link that [goes back to the homepage](/). And here is an example of **bold text**.

</div>
</section>

<section data-layout="box" data-props="noPad">
  <header data-layout="box" data-props="invert noBorder">
<h2 id="code" data-heading="anchor">
  <a href="#code">Code</a>
</h2>
  </header>

<div data-layout="box stack" data-props="noBorder">

### Code within text

Here's an example of mentioning code, like `<figure>` or `display: flex` within paragraph text.

### Code snippets

<pre><code tabindex="0" class="language-css">/* CSS */
.wrapper-content {
  max-width: 45rem;
  margin: 0 auto;
}
</code></pre>

</div>
</section>

<section data-layout="box" data-props="noPad">
  <header data-layout="box" data-props="invert noBorder">
<h2 id="lists" data-heading="anchor">
  <a href="#lists">Lists</a>
</h2>
  </header>

<div data-layout="box stack" data-props="noBorder">

### Ordered list

Ordered list will be displayed horizontally until the number of items exceed 3 (in which case the rest collapses in a column).

1. Cats
2. Dogs
3. Horses

### Unordered list

- Cats
- Dogs
- Horses

### List with longer text

- Here is a list example with more text to illustrate the line-height and spacing between the bullets.
- In my opinion this nuance is often overlooked, resulting in the same amount of space between lines in a single bullet and between the bullets, making it harder to read.
- Both ordered and unordered list using this spacing.

</div>
</section>

<section data-layout="box" data-props="noPad">
  <header data-layout="box" data-props="invert noBorder">
    <h2 id="buttons" data-heading="anchor">
      <a href="#buttons">Buttons</a>
    </h2>
  </header>

<div data-layout="grid box" data-props="x:start noBorder">
  <div data-layout="cluster box" data-props="y:end space:2xs">
    <button data-button="primary">Primary</button>
    <button data-button="primary small">Primary Smol</button>
  </div>

  <div data-layout="cluster box" data-props="y:end space:2xs">
    <button data-button="outline">Outline</button>
    <button data-button="outline small">Outline Smol</button>
  </div>

  <div data-layout="cluster box" data-props="y:end space:2xs">
    <button data-button="tag">Tag</button>
    <button data-button="tag small">Tag Smol</button>
  </div>
  <div data-layout="cluster box" data-props="y:end space:2xs">
    <button data-button="link">Link</button>
    <button data-button="link small">Link Smol</button>
  </div>
</div>

</section>

<section data-layout="box">
The horizontal separator is customized to look like a rugged line. 
<hr>

This is made possible by using an `svg` as the background of the `<hr>` element.

</section>
