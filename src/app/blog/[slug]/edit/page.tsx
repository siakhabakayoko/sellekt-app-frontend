'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogEditor from '@/app/blog/create/page';

interface BlogData {
  title: string;
  type: 'text' | 'audio' | 'video';
  description: string;
  thumbnail: string;
  audioUrl?: string;
  videoUrl?: string;
  content?: string;
}

const EditBlogPage = () => {
  const params = useParams();
  const [blogData, setBlogData] = useState<BlogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog data');
        }
        const data = await response.json();
        setBlogData(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [params.slug]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Chargement...</p>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Blog non trouvé</p>
      </div>
    );
  }

  return <BlogEditor initialData={blogData} isEdit />;
};

export default EditBlogPage; 