import { useMotionValue } from "framer-motion";
import { useContext, useEffect } from "react";

import ModelsContext from "./ModelsContext";

export default function useWrapperScroll() {

    const { wrapperRef } = useContext(ModelsContext);

    const scrollY = useMotionValue<number>(0);
    const scrollYProgress = useMotionValue<number>(0);

    useEffect(() => {
        const element = wrapperRef.current;

        if (element) {
            const updateScrollValue = () => {
                const { scrollTop, scrollHeight, offsetHeight } = element;
                const fullScroll = scrollHeight - offsetHeight;
                scrollY.set(scrollTop); // px
                scrollYProgress.set(scrollTop / fullScroll); // %
            };

            element.addEventListener('scroll', updateScrollValue);

            return () => element.removeEventListener('scroll', updateScrollValue);
        }
    }, [scrollY, scrollYProgress, wrapperRef]);

    return { scrollY, scrollYProgress };
}