# Nodes
---

## Lexical Basic Nodes

- RootNode
- LineBreakNode
- ElementNode
- TextNode
- DecoratorNode

## Annotation Nodes

- AnnotationNode
  - inline element node, contain annotation data
- AnnotationTextNode
  - text node, contain annotation text
- AnnotationContentNode
  - element node, contain the detail info od annotation text
  - this node cannot be decorator node because it would contain child nodes, and decorator node is a leaf node


## Node Tree

- `I met Mr. Trump today` where `Mr. Trump` has annotation `he is the current USA president`

```
RootNode
└─ ParagraphNode
   ├─ TextNode("I met ")                  ← normal text
   ├─ AnnotationNode                      ← custom inline container
   │   ├─ AnnotatedTextNode("Mr. Trump")  ← highlighted text
   │   └─ AnnotationContentNode           ← decorator node for expanded content
   │       └─ ParagraphNode
   │           ├─ TextNode("he is the current ") 
   │           ├─ TextNode("USA")         ← user can make bold
   │           └─ TextNode(" president")
   └─ TextNode(" today")                  ← normal text
```

## HTML

- we use `details` & `summary` for annotation nodes.

```html
<p>
  <span>I met</span>
  <details>
    <summary>Mr. Trump</summary>
    <p>he is the current USA president</p>
  </details>
  <span>today</span>
</p>
```
