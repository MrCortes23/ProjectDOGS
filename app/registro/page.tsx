"use client"

import Navbar from "@/components/navbar"
import RegisterForm from "@/components/auth/register-form"

export default function Register() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      
      <Navbar />

      <RegisterForm />

    </div>
  )
}