## Infobox Node

- `InfoboxNode`
  - block element node
  - contains normal Lexical paragraph/text children, so toolbar formatting works
    inside the infobox

## Node Tree

Inserting a default infobox creates:

```txt
RootNode
├─ InfoboxNode
│  └─ ParagraphNode
└─ ParagraphNode
```

## Command

`INFOBOX_ADD_COMMAND` inserts an infobox at the current selection.

Default payload:

```ts
undefined
```

The command selects the inserted empty paragraph so users can directly type and
style infobox content.

`INFOBOX_REMOVE_COMMAND` removes the selected infobox.

Backspace/Delete guards prevent deleting the infobox structure from the
keyboard. Use `INFOBOX_REMOVE_COMMAND` to remove the whole infobox.

## HTML

The exported DOM includes a package-specific attribute so imports can recreate
the same node tree.

```html
<div class="Infobox__container" data-lexical-infobox="true">
  <p></p>
</div>
```
