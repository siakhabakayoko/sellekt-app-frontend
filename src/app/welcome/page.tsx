'use client'
import { Squircle } from '@squircle-js/react';
import Link from 'next/link';
import { Manrope, Poppins } from 'next/font/google';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

const styles = `
  .nav-link {
    color: #493657;
    text-decoration: none;
    padding: 8px 16px;
    transition: all 0.2s ease;
    font-weight: 400;
  }

  .nav-link:hover {
    color: #5a4169;
    transform: translateY(-1px);
  }

  .connect-button {
    transition: all 0.3s ease !important;
  }

  .connect-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(73, 54, 87, 0.1);
    background-color: rgba(73, 54, 87, 0.1) !important;
  }

  .logo {
    height: clamp(32px, 5vw, 40px);
    width: auto;
  }

  .hamburger {
    display: none;
    width: 40px;
    height: 40px;
    padding: 0;
    z-index: 1100;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 14px;
    width: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .hamburger-icon span {
    width: 100%;
    height: 2px;
    background: #493657;
    border-radius: 10px;
    transition: all 0.3s ease;
  }

  .hamburger.open .hamburger-icon span:first-child {
    transform: translateY(6px) rotate(45deg);
  }

  .hamburger.open .hamburger-icon span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.open .hamburger-icon span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 300px;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    padding: 80px 32px 32px;
    transition: right 0.3s ease;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    gap: 24px;
    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.1);
  }

  .mobile-menu.open {
    right: 0;
  }

  .mobile-nav-link {
    color: #493657;
    text-decoration: none;
    font-size: 18px;
    padding: 12px 0;
    border-bottom: 1px solid rgba(73, 54, 87, 0.1);
    transition: all 0.2s ease;
  }

  .mobile-nav-link:hover {
    color: #5a4169;
    padding-left: 8px;
  }

  @media (max-width: 1024px) {
    .menu-container {
      display: none !important;
    }
    
    .hamburger {
      display: block !important;
    }

    .desktop-connect-button {
      display: none !important;
    }
  }

  .hero-section {
    width: 100%;
    max-width: 1288.5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: clamp(2rem, 5vw, 4rem);
    padding: clamp(2rem, 5vh, 4rem) 0;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: #fff;
    max-width: 600px;
    flex-shrink: 0;
  }

  .hero-title {
    font-family: ${poppins.style.fontFamily};
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 900;
    line-height: 1.2;
    padding-top: 9px;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  .hero-subtitle {
    font-family: ${poppins.style.fontFamily};
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 700;
    color: #fff;
  }

  .hero-description {
    font-family: ${poppins.style.fontFamily};
    font-size: clamp(16px, 2vw, 20px);
    font-weight: 400;
    padding-top: 29px;
    opacity: 0.9;
  }

  .cta-button {
    width: clamp(140px, 30vw, 171.5px);
    height: clamp(40px, 8vw, 48px);
    background-color: #493657 !important;
    color: #fff;
    font-family: ${poppins.style.fontFamily};
    font-size: clamp(14px, 3vw, 16px);
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0px 8px 24px rgba(73, 54, 87, 0.25);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 12px 28px rgba(73, 54, 87, 0.35);
  }

  .hero-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 50%;
    position: relative;
  }

  .hero-image {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 80vh;
  }

  @media (max-width: 1280px) {
    .hero-section {
      padding: clamp(1rem, 3vh, 2rem) 0;
    }
    
    .hero-content {
      max-width: 500px;
    }
  }

  @media (max-width: 1024px) {
    .hero-section {
      flex-direction: column;
      text-align: left;
      gap: 2rem;
      padding-top: 80px;
    }

    .hero-content {
      max-width: 100%;
      align-items: flex-start;
    }

    .hero-image-container {
      max-width: 70%;
      margin: 0;
      order: 2;
    }

    .hero-image {
      max-height: 50vh;
    }

    main {
      padding-top: 0 !important;
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      gap: 1.5rem;
    }

    .hero-image-container {
      max-width: 90%;
    }

    .hero-image {
      max-height: 40vh;
    }

    .cta-button {
      width: 100%;
      max-width: 171.5px;
    }

    .hero-content {
      padding: 0 1rem;
    }

    .play-button-container {
      width: clamp(100px, 25vw, 169px);
      height: clamp(100px, 25vw, 169px);
    }

    .play-icon {
      border-width: clamp(15px, 4vw, 20px) 0 clamp(15px, 4vw, 20px) clamp(26px, 7vw, 35px);
    }
  }

  @media (max-width: 480px) {
    .hero-section {
      gap: 1.5rem;
    }

    .hero-image-container {
      max-width: 100%;
    }

    .hero-image {
      max-height: 35vh;
    }

    .hero-content {
      padding: 0;
    }
  }

  .play-button-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 169px;
    height: 169px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.25), 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(4px);
  }

  .play-button-container:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3), 0px 0px 0px 1px rgba(255, 255, 255, 0.2);
  }

  .play-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 35px;
    border-color: transparent transparent transparent #ffffff;
  }

  .video-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .video-overlay.open {
    opacity: 1;
    visibility: visible;
  }

  .video-container {
    position: relative;
    width: 90%;
    max-width: 1024px;
    aspect-ratio: 16/9;
  }

  .close-video {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    z-index: 2001;
  }

  .footer {
    padding: 64px clamp(1rem, 5vw, 78px);
    background: #fff;
  }

  .footer-container {
    max-width: 1288.5px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }

  .footer-logo-section {
    max-width: 300px;
  }

  .footer-description {
    color: #666;
    font-size: 16px;
    line-height: 1.5;
    margin-top: 24px;
  }

  .footer-heading {
    color: #FF7B54;
    font-family: ${poppins.style.fontFamily};
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }

  .footer-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .footer-menu-link {
    color: #493657;
    text-decoration: none;
    font-size: 16px;
    transition: color 0.2s ease;
  }

  .footer-menu-link:hover {
    color: #FF7B54;
  }

  .social-icons {
    display: flex;
    gap: 16px;
    margin-top: 24px;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }

  .social-icon:hover {
    transform: translateY(-2px);
  }

  .newsletter-input {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 1px solid #E5E7EB;
    border-radius: 8px;
    font-size: 16px;
    margin-bottom: 16px;
  }

  .newsletter-button {
    width: 100%;
    height: 48px;
    background-color: #78B159;
    color: white;
    border: none;
    border-radius: 8px;
    font-family: ${poppins.style.fontFamily};
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .newsletter-button:hover {
    background-color: #69A14A;
  }

  @media (max-width: 1024px) {
    .footer-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 640px) {
    .footer-container {
      grid-template-columns: 1fr;
    }

    .footer {
      padding: 40px 20px;
    }
  }

  .contact-form {
    transition: all 0.3s ease;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: #78B159;
    outline: none;
    box-shadow: 0 0 0 2px rgba(120, 177, 89, 0.1);
  }

  .contact-form button:hover {
    background-color: #69A14A;
    transform: translateY(-2px);
  }

  @media (max-width: 1024px) {
    .contact-form-container {
      grid-template-columns: 1fr !important;
    }

    .contact-illustration {
      aspect-ratio: 16/9 !important;
      max-height: 300px;
    }
  }

  @media (max-width: 640px) {
    .contact-form-grid {
      grid-template-columns: 1fr !important;
    }

    .contact-illustration {
      display: none;
    }
  }
`;

const WelcomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleVideo = () => {
    setIsVideoOpen(!isVideoOpen);
  };

  return (
    <>
      <style>{styles}</style>
      <div className={manrope.className}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px clamp(1rem, 5vw, 78px)',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          background: 'transparent',
          zIndex: 1000,
        }}>
          <Link href="/">
            <img 
              src="/images/logo-selekt.png" 
              alt="Selekt Logo"
              className="logo"
            />
          </Link>

          <nav className="menu-container" style={{
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

          <Link href="/logon" className="desktop-connect-button">
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

          <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            className={`hamburger ${isMenuOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid #493657',
              position: 'relative',
            }}
          >
            <div className="hamburger-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Squircle>

          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <Link href="#solutions" className="mobile-nav-link" onClick={toggleMenu}>
              Nos solutions
            </Link>
            <Link href="#causes" className="mobile-nav-link" onClick={toggleMenu}>
              Causes
            </Link>
            <Link href="#marche" className="mobile-nav-link" onClick={toggleMenu}>
              Marché
            </Link>
            <Link href="#medias" className="mobile-nav-link" onClick={toggleMenu}>
              Médias
            </Link>
            <Link href="#blog" className="mobile-nav-link" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="#contact" className="mobile-nav-link" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/logon" onClick={toggleMenu}>
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
                  marginTop: '16px',
                }}
              >
                SE CONNECTER
              </Squircle>
            </Link>
          </div>
        </header>

        <main style={{
          marginTop: '0',
          minHeight: '100vh',
          backgroundImage: 'url(/images/landing-header-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: 'clamp(1rem, 10vh, 40px) clamp(1rem, 5vw, 78px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <section className="hero-section">
            <div className="hero-content">
              <h3 className="hero-subtitle">
                Manger redevient un plaisir
              </h3>
              <h1 className="hero-title">
                Bienvenue<br />
                Chez Vous !
              </h1>
              <p className="hero-description">
                Commandez vos plats préférés auprès des meilleurs restaurants de Dakar.
              </p>
              <Link href="#menus">
                <Squircle
                  cornerRadius={20}
                  cornerSmoothing={1}
                  className="cta-button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '1rem',
                  }}
                >
                  VOIR LES MENUS
                </Squircle>
              </Link>
            </div>
            <div className="hero-image-container">
              <img 
                src="/images/landing-header-food.png"
                alt="Delicious Food"
                className="hero-image"
              />
              <Squircle
                cornerRadius={40}
                cornerSmoothing={1}
                className="play-button-container"
                onClick={toggleVideo}
                style={{
                  backgroundColor: 'rgba(73, 54, 87, 0.9)',
                }}
              >
                <div className="play-icon" />
              </Squircle>
            </div>
          </section>
        </main>

        <div className={`video-overlay ${isVideoOpen ? 'open' : ''}`} onClick={toggleVideo}>
          <div className="video-container" onClick={e => e.stopPropagation()}>
            <button className="close-video" onClick={toggleVideo}>×</button>
            {isVideoOpen && (
              <ReactPlayer
                url="/videos/your-video.mp4"
                width="100%"
                height="100%"
                playing={isVideoOpen}
                controls
                playsinline
                config={{
                  file: {
                    attributes: {
                      controlsList: 'nodownload'
                    }
                  }
                }}
              />
            )}
          </div>
        </div>

        <section style={{
          padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 78px)',
          background: 'linear-gradient(135deg, rgba(255, 123, 84, 0.1) 0%, rgba(120, 177, 89, 0.1) 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            maxWidth: '1288.5px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}>
            <span style={{
              color: '#FF7B54',
              fontSize: '16px',
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
            }}>
              Dites bonjour...
            </span>
            <h2 style={{
              color: '#333',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontFamily: poppins.style.fontFamily,
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '16px',
            }}>
              Nous sommes à votre écoute
            </h2>
            <p style={{
              color: '#666',
              fontSize: '16px',
              textAlign: 'center',
              maxWidth: '600px',
              marginBottom: '48px',
            }}>
              Si vous avez des questions sur nos produits ou services, notre équipe est
              prête à répondre à toutes vos questions. Alors n&apos;hésitez pas à nous
              contacter.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              width: '100%',
              maxWidth: '1000px',
              padding: 'clamp(2rem, 5vw, 3rem)',
              background: '#fff',
              borderRadius: '40px',
              boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
            }} className="contact-form-container">
              <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: '40px', overflow: 'hidden' }}>
                <img
                  src="/images/contact-illustration.png"
                  alt="Contact Illustration"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  className="contact-illustration"
                />
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }} className="contact-form">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="contact-form-grid">
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Prénom*
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Nom*
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Entreprise*
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Adresse email*
                    </label>
                    <input
                      type="email"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Fonction
                    </label>
                    <input
                      type="text"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      color: '#666',
                      fontSize: '14px',
                    }}>
                      Nombre d&apos;employés
                    </label>
                    <input
                      type="number"
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px',
                  }}>
                    Téléphone*
                  </label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <input
                      type="text"
                      value="+221"
                      readOnly
                      style={{
                        width: '80px',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                        backgroundColor: '#f9fafb',
                      }}
                    />
                    <input
                      type="tel"
                      style={{
                        flex: 1,
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: '#666',
                    fontSize: '14px',
                  }}>
                    Besoins
                  </label>
                  <textarea
                    style={{
                      width: '100%',
                      height: '120px',
                      padding: '16px',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'none',
                    }}
                  />
                </div>

                <button style={{
                  width: '100%',
                  height: '56px',
                  backgroundColor: '#78B159',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '28px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}>
                  ENVOYER
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="footer-container">
            <div className="footer-logo-section">
              <img 
                src="/images/logo-selekt.png" 
                alt="Selekt Logo"
                style={{ height: '40px', width: 'auto' }}
              />
              <p className="footer-description">
                Découvrez notre plateforme multifonction destinée aux entreprises et à leurs salariés.
              </p>
            </div>

            <div>
              <h3 className="footer-heading">Menu</h3>
              <ul className="footer-menu">
                <li><Link href="#solutions" className="footer-menu-link">Nos solutions</Link></li>
                <li><Link href="#causes" className="footer-menu-link">Causes</Link></li>
                <li><Link href="#marche" className="footer-menu-link">Marché</Link></li>
                <li><Link href="#medias" className="footer-menu-link">Médias</Link></li>
                <li><Link href="#blog" className="footer-menu-link">Blog</Link></li>
                <li><Link href="#contact" className="footer-menu-link">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="footer-heading">Suivez-Nous</h3>
              <div className="social-icons">
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={1}
                  style={{
                    backgroundColor: '#78B159',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Link href="#facebook" className="social-icon">
                    <FaFacebookF size={20} color="#fff" />
                  </Link>
                </Squircle>
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={1}
                  style={{
                    backgroundColor: '#FF7B54',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Link href="#twitter" className="social-icon">
                    <FaTwitter size={20} color="#fff" />
                  </Link>
                </Squircle>
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={1}
                  style={{
                    backgroundColor: '#FFD93D',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Link href="#instagram" className="social-icon">
                    <FaInstagram size={20} color="#fff" />
                  </Link>
                </Squircle>
                <Squircle
                  cornerRadius={12}
                  cornerSmoothing={1}
                  style={{
                    backgroundColor: '#4B2A96',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Link href="#linkedin" className="social-icon">
                    <FaLinkedinIn size={20} color="#fff" />
                  </Link>
                </Squircle>
              </div>
            </div>

            <div>
              <h3 className="footer-heading">Newsletter</h3>
              <input
                type="email"
                placeholder="Votre Email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                S'ABONNER
              </button>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #E5E7EB',
            marginTop: '48px',
            paddingTop: '24px',
            color: '#666',
            fontSize: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <p style={{ margin: 0 }}>Copyright © 2024 SELLEKT® SAS. Tous droits réservés</p>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/conditions" className="footer-menu-link">Conditions générales d&apos;utilisation et de ventes</Link>
              <Link href="/privacy" className="footer-menu-link">Politique de confidentialité</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default WelcomePage; 