import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export default function Textarea({
    className = "",
    ...props
}: TextareaProps) {
    return (
        <textarea
            className={`border-solid border-2 border-blue-400 rounded-lg w-full ps-1 ${className}`}
            {...props}
        />
    );
}
