import dynamic from "next/dynamic";
import Link from "next/link";
import * as React from "react";
import { css, cx } from "@linaria/core";

import { GetStaticProps } from "next";

import { Card } from "@/components/Card";
import { Content } from "@/components/Content";
import { Footer } from "@/components/Footer";

const classes = {
  Intro: css`
    margin-top: 2rem;

    @media (min-width: 48rem) {
      margin-top: 3rem;
    }

    @media (min-width: 72rem) {
      margin-top: 4rem;
    }
  `, 
  Cards: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.5;

    a {
      text-decoration: none;
    }

    @media (min-width: 48rem) {
      margin-top: 5rem;
      margin-bottom: 5rem;
    }

    @media (min-width: 72rem) {
      margin-top: 7rem;
      margin-bottom: 7rem;
    }

    .grid {
      flex-wrap: wrap;
      display: flex;
      justify-content: center;
      align-items: center;
      grid-gap: 10px;
    }
  `,
};


const cards = {
  "hawaii": {Card: dynamic(
    () => import(`../../content/hawaii/card`)
  )},
  "amsterdam": {Card: dynamic(
    () => import(`../../content/amsterdam/card`)
  )},
  "marocco": {Card: dynamic(
    () => import(`../../content/marokko/card`)
  )},
  "bavona": {Card: dynamic(
    () => import(`../../content/bavona/card`)
  )},
} as const;

interface Props {
}

export default function Page(props: Props) {
  return (
    <Content>
      <div className={cx(classes.Intro)}>
        I tend to look at the world through lenses. Sometimes the lense is a
        physical device attached to a camera revealing the following glimpses..
      </div>

      <div className={cx("wp", classes.Cards)}>
        <div className="grid">
          {Object.keys(cards).map((name) => (
            <Link href={`/${name}`} key={name}>
              <a>{React.createElement(cards[name].Card, {key: name})}</a>
            </Link>
          ))}
        </div>
      </div>

      <Footer>2021 Yves Ineichen</Footer>
    </Content>
  );
}
