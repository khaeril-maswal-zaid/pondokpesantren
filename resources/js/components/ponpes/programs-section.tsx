'use client';

import * as Icons from 'lucide-react';
import { useEffect, useRef } from 'react';

function getIconComponent(name) {
    const LucideIcon = Icons[name];
    return LucideIcon ? <LucideIcon className="text-primary h-15 w-15" /> : null;
}

export default function ProgramsSection({ programs }) {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const elements = entry.target.querySelectorAll('.slide-up');
                        elements.forEach((el, index) => {
                            setTimeout(() => {
                                el.classList.add('visible');
                            }, index * 100);
                        });
                        // Once we've added the classes, we no longer need to observe this element
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 },
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} id="program" className="py-15">
            <div className="container mx-auto px-8">
                <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Program Unggulan</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {programs.map((program, index) => (
                        <div
                            key={index}
                            className="slide-up border-primary rounded-lg border-t-4 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-4">{getIconComponent(program.icon)}</div>
                                <h3 className="mb-2 text-xl font-bold">{program.title}</h3>
                                <p className="text-gray-600">{program.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
