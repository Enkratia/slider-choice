"use client";

import React from "react";

import { Embla } from "../../components/embla/thumbnails/thumbnails";

import s from "./slider.module.scss";

const maxPage = 4;
const limit = 9;

const SliderPage = () => {
  const prevPage = React.useRef(0);
  const [page, setPage] = React.useState(1);

  const [products, setProducts] = React.useState([]);

  const skip = (page - 1) * limit;

  React.useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
      const data = await res.json();

      setProducts((o) => [...o, ...(data.products as [])]);
    };

    if (page !== prevPage.current) {
      fetchProducts();
      prevPage.current = page;
    }
  }, [page]);

  if (!products.length) {
    return;
  }

  return (
    <main>
      <section className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Slider</h1>

          {/* <Embla products={products} setNextPage={setPage} page={page} maxPage={maxPage} /> */}
          <Embla products={products} limit={limit} />
        </div>
      </section>
    </main>
  );
};

export default SliderPage;
