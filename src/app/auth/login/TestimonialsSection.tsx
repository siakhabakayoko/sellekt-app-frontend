import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  icon: string;
  title: string;
  description: string;
  titleColor: string;
  descriptionColor: string;
  width: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  icon,
  title,
  description,
  titleColor,
  descriptionColor,
  width
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ marginRight: '-35px', zIndex: 2 }}>
        <Image src={icon} alt={title} width={73} height={73} />
      </div>
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '35px',
          padding: '20px',
          paddingLeft: '60px',
          width: `${width}px`,
        }}
      >
        <h3 style={{
          fontFamily: 'Lato',
          fontWeight: 700,
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
      width: 291
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-2.png',
      title: 'Entreprises',
      description: "Faites profiter d'une expérience unique à vos employés avec les avantages sociaux qu'offre notre système de crédit repas.",
      titleColor: '#493657',
      descriptionColor: 'rgba(73, 54, 87, 0.75)',
      width: 454
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-3.png',
      title: 'Restaurants',
      description: "Augmentez votre chiffre d'affaire B2B en accédant à la seule plateforme qui réunit les professionnels de tous les secteurs.",
      titleColor: '#fcd514',
      descriptionColor: '#e5c212',
      width: 445
    },
    {
      icon: 'https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/group-10-4.png',
      title: 'Livreurs',
      description: 'Obtenez une nouvelle source de revenus avec des courses rentables et récurrentes',
      titleColor: '#ff5c14',
      descriptionColor: '#ff9262',
      width: 350
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      minWidth: '534px',
      maxWidth: '670px',
      padding: '20px'
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

export default TestimonialsSection;

