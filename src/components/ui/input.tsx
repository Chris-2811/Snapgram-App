import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus: mt-3 flex h-[3.375rem] w-full rounded-[10px] bg-dark-400 px-5 py-[1.0625rem] text-base text-light-200 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white focus:outline-none",
          {
            "border-2 border-red": hasError,
            "ring-offset-2 ring-offset-dark-400 focus:ring-2 focus:ring-light-300":
              !hasError,
          },
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
