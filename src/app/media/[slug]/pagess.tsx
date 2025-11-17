'use client';

import React from 'react';
import Link from 'next/link';
import { Squircle } from '@squircle-js/react';
import { Manrope, Poppins } from 'next/font/google';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const BlogDetails = () => {
  const { slug } = useParams();

  return (
    <div className={manrope.className} style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <Header />

      <main style={{
        marginTop: '150px',
        padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 78px)',
      }}>
        <div style={{
          maxWidth: '1288.5px',
          margin: '0 auto',
        }}>
          <Squircle
            cornerRadius={32}
            cornerSmoothing={1}
            style={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '24px',
              backgroundColor: '#fff',
              boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img 
              src="https://via.placeholder.com/800x450"
              alt={slug}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '16px',
              }}
            />
          </Squircle>
          <h1 style={{
            color: '#FF7B54',
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '24px',
            textAlign: 'center',
          }}>
            {slug ? slug.replace(/-/g, ' ') : 'Loading...'}
          </h1>
          <p style={{
            color: '#666',
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 64px',
            fontFamily: poppins.style.fontFamily,
            fontWeight: '400'
          }}>
            This is the blog details page for the post titled "{slug ? slug.replace(/-/g, ' ') : 'Loading...'}".
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogDetails; 