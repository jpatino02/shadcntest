"use client";

import { Button } from "./ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Select } from "./Select";

const formSchema = z.object({
    customerCode: z.string().min(1, {
        message: "Customer code is required.",
    }),
    salesRepresentative: z.string().min(1, {
        message: "Please select a sales representative.",
    }),
});

export function FormDemo() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerCode: "",
            salesRepresentative: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const handleValueChange = (value: string | string[]) => {
        const selectedArray = Array.isArray(value) ? value : [value];
        form.setValue("salesRepresentative", selectedArray[0] ?? "");
        console.log("Selected", selectedArray);
    };

    const salesRep = [
        {
            label: "Luis Esquer",
            value: "3203",
        },
        {
            label: "Vannesa Hernandez",
            value: "1520",
        },
        {
            label: "Adrián Campos",
            value: "8000",
        },
    ];
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="customerCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Customer Code</FormLabel>
                            <FormControl>
                                <Input placeholder="303" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salesRepresentative"
                    render={() => (
                        <FormItem>
                            <FormLabel>Sales Representative</FormLabel>
                            <FormControl>
                                <Select
                                    options={{ salesRep }}
                                    onValueChange={handleValueChange}
                                    placeholder="Sales Representative"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
