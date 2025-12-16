import React, { useEffect, useRef, useState, Suspense } from "react";

const Footer = React.lazy(() => import("./Footer"));

const LazyFooter = () => {
    const [shouldLoad, setShouldLoad] = useState(false);
    const triggerRef = useRef(null);

    useEffect(() => {
        
        if (!triggerRef.current || shouldLoad) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: "0px 0px 200px 0px",
                threshold: 0.1,
            }
        );

        observer.observe(triggerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [shouldLoad]);

    return (
        <div ref={triggerRef}>
            {shouldLoad && (
                <Suspense fallback={null}>
                    <Footer />
                </Suspense>
            )}
        </div>
    );
};

export default LazyFooter;

