'use client'
import { Editor } from '@tiptap/react';
import { Squircle } from '@squircle-js/react';
import { Poppins } from 'next/font/google';
import { useRef, useState } from 'react';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface EditorToolbarProps {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string>;
}

const EditorToolbar = ({ editor, onImageUpload }: EditorToolbarProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  if (!editor) {
    return null;
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    editor.chain().focus().toggleHeading({ level }).run();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;

    setIsUploading(true);
    try {
      const imageUrl = await onImageUpload(file);
      editor.chain().focus().setImage({ src: imageUrl }).run();
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Squircle
      cornerRadius={16}
      cornerSmoothing={1}
      style={{
        backgroundColor: '#f5f5f5',
        padding: '8px',
        marginBottom: '16px',
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('bold') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('bold') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Gras
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('italic') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('italic') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Italique
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('underline') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('underline') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Souligné
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('strike') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('strike') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Barré
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('heading', { level: 1 }) ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => toggleHeading(1)}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('heading', { level: 1 }) ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Titre 1
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('heading', { level: 2 }) ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => toggleHeading(2)}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('heading', { level: 2 }) ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Titre 2
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('bulletList') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('bulletList') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Liste
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('orderedList') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('orderedList') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Liste numérotée
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('blockquote') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('blockquote') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Citation
        </button>
      </Squircle>

      <Squircle
        cornerRadius={8}
        cornerSmoothing={1}
        style={{
          backgroundColor: editor.isActive('codeBlock') ? '#FF7B54' : '#fff',
          cursor: 'pointer',
          padding: '4px 8px',
        }}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <button
          className={poppins.className}
          style={{
            border: 'none',
            background: 'transparent',
            color: editor.isActive('codeBlock') ? '#fff' : '#666',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Code
        </button>
      </Squircle>

      {onImageUpload && (
        <Squircle
          cornerRadius={8}
          cornerSmoothing={1}
          style={{
            backgroundColor: '#fff',
            cursor: 'pointer',
            padding: '4px 8px',
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button
            className={poppins.className}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#666',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            {isUploading ? 'Téléchargement...' : 'Image'}
          </button>
        </Squircle>
      )}
    </Squircle>
  );
};

export default EditorToolbar; 