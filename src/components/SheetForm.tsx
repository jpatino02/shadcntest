"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
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
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" })
        .trim(),
    seller: z.string().min(1, { message: "Please select a seller" }),
    taxId: z.string(),
    defTaxRate: z.string(),
    type: z.string(),
    companyName: z.string(),
    companyAddress: z.string(),
});

export function SheetForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerCode: "",
            salesRepresentative: "",
            email: "",
            seller: "",
            taxId: "",
            defTaxRate: "",
            type: "",
            companyName: "",
            companyAddress: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

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

    const seller = [
        {
            label: "Kaptan",
            value: "1",
        },
        {
            label: "Bold",
            value: "2",
        },
        {
            label: "Tempari",
            value: "3",
        },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>
                    <Plus />
                    Add Customer
                </Button>
            </SheetTrigger>
            <SheetContent className="h-full">
                <SheetHeader>
                    <SheetTitle>Add New Customer</SheetTitle>
                </SheetHeader>
                <div className="flex-grow overflow-y-auto px-2 mb-2">
                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="customerCode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Customer Code</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="303"
                                                    {...field}
                                                />
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
                                            <FormLabel>
                                                Sales Representative
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    options={{ salesRep }}
                                                    onValueChange={(
                                                        value: string | string[]
                                                    ) => {
                                                        const selectedArray =
                                                            Array.isArray(value)
                                                                ? value
                                                                : [value];
                                                        form.setValue(
                                                            "salesRepresentative",
                                                            selectedArray[0] ??
                                                                ""
                                                        );
                                                    }}
                                                    placeholder="Sales Representative"
                                                    modalPopover={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="example@example.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="seller"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Seller</FormLabel>
                                            <FormControl>
                                                <Select
                                                    options={{ seller }}
                                                    onValueChange={(
                                                        value: string | string[]
                                                    ) => {
                                                        const selectedArray =
                                                            Array.isArray(value)
                                                                ? value
                                                                : [value];
                                                        form.setValue(
                                                            "seller",
                                                            selectedArray[0] ??
                                                                ""
                                                        );
                                                    }}
                                                    placeholder="Seller"
                                                    modalPopover={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="taxId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tax ID</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="DNMCNM202020"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="defTaxRate"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>
                                                Default Tax Rate
                                            </FormLabel>
                                            <FormControl>
                                                <Select
                                                    options={{
                                                        defTaxRate: [
                                                            {
                                                                label: "TAX - 0.00%",
                                                                value: "001",
                                                            },
                                                        ],
                                                    }}
                                                    onValueChange={(
                                                        value: string | string[]
                                                    ) => {
                                                        const selectedArray =
                                                            Array.isArray(value)
                                                                ? value
                                                                : [value];
                                                        form.setValue(
                                                            "defTaxRate",
                                                            selectedArray[0] ??
                                                                ""
                                                        );
                                                    }}
                                                    placeholder="TAX - 0.00%"
                                                    modalPopover={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    options={{
                                                        type: [
                                                            {
                                                                label: "Oficial",
                                                                value: "1",
                                                            },
                                                            {
                                                                label: "Non oficial",
                                                                value: "2",
                                                            },
                                                        ],
                                                    }}
                                                    onValueChange={(
                                                        value: string | string[]
                                                    ) => {
                                                        const selectedArray =
                                                            Array.isArray(value)
                                                                ? value
                                                                : [value];
                                                        form.setValue(
                                                            "type",
                                                            selectedArray[0] ??
                                                                ""
                                                        );
                                                    }}
                                                    placeholder="Type"
                                                    modalPopover={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Company Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="companyAddress"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Company Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Company Address"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
