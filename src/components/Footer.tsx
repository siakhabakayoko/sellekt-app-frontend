import React from 'react';
import Link from 'next/link';
import { Squircle } from '@squircle-js/react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
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
  );
};

export default Footer; 