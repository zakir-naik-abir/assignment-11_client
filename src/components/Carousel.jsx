
import img1 from '../../src/assets/images/banner/1.jpg'
import img2 from '../../src/assets/images/banner/2.jpg'
import img3 from '../../src/assets/images/banner/3.jpg'
import img4 from '../../src/assets/images/banner/4.jpg'
import img5 from '../../src/assets/images/banner/5.jpg'
import img6 from '../../src/assets/images/banner/6.jpg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide'

export default function Carousel() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop= {true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Slide image={img1}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img2}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img3}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img4}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img5}></Slide></SwiperSlide>
        <SwiperSlide><Slide image={img6}></Slide></SwiperSlide>
        
      </Swiper>
    </>
  );
}
