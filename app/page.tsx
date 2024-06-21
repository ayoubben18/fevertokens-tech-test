import CurrencyTable from "@/components/CurrencyTable";
import PageWrapper from "@/components/PageWrapper";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <PageWrapper className=" mt-20">
      <SearchBar />
      <CurrencyTable />
    </PageWrapper>
  );
}
