"use client"
import SimpleHeroCarousel from "../components/carrousel"
import MainServices from "../components/tarjetaservicio"
import Testimonial from "../components/testimonios"

export default function Home() {
  return (
    <div>
      <SimpleHeroCarousel />

      <MainServices />

      <Testimonial />
    </div>
  )
} 