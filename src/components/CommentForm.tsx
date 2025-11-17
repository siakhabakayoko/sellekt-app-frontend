'use client'
import { useForm } from 'react-hook-form';
import { Squircle } from '@squircle-js/react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface CommentFormData {
  name: string;
  email: string;
  comment: string;
}

const CommentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>();

  const onSubmit = (data: CommentFormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
    reset();
  };

  return (
    <Squircle
      cornerRadius={32}
      cornerSmoothing={1}
      style={{
        padding: '32px',
        backgroundColor: '#fff',
        boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.04)',
        marginTop: '40px',
      }}
    >
      <h3 className={poppins.className} style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>
        Laisser un commentaire
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <input
              {...register('name', { required: 'Le nom est requis' })}
              placeholder="Votre nom"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </Squircle>
          {errors.name && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <input
              {...register('email', {
                required: 'L\'email est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Adresse email invalide',
                },
              })}
              placeholder="Votre email"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
              }}
            />
          </Squircle>
          {errors.email && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.email.message}</p>
          )}
        </div>

        <div>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#f5f5f5',
              padding: '4px',
            }}
          >
            <textarea
              {...register('comment', { required: 'Le commentaire est requis' })}
              placeholder="Votre commentaire"
              className={poppins.className}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                fontSize: '16px',
                outline: 'none',
                minHeight: '120px',
                resize: 'vertical',
              }}
            />
          </Squircle>
          {errors.comment && (
            <p style={{ color: '#FF7B54', marginTop: '4px', fontSize: '14px' }}>{errors.comment.message}</p>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Squircle
            cornerRadius={16}
            cornerSmoothing={1}
            style={{
              backgroundColor: '#FF7B54',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease',
              width: 'fit-content',
            }}
          >
            <button
              type="submit"
              className={poppins.className}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Envoyer le commentaire
            </button>
          </Squircle>
        </div>
      </form>
    </Squircle>
  );
};

export default CommentForm; 