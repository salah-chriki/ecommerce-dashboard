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
      <Heading title="API" description="API calls for billboards" />
      <Separator />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/billboards`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/billboards/{billboardId}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${origin}/api/stores/${params.storeId}/billboards`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/stores/${params.storeId}/billboards/{billboardId}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/stores/${params.storeId}/billboards/{billboardId}`}
        variant="admin"
      />
    </div>
  );
};

export default ApiList;
