import React from "react";
import { TableCell, TableRow } from "./ui/table";
import Link from "next/link";
import Image from "next/image";
import { CryptoData } from "@/types/currencies";

interface Props {
  coin: CryptoData;
  index: number;
}

const CurrencyRow = ({ coin: c, index }: Props) => {
  return (
    <TableRow>
      <Link href={`/coins/${c.id}`}>
        <TableCell className="font-medium">
          {/* {index + 1 + (page - 1) * rowsPerPage} */}
          {index}
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
  );
};

export default CurrencyRow;
