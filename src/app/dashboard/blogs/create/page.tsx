'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { Editor } from '@tinymce/tinymce-react';

export default function CreateBlog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'text',
    description: '',
    thumbnail: '',
    audioUrl: '',
    videoUrl: '',
    audioFile: null as File | null,
    videoFile: null as File | null,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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
          setFormData(prev => ({ ...prev, thumbnail: data.url }));
          toast.success('Image uploaded successfully');
        }
      } catch (error) {
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
          setFormData(prev => ({ ...prev, audioUrl: data.url, audioFile: file }));
          toast.success('Audio uploaded successfully');
        }
      } catch (error) {
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
          setFormData(prev => ({ ...prev, videoUrl: data.url, videoFile: file }));
          toast.success('Video uploaded successfully');
        }
      } catch (error) {
        toast.error('Failed to upload video');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const { getRootProps: getAudioRootProps, getInputProps: getAudioInputProps, isDragActive: isAudioDragActive } = useDropzone({
    onDrop: onAudioDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.ogg']
    },
    maxFiles: 1
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps, isDragActive: isVideoDragActive } = useDropzone({
    onDrop: onVideoDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
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
        router.push('/dashboard/blogs');
      } else {
        toast.error('Failed to create blog');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const editorConfig = {
    height: 500,
    menubar: true,
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create New Blog</h1>
              <p className="mt-2 text-sm text-gray-600">Fill in the details below to create a new blog post</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
                    placeholder="Enter blog title"
          />
        </div>

        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <div className="border border-gray-300 rounded-md shadow-sm">
            {mounted && (
                      <Editor
                        apiKey="bmx5026050z0awzc3ovfcykrhii9mzm60htd9z6554qwmxju"
                        value={formData.description}
                        onEditorChange={(content) => {
                          setFormData({ ...formData, description: content });
                }}
                        init={editorConfig}
              />
            )}
          </div>
        </div>

        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <div className="border border-gray-300 rounded-md shadow-sm">
            {mounted && (
                      <Editor
                        apiKey="bmx5026050z0awzc3ovfcykrhii9mzm60htd9z6554qwmxju"
                        value={formData.content}
                        onEditorChange={(content) => {
                          setFormData({ ...formData, content: content });
                }}
                        init={editorConfig}
              />
            )}
          </div>
        </div>

        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
          <div
            {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${
                      isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            <input {...getInputProps()} />
            {formData.thumbnail ? (
              <div className="mt-2">
                        <img src={formData.thumbnail} alt="Cover" className="max-h-48 mx-auto rounded-md shadow-sm" />
                <p className="mt-2 text-sm text-gray-600">Click or drag to replace</p>
              </div>
            ) : (
                      <div className="space-y-2">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                <p className="text-sm text-gray-600">
                  Drag and drop an image here, or click to select
                </p>
                        <p className="text-xs text-gray-500">
                  Supports: JPG, PNG, GIF
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="text">Text</option>
            <option value="audio">Audio</option>
            <option value="video">Video</option>
          </select>
        </div>

        {formData.type === 'audio' && (
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

        {formData.type === 'video' && (
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
        )}
              </div>

              <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
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
              </div>
      </form>
          </div>
        </div>
      </div>
    </div>
  );
} 