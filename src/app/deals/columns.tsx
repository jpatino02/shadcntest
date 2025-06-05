"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export type Deal = {
    id: string;
    name: string;
    orders: string[];
    price: number;
    type: string;
    stage: string;
    users: string[];
    customer: string;
    created: string;
};

export const columns: ColumnDef<Deal>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "orders",
        header: "Orders",
        cell: ({ row }) => {
            const orders = (row.getValue("orders") as string[]).join(", ");

            return <div>{orders}</div>;
        },
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className="text-right font-medium">{formatted}</div>;
        },
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "stage",
        header: "Stage",
    },
    {
        accessorKey: "users",
        header: "Users",
        cell: ({ row }) => {
            const users = (row.getValue("users") as string[]).join(", ");

            return <div>{users}</div>;
        },
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "created",
        header: "Created",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created")).toLocaleDateString(
                "en-US"
            );
            return <div>{date}</div>;
        },
    },
    {
        id: "actions",
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(payment.id)
                            }
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
