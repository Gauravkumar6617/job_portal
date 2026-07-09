import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, error, type = "text", className = "", ...props },
  ref,
) {
  const generatedId = useId();
  const id = props.id || generatedId;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="label-text">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`input-field ${error ? "input-error" : ""}`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
