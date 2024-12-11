import { useMemo } from 'react';
import { useEditor as useTiptapEditor, EditorOptions } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Placeholder from '@tiptap/extension-placeholder';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history'
import { randomPostPhrases } from '@/shared/lib/randomPhrases';

export const useEditor = (options: Partial<EditorOptions>) => {
  return useTiptapEditor({
    ...options,
    extensions: useMemo(() => [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      Strike,
      History,
      Placeholder.configure({
        placeholder: randomPostPhrases(),
        emptyEditorClass: 'is-editor-empty',
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ], []),
		immediatelyRender: false,
    editorProps: {
      attributes: {
        class: '!outline-none !border-none',
      },
    },
  });
};
