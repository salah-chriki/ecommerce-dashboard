"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import ApiList from "./api-list";
import { CategoryColumn, columns } from "./columns";
import { Billboard } from "@prisma/client";

export type CategoryClientProps = {
  data: CategoryColumn[];
};

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories of your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable columns={columns} data={data} />
        <Separator />
        <ApiList />
      </div>
    </>
  );
};

export default CategoryClient;
