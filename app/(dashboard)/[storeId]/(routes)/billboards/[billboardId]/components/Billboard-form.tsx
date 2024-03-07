"use client";

import * as z from "zod";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Billboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

interface BillboardFormProps {
  initialData: Billboard | null;
}

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const title = initialData ? "Edit Billboard" : "Create Billboardb";
  const description = initialData
    ? "Edit a Billboard"
    : "Create a new Billboard";
  const action = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData ? "Billboard edited." : "Billboard created.";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/stores/${params?.storeId}/billboards/${params.billboardId}`,
          values
        );
      } else {
        await axios.post(`/api/stores/${params?.storeId}/billboards`, values);
      }

      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.delete(
          `/api/stores/${params?.storeId}/billboards/${params?.billboardId}`
        );
      }
      router.refresh();
      toast.success("Billboard deleted");
    } catch (error) {
      toast.error("make sure to delete all products and categories first");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <div>
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Billboard image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? [field.value] : []}
                        onRemove={() => field.onChange("")}
                        onchange={(url) => field.onChange(url)}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-3 gap-8">
                <FormField
                  control={form.control}
                  name="label"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billboard label</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder={initialData?.label}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={loading} type="submit" className="ml-aut mt-6">
                {action}
              </Button>
            </form>
          </Form>
          <Separator />
        </div>
      </div>
    </>
  );
};

export default BillboardForm;
