"use client";

import React, { useRef, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./styles.css";

// import required modules
import { Autoplay,Scrollbar } from 'swiper/modules';
import { responseCarrousel } from "@/type/Payload";
import Image from "next/image";
import { CMS_URL } from "@/lib/constant";
import { cn } from "@/lib/utils";

interface AppProps {
  data: responseCarrousel;
}

export default function App({ data }: AppProps) {
  const [isClient, setIsClient] = React.useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="my-10 min-h-fit">
      {isClient ? (
           <Swiper
           spaceBetween={10}
           autoplay={{ delay: 2500, disableOnInteraction: false,waitForTransition:true,stopOnLastSlide:true }}
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
           modules={[Scrollbar,Autoplay]}
           className=""
         >
          {data &&
            data.docs.map((item, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center mx-5 overflow-visible">
                <div className={cn(`relative w-80 h-72 overflow-visible z-${index * 10}`)}>
                  <Image
                    className="rounded-lg shadow-lg shadow-primary"
                    src={`${item.image.url}`}
                    alt={item.image.alt}
                    fill
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
}
