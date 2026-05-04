import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal component that applies animation classes when children enter the viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elements to animate
 * @param {string} props.animation - Animation class from index.css (e.g., 'fadeInUp', 'slideInLeft')
 * @param {number} props.delay - Delay in milliseconds
 * @param {string} props.className - Additional class names for the wrapper
 * @param {number} props.threshold - Intersection threshold (0 to 1)
 */
const ScrollReveal = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  className = '',
  threshold = 0.05,
  repeat = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    if (!window.IntersectionObserver) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!repeat) {
            observer.unobserve(entry.target);
          }
        } else if (repeat) {
          setIsVisible(false);
        }
      });
    }, { threshold });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, repeat, animation]);

  return (
    <div
      ref={domRef}
      className={`${className} transition-opacity duration-500 ${isVisible ? `reveal-${animation}` : 'opacity-0'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
