"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSearchStore from "@/stores/useSearchStore";
import { CryptoData } from "@/types/currencies";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { LucideFastForward, MoveLeft, MoveRight } from "lucide-react";

type Props = {};

const options = {
  cache: "no-store",
};

const CurrencyTable = (props: Props) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [currencies, setCurrencies] = useState<CryptoData[]>();
  const { searchTerm } = useSearchStore();
  const [isPending, startTransition] = useTransition();
  const [debouncedTerm] = useDebounce(searchTerm, 1000);

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${rowsPerPage}&page=${page}&sparkline=false&locale=en`;
  const searchUrl = `https://api.coingecko.com/api/v3/search?query=${debouncedTerm}`;
  const getCurrencies = async () => {
    startTransition(async () => {
      try {
        let data: CryptoData[];
        if (debouncedTerm.length >= 3) {
          console.log(debouncedTerm);

          const response = await fetch(searchUrl, { cache: "no-store" });
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

        setCurrencies(data);
      } catch (error) {
        toast.error("Failed to fetch currencies");
      }
    });
  };

  useEffect(() => {
    getCurrencies();
  }, [page, rowsPerPage, debouncedTerm]);

  useEffect(() => {
    setPage(0);
    setCurrencies([]);
  }, [debouncedTerm]);

  return (
    <div>
      <Table>
        <TableCaption>Currencies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead>name</TableHead>
            <TableHead>image</TableHead>
            <TableHead className="text-right">symbol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isPending ? (
            <h1>Loading...</h1>
          ) : (
            currencies?.map((c, index) => (
              // <Link href={`/coins/${c.id}`}>
              <TableRow key={index}>
                <TableCell className="font-medium">{index}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <Image
                    priority
                    alt="currency image"
                    width={20}
                    height={20}
                    src={c.image || c.thumb}
                  />
                </TableCell>
                <TableCell className="text-right">{c.symbol}</TableCell>
              </TableRow>
              // </Link>
            ))
          )}
        </TableBody>
      </Table>
      <div className=" flex justify-between">
        <Button
          className=" flex gap-2"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <MoveLeft className=" w-4 h-4" /> Previous
        </Button>
        <Button
          className=" flex gap-2"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next <MoveRight className=" w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CurrencyTable;
