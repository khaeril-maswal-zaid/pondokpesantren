'use client';

import { motion, useScroll } from 'framer-motion';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    return (
        <motion.div
            // className="fixed top-0 left-0 right-0 h-1 bg-[#F47C20] z-50 origin-left"
            className="fixed top-0 right-0 left-0 z-50 h-3 origin-left bg-[#be0000]"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
