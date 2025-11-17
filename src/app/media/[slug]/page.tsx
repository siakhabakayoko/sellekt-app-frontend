'use client'
import { Squircle } from '@squircle-js/react';
import Link from 'next/link';
import { Manrope, Poppins } from 'next/font/google';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useParams } from 'next/navigation';
import CommentForm from '@/components/CommentForm';

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

  .blog-card {
    transition: all 0.3s ease;
  }

  .blog-card:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.08), 0px 28px 36px rgba(0, 0, 0, 0.12) !important;
  }

  .blog-stats {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
  }

  .stat-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #666;
    font-size: 14px;
  }

  .stat-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(73, 54, 87, 0.1);
    border-radius: 4px;
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
`;

const BlogCard = ({ title, description, icon, category }: { title: string; description: string; icon: string; category: string }) => {
  return (
    <Squircle
      cornerRadius={32}
      cornerSmoothing={1}
      className="blog-card"
      style={{
        padding: '24px',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <Squircle
        cornerRadius={32}
        cornerSmoothing={1}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img 
          src={`https://source.unsplash.com/800x450/?${encodeURIComponent(title)}`}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '16px',
        }}>
          <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px',
              width: 'fit-content',
            }}
          >
            <Squircle
              cornerRadius={20}
              cornerSmoothing={1}
              style={{
                width: '22px',
                height: '22px',
                backgroundColor: 'rgba(73, 54, 87, 0.9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: 0,
                height: 0,
                borderStyle: 'solid',
                borderWidth: '5px 0 5px 8px',
                borderColor: 'transparent transparent transparent #ffffff',
                marginLeft: '2px',
              }} />
            </Squircle>
            <div style={{
              color: '#fff',
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: poppins.style.fontFamily,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}>
              {category}
            </div>
          </Squircle>
        </div>
      </Squircle>
      <div>
        <h3 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#493657',
          marginBottom: '8px',
        }}>
          <Link href={`/blog/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: 1.5,
        }}>
          {description}
        </p>
      </div>
      <div className="blog-stats">
        <div className="stat-item">
          <Squircle
            cornerRadius={20}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#FFFBE8',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <span className="stat-icon">112</span>
            <span>Comments</span>
          </Squircle>
        </div>
        <div className="stat-item">
          <span className="stat-icon">112</span>
          <span>Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-icon">15 min</span>
          <span>Read time</span>
        </div>
      </div>
    </Squircle>
  );
};

const BlogDetails = () => {
  const { slug } = useParams();
  const blogPosts = [
    {
      icon: '/images/weight-loss.jpg',
      title: 'Comment perdre du poids',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute...',
      category: 'Santé & Bien-être'
    },
    {
      icon: '/images/healthy-eating.jpg',
      title: 'Manger sainement sans se priver',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute...',
      category: 'Nutrition & Diét'
    },
    {
      icon: '/images/morning-routine.jpg',
      title: 'Quelques routines matinales',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute...',
      category: 'Exercices'
    }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className={manrope.className} style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
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

        <main style={{
          marginTop: '150px',
          marginLeft:'140px',
          marginRight:'140px',
          padding: 'clamp(2rem, 5vw, 4rem) clamp(1rem, 5vw, 78px)',
        }}>
          <div style={{
            maxWidth: '1288.5px',
            margin: '0 auto',
          }}>
            <h1 style={{
              color: '#FF7B54',
              fontSize: '20px',
              marginBottom: '11px',
              textAlign: 'center',
              fontFamily: manrope.style.fontFamily,
              fontWeight: 'bold'
            }}>
              06-10-2024
            </h1>
            <h2 style={{
              color: '#333',
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '11px',
              textAlign: 'center',
            }}>
              Contenus didactiques
            </h2>
            <p style={{
              color: '#666',
              fontSize: '16px',
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto 64px',
              fontFamily: poppins.style.fontFamily,
              fontWeight: '400'
            }}>
Mame Anta LO            </p>
<Squircle
        cornerRadius={90}
        cornerSmoothing={0.8}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img 
          src="/images/imagedetails.png"
          alt={'comment-perdre-du-poids'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '16px',
        }}>
        
        </div>
      </Squircle>
   
      <div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#493657',
          marginBottom: '8px',
                    marginTop: '79px',

        }}>
          <Link href={`/media/${encodeURIComponent('title'.toLowerCase().replace(/\s+/g, '-'))}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Link>
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#666',
          lineHeight: 1.5,
          marginTop:50,
        }}>
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.        </p>
      </div>
          </div>
        </main>

        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          <CommentForm />
        </div>

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

export default BlogDetails; 