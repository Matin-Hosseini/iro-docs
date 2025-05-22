"use client";

import "./embela.css";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";

export function Carousel() {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla h-56" ref={emblaRef}>
      <div className="embla__container h-full">
        <div className="embla__slide flex items-center justify-center  border h-full">
          Slide 1
        </div>
        <div className="embla__slide flex items-center justify-center  border h-full">
          Slide 2
        </div>
        <div className="embla__slide flex items-center justify-center  border h-full">
          Slide 3
        </div>
      </div>
    </div>
  );
}
