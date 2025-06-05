"use client";

import { columns, Deal } from "@/app/deals/columns";
import { DataTable } from "@/components/DataTable";
import { useEffect, useState } from "react";
import { Select } from "./Select";
import { DialogDemo } from "./Modal";

export default function DealsView() {
    const [countries, setCountries] = useState<
        Record<string, { label: string; value: string }[]>
    >({});
    const [selected, setSelected] = useState<string[]>([]);
    const [technologies, setTechnologies] = useState<
        { label: string; value: unknown }[]
    >([]);

    useEffect(() => {
        const fetchCountries = async () => {
            const res = await fetch("/countries.json");
            const data = await res.json();

            const transformedOptions: Record<
                string,
                { label: string; value: string }[]
            > = {};
            for (const [category, items] of Object.entries(data)) {
                transformedOptions[category] = Object.entries(
                    items as Record<string, unknown>
                ).map(([label, value]) => ({
                    label,
                    value: String(value),
                }));
            }
            setCountries(transformedOptions);
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        const fetchTechnologies = async () => {
            const res = await fetch("/technologies.json");
            const data = await res.json();
            const options = Object.entries(data).map(([key, value]) => ({
                label: key,
                value: String(value),
            }));
            setTechnologies(options);
        };
        fetchTechnologies();
    }, []);

    const handleValueChange = (value: string | string[]) => {
        const selectedArray = Array.isArray(value) ? value : [value];
        setSelected(selectedArray);
        console.log("Seleccionados:", selectedArray);
    };

    const deals: Deal[] = [
        {
            id: "deal_001",
            name: "Ultimate Business Pack",
            orders: ["order_001", "order_002"],
            price: 1499.99,
            type: "Enterprise",
            stage: "Negotiation",
            users: ["user_001", "user_002"],
            customer: "Tech Innovations Ltd.",
            created: "2025-05-01T10:00:00Z",
        },
        {
            id: "deal_002",
            name: "Starter Kit",
            orders: ["order_003"],
            price: 499.99,
            type: "Small Business",
            stage: "Proposal Sent",
            users: ["user_003"],
            customer: "Fresh Start Co.",
            created: "2025-04-25T08:30:00Z",
        },
        {
            id: "deal_003",
            name: "Growth Package",
            orders: ["order_004", "order_005"],
            price: 799.99,
            type: "Medium Business",
            stage: "Closed Won",
            users: ["user_004"],
            customer: "Expand Corp.",
            created: "2025-05-10T14:15:00Z",
        },
        {
            id: "deal_004",
            name: "Premium Partnership",
            orders: ["order_006"],
            price: 1999.99,
            type: "Enterprise",
            stage: "Contract Signed",
            users: ["user_005", "user_006"],
            customer: "Global Solutions Inc.",
            created: "2025-05-12T09:45:00Z",
        },
        {
            id: "deal_005",
            name: "Essential Pack",
            orders: ["order_007", "order_008"],
            price: 399.99,
            type: "Startup",
            stage: "Lead Qualification",
            users: ["user_007"],
            customer: "Bright Future Ltd.",
            created: "2025-04-15T12:10:00Z",
        },
        {
            id: "deal_006",
            name: "Corporate Deal",
            orders: ["order_009"],
            price: 2499.99,
            type: "Enterprise",
            stage: "Negotiation",
            users: ["user_008", "user_009"],
            customer: "MegaTech Group",
            created: "2025-05-13T11:30:00Z",
        },
        {
            id: "deal_007",
            name: "Marketing Boost",
            orders: ["order_010"],
            price: 999.99,
            type: "Medium Business",
            stage: "Proposal Sent",
            users: ["user_010"],
            customer: "BrandMasters Inc.",
            created: "2025-05-09T16:00:00Z",
        },
        {
            id: "deal_008",
            name: "Tech Expansion",
            orders: ["order_011", "order_012"],
            price: 1299.99,
            type: "Enterprise",
            stage: "Final Review",
            users: ["user_011"],
            customer: "FutureTech Solutions",
            created: "2025-05-06T10:50:00Z",
        },
        {
            id: "deal_009",
            name: "Retail Upgrade",
            orders: ["order_013"],
            price: 599.99,
            type: "Small Business",
            stage: "Lead Qualification",
            users: ["user_012"],
            customer: "Local Trends LLC",
            created: "2025-04-30T08:20:00Z",
        },
        {
            id: "deal_010",
            name: "E-commerce Boost",
            orders: ["order_014", "order_015"],
            price: 899.99,
            type: "Medium Business",
            stage: "Closed Won",
            users: ["user_013"],
            customer: "Online Market Pro",
            created: "2025-05-05T15:25:00Z",
        },
        {
            id: "deal_011",
            name: "Security Upgrade",
            orders: ["order_016"],
            price: 1599.99,
            type: "Enterprise",
            stage: "Final Review",
            users: ["user_014"],
            customer: "CyberShield Inc.",
            created: "2025-05-14T14:40:00Z",
        },
        {
            id: "deal_012",
            name: "Basic Pack",
            orders: ["order_017"],
            price: 299.99,
            type: "Startup",
            stage: "Lead Qualification",
            users: ["user_015"],
            customer: "NewWave Ltd.",
            created: "2025-04-20T13:05:00Z",
        },
        {
            id: "deal_013",
            name: "Digital Presence Kit",
            orders: ["order_018"],
            price: 799.99,
            type: "Small Business",
            stage: "Proposal Sent",
            users: ["user_016"],
            customer: "WebGrowth Co.",
            created: "2025-05-07T09:10:00Z",
        },
        {
            id: "deal_014",
            name: "Enterprise Solution",
            orders: ["order_019"],
            price: 2999.99,
            type: "Enterprise",
            stage: "Negotiation",
            users: ["user_017"],
            customer: "BigCorp Ltd.",
            created: "2025-05-11T17:30:00Z",
        },
        {
            id: "deal_015",
            name: "Innovation Strategy",
            orders: ["order_020"],
            price: 1799.99,
            type: "Medium Business",
            stage: "Contract Signed",
            users: ["user_018"],
            customer: "Creative Minds LLC",
            created: "2025-05-08T10:55:00Z",
        },
    ];

    const fixedLeft = ["name", "orders"];
    const fixedRight = ["actions"];

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 w-full justify-between items-center">
                <h3>Single select</h3>
                <div className="w-full flex-1 px-2">
                    <Select
                        options={countries}
                        onValueChange={handleValueChange}
                        placeholder="Select countries"
                        maxCount={5}
                        multiple={false}
                        modalPopover={false}
                        grouped
                    />
                </div>
                <h3>Multiple select</h3>
                <div className="flex-1 w-full px-2">
                    <Select
                        options={{
                            Technologies: technologies.map((opt) => ({
                                label: opt.label,
                                value: String(opt.value),
                            })),
                        }}
                        onValueChange={handleValueChange}
                        placeholder="Select technologies"
                        multiple
                        maxCount={5}
                        modalPopover={false}
                    />
                </div>
                <DialogDemo />
            </div>
            <DataTable
                columns={columns}
                data={deals}
                fixedLeft={fixedLeft}
                fixedRight={fixedRight}
                title="deals"
            />
        </div>
    );
}
