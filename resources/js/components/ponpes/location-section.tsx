"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail } from "lucide-react"

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in")
            // Once we've added the class, we no longer need to observe this element
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate parallax effect based on section position
  const getParallaxOffset = () => {
    if (!sectionRef.current) return 0
    const rect = sectionRef.current.getBoundingClientRect()
    const sectionTop = rect.top + window.scrollY
    const relativeScroll = Math.max(0, scrollY - sectionTop + 500)
    return relativeScroll * 0.1
  }

  const parallaxOffset = getParallaxOffset()

  return (
    <section ref={sectionRef} id="lokasi" className="py-20 opacity-0 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/5 to-primary/10 -z-10"
        style={{ transform: `translateY(${parallaxOffset * 0.5}px)` }}
      ></div>
      <div className="container mx-auto px-8">
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          style={{ transform: `translateY(${parallaxOffset * -0.2}px)` }}
        >
          Lokasi Pesantren
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            className="lg:col-span-2 rounded-lg overflow-hidden shadow-md h-[400px]"
            style={{ transform: `translateY(${parallaxOffset * -0.1}px)` }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2904349099224!2d106.8269113!3d-6.2297817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3f3a3a35c01%3A0x8fcf5f3a4a0e7c9c!2sMonumen%20Nasional!5e0!3m2!1sid!2sid4v1651234567890!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Pondok Pesantren Al-Zaid"
            ></iframe>
          </div>
          <div
            className="bg-white p-6 rounded-lg shadow-md"
            style={{ transform: `translateY(${parallaxOffset * 0.1}px)` }}
          >
            <h3 className="text-xl font-bold mb-4">Informasi Kontak</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3" />
                <p>Jl. Pesantren No. 123, Kelurahan Contoh, Kecamatan Contoh, Kota Contoh, Provinsi Contoh, 12345</p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <p>(021) 1234-5678</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <p>info@pesantrenalzaid.ac.id</p>
              </div>
            </div>
            <div className="mt-6">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => window.open("https://maps.google.com", "_blank")}
              >
                Lihat di Google Maps
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
