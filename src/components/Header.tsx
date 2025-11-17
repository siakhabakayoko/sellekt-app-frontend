import React from 'react';
import Link from 'next/link';
import { Squircle } from '@squircle-js/react';

const Header = () => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px clamp(1rem, 5vw, 78px)',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      background: '#fff',
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}>
      <Link href="/">
        <img 
          src="/images/logo-selekt.png" 
          alt="Selekt Logo"
          className="logo"
        />
      </Link>

      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}>
        <Link href="#solutions" className="nav-link">
          Nos solutions
        </Link>
        <Link href="#causes" className="nav-link">
          Causes
        </Link>
        <Link href="#marche" className="nav-link">
          Marché
        </Link>
        <Link href="#medias" className="nav-link">
          Médias
        </Link>
        <Link href="#blog" className="nav-link">
          Blog
        </Link>
        <Link href="#contact" className="nav-link">
          Contact
        </Link>
      </nav>

      <Link href="/logon">
        <Squircle
          cornerRadius={20}
          cornerSmoothing={1}
          className="connect-button"
          style={{
            padding: '10px 24px',
            backgroundColor: 'transparent',
            color: '#493657',
            fontSize: '16px',
            fontWeight: 500,
            cursor: 'pointer',
            border: '2px solid #493657',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          SE CONNECTER
        </Squircle>
      </Link>
    </header>
  );
};

export default Header; 