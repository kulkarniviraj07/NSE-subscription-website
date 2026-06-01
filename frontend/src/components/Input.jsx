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
                bg-white
                border
                border-slate-200
                rounded-xl
                text-slate-900
                placeholder-slate-400
                font-medium
                text-base
                transition-all
                duration-200
                focus:outline-none
                focus:border-[#2563EB]
                focus:ring-4
                focus:ring-blue-50
                hover:border-slate-300
            "
            {...props}
        />
    );
}

export default Input;