import { CryptoData } from "@/types/currencies";
import React from "react";
import Image from "next/image";
import { CoinById } from "@/types/typeById";
import { cn } from "@/lib/utils";

type Props = {
  coin: CoinById;
};

const CoinDetailsCard = ({ coin }: Props) => {
  return (
    <section className="w-full max-w-4xl mx-auto py-8 md:py-12">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={coin.image.thumb}
              alt="Cryptocurrency Icon"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="text-2xl font-bold">{coin.name}</h1>
            <span className="text-muted-foreground text-lg font-medium">
              {coin.symbol.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Current Price
            </h3>
            <div className="text-2xl font-bold">
              ${coin.market_data.current_price["usd"].toLocaleString()}
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              24h Change
            </h3>
            <div
              className={cn(
                "text-2xl font-bold ",
                coin.market_data.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              )}
            >
              {coin.market_data.price_change_percentage_24h > 0 && "+"}
              {coin.market_data.price_change_percentage_24h.toFixed(1)}%
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Market Cap
            </h3>
            <div className="text-2xl font-bold">
              ${coin.market_data.market_cap["usd"].toLocaleString()}
            </div>
          </div>

          <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              24H High
            </h3>
            <div className="text-2xl font-bold">
              ${coin.market_data.high_24h["usd"].toLocaleString()}
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col gap-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              24H Low
            </h3>
            <div className="text-2xl font-bold">
              ${coin.market_data.low_24h["usd"]}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoinDetailsCard;
