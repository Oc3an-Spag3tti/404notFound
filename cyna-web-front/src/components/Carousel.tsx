"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import Image from "next/image";

const Carousel: FC = () => (
  <div className="relative w-full mx-auto bg-[#2E1F80] h-[65vh]">
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
      className="h-full"
    >
      <SwiperSlide className="flex items-center justify-center h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="https://images.freeimages.com/images/large-previews/561/usb-data-key-1183919.jpg"
            alt="Image 1"
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
            priority
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="https://images.freeimages.com/images/large-previews/561/usb-data-key-1183919.jpg"
            alt="Image 2"
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex items-center justify-center h-full">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="https://images.freeimages.com/images/large-previews/561/usb-data-key-1183919.jpg"
            alt="Image 3"
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        </div>
      </SwiperSlide>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 p-3 bg-purple-600 rounded-full cursor-pointer text-white z-10 hover:bg-purple-700 transition-colors">
        &#8592;
      </div>
      <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 p-3 bg-purple-600 rounded-full cursor-pointer text-white z-10 hover:bg-purple-700 transition-colors">
        &#8594;
      </div>
    </Swiper>
    <h2 className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white">
      New Products
    </h2>
  </div>
);

export default Carousel;
