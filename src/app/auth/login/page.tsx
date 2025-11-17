import React from 'react';
import Image from 'next/image';
import TestimonialsSection from './TestimonialsSection';
import LoginSection from './LoginSection';

const Layout: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to right, #4caf50, #ff9800)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    }}>
      <div style={{
        flexGrow: 1,
        maxWidth: '50%',
        padding: '20px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <TestimonialsSection />
      </div>
      <div style={{
        flexGrow: 1,
        maxWidth: '50%',
        padding: '20px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}>
        <LoginSection />
      </div>
    </div>
  );
};

export default Layout;

