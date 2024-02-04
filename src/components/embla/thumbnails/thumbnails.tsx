"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Product } from "../../product";

import s from "./thumbnails.module.scss";

type SliderBlockProps = {
  products: any;
  limit: number;
};

export const Embla: React.FC<SliderBlockProps> = ({ products, limit }) => {
  const isLoop = false;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
    align: "start",
    loop: isLoop,
  });

  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    align: "start",
    loop: isLoop,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  // **
  React.useEffect(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    emblaMainApi.on("select", onSelectSnap);
  }, [emblaMainApi, emblaThumbsApi]);

  // **
  const onSelectSnap = () => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    const currentSnap = emblaMainApi.selectedScrollSnap();

    setSelectedIndex(currentSnap);
    emblaThumbsApi.scrollTo(currentSnap);
  };

  const onThumbClick = (idx: number) => {
    emblaMainApi?.scrollTo(idx);
  };

  return (
    <div className={s.root}>
      <div className={s.main} ref={emblaMainRef}>
        <div className={`${s.container} ${s.mainContainer}`}>
          {products.map((product: any) => (
            <div key={product.id} className={s.mainSlide}>
              <Product data={product} />
            </div>
          ))}
        </div>
      </div>

      <div className={s.thumbs} ref={emblaThumbsRef}>
        <div className={`${s.container} ${s.thumbsContainer}`}>
          {products.map((product: any, idx: number) => (
            <div
              key={product.id}
              className={`${s.thumbsSlide} ${selectedIndex === idx ? s.thumbsSlideActive : ""}`}
              onClick={() => onThumbClick(idx)}>
              <Product data={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
