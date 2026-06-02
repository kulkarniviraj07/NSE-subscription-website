function Input({
    value,
    onChange,
    placeholder,
    type = "text",
    ...props
}) {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className="
                w-full
                h-14
                px-4
                bg-[#151921]
                border
                border-[#222A38]
                rounded-xl
                text-[#E3E5EA]
                placeholder-[#6B7280]
                font-medium
                text-base
                transition-all
                duration-200
                focus:outline-none
                focus:border-[#33D097]
                focus:ring-2
                focus:ring-[#33D097]/20
                hover:border-[#222A38]/80
            "
            {...props}
        />
    );
}

export default Input;