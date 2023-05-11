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
          "rounded-md border-transparent bg-sage-3 px-4 py-2 text-base font-normal text-sage-12 outline-none hover:bg-sage-4 focus:border-transparent focus:bg-sage-5 focus:text-black focus:ring-0",
          className
        )}
        {...props}
      />
    );
  }
);
