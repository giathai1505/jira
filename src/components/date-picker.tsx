"use client";

// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";

// import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date) => void;
  className?: string;
  placeholder?: string;
}

const DatePicker = ({ onChange, value }: DatePickerProps) => {
  return (
    // <Popover>
    //   <PopoverTrigger asChild>
    //     <Button
    //       variant="outline"
    //       size="lg"
    //       className={cn(
    //         "w-full justify-start text-left font-normal px-3",
    //         !value && "text-muted-foreground",
    //         className
    //       )}
    //     >
    //       <CalendarIcon className="mr-2 h-4 w-4" />
    //       {value ? format(value, "PPP") : <span>{placeholder}</span>}
    //     </Button>
    //   </PopoverTrigger>
    //   <PopoverContent className="w-auto p-0">
    <Calendar
      mode="single"
      selected={value}
      onSelect={(date) => onChange(date as Date)}
      initialFocus
      className="z-50"
    />
    //   </PopoverContent>
    // </Popover>
  );
};

export default DatePicker;
