'use client';

import { motion, useScroll } from 'framer-motion';
import { useEffect } from 'react';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        scrollYProgress.onChange((v) => {});
    }, [scrollYProgress]);

    return (
        <motion.div
            className="fixed top-0 right-0 left-0 z-50 h-0.5 origin-left bg-[#190399]"
            style={{ scaleX: scrollYProgress }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
        />
    );
}
