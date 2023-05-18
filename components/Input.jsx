import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef(
  ({ className, name, id, placeholder, label, required, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col">
        {label && (
          <label className="text-sm font-normal text-gray" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          className={clsx(
            `${
              required && "border-red-primary"
            }border border-black px-4 py-2 text-base font-normal text-black outline-none focus:text-black focus:ring-0 md:px-5 md:py-3 lg:px-6 lg:py-4`,
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
