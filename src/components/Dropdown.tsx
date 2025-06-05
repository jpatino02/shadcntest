"use client";

import Select from "react-select";
import { Option, CountryGroup } from "@/types/types";

interface DropdownProps {
    options: Option[] | CountryGroup[];
    grouped?: boolean;
}

export function Dropdown({ options, grouped }: DropdownProps) {
    if (!Array.isArray(options)) {
        console.error("Dropdown expects options to be an array.");
        return null;
    }

    if (grouped) {
        // options is CountryGroup[]
        return (
            <Select<
                CountryGroup,
                false,
                import("react-select").GroupBase<CountryGroup>
            >
                options={options as CountryGroup[]}
                isSearchable
                isClearable
                placeholder="Select an option..."
                classNames={{
                    control: () =>
                        "border border-blue-900 rounded-md shadow-lg",
                    menu: () =>
                        "bg-white border border-gray-200 mt-1 rounded-md shadow-md",
                    option: ({ isFocused, isSelected }) =>
                        `cursor-pointer px-4 py-2 text-sm ${
                            isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-blue-100"
                                : "text-gray-900"
                        }`,
                    placeholder: () => "text-gray-500 text-sm",
                    singleValue: () => "text-gray-900 text-sm",
                }}
                className="z-50"
            />
        );
    } else {
        // options is Option[]
        return (
            <Select<Option, false>
                options={options as Option[]}
                isSearchable
                isClearable
                placeholder="Select an option..."
                classNames={{
                    control: (state) =>
                        state.isFocused
                            ? "border border-red-600"
                            : "border border-gray-500",
                    menu: () =>
                        "bg-white border border-gray-200 mt-1 rounded-md shadow-md",
                    option: ({ isFocused, isSelected }) =>
                        `cursor-pointer px-4 py-2 text-sm ${
                            isSelected
                                ? "bg-blue-500 text-white"
                                : isFocused
                                ? "bg-blue-100"
                                : "text-gray-900"
                        }`,
                    placeholder: () => "text-gray-500 text-sm",
                    singleValue: () => "text-gray-900 text-sm",
                }}
                className="z-50"
            />
        );
    }
}
