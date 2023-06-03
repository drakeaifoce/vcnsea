import clsx from "clsx";
import { forwardRef } from "react";

export const Textfield = forwardRef(
  ({ className, name, id, placeholder, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor="name" className="text-sm font-normal text-sage-10">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          className={clsx(
            "h-20 w-1/2 border border-sage-7 bg-white px-6 py-4 text-base font-normal text-sage-12 outline-none hover:bg-sage-4 focus:text-black focus:ring-0",
            className,
          )}
          {...props}
        />
      </>
    );
  },
);
