"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Product } from "../product";

import s from "./embla.module.css";

type SliderBlockProps = {
  products: any;
  limit: number;
  setNextPage: () => void;
  page: number;
};

export const Embla: React.FC<SliderBlockProps> = ({ products, limit, setNextPage, page }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    inViewThreshold: 0.95,
  });

  const triggerFetchIfNeeded = () => {
    const canScrollNext = emblaApi?.canScrollNext();

    console.log("page", page);

    if (!canScrollNext) {
      setNextPage();
    }
  };

  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", triggerFetchIfNeeded);
  }, [emblaApi]);

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.container}>
        {products.map((product: any) => (
          <div key={product.id} className={s.slide}>
            <Product data={product} />
          </div>
        ))}

        <div className={s.spinner}></div>
      </div>
    </div>
  );
};
