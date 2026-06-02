import React from "react";

export function MarketChartBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-market-grid opacity-30" />

            {/* SVG Candlestick & Trend Line Illustration */}
            <svg
                className="absolute inset-0 w-full h-full opacity-[0.05]"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                viewBox="0 0 1000 600"
            >
                {/* Y-axis labels / metrics */}
                <text x="20" y="80" fill="#9298A0" fontSize="10" fontFamily="monospace">98.937</text>
                <text x="20" y="180" fill="#9298A0" fontSize="10" fontFamily="monospace">74.849</text>
                <text x="20" y="280" fill="#9298A0" fontSize="10" fontFamily="monospace">42.268</text>
                <text x="20" y="380" fill="#9298A0" fontSize="10" fontFamily="monospace">24.115</text>
                <text x="20" y="480" fill="#9298A0" fontSize="10" fontFamily="monospace">18.823</text>

                {/* X-axis labels / timestamps */}
                <text x="150" y="580" fill="#9298A0" fontSize="10" fontFamily="monospace">10:30</text>
                <text x="350" y="580" fill="#9298A0" fontSize="10" fontFamily="monospace">11:45</text>
                <text x="550" y="580" fill="#9298A0" fontSize="10" fontFamily="monospace">13:15</text>
                <text x="750" y="580" fill="#9298A0" fontSize="10" fontFamily="monospace">14:30</text>
                <text x="950" y="580" fill="#9298A0" fontSize="10" fontFamily="monospace">15:30</text>

                {/* Grid Lines inside SVG */}
                <line x1="80" y1="0" x2="80" y2="600" stroke="#1A2230" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="280" y1="0" x2="280" y2="600" stroke="#1A2230" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="480" y1="0" x2="480" y2="600" stroke="#1A2230" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="680" y1="0" x2="680" y2="600" stroke="#1A2230" strokeWidth="1" strokeDasharray="5,5" />
                <line x1="880" y1="0" x2="880" y2="600" stroke="#1A2230" strokeWidth="1" strokeDasharray="5,5" />

                {/* Trend Wave 1 (Accent Green) */}
                <path
                    d="M 0 450 Q 150 400 250 480 T 500 250 T 750 320 T 1000 150"
                    fill="none"
                    stroke="#33D097"
                    strokeWidth="2"
                    strokeDasharray="2,2"
                />

                {/* Trend Wave 2 (Accent Green/Cyan Solid) */}
                <path
                    d="M 0 350 C 150 320, 200 420, 350 300 C 500 180, 600 280, 750 180 C 900 80, 950 120, 1000 60"
                    fill="none"
                    stroke="#33D097"
                    strokeWidth="1.5"
                />

                {/* Candlesticks - Green (Bullish) */}
                <g fill="#33D097" stroke="#33D097">
                    {/* Candle 1 */}
                    <line x1="120" y1="360" x2="120" y2="440" strokeWidth="1" />
                    <rect x="116" y="380" width="8" height="40" />

                    {/* Candle 2 */}
                    <line x1="200" y1="400" x2="200" y2="470" strokeWidth="1" />
                    <rect x="196" y="420" width="8" height="30" />

                    {/* Candle 3 */}
                    <line x1="380" y1="220" x2="380" y2="300" strokeWidth="1" />
                    <rect x="376" y="235" width="8" height="50" />

                    {/* Candle 4 */}
                    <line x1="520" y1="160" x2="520" y2="240" strokeWidth="1" />
                    <rect x="516" y="170" width="8" height="55" />

                    {/* Candle 5 */}
                    <line x1="680" y1="200" x2="680" y2="280" strokeWidth="1" />
                    <rect x="676" y="210" width="8" height="50" />

                    {/* Candle 6 */}
                    <line x1="820" y1="120" x2="820" y2="190" strokeWidth="1" />
                    <rect x="816" y="130" width="8" height="45" />

                    {/* Candle 7 */}
                    <line x1="900" y1="70" x2="900" y2="150" strokeWidth="1" />
                    <rect x="896" y="80" width="8" height="55" />
                </g>

                {/* Candlesticks - Red (Bearish) */}
                <g fill="#EF4444" stroke="#EF4444">
                    {/* Candle A */}
                    <line x1="160" y1="410" x2="160" y2="480" strokeWidth="1" />
                    <rect x="156" y="430" width="8" height="35" />

                    {/* Candle B */}
                    <line x1="240" y1="440" x2="240" y2="510" strokeWidth="1" />
                    <rect x="236" y="450" width="8" height="45" />

                    {/* Candle C */}
                    <line x1="440" y1="270" x2="440" y2="340" strokeWidth="1" />
                    <rect x="436" y="280" width="8" height="40" />

                    {/* Candle D */}
                    <line x1="600" y1="210" x2="600" y2="290" strokeWidth="1" />
                    <rect x="596" y="230" width="8" height="45" />

                    {/* Candle E */}
                    <line x1="740" y1="250" x2="740" y2="330" strokeWidth="1" />
                    <rect x="736" y="260" width="8" height="55" />

                    {/* Candle F */}
                    <line x1="940" y1="100" x2="940" y2="180" strokeWidth="1" />
                    <rect x="936" y="120" width="8" height="45" />
                </g>
            </svg>
        </div>
    );
}

export default MarketChartBackground;
