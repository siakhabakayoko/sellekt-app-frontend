'use client'
import { Squircle } from '@squircle-js/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Poppins } from 'next/font/google';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EditorToolbar from '@/components/EditorToolbar';
import { useRouter } from 'next/navigation';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { toast } from 'react-hot-toast';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface BlogFormData {
  title: string;
  type: 'text' | 'audio' | 'video';
  description: string;
  thumbnail: string;
  audioUrl?: string;
  videoUrl?: string;
}

interface BlogEditorProps {
  initialData?: BlogFormData & { content?: string };
  isEdit?: boolean;
}

const BlogEditor = ({ initialData, isEdit = false }: BlogEditorProps) => {
  const router = useRouter();
  const [content, setContent] = React.useState(initialData?.content || '');
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: initialData,
  });

  const type = watch('type');

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'blog-image',
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  };

  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState<{
    title: string;
    content: string;
    type: string;
    description: string;
    thumbnail: string;
    audioUrl: string;
    videoUrl: string;
    audioFile: File | null;
    videoFile: File | null;
  }>({
    title: '',
    content: '',
    type: 'text',
    description: '',
    thumbnail: '',
    audioUrl: '',
    videoUrl: '',
    audioFile: null,
    videoFile: null,
  });

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        if (data.url) {
          setFormData((prev: typeof formData) => ({ ...prev, thumbnail: data.url }));
          toast.success('Image uploaded successfully');
        }
      } catch {
        toast.error('Failed to upload image');
      }
    }
  };

  const onAudioDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        if (data.url) {
          setFormData((prev: typeof formData) => ({ ...prev, audioUrl: data.url, audioFile: file }));
          toast.success('Audio uploaded successfully');
        }
      } catch {
        toast.error('Failed to upload audio');
      }
    }
  };

  const onVideoDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        const data = await response.json();
        if (data.url) {
          setFormData((prev: typeof formData) => ({ ...prev, videoUrl: data.url, videoFile: file }));
          toast.success('Video uploaded successfully');
        }
      } catch {
        toast.error('Failed to upload video');
      }
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    multiple: false,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined,
  };

  useDropzone({
    ...dropzoneOptions,
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  useDropzone({
    ...dropzoneOptions,
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg']
    },
    maxFiles: 1
  });

  useDropzone({
    ...dropzoneOptions,
    onDrop: onVideoDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxFiles: 1
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Blog created successfully');
        router.push('/blog');
      } else {
        toast.error('Failed to create blog');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className={poppins.className} style={{ fontSize: '32px', fontWeight: 600, marginBottom: '40px' }}>
        {isEdit ? 'Modifier le blog' : 'Créer un nouveau blog'}
      </h1>

      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <input
              {...register('title', { required: 'Le titre est requis' })}
              placeholder="Titre du blog"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </Squircle>
          {errors.title && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.title.message}</p>
          )}
        </div>

        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <select
              {...register('type', { required: 'Le type est requis' })}
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
                color: '#666',
              }}
            >
              <option value="">Sélectionner le type</option>
              <option value="text">Texte</option>
              <option value="audio">Audio</option>
              <option value="video">Vidéo</option>
            </select>
          </Squircle>
          {errors.type && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.type.message}</p>
          )}
        </div>

        {type === 'audio' && (
          <div>
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '4px',
              }}
            >
              <input
                {...register('audioUrl', { required: 'L\'URL audio est requise' })}
                placeholder="URL de l'audio"
                className={poppins.className}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
            </Squircle>
            {errors.audioUrl && (
              <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.audioUrl.message}</p>
            )}
          </div>
        )}

        {type === 'video' && (
          <div>
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '4px',
              }}
            >
              <input
                {...register('videoUrl', { required: 'L\'URL vidéo est requise' })}
                placeholder="URL de la vidéo"
                className={poppins.className}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '16px',
                  outline: 'none',
                }}
              />
            </Squircle>
            {errors.videoUrl && (
              <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.videoUrl.message}</p>
            )}
          </div>
        )}

        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <input
              {...register('thumbnail', { required: 'L\'image de couverture est requise' })}
              placeholder="URL de l'image de couverture"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </Squircle>
          {errors.thumbnail && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.thumbnail.message}</p>
          )}
        </div>

        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <textarea
              {...register('description', { required: 'La description est requise' })}
              placeholder="Description courte"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
                minHeight: '100px',
                resize: 'vertical',
              }}
            />
          </Squircle>
          {errors.description && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.description.message}</p>
          )}
        </div>

        {type === 'text' && (
          <div>
            <EditorToolbar editor={editor} onImageUpload={handleImageUpload} />
            <Squircle
              cornerRadius={16}
              cornerSmoothing={1}
              style={{
                backgroundColor: '#fff',
                padding: '16px',
                border: '1px solid #e5e7eb',
                minHeight: '300px',
              }}
            >
              <EditorContent editor={editor} />
            </Squircle>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              width: 'fit-content',
            }}
          >
            <button
              type="button"
              className={poppins.className}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                color: '#666',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={() => router.back()}
            >
              Annuler
            </button>
          </Squircle>

          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#FF7B54',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              width: 'fit-content',
            }}
          >
            <button
              type="submit"
              className={poppins.className}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </button>
          </Squircle>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor; 