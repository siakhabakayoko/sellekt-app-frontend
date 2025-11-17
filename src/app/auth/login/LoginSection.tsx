"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginSection: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[448px] p-6 bg-gradient-to-b from-[#f8e8e8] to-[#f3d1d1] rounded-lg shadow-lg">
      <div className="flex flex-col items-center mb-8">
        <div className="w-[350px] h-[56px] relative mb-8">
          <Image
            src="https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/fichier.png"
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
        <p className="text-[30px] font-montserrat font-medium text-[#493657] text-center mb-6">
          Connectez-vous pour profiter de fonctionnalités exclusives
        </p>
        <h1 className="text-[36px] font-montaga text-[#493657] text-center">
          Bienvenue 👋
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-6">
          <label className="block text-[16px] font-lato text-[#1a131e] opacity-45 mb-2">
            Adresse Email *
          </label>
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              className="w-full h-[50px] px-4 border-2 border-[#493657] rounded-md"
              placeholder="name@domainname.com"
            />
            <Image
              src="https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/check.png"
              alt="check"
              width={30}
              height={24}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[16px] font-lato font-bold text-[#000000b8] mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              className="w-full h-[50px] px-4 border-2 border-[#493657] rounded-md"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Image
                src="https://dashboard.codeparrot.ai/api/image/Z-gVI3n5m-GBkO_w/show-pas.png"
                alt="toggle password"
                width={29}
                height={29}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <input
              {...register('rememberMe')}
              type="checkbox"
              className="w-[27px] h-[27px] border rounded-md"
            />
            <label className="ml-4 text-[18px] font-lato text-[#493657]">
              Se souvenir de moi
            </label>
          </div>
          <button type="button" className="text-[16px] font-lato text-[#493657] underline">
            Mot de passe oublié
          </button>
        </div>

        <button
          type="submit"
          className="w-full h-[62px] bg-[#493657] text-white rounded-[20px] text-[18px] font-lato hover:opacity-90 transition-opacity"
        >
          SE CONNECTER
        </button>
      </form>
    </div>
  );
};

export default LoginSection;

