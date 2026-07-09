import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(function PasswordInput(
  { label, error, className = "", ...props },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const generatedId = useId();
  const id = props.id || generatedId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-text">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={isVisible ? "text" : "password"}
          className={`input-field pr-11 ${error ? "input-error" : ""}`}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <button
          type="button"
          onClick={() => setIsVisible((v) => !v)}
          tabIndex={-1}
          aria-label={isVisible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 hover:text-slate-600"
        >
          {isVisible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});

export default PasswordInput;
