## Embedded Code Nodes

- EmbeddedCodeNode
  - block decorator node, containing raw embedded HTML, caption and layout
  - render embedded code in two modes:
    - edit mode: show a non-executing code snapshot and open an edit dialog on click
    - display mode: show embedded content and optional caption only
  - supported layouts:
    - `default`: same content width as paragraphs
    - `fullscreen`: full window width

## Node Tree

- insert embedded code with caption `This is an embed` and layout `default`

```
RootNode
├─ ParagraphNode
│  └─ TextNode("some text before")
├─ EmbeddedCodeNode
│  ├─ embeddedCode: "<iframe src=\"https://example.com/embed\"></iframe>"
│  ├─ caption: "This is an embed"
│  └─ layout: "default"
└─ ParagraphNode
   └─ TextNode("some text after")
```

## Insert Embedded Code

The toolbar insert dropdown shows an `Embed` button before image insertion.
Clicking it opens the embedded code edit dialog with:

- `Embedded Code`
- `Caption`
- `Layout`

Confirming dispatches `EMBEDDED_CODE_ADD_COMMAND` with:

```ts
{
  embeddedCode: '<iframe src="https://example.com/embed"></iframe>',
  caption: 'This is an embed',
  layout: 'default',
}
```

The reusable editor package stores only the raw embedded code string, caption
and layout. It does not inspect third-party provider details or expose a
provider-specific config.

## HTML

Embedded code is trusted CMS-authored HTML and is rendered directly in display
mode. The plugin does not wrap the content in an iframe and does not sanitize
the HTML.

In edit mode, the plugin renders an escaped code snapshot instead of injecting
the embedded HTML. This prevents third-party scripts, global styles or
fullscreen embed layouts from breaking the editor UI while authors are editing.

```html
<div class="EmbeddedCode__container default">
  <div class="EmbeddedCode__block default">
    <div class="EmbeddedCode__content_body default">
      <div class="EmbeddedCode__html">
        <iframe src="https://example.com/embed"></iframe>
      </div>
      <div class="EmbeddedCode__caption">
        This is an embed
      </div>
    </div>
  </div>
</div>
```

After injecting the HTML, script tags are replaced with fresh script elements so
third-party embed scripts can execute. The rendered embed container also
registers a capturing `load` listener so load events from child iframe, image
and script elements are handled inside the display component.
