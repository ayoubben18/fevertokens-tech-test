import CoinDetailsCard from "@/components/CoinDetailsCard";
import PageWrapper from "@/components/PageWrapper";
import { CoinById } from "@/types/typeById";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const url = `https://api.coingecko.com/api/v3/coins/${params.id}`;
  const response = await fetch(url);
  if (!response.ok) {
    return (
      <PageWrapper>
        <h1 className=" font-bold text-4xl">404 not found</h1>
      </PageWrapper>
    );
  }
  const data: CoinById = await response.json();

  return (
    <PageWrapper>
      <CoinDetailsCard coin={data} />
    </PageWrapper>
  );
};

export default page;
