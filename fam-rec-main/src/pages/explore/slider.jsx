import React, { useEffect, useState, useRef } from 'react';
import Photo1 from "../../assets/photo1.png"
import Photo2 from "../../assets/photo2.png"
import Photo3 from "../../assets/photo3.png"
import Photo4 from "../../assets/photo4.png"
import Photo5 from "../../assets/photo5.png"
import Photo6 from "../../assets/photo6.png"
import Photo7 from "../../assets/photo7.png"
 
// import { desc } from 'framer-motion/client';
 
function MarqueeCarousel() {
  const Images = [
    {
        id: 1,
      image: Photo1,
        description: "hy my nam gjk"
    },
    {
        id: 2,
      image: Photo2,
        description: "hy my nam id  that gjk"
    },
    {
        id: 3,
      image: Photo3,
        description: "hy my nam id  that jhfjshfdsdfdvdsgdfgvdsgv325235235gjk"
    },
    {
        id: 4,
      image: Photo4,
            description: "hy my nam id  that jhfjshgjk"
    },
    {
        id: 5,
      image: Photo5,
            description: "Childhood is the canvas of our lives, painted with dreams and laughter."
    },
    {
        id: 7,
      image: Photo7,
            description: "hy my nam id  that jhfjshfdsdfgjk"
    }
]
 
  const [translateX, setTranslateX] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const speed = 1; // Slower speed
  const animationRef = useRef();
  const containerRef = useRef();
  const pauseTimerRef = useRef();
 
  const imageWidth = 250; // Width of each image
  const imageGap = 50; // Space between images
  const totalImageWidth = imageWidth + imageGap;
  const duplicateCount = 3; // How many times to duplicate the array for seamless loop
 
  // Create duplicated array for infinite scroll effect
  const duplicatedImages = Array(duplicateCount)
    .fill(Images)
    .flat()
    .map((img, index) => ({
      ...img,
      uniqueKey: `${img.id}-${Math.floor(index / Images.length)}-${index}`
    }));
 
  const totalWidth = duplicatedImages.length * totalImageWidth;
  const singleSetWidth = Images.length * totalImageWidth;
 
  // Smooth animation function with pause on center
  const animate = () => {
    if (!isPaused) {
      setTranslateX(prev => {
        const newValue = prev - speed;
        // Reset position when one full set has passed
        if (Math.abs(newValue) >= singleSetWidth) {
          return 0;
        }
        return newValue;
      });
 
      // Check if we should pause for center image
      const centerIndex = getCenterImageIndex();
      const imagePosition = (centerIndex * totalImageWidth) + translateX + (imageWidth / 2);
      const containerWidth = containerRef.current?.offsetWidth || 1200;
      const centerPosition = containerWidth / 2;
      const distanceFromCenter = Math.abs(imagePosition - centerPosition);
 
      // If very close to center and not already paused, pause briefly
      if (distanceFromCenter < 5 && !isPaused) {
        setIsPaused(true);
        // Clear any existing timer
        if (pauseTimerRef.current) {
          clearTimeout(pauseTimerRef.current);
        }
        // Resume after pause
        pauseTimerRef.current = setTimeout(() => {
          setIsPaused(false);
        }, 300); // Pause for 300ms when image reaches center
      }
    }
    animationRef.current = requestAnimationFrame(animate);
  };
 
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, [isPaused]);
 
  // Get center image index for highlighting
  const getCenterImageIndex = () => {
    const containerWidth = containerRef.current?.offsetWidth || 1200;
    const centerPosition = containerWidth / 2;
    const relativeCenter = centerPosition - translateX;
    const imageIndex = Math.floor(relativeCenter / totalImageWidth);
    const normalizedIndex = ((imageIndex % Images.length) + Images.length) % Images.length;
    const description = Images[normalizedIndex]?.description || '';
  
    return {
      index: normalizedIndex,
      description: description
    };
  };
  
 
  const centerIndex = getCenterImageIndex();
 
  // Check if image is in center area
  const isImageInCenter = (index) => {
    const originalIndex = index % Images.length;
    return originalIndex === centerIndex;
  };
 
  // Get image scale based on position
  const getImageScale = (index) => {
    if (!containerRef.current) return 1;
    
    const containerWidth = containerRef.current.offsetWidth;
    const imagePosition = (index * totalImageWidth) + translateX + (imageWidth / 2);
    const centerPosition = containerWidth / 2;
    const distanceFromCenter = Math.abs(imagePosition - centerPosition);
    const maxDistance = containerWidth / 2;
    
    // Scale from 0.8 to 1.2 based on distance from center
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    const scale = 1.2 - (normalizedDistance * 0.4);
    return Math.max(0.8, Math.min(1.2, scale));
  };
 
  // Get image z-index based on position to prevent overlap
  const getImageZIndex = (index) => {
    if (!containerRef.current) return 0;
    
    const containerWidth = containerRef.current.offsetWidth;
    const imagePosition = (index * totalImageWidth) + translateX + (imageWidth / 2);
    const centerPosition = containerWidth / 2;
    
    // Images to the right should be behind, images to the left in front
    return imagePosition < centerPosition ? 1 : 0;
  };
 
  return (
    <div className="marquee-carousel">
      {/* Main Carousel Container */}
      <div
        className="carousel-container"
        ref={containerRef}
        // onMouseEnter={() => setIsPaused(true)}
        // onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(${translateX}px)`,
            width: `${totalWidth}px`
          }}
        >
          {duplicatedImages.map((img, index) => {
            const scale = getImageScale(index);
            const isCenter = isImageInCenter(index);
            const zIndex = getImageZIndex(index);
            
            return (
              <div
                key={img.uniqueKey}
                className={`carousel-image ${isCenter ? 'center-image' : ''}`}
                style={{
                  transform: `scale(${scale})`,
                  width: `${imageWidth}px`,
                  marginRight: `${imageGap}px`,
                  zIndex: zIndex,
                  transition: isCenter ? 'transform 0.3s ease' : 'transform 0.2s ease'
                }}
              >
                <div className="image-wrapper">
                  <img
                    src={img.image}
                    alt={`Image ${(index % Images.length) + 1}`}
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      {/* Current Image Info */}
      <div className="current-info">
        <div className="progress-dots">
        <div className="progress-dots">
  <h5>{centerIndex.description}</h5>
</div>
        </div>
      </div>
    </div>
  );
}
 
export default MarqueeCarousel;
 
// CSS Styles
const styles = `
.marquee-carousel {
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
 
}
 
/* Add a pseudo-element for the background with B&W filter */
.marquee-carousel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('/src/assets/photo6.png') center center / cover no-repeat;
  filter: grayscale(100%) contrast(120%);
  opacity: 0.8;
  z-index: -1; /* Place behind the content */
}
 
/* Ensure all content inside stays in color */
.marquee-carousel > * {
  position: relative; /* This makes sure content stays above the pseudo-element */
}
.carousel-container {
  width: 140%;
  height: 460px; /* Adjust this to slightly more than image height */
 
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}
 
.carousel-track {
  display: flex;
  align-items: center;
  height: 100%;
  will-change: transform;
}
 
.carousel-image {
 
  flex-shrink: 0;
   height: 330px;
  transform-origin: center center;
}
 
.image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
 
.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  border-radius: 15px;
}
 
.center-image .image-wrapper {
  border: 2px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.4);
  background: rgba(255, 255, 255, 0.15);
}
 
.image-number {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
 
.current-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
  z-index: 20;
}
 
.current-number {
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}
 
.progress-dots {
 
   
  h5{
    display: flex;
   justify-content: center;
  align-items: center;
  font-size: 28px;
  font-weight: 600;
color: white;
   height: 130px;
   width: 78rem;
   background: rgba(37, 37, 37, 0.71);
   border-radius: 40px 0px 40px 0px;
  border: 3px solid white;
   
  }
 
}
 
.progress-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}
 
.progress-dot.active {
  background: white;
  transform: scale(1.3);
}
 
@media (max-width: 768px) {
  .carousel-image {
    height: 150px;
  }
  
  .carousel-container {
    height: 250px;
  }
  
  .current-number {
    font-size: 16px;
  }
}
`;
 
// Inject styles
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
 
 