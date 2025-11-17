'use client'
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Squircle } from '@squircle-js/react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

// Add style block for media queries
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap');

  * {
    font-family: 'Lato', sans-serif;
  }

  .login-container {
    box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(0, 0, 0, 0.07) !important;
  }

  .testimonial-card {
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    transform: translateY(-4px);
    box-shadow: 0px 12px 28px rgba(0, 0, 0, 0.08), 0px 28px 36px rgba(0, 0, 0, 0.12) !important;
  }

  .submit-button {
    transition: all 0.3s ease !important;
  }

  .submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 12px rgba(73, 54, 87, 0.2);
    background-color: #5a4169 !important;
  }

  @media (max-width: 768px) {
    .hide-on-mobile {
      display: none !important;
    }
    .login-container {
      flex-direction: column !important;
      min-height: auto !important;
      padding: 1rem !important;
    }
    .login-form {
      padding: 1.5rem !important;
      width: 100% !important;
    }
    .form-wrapper {
      padding: 1rem !important;
      width: 100% !important;
    }
  }

  .input-field {
    width: 100%;
    height: 50px;
    padding: 0 1rem;
    padding-right: 2.5rem;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
    font-size: 1rem;
    color: #493657;
    background-color: #F8FAFC;
    outline: none;
    transition: all 0.2s ease;
  }

  .input-field:focus,
  .input-field:not(:placeholder-shown) {
    border: 2px solid #493657;
  }

  .password-field {
    font-size: 36px;
    line-height: 1;
  }

  .password-field.show-password {
    font-size: 1rem;
    line-height: normal;
  }

  .toast-success {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
    border-radius: 16px !important;
    padding: 16px !important;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.08) !important;
    color: #459F52 !important;
  }

  .toast-error {
    background: rgba(255, 255, 255, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
    border-radius: 16px !important;
    padding: 16px !important;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.08) !important;
    color: #FF4B4B !important;
  }
