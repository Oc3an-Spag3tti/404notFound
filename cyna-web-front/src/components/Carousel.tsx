"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Image from "next/image";

const Carousel: FC = () => (
  <div className="relative flex items-center w-full mx-auto px-6 bg-[#2E1F80] h-[65vh]">
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
        <Image
          src="https://images.freeimages.com/images/large-previews/561/usb-data-key-1183919.jpg"
          alt="Image 1"
          width={100}
          height={100}
          className="rounded-full"
        />
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
      <h2 className="text-center text-2xl font-bold mb-6 text-purple-700">
        New Products
      </h2>
    </Swiper>
  </div>
);

export default Carousel;
