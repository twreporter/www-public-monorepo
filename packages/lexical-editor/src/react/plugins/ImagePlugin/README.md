## Image Nodes

- ImageNode
  - block element node, contain image wrapper data
  - the node itself does not store url / caption / layout
- ImageContentNode
  - decorator node, contain image url, caption and layout
  - render image in two modes:
    - edit mode: show layout switcher and edit dialog trigger
    - display mode: show image content only


## Node Tree

- insert an image with url `https://example.com/image.jpg`, caption `This is a photo`, and layout `default`

```
RootNode
├─ ParagraphNode
│  └─ TextNode("some text before")                    ← normal text
├─ ImageNode                                          ← custom block container
│  └─ ImageContentNode                                ← decorator node for image UI
│     ├─ imageUrl: "https://example.com/image.jpg"
│     ├─ caption: "This is a photo"
│     └─ layout: "default"                            ← default | small | right
└─ ParagraphNode
   └─ TextNode("some text after")                     ← normal text
```

## HTML

- we use `div`, `figure`, `img` and `figcaption` for image nodes.

```html
<p>some text before</p>
<div class="Image__container default">
  <div class="Image__image_block default">
    <figure itemScope itemType="http://schema.org/ImageObject">
      <img
        src="https://example.com/image.jpg"
        alt="This is a photo"
        aria-label="This is a photo"
        class="Image__image"
      />
      <figcaption class="Image__caption">
        This is a photo
      </figcaption>
    </figure>
  </div>
</div>
<p>some text after</p>
```
