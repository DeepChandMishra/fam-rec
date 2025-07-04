import CarouseComponent from "../../components/carousel/CarouselComponent";
import EventPage from "../../components/content/EventPage";
import FooterComponent from "../../components/footer/FooterComponent";
import HeaderComponent from "../../components/header-component/HeaderComponent";
import { IMAGES_PATH } from "../../constants/images-path";
import "./LandingPage.scss";

function LandingPage() {
  return (
    <>
      <HeaderComponent  />
      <CarouseComponent></CarouseComponent>
      <EventPage
        title="Childhood"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="LEFT"
        imagePath={IMAGES_PATH.EVENT_ONE}
      ></EventPage>
      <br />
      <EventPage
        title="Birthdays"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="RIGHT"
        imagePath={IMAGES_PATH.EVENT_TWO}
      ></EventPage>
      <br />
      <EventPage
        title="Festive"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="LEFT"
        imagePath={IMAGES_PATH.EVENT_THREE}
      ></EventPage>
      <br />
      <EventPage
        title="Marriage"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="RIGHT"
        imagePath={IMAGES_PATH.EVENT_FOUR}
      ></EventPage>
      <br />
      <EventPage
        title="Trips"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="LEFT"
        imagePath={IMAGES_PATH.EVENT_FIVE}
      ></EventPage>
      <br />
      <EventPage
        title="Friends"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore sed do eiusmod tempor incididunt ut labore"
        imageOrientation="RIGHT"
        imagePath={IMAGES_PATH.EVENT_SIX}
      ></EventPage>
      <FooterComponent></FooterComponent>
    </>
  );
}

export default LandingPage;
