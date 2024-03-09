"use client";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

type OrderClientProps = {
  data: OrderColumn[];
};

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <div>
        <DataTable searchKey="products" columns={columns} data={data} />
        <Separator />
      </div>
    </>
  );
};

export default OrderClient;