## Quote Nodes

- `wwwQuoteNode`
  - block element node
  - stores `layout`, either `default` or `blockquote`
- `wwwQuoteContentNode`
  - element node for rich editable quote content
  - contains normal Lexical paragraph/text children, so toolbar formatting works
- `wwwQuoteByNode`
  - decorator node for plain-text quoteBy and edit controls
  - stores `quoteBy?: string`

## Node Tree

Inserting a default quote creates:

```txt
RootNode
├─ wwwQuoteNode
│  ├─ layout: "default"
│  ├─ wwwQuoteContentNode
│  │  └─ ParagraphNode
│  │     └─ TextNode("請直接編輯 Quote 內容")
│  └─ wwwQuoteByNode
│     └─ quoteBy: undefined
└─ ParagraphNode
```

## Command

`WWW_QUOTE_ADD_COMMAND` inserts a quote at the current selection.

Default payload:

```ts
{
  layout: 'default',
  content: '請直接編輯 Quote 內容',
  quoteBy: undefined,
}
```

The command selects the inserted default quote content so users can directly
replace or style it.

## Layouts

- `default`: gray text with indentation
- `blockquote`: gold line, centered quote content, quoteBy below

## HTML

The exported DOM includes package-specific attributes so imports can recreate
the same node tree.

```html
<figure class="wwwQuote__container default" data-lexical-www-quote="true" data-layout="default">
  <blockquote class="wwwQuote__content" data-lexical-www-quote-content="true">
    <p>請直接編輯 Quote 內容</p>
  </blockquote>
  <figcaption class="wwwQuote__by" data-lexical-www-quote-by="true"></figcaption>
</figure>
```
