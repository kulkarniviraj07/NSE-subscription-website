function Loader() {
    return (
        <div className="flex justify-center items-center py-6">
            <div className="relative">
                {/* Outer helper ring */}
                <div className="h-10 w-10 rounded-full border-4 border-[#222A38]" />
                
                {/* Spinning overlay */}
                <div className="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-t-[#33D097] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
            </div>
        </div>
    );
}

export default Loader;