import clsx from "clsx";
import { forwardRef } from "react";

export const Button = forwardRef(
  ({ children, className, onClick, variant, ...props }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={clsx(
          "whitespace-nowrap px-2 py-1 text-sm uppercase md:px-5 md:py-2.5 md:text-base lg:px-10 lg:py-5 lg:text-lg",
          {
            "bg-green-primary text-white hover:bg-green-hover":
              variant === "primary",
          },
          {
            " bg-purple-primary text-white hover:bg-purple-hover":
              variant === "secondary",
          },
          {
            "border-sage-7 bg-sage-3 text-sage-11 hover:bg-sage-4":
              variant === "tertiary",
          },
          {
            "border-red-7 bg-red-9 hover:bg-red-10 text-white":
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
