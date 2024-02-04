"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Product } from "../product";

import s from "./embla.module.scss";

type SliderBlockProps = {
  products: any;
  limit: number;
};

export const Embla: React.FC<SliderBlockProps> = ({ products, limit }) => {
  const isLoop = false;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: isLoop,
  });

  const [activeSlide, setActiveSlide] = React.useState(0);
  const [pagBtnsCount, setPagBtnsCount] = React.useState(0);

  // **
  const onPaginationBtnClick = (idx: number) => {
    emblaApi?.scrollTo(idx);
  };

  // **
  const getPaginationBtnsCount = () => {
    const container = emblaApi?.containerNode();
    if (!container) return;

    const slide = container.firstElementChild;
    if (!slide) return;

    const containerWidth = window.getComputedStyle(container).width;
    const slideWidth = window.getComputedStyle(slide).width;

    const slidesPerView = Math.round(parseFloat(containerWidth) / parseFloat(slideWidth));
    const dotsCount = isLoop ? limit : limit - slidesPerView + 1;

    setPagBtnsCount(dotsCount);
  };

  const getSelectedScrollSnap = () => {
    const currentSlide = emblaApi?.selectedScrollSnap();

    if (typeof currentSlide === "number") {
      setActiveSlide(currentSlide);
    }
  };

  const scrollToStart = () => {
    emblaApi?.scrollTo(0);
  };

  // **
  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", getSelectedScrollSnap);
    emblaApi.on("resize", scrollToStart);
    emblaApi.on("resize", getPaginationBtnsCount);

    getPaginationBtnsCount();
  }, [emblaApi]);

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
        {[...Array(pagBtnsCount)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPaginationBtnClick(idx)}
            className={`${s.paginationBtn} ${
              idx === activeSlide ? s.paginationBtnActive : ""
            }`}></button>
        ))}
      </div>
    </div>
  );
};
