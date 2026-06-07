import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full border-t border-[#222A38] bg-[#0C0E14] py-6 relative z-10 text-xs font-mono">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                <p className="text-[#6B7280]">
                    &copy; {new Date().getFullYear()} EquityAlerts. All rights reserved.
                </p>
                
                <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[#9298A0]">
                    <Link to="/privacy-policy" className="hover:text-[#33D097] transition duration-150">
                        Privacy Policy
                    </Link>
                    <span className="text-[#222A38] hidden sm:inline">|</span>
                    <Link to="/terms-of-service" className="hover:text-[#33D097] transition duration-150">
                        Terms of Service
                    </Link>
                    <span className="text-[#222A38] hidden sm:inline">|</span>
                    <Link to="/disclaimer" className="hover:text-[#33D097] transition duration-150">
                        Disclaimer
                    </Link>
                </div>
            </div>
        </footer>
    );
}