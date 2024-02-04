"use client";

import React from "react";

import useEmblaCarousel from "embla-carousel-react";
import type { EngineType } from "../../../node_modules/embla-carousel/components/Engine";

import { Product } from "../product";

import s from "./embla.module.scss";

type SliderBlockProps = {
  products: any;
  setNextPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
  page: number;
};

export const Embla: React.FC<SliderBlockProps> = ({ products, setNextPage, maxPage, page }) => {
  const hasMoreToLoadRef = React.useRef(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    // dragFree: true,
    containScroll: "trimSnaps",
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        const copyEngineModules: (keyof EngineType)[] = ["location", "target", "scrollBody"];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  // **
  React.useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", loadMoreIfCan);
  }, [emblaApi]);

  React.useEffect(() => {
    // Задать значение именно после отрисовки
    hasMoreToLoadRef.current = page !== maxPage;
  }, [page]);

  // **
  const loadMoreIfCan = () => {
    const canScrollNext = emblaApi?.canScrollNext();

    if (!canScrollNext) {
      setNextPage((n) => {
        return n === maxPage ? n : n + 1;
      });
    }
  };

  return (
    <div className={s.root} ref={emblaRef}>
      <div className={s.container}>
        {products.map((product: any) => (
          <div key={product.id} className={s.slide}>
            <Product data={product} />
          </div>
        ))}

        {page !== maxPage && <div className={s.spinner}></div>}
      </div>
    </div>
  );
};
