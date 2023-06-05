import clsx from "clsx";
import { forwardRef } from "react";

export const Textfield = forwardRef(
  ({ className, name, id, placeholder, label, ...props }, ref) => {
    return (
      <>
        {label && (
          <label htmlFor="name" className="text-sage-10 text-sm font-normal">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          className={clsx(
            "border-sage-7 text-sage-12 hover:bg-sage-4 h-20 w-1/2 rounded-md border bg-white px-6 py-4 text-base font-normal outline-none focus:text-black focus:ring-0",
            className,
          )}
          {...props}
        />
      </>
    );
  },
);
