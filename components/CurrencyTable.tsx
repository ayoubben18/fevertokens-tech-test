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
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import { MoveLeft, MoveRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { fetchCurrencies } from "@/app/actions";
import { Input } from "./ui/input";
import Link from "next/link";

type Props = {};

const options = {
  cache: "no-store",
};

const CurrencyTable = (props: Props) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currencies, setCurrencies] = useState<CryptoData[]>();
  const { searchTerm } = useSearchStore();
  const [isPending, startTransition] = useTransition();
  const [debouncedTerm] = useDebounce(searchTerm, 1000);

  const getCurrencies = async () => {
    startTransition(() => {
      fetchCurrencies(page, rowsPerPage, debouncedTerm)
        .then((data) => {
          if (!data) {
            toast.error("Failed to fetch currencies");
            return;
          }
          setCurrencies(data);
        })
        .catch((error) => {
          if (error) {
            console.error(error);
            toast.error("Failed to fetch currencies");
          }
        });
    });
  };

  useEffect(() => {
    getCurrencies();
  }, [page, rowsPerPage, debouncedTerm]);

  useEffect(() => {
    setPage(1);
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
          {isPending
            ? // an array with the length of perpage
              Array.from({ length: rowsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="w-6 h-6 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-20 h-6 rounded-md" />
                  </TableCell>
                </TableRow>
              ))
            : currencies?.map((c, index) => (
                <TableRow key={index}>
                  <Link href={`/coins/${c.id}`}>
                    <TableCell className="font-medium">
                      {index + 1 + (page - 1) * rowsPerPage}
                    </TableCell>
                  </Link>
                  <TableCell>
                    <Link href={`/coins/${c.id}`}>{c.name}</Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/coins/${c.id}`}>
                      {" "}
                      <Image
                        priority
                        alt="currency image"
                        width={20}
                        height={20}
                        src={c.image || c.thumb}
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/coins/${c.id}`}>{c.symbol}</Link>
                  </TableCell>
                </TableRow>
                //
              ))}
        </TableBody>
      </Table>
      <div className=" flex flex-col items-center gap-6">
        <div className=" flex justify-between gap-10">
          <Button
            className=" flex gap-2"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <MoveLeft className=" w-4 h-4" /> Previous
          </Button>
          <Input
            type="number"
            defaultValue={rowsPerPage}
            onChange={
              // set the items per page
              (e) =>
                setRowsPerPage(
                  Number(e.target.value) > 0 ? Number(e.target.value) : 1
                )
            }
          />
          <Button
            className=" flex gap-2"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next <MoveRight className=" w-4 h-4" />
          </Button>
        </div>
        <h1 className=" font-bold">page : {page}</h1>
      </div>
    </div>
  );
};

export default CurrencyTable;
