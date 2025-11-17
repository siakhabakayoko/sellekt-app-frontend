'use client'
import { Squircle } from '@squircle-js/react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Poppins } from 'next/font/google';
import React from 'react';
import { useForm } from 'react-hook-form';
import EditorToolbar from '@/components/EditorToolbar';
import { useRouter } from 'next/navigation';
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';

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
  audioFile: File;
  videoFile: File;
}

interface BlogEditorProps {
  initialData?: BlogFormData & { content?: string };
  isEdit?: boolean;
}

const BlogEditor = ({ initialData, isEdit = false }: BlogEditorProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [content, setContent] = React.useState(initialData?.content || '');
  const [loading, setLoading] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    defaultValues: initialData,
  });

  const type = watch('type');

  const onSubmit = async (formValues: BlogFormData) => {
    setLoading(true);

    try {
      if (status === 'unauthenticated') {
        toast.error('Please log in to create a blog post');
        router.push('/logon');
        return;
      }

      const token = (session as any)?.accessToken;
      if (!token) {
        toast.error('Authentication required. Please log in to create a blog post.');
        return;
      }

      // Validate files based on post type
      if (formValues.type === 'video' && !formData.videoFile) {
        toast.error('Video file is required for video type posts');
        setLoading(false);
        return;
      }

      if (formValues.type === 'audio' && !formData.audioFile) {
        toast.error('Audio file is required for audio type posts');
        setLoading(false);
        return;
      }

      // Generate slug from title
      const slug = formValues.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Create FormData with proper file handling
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('title', formValues.title);
      formDataToSend.append('slug', slug);
      formDataToSend.append('post_type', formValues.type);
      formDataToSend.append('short_description', formValues.description);
      formDataToSend.append('description', content);

      // Add thumbnail if exists
      if (formData.thumbnail) {
        const thumbnailBlob = await fetch(formData.thumbnail).then(r => r.blob());
        formDataToSend.append('thumbnail', thumbnailBlob, 'thumbnail.jpg');
      }

      // Add video file for video type posts
      if (formValues.type === 'video') {
        formDataToSend.append('video_file', formData.videoFile, formData.videoFile.name);
      }

      // Add audio file for audio type posts
      if (formValues.type === 'audio') {
        formDataToSend.append('audio_file', formData.audioFile, formData.audioFile.name);
      }

      // Alert post data for debugging
      // alert('Post Data: ' + JSON.stringify({
      //   title: formValues.title,
      //   slug: slug,
      //   post_type: formValues.type,
      //   short_description: formValues.description,
      //   description: content,
      //   has_thumbnail: !!formData.thumbnail,
      //   has_video: formValues.type === 'video' && !!formData.videoFile,
      //   has_audio: formValues.type === 'audio' && !!formData.audioFile
      // }, null, 2));

      toast.loading('Creating your blog post...', { id: 'create-blog' });

      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Blog post created successfully! Redirecting...', { id: 'create-blog' });
        setTimeout(() => {
          router.push('/blog');
        }, 2000);
      } else {
        const errorMessage = data.message || data.detail || 'Failed to create blog post';
        toast.error(`Error: ${errorMessage}`, { id: 'create-blog' });
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('An unexpected error occurred. Please try again later.', { id: 'create-blog' });
    } finally {
      setLoading(false);
    }
  };

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
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const onAudioDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file type
      const validTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please upload a valid audio file (MP3, WAV, or OGG)');
        return;
      }

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

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
  });

  const dropzoneOptions: DropzoneOptions = {
    multiple: false,
    onDragEnter: () => {},
    onDragOver: () => {},
    onDragLeave: () => {},
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
      'audio/mpeg': ['.mp3'],
      'audio/mp3': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg']
    },
    maxFiles: 1
  });

  const { getRootProps: getThumbnailRootProps, getInputProps: getThumbnailInputProps, isDragActive: isThumbnailDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps, isDragActive: isAudioDragActive } = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'audio/mp3': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/ogg': ['.ogg']
    },
    maxFiles: 1
  });

  const editorConfig = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 className={poppins.className} style={{ fontSize: '32px', fontWeight: 600, marginBottom: '40px' }}>
        {isEdit ? 'Modifier le blog' : 'Créer un nouveau blog'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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
              name="type"
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

        {type === 'video' && (
          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video File</label>
              <div
                {...getVideoRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                  isVideoDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <input {...getVideoInputProps()} />
                {formData.videoUrl ? (
                  <div className="mt-2">
                    <video
                      ref={videoRef}
                      controls
                      className="w-full rounded-md shadow-sm"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                      src={formData.videoUrl}
                    />
                    <p className="mt-2 text-sm text-gray-600">Click or drag to replace</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-600">
                      Drag and drop a video file here, or click to select
                    </p>
                    <p className="text-xs text-gray-500">
                      Supports: MP4, WebM, OGG
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {type === 'audio' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Audio File</label>
            <div
              {...getAudioRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                isAudioDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <input {...getAudioInputProps()} />
              {formData.audioUrl ? (
                <div className="mt-2">
                  <audio
                    ref={audioRef}
                    controls
                    className="w-full"
                    src={formData.audioUrl}
                  />
                  <p className="mt-2 text-sm text-gray-600">Click or drag to replace</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p className="text-sm text-gray-600">
                    Drag and drop an audio file here, or click to select
                  </p>
                  <p className="text-xs text-gray-500">
                    Supports: MP3, WAV, OGG
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
          <div
            {...getThumbnailRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
              isThumbnailDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input {...getThumbnailInputProps()} />
            {formData.thumbnail ? (
              <div className="relative">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  className="mx-auto"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFormData(prev => ({ ...prev, thumbnail: '' }));
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Drag and drop an image here, or click to select</p>
                <p className="text-sm text-gray-400 mt-1">Supports: JPG, PNG, GIF</p>
              </div>
            )}
          </div>
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
              name="description"
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
            <TinyMCEEditor
              apiKey="bmx5026050z0awzc3ovfcykrhii9mzm60htd9z6554qwmxju"
              init={editorConfig}
              value={content}
              onEditorChange={(content) => {
                setContent(content);
              }}
            />
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