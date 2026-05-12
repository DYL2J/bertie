# Bertie

Bertie is a static writing site served by GitHub Pages. There is no build step: edit the HTML, CSS, or JavaScript directly and push the files.

## Structure

```text
.
|-- assets/
|   |-- css/
|   |   `-- site.css
|   |-- images/
|   |-- partials/
|   |   |-- footer.html
|   |   `-- header.html
|   `-- js/
|       `-- site.js
|-- posts/
|   |-- _templates/
|   |   `-- article.html
|   |-- do-you-have-the-greggs-app.html
|   |-- i-am-so-glad-i-sucked-at-sales.html
|   `-- my-testimony.html
|-- index.html
|-- about.html
`-- .nojekyll
```

## Add A Post

1. Copy `posts/_templates/article.html`.
2. Rename the copy inside `posts/`, for example `posts/my-new-post.html`.
3. Edit the title, date, description, article text, and any media.
4. Add a matching `.post-card` entry to `index.html`.

Shared header and footer markup lives in `assets/partials/` and is loaded by `assets/js/site.js`.

## Images

Keep images in `assets/images/` and reference them relatively:

```html
<img src="../assets/images/example.jpg" alt="">
```

Use JPG, PNG, or WebP for browser reliability. HEIC files are archived in the image folder but should be converted before use on the site.

## Publish

This site uses the default GitHub Pages URL:

```text
https://dyl2j.github.io/bertie/
```
