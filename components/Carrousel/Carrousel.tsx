"use client";

import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./styles.css";

// import required modules
import { Scrollbar } from "swiper/modules";
import { responseCarrousel } from "@/type/Payload";
import Image from "next/image";
import { CMS_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";

export default function App({ data }: { data: responseCarrousel }) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div className="my-10 min-h-fit">
      {isClient ? (
        <Swiper
          spaceBetween={10}
          breakpoints={{
            576: {
              width: 576,
              slidesPerView: 1,
            },
            768: {
              width: 768,
              slidesPerView: 2,
            },
            1024: {
              width: 768,
              slidesPerView: 3,
            },
          }}
          scrollbar={{
            hide: true,
          }}
          modules={[Scrollbar]}
          className="mySwiper"
        >
          {data &&
            data.docs.map((item, index) => {
              return (
                <SwiperSlide key={index} className="swiper-slide img">
                  <div className={cn(`relative w-80 h-72 overflow-visible z-${index*10}`)}>
                  <Image
                  className="rounded-lg -skew-x-12 shadow-2xl shadow-black"
                    src={`${CMS_URL}${item.image.url}`}
                    alt={item.image.alt}
                    fill
                  />
                  </div>
                </SwiperSlide>
              );
            })}
            <SwiperSlide className="text-black">2</SwiperSlide>
            <SwiperSlide className="text-black">2</SwiperSlide>
            <SwiperSlide className="text-black">2</SwiperSlide>
            <SwiperSlide className="text-black">2</SwiperSlide>
        </Swiper>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}
