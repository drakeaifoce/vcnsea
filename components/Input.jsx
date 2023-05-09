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
          "px-4 py-2 font-normal text-base text-sage-12 bg-sage-3 border border-sage-7 rounded-md  hover:bg-sage-4 hover:border-sage-8 focus:bg-sage-5 focus:border-sage-8 outline-none",
          className
        )}
        {...props}
      />
    );
  }
);
