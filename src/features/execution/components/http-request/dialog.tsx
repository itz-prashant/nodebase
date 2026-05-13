"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldError, FieldGroup,FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema  = z.object({
  endpoint: z.url({message: "Please enter a valid url"}),
  method: z.enum(["GET" , "POST" , "PATCH" , "PUT" ,"DELETE"]),
  body: z.string().optional()
})

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void
  defaultEndPoint?: string;
  defaultMethod?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  defaultBody?:string
}

export const HttpRequestDialog = (
  { 
    open, 
    onOpenChange,
    onSubmit,
    defaultEndPoint = "",
    defaultMethod = "GET",
    defaultBody = ""
   }: Props) => {

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues:{
        endpoint: defaultEndPoint,
        method: defaultMethod,
        body: defaultBody
      }
    })

    const watchMethod = form.watch("method")
    const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod)

    const handleSubmit = (values: z.infer<typeof formSchema>)=>{
      onSubmit(values)
      onOpenChange(false)
    }

    useEffect(()=>{
      if(open){
        form.reset({
          endpoint: defaultEndPoint,
          method: defaultMethod,
          body: defaultBody
        })
      }
    },[open, defaultEndPoint, defaultBody, defaultMethod, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Configured settings for the http request node.
          </DialogDescription>
        </DialogHeader>
        <div>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-5"
          >
            <FieldGroup>
                <Controller 
              control={form.control}
              name="method"
              render={({field, fieldState})=>(
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">Method</FieldLabel>
                  <Select 
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
              
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method"/>
                      </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    The HTTP method to use for this request
                  </FieldDescription>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                </Field>
              )}
            />
            <Controller 
              control={form.control}
              name="endpoint"
              render={({field, fieldState})=>(
                <Field>
                  <FieldLabel>Endpoint URL</FieldLabel>
                    <Input 
                      placeholder="https://api.exmaple.com/users/{{httpResponse.data.id}}"
                      {...field}
                    />
                  <FieldDescription>
                    Static URL or use {"{{variables}} for"}
                    simple values or {"{{json variables}} for"} to stringify object
                  </FieldDescription>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

                </Field>
              )}
            />
            {showBodyField &&(
              <Controller 
                control={form.control}
              name="body"
              render={({field, fieldState})=>(
                <Field>
                  <FieldLabel>Request body</FieldLabel>
                    <Textarea 
                      placeholder={
                        '{\n "userId: "{{httpResponse.data.id}}", \n"name": "{{httpResponse.data.name}}", \n"items": "{{httpResponse.data.items}}"\n}'
                      }
                      {...field}
                      className="min-h-[120px] font-mono text-sm"
                    />
                  <FieldDescription>
                    JSON with template variables. Use {"{{variables}}"} for simple values or {"{{json variables}} for"} to stringify object
                  </FieldDescription>
                     {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
              />
            )}
            </FieldGroup>
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};