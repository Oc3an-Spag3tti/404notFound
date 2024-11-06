"use client";

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

const Carousel: FC = () => (
  <div className="relative w-full max-w-lg mx-auto">
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      loop={true}
      modules={[Pagination, Navigation]}
      className="relative"
    >
      <SwiperSlide className="bg-blue-500 flex items-center justify-center h-64 text-white font-bold text-2xl">
        Slide 1
      </SwiperSlide>
      <SwiperSlide className="bg-red-500 flex items-center justify-center h-64 text-white font-bold text-2xl">
        Slide 2
      </SwiperSlide>
      <SwiperSlide className="bg-green-500 flex items-center justify-center h-64 text-white font-bold text-2xl">
        Slide 3
      </SwiperSlide>

      {/* Кастомные кнопки навигации */}
      <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-gray-700 rounded-full cursor-pointer text-white z-10">
        &#8592;
      </div>
      <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-gray-700 rounded-full cursor-pointer text-white z-10">
        &#8594;
      </div>
    </Swiper>
  </div>
);

export default Carousel;
