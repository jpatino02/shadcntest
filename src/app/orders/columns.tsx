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

type OrderRow = {
    Order: {
        id: string;
        cost: string;
        proforma: string;
        created: string;
        eta: null;
        date_received: null;
        date_warehouse_out: null;
    };
    Stage: {
        id: string;
        position: string;
    };
};

export const orderColumns: ColumnDef<OrderRow>[] = [
    {
        id: "Order ID",
        accessorKey: "Order.id",
        header: "Order ID",
    },
    {
        id: "Order Cost",
        accessorKey: "Order.cost",
        header: "Order Cost",
    },
    {
        id: "Proforma",
        accessorKey: "Order.proforma",
        header: "Proforma",
    },
    {
        id: "Created Date",
        accessorKey: "Order.created",
        header: "Created Date",
    },
    {
        id: "ETA",
        accessorKey: "Order.eta",
        header: "ETA",
    },
    {
        id: "Date Received",
        accessorKey: "Order.date_received",
        header: "Date Received",
    },
    {
        id: "Date Warehouse Out",
        accessorKey: "Order.date_warehouse_out",
        header: "Warehouse out date",
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
                                navigator.clipboard.writeText(payment.Order.id)
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
