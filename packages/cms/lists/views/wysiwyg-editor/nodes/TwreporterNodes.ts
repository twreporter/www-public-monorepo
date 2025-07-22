/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { OverflowNode } from '@lexical/overflow'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type { Klass, LexicalNode } from 'lexical'

const PlaygroundNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  QuoteNode,
  OverflowNode,
]

export default PlaygroundNodes
