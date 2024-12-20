import { randomPostPhrases } from '@/shared/helpers/randomPhrases'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import History from '@tiptap/extension-history'
import Italic from '@tiptap/extension-italic'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Strike from '@tiptap/extension-strike'
import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'
import { EditorOptions, useEditor as useTiptapEditor } from '@tiptap/react'
import { useMemo } from 'react'

export const useEditor = (options: Partial<EditorOptions>) => {
	return useTiptapEditor({
		...options,
		extensions: useMemo(
			() => [
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
			],
			[]
		),
		immediatelyRender: true,
		editorProps: {
			attributes: {
				class: '!outline-none !border-none',
			},
		},
	})
}
