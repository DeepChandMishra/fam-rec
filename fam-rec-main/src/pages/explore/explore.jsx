import React, { useState } from "react";
import "./explore.scss";
import imageData from "../../assets/index";
import MarqueeCarousel from "./slider";
import HeaderComponent from "../../components/header-component/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HoverGallery from "../../components/hover/hover";

const Explore = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleMouseEnter = (index) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredIndex(null);
    }, 100); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  const isLoggedIn = false;

  const handleProtectedNavigation = (path) => {
    if (!isLoggedIn) {
      toast.error("Please login first.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else {
      navigate(path);
    }
  };

  const getHoverImages = (baseIndex) => {
    const total = imageData.images.length;
    return Array.from({ length: 6 }, (_, i) => imageData.images[(baseIndex + i) % total].src);
  };

  const collections = [
    {
      id: 1,
      title: "Celebrate Life's Milestones",
      description:
        "Explore a curated collection of wedding photographs that beautifully encapsulate the essence of matrimonial celebrations. From intimate moments to grand festivities, these images narrate stories of love, commitment, and the beginning of lifelong journeys together.",
      image: imageData.images[0].src,
      alt: imageData.images[0].alt,
    },
    {
      id: 2,
      title: "Experience the Spirit of Celebrations",
      description:
        "Explore a vibrant collection of birthday photographs capturing the joy and excitement of special celebrations. From heartfelt moments to festive gatherings, these images showcase the essence of birthdays across all ages.",
      image: imageData.images[1].src,
      alt: imageData.images[1].alt,
    },
    {
      id: 3,
      title: "Celebrate Unbreakable Bonds",
      description:
        "Immerse yourself in a vibrant collection of photographs capturing the essence of festive occasions from around the world. From colorful decorations to joyous gatherings, these images encapsulate the warmth and exuberance that define our most cherished celebrations.",
      image: imageData.images[2].src,
      alt: imageData.images[2].alt,
    },
    {
      id: 4,
      title: "Relive the Joy and Innocence of Youth",
      description:
        "Dive into a heartwarming collection of photographs that capture the essence of friendship. From spontaneous adventures to cherished gatherings, these images highlight the laughter, support, and unforgettable moments shared among friends.",
      image: imageData.images[3].src,
      alt: imageData.images[3].alt,
    },
    {
      id: 5,
      title: "Celebrate Love's Journey",
      description:
        "Step into a gallery where cherished childhood moments come alive. This collection of photographs captures the essence of growing up, highlighting the simple joys and boundless wonder that define our early years.",
      image: imageData.images[4].src,
      alt: imageData.images[4].alt,
    },
    {
      id: 7,
      title: "Embark on a Visual Journey",
      description:
        "Discover a captivating collection of travel photographs that transport you to breathtaking destinations around the globe. From serene landscapes to bustling cityscapes, these images encapsulate the essence of exploration and adventure.",
      image: imageData.images[6].src,
      alt: imageData.images[6].alt,
    },
  ];

  return (
    <>
      <MarqueeCarousel />
      <div className="photo-collections">
        {collections.map((collection, index) => (
          <div 
            className="team-member-container" 
            key={collection.id}
          >
            <div className={`team-member ${index % 2 === 0 ? "even" : "odd"}`}>
              <div 
                className="member-image"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <img src={collection.image} alt={collection.alt} />
              </div>

              <div className="member-info">
                <h2>{collection.title}</h2>
                <p>{collection.description}</p>
                <div className="section-buttons">
                  <a
                    href="#"
                    className="view-btn pink-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/memory");
                    }}
                  >
                    View in Memory &gt;
                  </a>
                  <button
                    type="button"
                    className="view-btn pink-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProtectedNavigation("/albums");
                    }}
                  >
                    View Albums &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Hover gallery overlay - covers entire container but triggered by image hover */}
            {hoveredIndex === index && (
              <div 
                className={`hover-overlay ${index % 2 === 0 ? 'even' : 'odd'}`}
              >
                <HoverGallery images={getHoverImages(index)} />
              </div>
            )}
          </div>
        ))}
      </div>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
};

export default Explore;