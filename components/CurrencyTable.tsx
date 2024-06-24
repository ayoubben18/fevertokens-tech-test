"use client";
import { fetchCurrencies } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSearchStore from "@/stores/useSearchStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import CurrencyRow from "./CurrencyRow";
import TableSkeleton from "./TableSkeleton";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const CurrencyTable = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { searchTerm } = useSearchStore();
  const [debouncedTerm] = useDebounce(searchTerm, 1000);

  const { data, isLoading } = useQuery({
    queryKey: ["currencies", page, rowsPerPage, debouncedTerm],
    queryFn: async () => {
      try {
        const currencies = await fetchCurrencies(
          page,
          rowsPerPage,
          debouncedTerm
        );
        if (currencies?.length === 0 && debouncedTerm.length < 3) {
          toast.info("No products left");
        } else if (currencies?.length === 0 && debouncedTerm.length >= 3) {
          toast.info(`No products found for "${debouncedTerm}"`);
        } else {
          return currencies;
        }
      } catch (error) {
        console.log(error);
        // when we exceed a rate limit on the free plan it returns a 429 status code
        toast.error("Rate Limit Exceeded, Try again later");
      }
    },
    // initialData: [],
    retry: true,
  });

  useEffect(() => {
    setPage(1);
    // invalidate the cache when the search term changes to get fresh data
    queryClient.invalidateQueries({
      queryKey: ["currencies"],
    });
  }, [debouncedTerm, queryClient]);

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
          {isLoading ? (
            // an array with the length of perpage
            <TableSkeleton rowsPerPage={rowsPerPage} />
          ) : (
            data?.map((c, index) => (
              <CurrencyRow
                index={index + 1 + (page - 1) * rowsPerPage}
                key={index}
                coin={c}
              />
            ))
          )}
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
            disabled={data?.length === 0}
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
