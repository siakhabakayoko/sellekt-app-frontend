// // pages/backgroundPage.tsx

import React from 'react';
import { Squircle } from '@squircle-js/react';

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
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        marginLeft: `${marginLeft}px`,
        width: `${width}px`,
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        position: 'relative',
      }}>
        <div style={{ 
          position: 'absolute',
          left: '-25px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <img src={icon} alt={title} style={{ width: '73px', height: '73px' }} />
        </div>
        <div style={{ marginLeft: '40px' }}>
          <h3 style={{
            fontFamily: 'Lato',
            fontWeight: 'bold',
            fontSize: '24px',
            color: titleColor,
            marginBottom: '10px'
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: 'Lato',
            fontWeight: 500,
            fontSize: '16px',
            color: descriptionColor,
            lineHeight: '1.4'
          }}>
            {description}
          </p>
        </div>
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
        width: 291,
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
        gap: '20px',
        padding: '20px',
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
    <div style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',

      }}>
      <div style={{
        width: 'calc(100% - 150px)', // 75px margin on each side
        maxWidth: '1288.5px',
        height: 'auto',
        aspectRatio: '1288.5/868',
        position: 'relative',
        marginTop: '78px', // 78px top margin

      }}>
        <Squircle
        //   cornerRadius={10}
        //   cornerSmoothing={10}
        //   cornerRadius={24} cornerSmoothing={12.5} 
          cornerRadius={32}
            cornerSmoothing={1}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            // padding: '0 45.5px', // 45.5px margin on each side of the panels
          }}
        >
         <div style={{
            flex: 1,
            
            // margin: '0 45.5px',
            //backgroundImage: 'url(/images/Union.png)', // Set the background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <Squircle
                cornerRadius={40}
                cornerSmoothing={2}
            style={{
                flex: 1,
                // margin: '0 45.5px',
                backgroundImage: 'url(/images/Union.png)', // Set the background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
            <TestimonialsSection />

            </Squircle>

            {/* Content for the first panel */}
          </div>
          <div style={{
            flex: 1,
            margin: '0 45.5px',
            backgroundColor: '#f0f0f0',
            borderRadius: '20px',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            {/* Content for the second panel */}
          </div>
        </Squircle>
      </div>
    </div>
  );
};

export default BackgroundPage;
