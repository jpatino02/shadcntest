import { XCircle, ChevronDown, XIcon, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

interface SelectProps {
    options: {
        [key: string]: {
            label: string;
            value: string;
        }[];
    };
    onValueChange: (value: string[] | string) => void;
    value?: string[] | string;
    defaultValue?: string[] | string;
    placeholder?: string;
    maxCount?: number;
    modalPopover?: boolean;
    className?: string;
    multiple?: boolean;
    grouped?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    options,
    onValueChange,
    value,
    defaultValue = [],
    placeholder = "Select options",
    maxCount = 3,
    modalPopover = false,
    multiple = false,
    grouped = false,
}) => {
    const toArray = (val: string[] | string | undefined): string[] => {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    };

    const [selectedValues, setSelectedValues] = useState<string[]>(
        toArray(value ?? defaultValue)
    );
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    useEffect(() => {
        if (value !== undefined) {
            setSelectedValues(toArray(value));
        }
    }, [value]);

    const notifyValueChange = (newSelectedValues: string[]) => {
        if (multiple) {
            onValueChange(newSelectedValues);
        } else {
            onValueChange(newSelectedValues[0] ?? "");
        }
    };

    const handleInputKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter") {
            setIsPopoverOpen(true);
        } else if (event.key === "Backspace" && !event.currentTarget.value) {
            const newSelectedValues = [...selectedValues];
            newSelectedValues.pop();
            setSelectedValues(newSelectedValues);
            notifyValueChange(newSelectedValues);
        }
    };

    const toggleOption = (option: string) => {
        let newSelectedValues;
        if (multiple) {
            newSelectedValues = selectedValues.includes(option)
                ? selectedValues.filter((value) => value !== option)
                : [...selectedValues, option];
        } else {
            newSelectedValues = selectedValues[0] === option ? [] : [option];
        }
        setSelectedValues(newSelectedValues);
        notifyValueChange(newSelectedValues);
    };

    const handleClear = () => {
        setSelectedValues([]);
        notifyValueChange([]);
    };

    const clearExtraOptions = () => {
        const newSelectedValues = selectedValues.slice(0, maxCount);
        setSelectedValues(newSelectedValues);
        notifyValueChange(newSelectedValues);
    };

    const toggleAll = () => {
        const allValues = Object.values(options)
            .flat()
            .map((o) => o.value);
        const allSelected = allValues.every((v) => selectedValues.includes(v));
        if (allSelected) {
            handleClear();
        } else {
            setSelectedValues(allValues);
            notifyValueChange(allValues);
        }
    };

    const singleLabel = selectedValues[0]
        ? Object.values(options)
              .flat()
              .find((o) => o.value === selectedValues[0])?.label
        : "";

    return (
        <Popover
            open={isPopoverOpen}
            onOpenChange={setIsPopoverOpen}
            modal={modalPopover}
        >
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    aria-expanded={isPopoverOpen}
                    onClick={() => setIsPopoverOpen(true)}
                    className="flex w-full p-1 rounded-md min-h-10 h-auto items-center justify-between [&_svg]:pointer-events-auto"
                >
                    {selectedValues.length > 0 ? (
                        multiple ? (
                            <div className="flex justify-between items-center w-full">
                                <div className="flex flex-wrap items-center space-x-2">
                                    {selectedValues
                                        .slice(0, maxCount)
                                        .map((v) => {
                                            const opt = Object.values(options)
                                                .flat()
                                                .find((o) => o.value === v);
                                            return (
                                                <Badge
                                                    key={v}
                                                    className="rounded-full my-1"
                                                >
                                                    {opt?.label}
                                                    <span
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleOption(v);
                                                        }}
                                                    >
                                                        <XCircle className="ml-2 h-4 w-4 cursor-pointer" />
                                                    </span>
                                                </Badge>
                                            );
                                        })}
                                    {selectedValues.length > maxCount && (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-full my-1"
                                        >
                                            {`+ ${
                                                selectedValues.length - maxCount
                                            } more`}
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    clearExtraOptions();
                                                }}
                                            >
                                                <XCircle className="ml-2 h-4 w-4 cursor-pointer" />
                                            </span>
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex items-center">
                                    <XIcon
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClear();
                                        }}
                                        className="h-4 mx-2 cursor-pointer text-muted-foreground"
                                    />
                                    <Separator
                                        orientation="vertical"
                                        className="flex min-h-6 h-full"
                                    />
                                    <ChevronDown
                                        color="#184A72"
                                        className="h-4 mx-2 cursor-pointer"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between w-full">
                                <span className="flex-1 text-sm px-2 text-left">
                                    {singleLabel}
                                </span>
                                <ChevronDown
                                    color="#184A72"
                                    className="h-4 cursor-pointer mx-2"
                                />
                            </div>
                        )
                    ) : (
                        <div className="flex items-center justify-between w-full">
                            <span className="text-sm mx-3">{placeholder}</span>
                            <ChevronDown
                                color="#184A72"
                                className="h-4 cursor-pointer mx-2"
                            />
                        </div>
                    )}
                </Button>
            </PopoverTrigger>
            {isPopoverOpen && (
                <PopoverContent
                    className="w-auto p-0 pointer-events-auto"
                    align="start"
                    onEscapeKeyDown={() => {
                        setIsPopoverOpen(false);
                    }}
                >
                    <Command>
                        <CommandInput
                            autoFocus
                            placeholder="Search..."
                            onKeyDown={handleInputKeyDown}
                            className="pointer-events-auto"
                        />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {/* Select all just in multiple */}
                                {multiple && (
                                    <CommandItem
                                        key="all"
                                        onSelect={toggleAll}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-400",
                                                Object.values(options)
                                                    .flat()
                                                    .every((v) =>
                                                        selectedValues.includes(
                                                            v.value
                                                        )
                                                    )
                                                    ? "bg-[#2563EB] border-0"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check color="white" />
                                        </div>
                                        <span>Select All</span>
                                    </CommandItem>
                                )}
                                {grouped
                                    ? // Grouped options
                                      Object.entries(options).map(
                                          ([category, items]) => (
                                              <div
                                                  key={category}
                                                  className="pl-2"
                                              >
                                                  <h3 className="font-bold">
                                                      {category}
                                                  </h3>
                                                  {items.map((option) => {
                                                      const isSelected =
                                                          selectedValues.includes(
                                                              option.value
                                                          );
                                                      return (
                                                          <CommandItem
                                                              key={option.value}
                                                              onSelect={() => {
                                                                  toggleOption(
                                                                      option.value
                                                                  );
                                                                  if (!multiple)
                                                                      setIsPopoverOpen(
                                                                          false
                                                                      );
                                                              }}
                                                              className="cursor-pointer"
                                                          >
                                                              {/* Show checkbox when is multiple */}
                                                              {multiple ? (
                                                                  <>
                                                                      <div
                                                                          className={cn(
                                                                              "mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-400",
                                                                              isSelected
                                                                                  ? "opacity-100 bg-[#2563EB] border-0"
                                                                                  : "opacity-50 [&_svg]:invisible"
                                                                          )}
                                                                      >
                                                                          <Check color="white" />
                                                                      </div>
                                                                      <span>
                                                                          {
                                                                              option.label
                                                                          }
                                                                      </span>
                                                                  </>
                                                              ) : (
                                                                  <div className="w-full flex justify-between">
                                                                      <span>
                                                                          {
                                                                              option.label
                                                                          }
                                                                      </span>
                                                                      <div
                                                                          className={cn(
                                                                              "flex h-4 w-4 justify-self-end",
                                                                              isSelected
                                                                                  ? "opacity-100"
                                                                                  : "opacity-50 [&_svg]:invisible"
                                                                          )}
                                                                      >
                                                                          <Check color="#2563EB" />
                                                                      </div>
                                                                  </div>
                                                              )}
                                                          </CommandItem>
                                                      );
                                                  })}
                                              </div>
                                          )
                                      )
                                    : // Not grouped options
                                      Object.values(options)
                                          .flat()
                                          .map((option) => {
                                              const isSelected =
                                                  selectedValues.includes(
                                                      option.value
                                                  );
                                              return (
                                                  <CommandItem
                                                      key={option.value}
                                                      onSelect={() => {
                                                          toggleOption(
                                                              option.value
                                                          );
                                                          if (!multiple)
                                                              setIsPopoverOpen(
                                                                  false
                                                              );
                                                      }}
                                                      className="cursor-pointer"
                                                  >
                                                      {multiple ? (
                                                          <>
                                                              <div
                                                                  className={cn(
                                                                      "mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-gray-400",
                                                                      isSelected
                                                                          ? "opacity-100 bg-[#2563EB] border-0"
                                                                          : "opacity-50 [&_svg]:invisible"
                                                                  )}
                                                              >
                                                                  <Check color="white" />
                                                              </div>
                                                              <span>
                                                                  {option.label}
                                                              </span>
                                                          </>
                                                      ) : (
                                                          <div className="w-full flex justify-between">
                                                              <span>
                                                                  {option.label}
                                                              </span>
                                                              <div
                                                                  className={cn(
                                                                      "flex h-4 w-4 justify-self-end",
                                                                      isSelected
                                                                          ? "opacity-100"
                                                                          : "opacity-50 [&_svg]:invisible"
                                                                  )}
                                                              >
                                                                  <Check color="#2563EB" />
                                                              </div>
                                                          </div>
                                                      )}
                                                  </CommandItem>
                                              );
                                          })}
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className="flex items-center justify-between">
                                    {multiple && selectedValues.length > 0 && (
                                        <>
                                            <CommandItem
                                                onSelect={handleClear}
                                                className="flex-1 justify-center cursor-pointer"
                                            >
                                                Clear
                                            </CommandItem>
                                            <Separator
                                                orientation="vertical"
                                                className="flex min-h-6 h-full"
                                            />
                                        </>
                                    )}
                                    <CommandItem
                                        onSelect={() => setIsPopoverOpen(false)}
                                        className="flex-1 justify-center cursor-pointer max-w-full"
                                    >
                                        Close
                                    </CommandItem>
                                </div>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            )}
        </Popover>
    );
};
