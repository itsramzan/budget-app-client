import React, { useState } from "react";
import Item from "./Item";
import Heading from "../ui/Heading";
import CreateBudgetModal from "./CreateBudgetModal";
import Query from "./Query";
import UpdateBudgetModal from "./UpdateBudgetModal";
import DeleteBudgetModal from "./DeleteBudgetModal";

const Grid = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState({});

  return (
    <>
      <Heading text={`Budgets (${data.meta.total})`}>
        <div className="flex items-center gap-4">
          <CreateBudgetModal />
          <Query />
        </div>
      </Heading>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
        {data.budgets.map((item) => (
          <Item key={item._id} {...{ item, setSelectedItem }} />
        ))}
      </div>

      <div>
        <UpdateBudgetModal data={selectedItem} />
        <DeleteBudgetModal data={selectedItem} />
      </div>
    </>
  );
};

export default Grid;
