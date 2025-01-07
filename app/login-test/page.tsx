"use client";

import { signIn } from 'next-auth/react';
import Button from '@/components/Button';

export default function LoginPage() {
  return (
    <>
      <Button type="google" buttonName="googleButton" onClick={() => signIn('google')}/>
      <Button type="kakao" buttonName="kakaoButton" onClick={() => signIn('kakao')}/>
      <Button type="naver" buttonName="naverButton" onClick={() => signIn('naver')}/>
    </>
  );
}