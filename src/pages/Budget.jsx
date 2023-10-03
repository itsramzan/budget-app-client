import React from "react";
import {
  useQueryParams,
  NumberParam,
  StringParam,
  ArrayParam,
} from "use-query-params";
import { useGetAllBudgetsQuery } from "../features/budget/budgetApi";
import Loading from "../components/ui/Loading";
import Error from "../components/ui/Error";
import Heading from "../components/ui/Heading";
import Chart from "../components/budget/Chart";
import Stat from "../components/budget/Stat";
import Grid from "../components/budget/Grid";
import Pagination from "../components/ui/Pagination";

function Budget() {
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    search: StringParam,
    type: StringParam,
    sort: ArrayParam,
  });

  const { page = 1, search, type, sort } = query;

  const { isLoading, isError, error, data } = useGetAllBudgetsQuery({
    page,
    search,
    type,
    sort,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error?.message} />;

  // Data for pagination
  const { total, limit } = data.meta;
  const paginationData = {
    total,
    pageSize: limit,
    current: page,
    onChange: (page) => {
      setQuery({ page });
    },
  };

  return (
    <div className="grid grid-cols-12 gap-8 items-start">
      {/* Chart & stat */}
      <div className="col-span-12 md:col-span-4 space-y-4">
        <Heading text="Chart & Stat" />
        <Chart stat={data.stat} />
        <Stat stat={data.stat} />
      </div>

      {/* Budgets */}
      <div className="col-span-12 md:col-span-8 space-y-4">
        <Grid {...{ data }} />
        <Pagination {...{ ...paginationData }} />
      </div>
    </div>
  );
}

export default Budget;
