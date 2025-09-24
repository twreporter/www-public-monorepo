import { createCommand } from 'lexical';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, type LexicalEditor } from 'lexical';
import { AnnotationNode } from './nodes/AnnotationNode';
import { AnnotatedTextNode } from './nodes/AnnotationTextNode';
import { AnnotationContentNode } from './nodes/AnnotationContentNode';

export const ANNOTATION_ADD_COMMAND = createCommand('ADD_ANNOTATION');

export function registerAnnotationPlugin(editor: LexicalEditor) {
  const unregister = editor.registerCommand(
    ANNOTATION_ADD_COMMAND,
    () => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const selectedText = selection.getTextContent();
        const annotatedTextNode = new AnnotatedTextNode(selectedText);
        const annotationContentNode = new AnnotationContentNode('');

        const annotationNode = new AnnotationNode(false);
        annotationNode.append(annotatedTextNode);
        annotationNode.append(annotationContentNode);

        selection.insertNodes([annotationNode]);
      }
      return true;
    },
    COMMAND_PRIORITY_EDITOR,
  );

  return unregister
}