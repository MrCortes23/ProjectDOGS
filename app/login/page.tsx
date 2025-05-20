"use client"

import Navbar from "@/components/navbar"
import LoginForm from "@/components/auth/login-form"

export default function Login() {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300">
      
      <Navbar />

      <LoginForm />

    </div>
  )
}