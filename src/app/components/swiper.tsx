"use client"

import React,{useState,useEffect} from "react";
import { Typography, Box, Button, Container } from "@mui/material";
import Image from "next/image";
import Header from "../components/header";
import Footer from "../components/footer";
import success from "../../../public/assets/Group 34.png";
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import "./page.css"
import Swiper, {  } from 'swiper';


  const SliderComponent: React.FC = () => {
    useEffect(() => {
      const prevButton = document.querySelector('.slider__prev') as HTMLElement;
      const nextButton = document.querySelector('.slider__next') as HTMLElement;
      const mySwiper = new Swiper('.my-swiper');
  
      const handlePrevButtonClick = () => {
        mySwiper.slidePrev();
      };
  
      const handleNextButtonClick = () => {
        mySwiper.slideNext();
      };
  
      prevButton.addEventListener('click', handlePrevButtonClick);
      nextButton.addEventListener('click', handleNextButtonClick);
  
      const buttonIsEdge = () => {
        if (mySwiper.isBeginning) {
          prevButton.classList.add('is-edge');
        } else {
          prevButton.classList.remove('is-edge');
        }
        if (mySwiper.isEnd) {
          nextButton.classList.add('is-edge');
        } else {
          nextButton.classList.remove('is-edge');
        }
      };
  
      buttonIsEdge();
      mySwiper.on('slideChange', () => {
        buttonIsEdge();
      });
  
      return () => {
        // Cleanup event listeners when the component unmounts
        prevButton.removeEventListener('click', handlePrevButtonClick);
        nextButton.removeEventListener('click', handleNextButtonClick);
      };
    }, []);
  
  const slideCount = 7; // Number of slides

  const renderSlides = () => {
    const slides = [];

    for (let i = 1; i <= slideCount; i++) {
      const imgUrl = `https://takblog.site/wp-content/themes/takblog/assets/img/blanks/post19_${i}.jpg`;
      slides.push(
        <div className="swiper-slide" key={i}>
          <img src={imgUrl} alt="" />
        </div>
      );
    }

    return slides;
  };
  return (
    <div id="wrapper">
      <div className="slider">
        <div className="slider__prev"></div>
        <div className="slider__next"></div>
        <div className="swiper my-swiper">
        <div className="swiper-wrapper">{renderSlides()}</div>

          {/* Add your swiper slides here */}
        </div>
      </div>
    </div>
  );
};




const Swiper = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Header />
      <Box height="100%" margin="36px 0" padding="66px 0">
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" fontWeight="700" color="#333333">
            Movie is booked
          </Typography>
          <Image
            src={success}
            alt="Booking successful"
            style={{ margin: "16px 0" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            margin="16px 0"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
            deleniti. A, quasi dignissimos deserunt laborum quidem recusandae
            quibusdam.
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: "#5A637A", border: "1px solid #5A637A" }}
          >
            Download ticket here
          </Button>
        </Container>
      </Box>
      <Swiper navigation={true}  thumbs={{ swiper: thumbsSwiper } } modules={[Navigation]} className="mySwiper" style={{margin: "100px", height: "100px"}}>
        <SwiperSlide style={{backgroundColor: "red"}}>Slide 1</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "blue"}}>Slide 2</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "red"}}>Slide 3</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "blue"}}>Slide 4</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "red"}}>Slide 5</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "blue"}}>Slide 6</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "red"}}>Slide 7</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "blue"}}>Slide 8</SwiperSlide>
        <SwiperSlide style={{backgroundColor: "red"}}>Slide 9</SwiperSlide>
      </Swiper>
      <SliderComponent />
      <Footer />
    </>
  );
};

export default Swiper;
