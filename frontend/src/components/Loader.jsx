function Loader() {
    return (
        <div className="flex justify-center items-center py-6">
            <div className="relative">
                {/* Outer helper ring */}
                <div className="h-10 w-10 rounded-full border-4 border-slate-100" />
                
                {/* Spinning overlay */}
                <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-t-[#2563EB] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
        </div>
    );
}

export default Loader;