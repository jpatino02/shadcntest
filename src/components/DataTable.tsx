"use client";

import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTablePagination } from "@/components/DataTablePagination";
import {
    ChevronDown,
    ChevronsUpDown,
    ChevronUp,
    Columns3Cog,
    Copy,
    Download,
    Printer,
    Search,
} from "lucide-react";
import copy from "copy-to-clipboard";
import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFileXLSX } from "xlsx";
import { unparse } from "papaparse";
import { useTheme } from "next-themes";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    fixedLeft?: string[];
    fixedRight?: string[];
    title: string;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    fixedLeft = [],
    fixedRight = [],
    title,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {}
    );
    const [stickyStyles, setStickyStyles] = useState<
        Record<string, React.CSSProperties>
    >({});
    const contentRef = useRef<HTMLDivElement>(null);
    const tbl = useRef(null); // Excel export
    const reactToPrintFn = useReactToPrint({ contentRef }); // Print DataTable
    const { theme } = useTheme();

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useEffect(() => {
        const handleResize = () => {
            if (typeof window === "undefined") return;

            const isLargeScreen = window.innerWidth >= 768;
            const newStyles: Record<string, React.CSSProperties> = {};

            if (!isLargeScreen) {
                setStickyStyles({});
                return;
            }

            const getOffset = (id: string, fixedList: string[]) => {
                return fixedList
                    .slice(0, fixedList.indexOf(id))
                    .reduce((acc, currId) => {
                        const col = table
                            .getAllLeafColumns()
                            .find((col) => col.id === currId);
                        return acc + (col?.getSize() ?? 0);
                    }, 0);
            };

            [...fixedLeft, ...fixedRight].forEach((id) => {
                const isLeft = fixedLeft.includes(id);
                const offset = getOffset(id, isLeft ? fixedLeft : fixedRight);

                newStyles[id] = {
                    position: "sticky",
                    [isLeft ? "left" : "right"]: offset,
                    zIndex: 10,
                };
            });

            setStickyStyles(newStyles);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [table, fixedLeft, fixedRight, theme]);

    // Copy DataTable to clipboard fn
    const handleCopy = () => {
        const headers = table
            .getHeaderGroups()[0]
            .headers.filter((h) => h.column.id !== "actions")
            .map((h) => {
                const header = h.column.columnDef.header;
                return typeof header === "function"
                    ? h.column.columnDef.id
                    : header;
            })
            .join("\t");
        const rows = table.getFilteredRowModel().rows.map((row) =>
            row
                .getVisibleCells()
                .filter((cell) => cell.column.id !== "actions")
                .map((cell) => {
                    const colId = cell.column.id;
                    const value = cell.getValue();

                    if (colId === "orders" || colId === "users") {
                        return Array.isArray(value) ? value.join(", ") : "";
                    }

                    if (colId === "price") {
                        const amount = parseFloat(String(value));
                        return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amount);
                    }

                    if (colId === "created") {
                        return new Date(
                            value as string | number | Date
                        ).toLocaleDateString("en-US");
                    }

                    return String(value ?? "");
                })
        );
        const text = [headers, ...rows].join("\n");

        copy(text);
        alert("Content copied to clipboard.");
    };

    //Export PDF
    const handleExportPDF = async () => {
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.text(title, 10, 10);

        const columns = table
            .getAllColumns()
            .filter((col) => col.getIsVisible() && col.id !== "actions")
            .map((col) =>
                typeof col.columnDef.header === "string"
                    ? col.columnDef.header
                    : col.id
            );

        const data = table.getFilteredRowModel().rows.map((row) =>
            row
                .getVisibleCells()
                .filter((cell) => cell.column.id !== "actions")
                .map((cell) => {
                    const colId = cell.column.id;
                    const value = cell.getValue();

                    if (colId === "orders" || colId === "users") {
                        return Array.isArray(value) ? value.join(", ") : "";
                    }

                    if (colId === "price") {
                        const amount = parseFloat(String(value));
                        return new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amount);
                    }

                    if (colId === "created") {
                        return new Date(
                            value as string | number | Date
                        ).toLocaleDateString("en-US");
                    }

                    return String(value ?? "");
                })
        );

        autoTable(pdf, {
            head: [columns],
            body: data,
            startY: 20,
        });

        pdf.save(`${title}.pdf`);
    };

    // Export Excel

    const handleExportExcel = () => {
        const wb = utils.table_to_book(tbl.current);
        writeFileXLSX(wb, `${title}.xlsx`);
    };

    // Export CSV
    const handleExportCSV = () => {
        const filteredData = table.getFilteredRowModel().rows;
        const formattedData = filteredData.map((row) => {
            const newRow: Record<string, unknown> = {};
            columns.forEach((col) => {
                if (
                    "accessorKey" in col &&
                    typeof col.accessorKey === "string"
                ) {
                    newRow[col.accessorKey] = row.getValue(col.accessorKey);
                }
            });
            return newRow;
        });
        const csv = unparse(formattedData);
        const blob = new Blob([csv], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.csv`;
        link.click();
    };

    return (
        <Card className="w-full">
            <CardHeader className="flex items-center justify-between py-4 flex-col md:flex-row">
                <div className="flex justify-between md:justify-normal items-center w-full md:space-x-2 px-2">
                    <div className="relative inline-block">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            size={18}
                        />
                        <Input
                            placeholder="Search all columns..."
                            value={globalFilter ?? ""}
                            onChange={(event) =>
                                setGlobalFilter(event.target.value)
                            }
                            className="w-full pl-10"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <Columns3Cog />
                                Columns
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center self-end pr-2 py-4 gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Download />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleExportCSV}>
                                Export CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExportExcel}>
                                Export EXCEL
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleExportPDF}>
                                Export PDF
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="icon" onClick={handleCopy}>
                        <Copy />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={reactToPrintFn}
                    >
                        <Printer />
                    </Button>
                </div>
            </CardHeader>
            {/* table to be printed and exported as pdf and export excel*/}
            <div className="hidden print:block m-4" ref={contentRef}>
                <table
                    className="w-full border border-gray-300 text-sm"
                    ref={tbl}
                >
                    <thead>
                        <tr>
                            {table
                                .getAllColumns()
                                .filter(
                                    (col) =>
                                        col.getIsVisible() &&
                                        col.id !== "actions"
                                )
                                .map((col) => (
                                    <th
                                        key={col.id}
                                        className="border px-2 py-1"
                                    >
                                        {typeof col.columnDef.header ===
                                        "string"
                                            ? col.columnDef.header
                                            : col.id}
                                    </th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.getFilteredRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row
                                    .getVisibleCells()
                                    .filter(
                                        (cell) => cell.column.id !== "actions"
                                    )
                                    .map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="border px-2 py-1"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CardContent>
                <Table>
                    <TableHeader className="sticky-header">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    const isSorted =
                                        header.column.getIsSorted();

                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={stickyStyles[header.id]}
                                        >
                                            {header.isPlaceholder ? null : typeof header
                                                  .column.columnDef.header ===
                                              "string" ? (
                                                <Button
                                                    variant="ghost"
                                                    className="w-full flex items-center justify-between"
                                                    onClick={header.column.getToggleSortingHandler()}
                                                >
                                                    {
                                                        header.column.columnDef
                                                            .header
                                                    }
                                                    {isSorted === "asc" ? (
                                                        <ChevronUp className="ml-2 h-4 w-4" />
                                                    ) : isSorted === "desc" ? (
                                                        <ChevronDown className="ml-2 h-4 w-4" />
                                                    ) : (
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                                    )}
                                                </Button>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )
                                            )}
                                            {header.column.getCanFilter() && (
                                                <Input
                                                    placeholder="Search..."
                                                    value={
                                                        (header.column.getFilterValue() as string) ??
                                                        ""
                                                    }
                                                    onChange={(event) =>
                                                        header.column.setFilterValue(
                                                            event.target.value
                                                        )
                                                    }
                                                    className="h-8 mb-2"
                                                />
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell.id}
                                                style={
                                                    stickyStyles[cell.column.id]
                                                }
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
                <DataTablePagination table={table} />
            </CardFooter>
        </Card>
    );
}
