import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = "", ...props }: InputProps) {
    return (
        <input
            className={`border-solid border-2 border-blue-400 rounded-lg w-full ps-1 ${className}`}
            {...props}
        />
    );
}
