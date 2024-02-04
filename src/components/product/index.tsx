import React from "react";

import Image from "next/image";

import s from "./product.module.scss";

type ProductProps = {
  data: any;
};

export const Product: React.FC<ProductProps> = ({ data }) => {
  return (
    <article className={s.root}>
      <div className={s.imageWrapper}>
        <Image className={s.image} alt="image" src={data.thumbnail} sizes="100vw" fill />
      </div>

      <div className={s.text}>
        <h2 className={s.title}>{data.title}</h2>
        <span className={s.price}>{`Price: $${data.price}`}</span>
        <p className={s.brand}>{`Brand: ${data.brand}`}</p>

        <button className={s.btn}>Buy</button>
      </div>
    </article>
  );
};
