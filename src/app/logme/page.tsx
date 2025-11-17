// pages/backgroundPage.tsx
//import { useForm } from 'react-hook-form';
'use client'
import React from 'react';
import { Squircle } from '@squircle-js/react';
import { useForm } from "react-hook-form"

interface LoginFormInputs {
    email: string;
    password: string;
  }
  
  const LoginForm: React.FC = () => {
    const { register, handleSubmit } = useForm<LoginFormInputs>();
  
    const onSubmit = (data: LoginFormInputs) => {
      console.log(data);
    };
  
    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '448px', textAlign: 'center' }}>
        <img src="/images/logo-selekt.png" alt="Logo" style={{ marginBottom: '1rem' }} />
        <h2 style={{ fontSize: '30px',fontFamily: 'Montserrat',
              fontWeight: 'light', color: '#493657', marginBottom: '1rem' }}>
          Connectez-vous pour profiter de fonctionnalités exclusives
        </h2>
        <h1 style={{ fontSize: '36px', color: '#493657', marginBottom: '2rem' }}>
          Bienvenue 👋
        </h1>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#493657' }}>Adresse Email *</label>
          <input
            type="email"
            {...register('email')}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#493657' }}>Mot de passe</label>
          <input
            type="password"
            {...register('password')}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <input type="checkbox" {...register('remember')} />
            <label style={{ marginLeft: '0.5rem', color: '#493657' }}>Se souvenir de moi</label>
          </div>
          <a href="#" style={{ color: '#493657', textDecoration: 'underline' }}>Mot de passe oublié</a>
        </div>
        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', backgroundColor: '#493657', color: '#fff', border: 'none' }}>
          SE CONNECTER
        </button>
      </form>
    );
  };
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
        paddingLeft: '36.5px', // Make space for the icon
        marginLeft: `${marginLeft / 16}rem`,
        width: `min(${width}px, calc(100% - ${marginLeft / 16}rem))`,
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
              width: '73px', 
              height: '73px',
            }} 
          />
        </div>
        <Squircle
          cornerRadius={32}
          cornerSmoothing={1}
          style={{
            display: 'flex',
            alignItems: 'center',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow effect

           // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '1.25rem',
            paddingTop: '1rem', // Extra padding to accommodate the icon

            paddingLeft: '2rem', // Extra padding to accommodate the icon
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'relative',
            transition: 'all 0.3s ease',
            width: '100%',
          }}
        >
          <div style={{ marginLeft: '1rem' }}>
            <h3 style={{
              fontFamily: 'Lato',
              fontWeight: 'bold',
              fontSize: "24px",

             // fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              color: titleColor,
              marginBottom: '0.625rem'
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: 'Lato',
              fontWeight: 500,
              fontSize: '20px', // Fixed size for description

              //fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
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
const BackgroundPage: React.FC = () => {
    return (
    //   <div style={{
    //     width: '100%',
    //     minHeight: '100vh',
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     background: 'linear-gradient(45deg, #4B2A96, #FF7B54)',
    //     //padding: 'clamp(1rem, 2vw, 1.25rem)',
    //     padding: '78px', // Set padding to 78px for all sides

    //   }}>
        <Squircle
          cornerRadius={32}
          cornerSmoothing={1}
          style={{
            //width: '100%',
            width: '1288.5px',
            height: '868px',
            minHeight: '100%',
            background: 'linear-gradient(to right, #f8e8e8, #f3d1d1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            overflow: 'visible', // Changed to visible to show icons
            margin: '78px', // Set padding to 78px for all sides

          }}
        >
          <Squircle
            cornerRadius={32}
            cornerSmoothing={1}
            style={{
              flex: '1 1 50%',
              backgroundImage: 'url(/images/background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Enhanced shadow effect
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
              overflow: 'visible', // Changed to visible to show icons
            }}
          >
            <TestimonialsSection />
          </Squircle>
          <div style={{
            flex: '1 1 50%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '92px 95px',

          }}>
          <LoginForm />

            {/* Content for the right panel */}
          </div>
        </Squircle>
    //  </div>
    );
  };
  
  export default BackgroundPage;
