import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef(
  ({ className, variant, name, id, placeholder, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        placeholder={placeholder}
        className={clsx(
          "px-4 py-2 font-normal text-base text-sage-12 bg-sage-3 rounded-md hover:bg-sage-4 focus:bg-sage-5 focus:text-black outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
