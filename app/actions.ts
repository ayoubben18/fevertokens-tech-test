"use server";

import { CryptoData } from "@/types/currencies";
import { unstable_cache } from "next/cache";

export const fetchCurrencies = unstable_cache(
  async (page: number, rowsPerPage: number, debouncedTerm: string) => {
    // set a timeout
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${page}&sparkline=false&locale=en`;
    const searchUrl = `https://api.coingecko.com/api/v3/search?query=${debouncedTerm}`;

    let data: CryptoData[];
    if (debouncedTerm.length >= 3) {
      console.log(debouncedTerm);

      const response = await fetch(searchUrl, {
        // headers: {
        //   "Content-Type": "application/json",
        // },

        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch currencies");
      }
      const body = await response.json();
      data = body?.coins;
    } else {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to fetch currencies");
      }
      data = await response.json();
    }
    return data;
  },
  ["getCurrencies"],
  {
    tags: ["getCurrencies"],
  }
);
