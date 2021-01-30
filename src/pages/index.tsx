import dynamic from "next/dynamic";
import * as React from "react";
import styled from "styled-components";

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

const cards = [
  dynamic(
    () => import(`../../content/amsterdam/card`)
  ),
  dynamic(
    () => import(`../../content/marokko/card`)
  ),
  dynamic(
    () => import(`../../content/bavona/card`)
  ),
] as const;

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
          {cards.map((Card) => (
            <Card />
          ))}
        </div>
      </Cards>

      <Footer>2021 Yves Ineichen</Footer>
    </Content>
  );
}