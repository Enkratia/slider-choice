"use client";

import React from "react";

import { Embla } from "../../components/embla";

import s from "./slider.module.css";
import { Keen } from "../../components/keen";

const limit = 8;

const SliderPage = () => {
  const [products, setProducts] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const skip = (page - 1) * limit;

  React.useEffect(() => {
    const testFunc = async () => {
      const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
      const data = await res.json();

      setProducts(data.products);
    };

    testFunc();
  }, []);

  if (products.length === 0) {
    return;
  }

  return (
    <main>
      <section className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Slider</h1>

          {/* <Embla products={products} limit={limit} /> */}
          <Keen products={products} limit={limit} />
        </div>
      </section>
    </main>
  );
};

export default SliderPage;
