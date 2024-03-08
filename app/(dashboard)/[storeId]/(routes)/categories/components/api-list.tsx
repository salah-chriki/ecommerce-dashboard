"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import Heading from "@/components/ui/heading";
import { useOrigin } from "@/hooks/use-origin";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";

const ApiList = () => {
  const origin = useOrigin();
  const params = useParams();
  return (
    <div className="mt-3">
      <Heading title="API" description="API calls for categories" />
      <Separator />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/categories`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/categories/{categoryId}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${origin}/api/stores/${params.storeId}/categories`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/stores/${params.storeId}/categories/{categoryId}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/stores/${params.storeId}/categories/{categoryId}`}
        variant="admin"
      />
    </div>
  );
};

export default ApiList;
