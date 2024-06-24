import { TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "./ui/skeleton";

type Props = {
  rowsPerPage: number;
};

const TableSkeleton = ({ rowsPerPage }: Props) => {
  return Array.from({ length: rowsPerPage }).map((_, index) => (
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
  ));
};

export default TableSkeleton;
