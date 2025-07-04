import { useEffect, useRef, useState } from "react";
import "./Albums.scss";
import { BiSort } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import BoyWithCamera from "../../assets/image.png";
import familyPic from "../../assets/image1.jpg";
import childrens from "../../assets/image2.jpg";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";

function Albums() {
  const [activeTab, setActiveTab] = useState("Shared");

  const [albumItems, setAlbumItems] = useState([]);

  const fileInputRef = useRef(null);
  const authService = AuthService;

  // Fetch images from the API
  const getAllImages = async () => {
    try {
      const response = await authService.getAllImages();
      setAlbumItems(response.data.images);
    } catch (error) {
      console.error("Failed to fetch images:", error);
      toast.error("Failed to load images.");
    }
  };
  useEffect(() => {
    getAllImages(); 
  }, []);
  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await authService.uploadImage(formData);
        const uploadedUrl = response.data.filename || "";
        console.log("uploadedUrl", uploadedUrl);
        if (!uploadedUrl) {
          toast.error("No image URL returned from server.");
          continue;
        }
        toast.success(response.data.message || "Image uploaded successfully");
        getAllImages();
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image.");
      }
    }
  };

  return (
    <div className="album-gallery">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              We keep <strong>your</strong>
              <br />
              Best
              <br />
              Memories
              <br />
              FOREVER<span className="headingdots">•••••</span>
            </h1>
            <p>
              At FamRec, we specialize in capturing life's most precious
              <br />
              moments, transforming them into timeless works of art...
            </p>
            <button className="add-button" onClick={handleAddImageClick}>
              Add New Images to Album{" "}
              <span>
                <IoIosArrowForward />
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
              multiple
            />
          </div>

          <div className="hero-images">
            <div className="photo-gallery">
              <div className="gallery-grid">
                <div className="image-container full-span">
                  <img src={BoyWithCamera} alt="Top Image" />
                </div>
                <div className="image-container">
                  <img src={childrens} alt="Bottom Image 1" />
                </div>
                <div className="image-container">
                  <img src={familyPic} alt="Bottom Image 2" />
                </div>
                <div className="image-container middle-image">
                  <div className="span-box"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Album Tabs */}
      <div className="album-tabs">
        <div className="tab-header">
          <div className="tab-buttons">
            {["Shared", "Liked", "Private"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="sort-options">
            <span>
              <strong>
                <BiSort />
              </strong>{" "}
              Sort
            </span>
          </div>
        </div>
      </div>

      {/* Album Grid */}
      <div className="album-grid">
        {albumItems.map((item) => (
          <div key={item.id} className="album-item">
            <img src={item.filepath} alt={item.filename} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Albums;
