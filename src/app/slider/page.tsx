"use client";

import React from "react";

import { Embla } from "../../components/embla";

import s from "./slider.module.css";
import { Keen } from "../../components/keen";

const limit = 5;

const SliderPage = () => {
  const [products, setProducts] = React.useState([]);

  const prevPage = React.useRef(0);
  const [page, setPage] = React.useState(1);

  const skip = (page - 1) * limit;

  React.useEffect(() => {
    const testFunc = async () => {
      const res = await fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`);
      const data = await res.json();

      // setProducts(data.products);
      setProducts((o) => [...o, ...(data.products as [])]);
    };

    if (page !== prevPage.current) {
      testFunc();
      prevPage.current = page;
    }
  }, [page]);

  if (products.length === 0) {
    return;
  }

  console.log(products);

  return (
    <main>
      <section className={s.root}>
        <div className={s.container}>
          <h1 className={s.title}>Slider</h1>

          <Embla
            products={products}
            limit={limit}
            // setNextPage={() => setPage((page) => page + 1)}
            setNextPage={() => console.log("hello")}
            page={page}
          />
          {/* <Keen products={products} limit={limit} /> */}
        </div>
      </section>
    </main>
  );
};

export default SliderPage;
