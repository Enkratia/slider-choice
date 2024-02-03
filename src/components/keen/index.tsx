import React from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { Product } from "../product";

import s from "./keen.module.css";

type KeenProps = {
  products: any;
  limit: number;
};

export const Keen: React.FC<KeenProps> = ({ products, limit }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 4,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: {
          perView: 2,
        },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  let dotsCount;

  if (loaded && instanceRef.current) {
    // @ts-ignore: 'perView' is not typed?
    const perView = instanceRef.current?.options?.slides?.perView;
    dotsCount = limit - perView + 1;
  }

  return (
    <div className={s.wrapper}>
      <div ref={sliderRef} className="keen-slider">
        {products.map((product: any) => (
          <div key={product.id} className="keen-slider__slide">
            <Product data={product} />
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className={s.pagination}>
          {/* {[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => { */}

          {[...Array(dotsCount)].map((_, idx) => {
            return (
              <button
                key={idx}
                className={`${s.paginationBtn} ${
                  currentSlide === idx ? s.paginationBtnActive : ""
                }`}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}></button>
            );
          })}
        </div>
      )}
    </div>
  );
};
