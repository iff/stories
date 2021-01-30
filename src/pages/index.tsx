import dynamic from "next/dynamic";
import Link from "next/link";
import styled from "styled-components";
import * as React from "react";

import { GetStaticProps } from "next";

import { Card } from "@/components/Card";
import { Content } from "@/components/Content";
import { Footer } from "@/components/Footer";

const Intro = styled.div`
  @media (min-width: 48rem) {
    margin-top: 5rem;
  }

  @media (min-width: 72rem) {
    margin-top: 4rem;
  }
`;

const Cards = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin-top: 1rem;
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
`;

const cards = {
  "amsterdam": {Card: dynamic(
    () => import(`../../content/amsterdam/card`)
  )},
  "marokko": {Card: dynamic(
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
      <Intro>
        I tend to look at the world through lenses. Sometimes the lense is a
        physical device attached to a camera revealing the following glimpses..
      </Intro>

      <Cards className="wp">
        <div className="grid">
          {Object.keys(cards).map((name) => (
            <Link href={`/${name}`}>
              <a>{React.createElement(cards[name].Card)}</a>
            </Link>
          ))}
        </div>
      </Cards>

      <Footer>2021 Yves Ineichen</Footer>
    </Content>
  );
}