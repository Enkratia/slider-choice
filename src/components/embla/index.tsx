"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import EmblaClassNames from "embla-carousel-class-names";

import { Product } from "../product";

import s from "./embla.module.css";

type SliderBlockProps = {
  products: any;
  limit: number;
};

export const Embla: React.FC<SliderBlockProps> = ({ products, limit }) => {
  const plugins = [EmblaClassNames()];
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true }, plugins);
  const [active, setActive] = React.useState(0);

  const scrollTo = (n: number) => {
    emblaApi?.scrollTo(n);
    setActive(n);
  };

  // const dotsCount = limit - 2 + 1;

  // console.log(emblaApi?.slidesInView().length);
  // console.log(EmblaClassNames);

  const [dotsCount, setDotsCount] = React.useState(0);

  React.useEffect(() => {
    // console.log(emblaApi?.containerNode()?.querySelectorAll(".is-in-view"));
    // const slidesPerView = emblaApi?.containerNode()?.querySelectorAll(".is-in-view")?.length;
    // if (slidesPerView && slidesPerView !== dotsCount) {
    //   setDotsCount(limit - slidesPerView - 1 + 1);
    // }
    console.log(emblaApi?.scrollSnapList());
  });
  console.log(emblaApi?.rootNode()?.querySelectorAll("div >"));

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.container}>
        {products.map((product: any) => (
          <div key={product.id} className={s.slide}>
            <Product data={product} />
          </div>
        ))}
      </div>

      <div className={s.pagination}>
        {[...Array(dotsCount)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={`${s.paginationBtn} ${
              idx === active ? s.paginationBtnActive : ""
            }`}></button>
        ))}
      </div>
    </div>
  );
};
