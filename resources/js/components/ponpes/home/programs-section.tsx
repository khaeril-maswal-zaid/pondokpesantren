"use client"

import { useEffect, useRef } from "react"
import { Book, Globe, Mic, Award } from "lucide-react"

const programs = [
  {
    title: "Tahfidz Al-Qur'an",
    description:
      "Program unggulan untuk menghafal Al-Qur'an dengan metode modern dan bimbingan intensif dari para hafidz berpengalaman.",
    icon: <Book className="h-10 w-10 text-primary" />,
  },
  {
    title: "Kitab Kuning",
    description:
      "Pembelajaran kitab-kitab klasik dengan metode tradisional pesantren untuk memperdalam ilmu agama Islam.",
    icon: <Award className="h-10 w-10 text-primary" />,
  },
  {
    title: "Bahasa Arab & Inggris",
    description: "Program bahasa intensif untuk membekali santri dengan kemampuan komunikasi internasional.",
    icon: <Globe className="h-10 w-10 text-primary" />,
  },
  {
    title: "Ekstrakurikuler",
    description:
      "Berbagai kegiatan pengembangan bakat dan minat santri, termasuk olahraga, seni, dan keterampilan praktis.",
    icon: <Mic className="h-10 w-10 text-primary" />,
  },
]

export default function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".slide-up")
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("visible")
              }, index * 100)
            })
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

  return (
    <section ref={sectionRef} id="program" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Program Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="slide-up bg-white rounded-lg shadow-md p-6 border-t-4 border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{program.icon}</div>
                <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
