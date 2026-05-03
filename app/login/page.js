'use client'

import { Suspense } from 'react'
import LoginForm from '@/components/login/LoginForm'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}