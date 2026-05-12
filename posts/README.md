# Posts

Each post is a standalone HTML file.

Use `_templates/article.html` as the starting point for new posts. The shared design system lives in `../assets/css/site.css`.

Posts can vary their layout by mixing these blocks:

- `.article-hero`
- `.article-hero--text`
- `.article-hero--showcase`
- `.article-layout`
- `.article-body`
- `.media-block`
- `.image-pair`
- `.pullquote`
- `.article-aside`
- `.showcase-layout`
- `.embed-showcase`

This keeps the site consistent without forcing every article to have the same shape.

Keep shared images in `../assets/images/`.

The shared header and footer are loaded from `../assets/partials/` by `../assets/js/site.js`.

Video posts can use `.showcase-layout` with `.embed-showcase`. Add video entries to `../videos.html` so videos have a dedicated browsing page.
