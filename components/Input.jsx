import clsx from "clsx";
import { forwardRef } from "react";

export const Input = forwardRef(
  ({ className, name, id, placeholder, label, ...props }, ref) => {
    return (
      <>
        {label ? (
          <div className="flex flex-col">
            {label && (
              <label
                className="text-sm font-normal text-sage-10"
                htmlFor={name}
              >
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={id}
              name={name}
              placeholder={placeholder}
              className={clsx(
                "rounded-md border-transparent bg-sage-3 px-4 py-2 text-base font-normal text-sage-12 outline-none hover:bg-sage-4 focus:border-transparent focus:bg-sage-5 focus:text-black focus:ring-0",
                className,
              )}
              {...props}
            />
          </div>
        ) : (
          <input
            ref={ref}
            id={id}
            name={name}
            placeholder={placeholder}
            className={clsx(
              "rounded-md border-transparent bg-sage-3 px-4 py-2 text-base font-normal text-sage-12 outline-none hover:bg-sage-4 focus:border-transparent focus:bg-sage-5 focus:text-black focus:ring-0",
              className,
            )}
            {...props}
          />
        )}
      </>
    );
  },
);
