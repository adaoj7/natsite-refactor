import React from "react";
import { forwardRef } from "react";

interface CustomInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CustomPhoneInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput(props, ref) {
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      // If props.onChange is provided, call it with the new value
      if (props.onChange) {
        props.onChange(event.target.value);
      }
    }
    return (
      <input
        type="tel"
        ref={ref}
        value={props.value}
        onChange={handleChange}
        autoComplete="tel"
        placeholder="Enter phone number"
        className={`focus:outline-none ${props.className}`}
      />
    );
  }
);

export default CustomPhoneInput;
