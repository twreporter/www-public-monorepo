## Image Nodes

- ImageNode
  - block decorator node, contain image url, caption, layout, title and source
  - render image in two modes:
    - edit mode: show layout switcher and edit dialog trigger
    - display mode: show image content only
  - supported image sources:
    - `link`: inserted from a raw image URL
    - `drag-drop`: inserted after file upload
    - `db`: inserted from an application-provided image database search


## Node Tree

- insert an image with url `https://example.com/image.jpg`, caption `This is a photo`, layout `default`, and source `link`

```
RootNode
├─ ParagraphNode
│  └─ TextNode("some text before")                    ← normal text
├─ ImageNode                                   ← block decorator node for image UI
│  ├─ imageUrl: "https://example.com/image.jpg"
│  ├─ caption: "This is a photo"
│  ├─ imageTitle: ""
│  ├─ imageSource: "link"                             ← link | drag-drop | db
│  └─ layout: "default"                               ← default | small | right
└─ ParagraphNode
   └─ TextNode("some text after")                     ← normal text
```

## Insert Image From DB

The reusable editor package does not know how to query a CMS or image database.
Consumers enable DB image insertion by passing `config.image.imageFromDb`.
When this config exists, the toolbar insert dropdown shows an `image-from-db`
button below the image link button.

```ts
type ImageFromDbItem = {
  title: string
  url: string
}

type ImageFromDbConfig = {
  pageSize?: number
  search: (params: {
    keyword: string
    page: number
    pageSize: number
    signal?: AbortSignal
  }) => Promise<{
    items: ImageFromDbItem[]
    total: number
  }>
  onError?: (error: Error) => void
}
```

Example editor config:

```ts
const config = {
  image: {
    imageFromDb: {
      pageSize: 12,
      search: async ({ keyword, page, pageSize, signal }) => {
        const result = await fetch('/api/images/search', {
          method: 'POST',
          body: JSON.stringify({ keyword, page, pageSize }),
          signal,
        })

        return result.json()
      },
      onError: (error) => {
        console.error('Image DB search failed:', error)
      },
    },
    getDbImageSrcSet: (url) => {
      return [
        `${toResizedImageUrl(url, 400)} 400w`,
        `${toResizedImageUrl(url, 800)} 800w`,
        `${toResizedImageUrl(url, 1200)} 1200w`,
        `${toResizedImageUrl(url, 2000)} 2000w`,
      ].join(', ')
    },
  },
}
```

The DB dialog provides:

- title search
- selectable image cards
- pagination
- selected image preview
- caption input
- layout selection

Confirming a DB image dispatches the normal `IMAGE_ADD_COMMAND` with:

```ts
{
  url: selectedImage.url,
  title: selectedImage.title,
  caption,
  layout,
  source: 'db',
}
```

DB images keep the same serialized node shape as other images. The node stores
only `imageUrl`, `caption`, `imageTitle`, `imageLayout`, and `imageSource`; it
does not store image sets, thumbnail URLs or database IDs.

When editing an existing DB image, the image edit trigger opens the DB selector
again instead of the URL edit dialog. The currently selected card is restored by
matching the stored `imageUrl` with the DB item `url`.

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

For CMS-backed images, `ImageDisplayMode` can add a responsive `srcSet` at render
time without changing node data. This applies to:

- `db` images selected from the DB dialog
- `drag-drop` images uploaded into the same CMS image database

Example rendered image:

```html
<img
  src="https://example.com/images/photo.jpg"
  srcset="
    https://example.com/resized-images/photo-400.webp 400w,
    https://example.com/resized-images/photo-800.webp 800w,
    https://example.com/resized-images/photo-1200.webp 1200w,
    https://example.com/resized-images/photo-2000.webp 2000w
  "
  alt="Photo caption"
  aria-label="Photo caption"
  class="Image__image"
/>
```

The responsive URL rule belongs to the consuming app through
`config.image.getDbImageSrcSet`, so the editor package remains CMS-agnostic. If
`getDbImageSrcSet` is omitted, `db` and `drag-drop` images render with their
plain `src` only.