`;

const TestimonialCard: React.FC<{
    icon: string;
    title: string;
    description: string;
    titleColor: string;
    descriptionColor: string;
    width: number;
    marginLeft: number;
  }> = ({ icon, title, description, titleColor, descriptionColor, width, marginLeft }) => {
    return (
      <div style={{
        position: 'relative',
        paddingLeft: 'clamp(20px, 5vw, 36.5px)',
        marginLeft: `clamp(0px, 2vw, ${marginLeft / 16}rem)`,
        width: `min(${width}px, calc(100% - clamp(0px, 2vw, ${marginLeft / 16}rem)))`,
      }}>
        <div style={{ 
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 2,
        }}>
          <img 
            src={icon} 
            alt={title} 
            style={{ 
              width: 'clamp(40px, 10vw, 73px)', 
              height: 'clamp(40px, 10vw, 73px)',
            }} 
          />
        </div>
        <Squircle
          cornerRadius={32}
          cornerSmoothing={1}
          className="testimonial-card"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.08)',
            padding: 'clamp(0.5rem, 1.5vw, 1rem)',
            paddingLeft: 'clamp(1rem, 3vw, 2rem)',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            position: 'relative',
            width: '100%',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            minHeight: 'fit-content',
            height: 'auto',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            hyphens: 'auto'
          }}
        >
          <div style={{ 
            marginLeft: 'clamp(0.5rem, 1.5vw, 1rem)',
            width: '100%',
            overflow: 'visible'
          }}>
            <h3 style={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
              fontSize: '24px',
              color: titleColor,
              marginBottom: 'clamp(0.25rem, 0.5vw, 0.375rem)'
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: 'Lato',
              fontWeight: 500,
              fontSize: '16px',
              color: descriptionColor,
              lineHeight: 1.4
            }}>
              {description}
            </p>
          </div>
        </Squircle>
      </div>
    );
  };
  

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10.png',
      title: 'Salariés',
      description: 'Accédez à un large catalogue de menus venant des meilleurs restaurants de Dakar',
      titleColor: '#459f52',
      descriptionColor: '#73b77c',
      width: 350,
      marginLeft: 45.5
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-2.png',
      title: 'Entreprises',
      description: "Faites profiter d'une expérience unique à vos employés avec les avantages sociaux qu'offre notre système de crédit repas.",
      titleColor: '#493657',
      descriptionColor: 'rgba(73, 54, 87, 0.75)',
      width: 454,
      marginLeft: 88.5
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-3.png',
      title: 'Restaurants',
      description: "Augmentez votre chiffre d'affaire B2B en accédant à la seule plateforme qui réunit les professionnels de tous les secteurs.",
      titleColor: '#fcd514',
      descriptionColor: '#e5c212',
      width: 445,
      marginLeft: 45.5
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-4.png',
      title: 'Livreurs',
      description: 'Obtenez une nouvelle source de revenus avec des courses rentables et récurrentes',
      titleColor: '#ff5c14',
      descriptionColor: '#ff9262',
      width: 350,
      marginLeft: 187
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(1rem, 2vw, 1.25rem)',
      padding: 'clamp(1rem, 2vw, 1.25rem)',
      width: '100%',
      maxWidth: '100%',
    }}>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          key={index}
          {...testimonial}
        />
      ))}
    </div>
  );
};

interface LoginFormInputs {
    email: string;
    password: string;
    remember: boolean;
  }
  
  const LoginForm: React.FC = () => {
    const { register, handleSubmit, watch } = useForm<LoginFormInputs>();
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEmailValid, setIsEmailValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const router = useRouter();
  
    React.useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          setIsEmailValid(emailRegex.test(value.email || ''));
        }
      });
      return () => subscription.unsubscribe();
    }, [watch]);
  
    const onSubmit = async (data: LoginFormInputs) => {
      console.log('🚀 Starting authentication process...', { email: data.email });
      setIsLoading(true);
      
      try {
        console.log('📡 Sending authentication request...');
        const response = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password
        });
        
        console.log('✨ Auth response received:', { 
          success: !response?.error,
          error: response?.error || null,
          status: response?.status
        });

        if (response?.error) {
          console.error('❌ Authentication failed:', response.error);
          toast.error(response.error, {
            duration: 5000,
            position: 'top-right',
            className: 'toast-error'
          });
        } else {
          console.log('✅ Authentication successful!');
          toast.success('Connexion réussie !', {
            duration: 5000,
            position: 'top-right',
            className: 'toast-success'
          });
        }
        
        // Always redirect after showing toast
        console.log('🚀 Redirecting to dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);

      } catch (error) {
        console.error('💥 Unexpected error during authentication:', error);
        toast.error('Une erreur est survenue', {
          duration: 5000,
          position: 'top-right',
          className: 'toast-error'
        });
        
        // Redirect even after error
        setTimeout(() => {
          router.push('/dashboard');
        }, 1000);
      } finally {
        console.log('🏁 Authentication process completed');
        setIsLoading(false);
      }
    };
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '448px', textAlign: 'center' }}>
        <img src="/images/logo-selekt.png" alt="Logo" style={{ marginBottom: '2rem' }} />
        <h2 style={{ 
          fontSize: '1.25rem', 
          color: '#493657', 
          marginBottom: '1rem',
          fontWeight: 'normal',
          textAlign: 'center'
        }}>
          Connectez-vous pour profiter de fonctionnalités exclusives
        </h2>
        <h1 style={{ 
          fontSize: '2rem', 
          color: '#493657', 
          marginBottom: '2.5rem',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Bienvenue 👋
        </h1>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#493657',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Adresse Email *
          </label>
          <div style={{ position: 'relative' }}>
          <input
            type="email"
            {...register('email')}
              className="input-field"
              placeholder="name@domainname.com"
            />
            {isEmailValid && (
              <div style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#00D4AE',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="currentColor"/>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '0.5rem', 
            color: '#493657',
            fontSize: '1rem',
            fontWeight: '500'
          }}>
            Mot de passe
          </label>
          <div style={{ position: 'relative' }}>
          <input
              type={showPassword ? "text" : "password"}
            {...register('password')}
              className={`input-field password-field ${showPassword ? 'show-password' : ''}`}
              placeholder="Mot de passe"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                color: '#493657'
              }}
            >
              {showPassword ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
                </svg>
              )}
            </button>
          </div>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '1.5rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="checkbox" 
              {...register('remember')} 
              style={{ 
                width: '20px', 
                height: '20px',
                borderRadius: '4px',
                border: '2px solid #493657',
                marginRight: '0.5rem',
                accentColor: '#493657'
              }}
            />
            <label style={{ 
              color: '#493657',
              fontSize: '1rem',
              fontWeight: '500'
            }}>
              Se souvenir de moi
            </label>
          </div>
          <a 
            href="#" 
            style={{ 
              color: '#493657', 
              textDecoration: 'underline',
              fontSize: '1rem',
              fontWeight: '500'
            }}
          >
            Mot de passe oublié
          </a>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          style={{ 
            width: '100%',
            padding: '0.875rem',
            backgroundColor: '#493657',
            color: '#fff',
            border: 'none',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.8 : 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.5rem',
            borderRadius: '20px'
          }}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin" viewBox="0 0 24 24" width="20" height="20">
                <circle 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none" 
                  opacity="0.25" 
                />
                <path 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>CONNEXION EN COURS...</span>
            </>
          ) : (
            'SE CONNECTER'
          )}
        </button>
      </form>
    );
  };
  
  const BackgroundPage: React.FC = () => {
    return (
      <>
        <style>{styles}</style>
      <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
          background: 'linear-gradient(135deg, #459F52 0%, #4B2A96 33%, #FF7B54 66%, #FFD700 100%)',
          padding: '40px clamp(1rem, 5vw, 78px) clamp(1rem, 5vw, 78px)',
      }}>
        <Squircle
          cornerRadius={32}
          cornerSmoothing={1}
          className="login-container"
          style={{
            width: 'min(1288.5px, 100%)',
            minHeight: 'clamp(600px, 90vh, 868px)',
            background: 'linear-gradient(to right bottom, #F8F6F1, #F3E8DA)',
            boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25), 0px 0px 15px rgba(0, 0, 0, 0.07)',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Squircle
            cornerRadius={32}
              cornerSmoothing={2}
              className="hide-on-mobile"
            style={{
              flex: '1 1 50%',
                backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/images/union.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'visible',
            }}
          >
            <TestimonialsSection />
          </Squircle>
            <div className="form-wrapper" style={{
            flex: '1 1 50%',
            display: 'flex',
            justifyContent: 'center',
              alignItems: 'flex-start',
              padding: '70px clamp(1rem, 3vw, 2rem) clamp(1rem, 3vw, 2rem)',
            }}>
              <div className="login-form" style={{
                width: '100%',
                maxWidth: '448px',
                padding: 'clamp(1rem, 2vw, 2rem)',
          }}>
            <LoginForm />
              </div>
          </div>
        </Squircle>
      </div>
      </>
    );
  };
  
  export default BackgroundPage;