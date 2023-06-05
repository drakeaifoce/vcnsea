import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef(
  ({ children, className, onClick, variant, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={clsx(
          "whitespace-nowrap rounded px-3 py-2 text-sm font-medium",
          {
            "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
              variant === "primary",
          },
          {
            "rounded-md bg-indigo-100 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
              variant === "secondary",
          },
          {
            "border-sage-7 bg-sage-3 text-sage-11 hover:bg-sage-4":
              variant === "tertiary",
          },
          {
            "bg-red-primary hover:bg-red-hover text-white":
              variant === "danger",
          },
          {
            "text-sage-11 hover:bg-sage-4 border-0 bg-transparent":
              variant === "transparent",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
