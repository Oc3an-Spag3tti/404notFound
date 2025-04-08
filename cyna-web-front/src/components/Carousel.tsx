"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

const Carousel: FC = () => (
  <div className="relative w-full max-w-2xl mx-auto mt-8">
    <h2 className="text-center text-2xl font-bold mb-6 text-purple-700">
      Test Carousel
    </h2>
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      pagination={{ clickable: true }}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop={true}
      modules={[Pagination, Navigation]}
      className="relative"
    >
      <SwiperSlide className="flex items-center justify-center h-64">
        <div className="w-24 h-24 bg-red-500 rounded-full"></div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center h-64">
        <div className="w-24 h-24 bg-blue-500 rounded-full"></div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center h-64">
        <div className="w-24 h-24 bg-green-500 rounded-full"></div>
      </SwiperSlide>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 p-3 bg-purple-600 rounded-full cursor-pointer text-white z-10">
        &#8592;
      </div>
      <div className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 p-3 bg-purple-600 rounded-full cursor-pointer text-white z-10">
        &#8594;
      </div>
    </Swiper>
  </div>
);

export default Carousel;
