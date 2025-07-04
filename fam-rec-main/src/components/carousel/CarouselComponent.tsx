import { IMAGES_PATH } from "../../constants/images-path";
import "./Carousel.scss";
import { Carousel } from "antd";

function CarouseComponent() {
  return (
    <Carousel effect="fade" autoplay arrows>
      <div>
        <img
          src={IMAGES_PATH.EVENT_CHILDHOOD}
          alt=""
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src={IMAGES_PATH.EVENT_BIRTHDAYS}
          alt=""
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />
      </div>
      <div>
        <img
          src={IMAGES_PATH.EVENT_FESTIVE}
          alt=""
          style={{ width: "100%", height: "450px", objectFit: "cover" }}
        />
      </div>
    </Carousel>
  );
}

export default CarouseComponent;
