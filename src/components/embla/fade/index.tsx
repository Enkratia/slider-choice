"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";

import { Product } from "../../product";

import s from "./fade.module.scss";

type SliderBlockProps = {
  products: any;
};

// проверить, появился ли плагин
export const Embla: React.FC<SliderBlockProps> = ({ products }) => {
  const isLoop = false;
  const [prevSelected, setPrevSelected] = React.useState(-1);
  const [selected, setIsSelected] = React.useState(0);

  const [emblaRef, emblApi] = useEmblaCarousel({
    align: "start",
    loop: isLoop,
    skipSnaps: false,
  });

  const selectSlide = () => {
    if (!emblApi) return;

    const selected = emblApi.selectedScrollSnap();
    const prevSelected = emblApi.previousScrollSnap();

    setIsSelected(selected);
    setPrevSelected(prevSelected);
  };

  React.useEffect(() => {
    if (!emblApi) return;

    emblApi.internalEngine().translate.toggleActive(false);
    emblApi.on("select", selectSlide);
  }, [emblApi]);

  return (
    <div>
      <div className={s.root} ref={emblaRef}>
        <div className={s.container}>
          {products.map((product: any, idx: number) => (
            <div
              key={product.id}
              className={`${s.slide} ${idx === selected ? s.slideActiveCurr : ""} ${
                idx === prevSelected ? s.slideActivePrev : ""
              }`}>
              <Product data={product} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => emblApi?.scrollPrev()}>Prev</button>
      <button onClick={() => emblApi?.scrollNext()}>Next</button>
    </div>
  );
};
