## Slide Show Nodes

- SlideShowNode
  - block decorator node, contains ordered slides
  - each slide stores only `url` and `caption`
  - render in two modes:
    - edit mode: show image area edit trigger and edit dialog
    - display mode: show slideshow content only

## Node Tree

- insert a slideshow with two slides

```
RootNode
├─ ParagraphNode
│  └─ TextNode("some text before")
├─ SlideShowNode
│  └─ slides:
│     ├─ { url: "https://example.com/one.jpg", caption: "First slide" }
│     └─ { url: "https://example.com/two.jpg", caption: "Second slide" }
└─ ParagraphNode
   └─ TextNode("some text after")
```

## Insert Slide Show From DB

The reusable editor package does not know how to query a CMS or image database.
Consumers enable slideshow insertion by passing `config.image.imageFromDb`.
When this config exists and `features.slideShow !== false`, the toolbar insert
dropdown shows a `SlideShow` button.

```ts
type SlideShowSlide = {
  url: string
  caption: string
}
```

Confirming a slideshow dispatches `SLIDE_SHOW_ADD_COMMAND` with:

```ts
{
  slides: [
    { url: selectedImage.url, caption: 'First slide caption' },
    { url: selectedImage.url, caption: 'Second slide caption' },
  ],
}
```

DB image titles are used only inside the picker UI. They are not stored in the
Lexical node, exported JSON, or exported DOM.

## Responsive Images

`SlideShowDisplayMode` uses the same responsive image hook as DB images:
`config.image.getDbImageSrcSet`. When the hook exists, the currently displayed
slide renders with a `srcSet`; when omitted, the slide renders with the plain
`src` only.

This keeps slideshow node data stable. The serialized slide still stores only:

```ts
{
  url: string
  caption: string
}
```

## HTML

- we use `div`, `figure`, `img` and `figcaption` for slideshow nodes.

```html
<div class="SlideShow__container">
  <div class="SlideShow__export_slides">
    <figure
      class="SlideShow__slide"
      itemscope
      itemtype="http://schema.org/ImageObject"
      data-slide-index="1"
    >
      <img
        src="https://example.com/one.jpg"
        alt="First slide caption"
        aria-label="First slide caption"
        class="SlideShow__image"
      />
      <figcaption class="SlideShow__caption">
        First slide caption
      </figcaption>
    </figure>
  </div>
</div>
```
