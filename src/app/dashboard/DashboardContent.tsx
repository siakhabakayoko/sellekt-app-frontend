'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Squircle } from '@squircle-js/react';
import Link from 'next/link';
import { Manrope, Poppins } from 'next/font/google';
import { FaSearch, FaBell, FaShoppingCart, FaUserCircle, FaBars, FaCog, FaComments } from 'react-icons/fa';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Styles
const styles = {
  welcomeText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  welcomeTextMobile: {
    display: 'none',
  },
  searchContainer: {
    width: '506px',
    height: '61px',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '54px',
    paddingTop: '17px',
    paddingBottom: '17px',
    marginLeft: '56px',
    gap: '16px',
    border: 'none',
    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.05)',
    position: 'relative',
  },
  searchContainerMobile: {
    width: '61px',
    paddingLeft: '0',
    justifyContent: 'center',
    marginLeft: '16px',
  },
  searchIcon: {
    position: 'absolute',
    left: '24px',
    color: '#78B159',
    width: '24px',
    height: '24px',
  },
  searchIconMobile: {
    position: 'static',
  },
  searchInput: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '18px',
    color: '#9CA3AF',
    fontFamily: poppins.style.fontFamily,
    fontWeight: 400,
    '&::placeholder': {
      color: '#9CA3AF',
    }
  },
  searchInputMobile: {
    display: 'none',
  },
  notificationIcon: {
    position: 'relative',
  },
  notificationIconMobile: {
    display: 'none',
  },
  identifiedButton: {
    padding: '8px clamp(12px, 2vw, 16px)',
    backgroundColor: '#493657',
    color: '#fff',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  identifiedButtonMobile: {
    padding: '8px',
  },
  identifiedText: {
    display: 'block',
  },
  identifiedTextMobile: {
    display: 'none',
  },
  menuIcon: {
    display: 'none',
  },
  menuIconMobile: {
    display: 'block',
    cursor: 'pointer',
  },
  mobileMenu: {
    position: 'fixed',
    top: '152px',
    left: 0,
    width: '100%',
    background: '#fff',
    padding: '16px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-100%)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.3s ease',
    zIndex: 999,
    display: 'none',
  },
  mobileMenuOpen: {
    transform: 'translateY(0)',
    opacity: 1,
    visibility: 'visible',
  },
  mobileMenuVisible: {
    display: 'block',
  },
};

export default function DashboardContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/logon');
    }
  }, [status, router]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className={manrope.className}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '56px clamp(1rem, 3vw, 78px)',
        background: 'transparent',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}>
          <Link href="/">
            <img 
              src="/images/logo-selekt.png" 
              alt="Selekt Logo"
              style={{ 
                width: '250.03px',
                height: 'auto'
              }}
            />
          </Link>

          <div style={isMobile ? {...styles.welcomeText, ...styles.welcomeTextMobile} : styles.welcomeText}>
            <span style={{
              color: '#133E19',
              fontSize: '36px',
              fontFamily: poppins.style.fontFamily,
              fontWeight: 700,
            }}>
              Mame Anta, Tay loy lekk ?
            </span>
          </div>

          <Squircle
            cornerRadius={30}
            cornerSmoothing={1}
            style={isMobile ? {...styles.searchContainer, ...styles.searchContainerMobile} : styles.searchContainer}
          >
            <FaSearch 
              size={24}
              style={isMobile ? {...styles.searchIcon, ...styles.searchIconMobile} : styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Recherche"
              style={isMobile ? {...styles.searchInput, ...styles.searchInputMobile} : styles.searchInput}
            />
          </Squircle>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: '54px',
          gap: '24px',
        }}>
          <div style={styles.notificationIcon}>
            <FaComments
              size={24}
              color="#133E19"
            />
            <span style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#EF4444',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
            }}>
              9+
            </span>
          </div>

          <div style={styles.notificationIcon}>
            <FaBell
              size={24}
              color="#133E19"
            />
            <span style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#EF4444',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              2
            </span>
          </div>

          <div style={styles.notificationIcon}>
            <FaShoppingCart
              size={24}
              color="#133E19"
            />
            <span style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#EF4444',
              color: '#fff',
              fontSize: '12px',
              fontWeight: '600',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              3
            </span>
          </div>

          <FaCog
            size={24}
            color="#133E19"
          />
        </div>
      </header>

      {/* Mobile Menu */}
      <div style={{
        ...styles.mobileMenu,
        ...(isMobile && styles.mobileMenuVisible),
        ...(isMobileMenuOpen && styles.mobileMenuOpen),
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            style={{
              ...styles.searchContainer,
              width: "506px",
              height: "61px",
              paddingTop: "16px",

            }}
          >
            <FaSearch 
              size={20}
              style={styles.searchIcon}
            />
            <input
              type="text"
              placeholder="Recherche"
              style={styles.searchInput}
            />
          </Squircle>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <div style={styles.notificationIcon}>
              <FaBell size={24} color="#493657" style={{ cursor: 'pointer' }} />
              <span style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#EF4444',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '600',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>3</span>
            </div>
            <div style={styles.notificationIcon}>
              <FaShoppingCart size={24} color="#493657" style={{ cursor: 'pointer' }} />
              <span style={{
                position: 'absolute',
                top: -6,
                right: -6,
                background: '#EF4444',
                color: '#fff',
                fontSize: '10px',
                fontWeight: '600',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>2</span>
            </div>
          </div>
        </div>
      </div>

      <main style={{
        marginTop: '173px',
        padding: '24px clamp(1rem, 3vw, 78px)',
        minHeight: 'calc(100vh - 173px)',
      }}>
        <h1>Dashboard</h1>
        <p>Welcome {session?.user?.name}</p>
      </main>
    </div>
  );
} 