import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';

const TypingEffect = () => {
    const el = useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                "CS Subjects",
                "Technical Blogs",
                "Project tutorials",
                "DSA Sheet",
            ],
            loop: true,
            typeSpeed: 100,
            backSpeed: 80,
            backDelay: 1000,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return <span ref={el} className="text-orange-400 " />;
};

export default TypingEffect;
