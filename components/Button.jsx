import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "px-4 py-2 text-base font-medium whitespace-nowrap rounded-md border border-solid",
          {
            "bg-teal-9 border-teal-7 text-white hover:bg-teal-10":
              variant === "primary",
          },
          {
            "bg-teal-4 border-teal-7 text-teal-11 hover:bg-teal-5":
              variant === "secondary",
          },
          {
            "bg-sage-3 border-sage-7 text-sage-11 hover:bg-sage-4":
              variant === "tertiary",
          },
          {
            "bg-red-9 border-red-7 text-white hover:bg-red-10":
              variant === "danger",
          },
          {
            "bg-transparent border-0 text-sage-11 hover:bg-sage-4":
              variant === "transparent",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
