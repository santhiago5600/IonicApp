import {
    IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import React from "react";
import './intro.css'

import img1 from "../../theme/Assets/img1.jpg";
import img2 from "../../theme/Assets/img2.jpg";
import img3 from "../../theme/Assets/img3.jpg";

interface ContainerProps {
  onFinish: () => void;
}

const Intro: React.FC<ContainerProps> = ({onFinish}) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img src={img1} alt="..." />
        <h3>Slide 1</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} alt="" />
        <h3>Slide 2</h3>
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} alt="" />
        <h3>Slide 3</h3>
        <IonButton color={'primary'} onClick={()=>onFinish()} type="button" expand='block'>Got it</IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

export default Intro;
