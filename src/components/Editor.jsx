// components/Editor.jsx
import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, Heading1, Heading2, Quote, Minus } from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 rounded-t-md">
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
        data-state={editor.isActive('bold') ? 'on' : 'off'}
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
        data-state={editor.isActive('italic') ? 'on' : 'off'}
        size="sm"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        aria-label="Toggle strikethrough"
        data-state={editor.isActive('strike') ? 'on' : 'off'}
        size="sm"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        aria-label="Toggle code"
        data-state={editor.isActive('code') ? 'on' : 'off'}
        size="sm"
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        data-state={editor.isActive('heading', { level: 1 }) ? 'on' : 'off'}
        aria-label="Toggle H1"
        size="sm"
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        data-state={editor.isActive('heading', { level: 2 }) ? 'on' : 'off'}
        aria-label="Toggle H2"
        size="sm"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6 mx-1" />

      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        data-state={editor.isActive('bulletList') ? 'on' : 'off'}
        aria-label="Toggle bullet list"
        size="sm"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        data-state={editor.isActive('orderedList') ? 'on' : 'off'}
        aria-label="Toggle ordered list"
        size="sm"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
        data-state={editor.isActive('blockquote') ? 'on' : 'off'}
        aria-label="Toggle blockquote"
        size="sm"
      >
        <Quote className="h-4 w-4" />
      </Toggle>
      <Toggle
        onPressedChange={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label="Insert horizontal rule"
        size="sm"
      >
        <Minus className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

const Editor = ({ content, onContentChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none min-h-[300px] p-4 rounded-b-md border border-t-0 border-gray-200 bg-white',
      },
    },
  });

  return (
    <div className="border border-gray-200 rounded-md">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor; 