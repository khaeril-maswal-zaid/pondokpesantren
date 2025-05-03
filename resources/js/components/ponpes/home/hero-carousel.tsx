'use client';

import { ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { useEffect, useState } from 'react';

const slides = [
    {
        image: '/placeholder.svg?height=800&width=1920',
        quote: 'اطلبوا العلم من المهد إلى اللحد',
        translation: 'Carilah ilmu sejak dari buaian hingga ke liang lahat',
    },
    {
        image: '/placeholder.svg?height=800&width=1920',
        quote: 'إنما الأعمال بالنيات',
        translation: 'Sesungguhnya setiap amalan tergantung pada niatnya',
    },
    {
        image: '/placeholder.svg?height=800&width=1920',
        quote: 'خير الناس أنفعهم للناس',
        translation: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya',
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image src={slide.image || '/placeholder.svg'} alt={`Slide ${index + 1}`} className="object-cover" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4 text-white">
                        <h2 className="font-arabic mb-4 text-center text-4xl md:text-5xl">{slide.quote}</h2>
                        <p className="max-w-3xl text-center text-xl md:text-2xl">{slide.translation}</p>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white transition-colors hover:bg-black/50"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 w-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
