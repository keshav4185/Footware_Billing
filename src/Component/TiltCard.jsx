import React, { useState, useRef } from 'react';

/**
 * A reusable 3D Tilt Card component that provides an interactive 
 * perspective effect based on mouse movement.
 */
const TiltCard = ({ children, className = '', maxTilt = 15, perspective = 1000, scale = 1.05 }) => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const centerX = rect.left + width / 2;
        const centerY = rect.top + height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const tiltX = (mouseY / (height / 2)) * -maxTilt;
        const tiltY = (mouseX / (width / 2)) * maxTilt;

        setTilt({ x: tiltX, y: tiltY });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`transition-transform duration-300 ease-out preserve-3d cursor-pointer ${className}`}
            style={{
                transform: `perspective(${perspective}px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? scale : 1})`,
            }}
        >
            <div className="preserve-3d">
                {children}
            </div>
        </div>
    );
};

export default TiltCard;
