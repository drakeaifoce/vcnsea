import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef(
  ({ children, className, variant, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "whitespace-nowrap rounded-md border border-solid px-4 py-2 text-base font-medium",
          {
            "border-teal-7 bg-teal-9 text-white hover:bg-teal-10":
              variant === "primary",
          },
          {
            "border-teal-7 bg-teal-4 text-teal-11 hover:bg-teal-5":
              variant === "secondary",
          },
          {
            "border-sage-7 bg-sage-3 text-sage-11 hover:bg-sage-4":
              variant === "tertiary",
          },
          {
            "border-red-7 bg-red-9 text-white hover:bg-red-10":
              variant === "danger",
          },
          {
            "border-0 bg-transparent text-sage-11 hover:bg-sage-4":
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
