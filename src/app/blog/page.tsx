'use client';

import * as React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Squircle } from '@squircle-js/react';
import { Poppins } from 'next/font/google';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
} from '@tanstack/react-table';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface Author {
  id: number;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  post_type: 'text' | 'audio' | 'video';
  short_description: string;
  description: string | null;
  thumbnail: string;
  video_file: string | null;
  audio_file: string | null;
  author: Author;
  created_at: string;
  updated_at: string;
  views: number;
  comments: any[];
  likes_count: number;
  is_liked: boolean;
}

interface PostsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

const columnHelper = createColumnHelper<Post>();

export default function BlogList() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pageSize, setPageSize] = React.useState(10);

  React.useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      fetchPosts();
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status]);

  const fetchPosts = async () => {
    try {
      if (!session?.accessToken) {
        toast.error('Authentication required');
        return;
      }

      const token = (session as any)?.accessToken;
      if (!token) {
        console.error('No access token found in session');
        toast.error('Authentication token missing');
        return;
      }

      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        toast.error('Authentication failed. Please sign in again.');
        router.push('/auth/signin');
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.statusText}`);
      }

      const data: PostsResponse = await response.json();
      setPosts(data.results);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      if (!session?.user) {
        toast.error('Authentication required');
        return;
      }

      const token = (session as any)?.accessToken;
      if (!token) {
        console.error('No access token found in session');
        toast.error('Authentication token missing');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        toast.error('Authentication failed. Please sign in again.');
        router.push('/auth/signin');
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      toast.success('Post deleted successfully');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/blog/edit/${id}`);
  };

  const columns = React.useMemo(() => [
    columnHelper.accessor('title', {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1"
        >
          <span>Title</span>
          {column.getIsSorted() && (
            <span>{column.getIsSorted() === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ),
      cell: info => (
        <div className="flex items-center space-x-2">
          {info.row.original.thumbnail && (
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
              <img
                src={info.row.original.thumbnail}
                alt={info.getValue()}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-gray-900 truncate">{info.getValue()}</div>
            <div className="text-xs text-gray-500 truncate">by {info.row.original.author.username}</div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('post_type', {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1"
        >
          <span>Type</span>
          {column.getIsSorted() && (
            <span>{column.getIsSorted() === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ),
      cell: info => (
        <div className="flex flex-col">
          <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
            {info.getValue()}
          </span>
          {info.row.original.views > 0 && (
            <span className="text-xs text-gray-500 mt-1">{info.row.original.views} views</span>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('short_description', {
      header: 'Description',
      cell: info => (
        <div className="flex flex-col">
          <div className="text-sm text-gray-900 truncate max-w-[200px] sm:max-w-xs">{info.getValue()}</div>
          {info.row.original.likes_count > 0 && (
            <div className="text-xs text-gray-500 mt-1">
              {info.row.original.likes_count} likes
            </div>
          )}
        </div>
      ),
    }),
    columnHelper.accessor('created_at', {
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="flex items-center space-x-1"
        >
          <span>Created</span>
          {column.getIsSorted() && (
            <span>{column.getIsSorted() === 'asc' ? '↑' : '↓'}</span>
          )}
        </button>
      ),
      cell: info => (
        <div className="flex flex-col">
          <div className="text-sm text-gray-500">
            {new Date(info.getValue()).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            {new Date(info.getValue()).toLocaleTimeString()}
          </div>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: props => (
        <div className="flex space-x-2">
          <button
            onClick={() => props.row.original.id && handleEdit(props.row.original.id)}
            className="text-indigo-600 hover:text-indigo-900 text-sm"
          >
            Edit
          </button>
          <button
            onClick={() => props.row.original.id && handleDelete(props.row.original.id)}
            className="text-red-600 hover:text-red-900 text-sm"
          >
            Delete
          </button>
        </div>
      ),
    }),
  ], []);

  const table = useReactTable({
    data: posts,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <h1 className={`${poppins.className} text-xl sm:text-2xl font-semibold text-gray-900`}>
                Blog Posts
              </h1>
              <Squircle
                cornerRadius={16}
                cornerSmoothing={1}
                style={{
                  backgroundColor: '#FF7B54',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => router.push('/blog/create')}
                  className={`${poppins.className} px-3 sm:px-4 py-2 text-white font-medium text-sm`}
                >
                  Create New Post
                </button>
              </Squircle>
            </div>
          </div>

          <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <input
                  type="text"
                  value={globalFilter ?? ''}
                  onChange={e => setGlobalFilter(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full sm:w-64 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={pageSize}
                  onChange={e => {
                    setPageSize(Number(e.target.value));
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="w-full sm:w-auto px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                {table.getFilteredRowModel().rows.length} posts found
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                {table.getHeaderGroups().map(headerGroup => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <th
                        key={header.id}
                        className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                  className="px-2 sm:px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  {'<<'}
                </button>
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-2 sm:px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  {'<'}
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-2 sm:px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  {'>'}
                </button>
                <button
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                  className="px-2 sm:px-3 py-1 text-sm border rounded-md disabled:opacity-50 hover:bg-gray-50"
                >
                  {'>>'}
                </button>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                Page {table.getState().pagination.pageIndex + 1} of{' '}
                {table.getPageCount()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 