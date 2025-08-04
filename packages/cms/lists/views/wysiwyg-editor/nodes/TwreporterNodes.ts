import { OverflowNode } from '@lexical/overflow'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type { Klass, LexicalNode } from 'lexical'
import {AutoLinkNode, LinkNode} from '@lexical/link'

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  OverflowNode,
  AutoLinkNode,
  LinkNode,
]

export default PlaygroundNodes
