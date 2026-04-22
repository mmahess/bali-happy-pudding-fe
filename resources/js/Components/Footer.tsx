import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#8a1219] text-red-100 py-12 mt-12">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4 mb-10">

                    {/* Brand & Tagline (Kiri) */}
                    <div className="flex flex-col items-start w-full md:w-1/3">
                        <div className="text-3xl mb-2 text-white" style={{ fontFamily: "'Pacifico', cursive" }}>
                            Bali Happy Pudding
                        </div>
                        <p className="text-base font-medium opacity-90 italic mb-4">"Coz you're special"</p>
                        <p className="text-sm opacity-75 leading-relaxed">
                            Pudding hias sehat dibuat segar, hanya untuk kamu. Dibuat dengan bahan premium untuk setiap momen spesial.
                        </p>
                    </div>

                    {/* Social Media & Contact (Tengah) */}
                    <div className="flex flex-col items-start w-full md:w-1/3 md:pl-8">
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm opacity-90">Hubungi Kami</h4>
                        <div className="flex flex-col gap-3">
                            <a href="https://wa.me/6282236328389" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors text-sm">
                                <span className="text-xl">💬</span> +62 822-3632-8389
                            </a>
                            <a href="https://www.instagram.com/balihappypudding" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors text-sm">
                                <span className="text-xl">📸</span> @balihappypudding
                            </a>
                            <a href="https://www.facebook.com/dewiastinihappypuddingbali" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-white transition-colors text-sm">
                                <span className="text-xl">📘</span> Facebook
                            </a>
                        </div>
                    </div>

                    {/* Address (Kanan) */}
                    <div className="flex flex-col items-start w-full md:w-1/3">
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm opacity-90">Lokasi Kami</h4>
                        <a
                            href="https://maps.app.goo.gl/cKNtJQWSWLtgswgUA"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-start gap-3 hover:text-white transition-colors text-sm"
                        >
                            <span className="text-xl mt-0.5">📍</span>
                            <span className="leading-relaxed">Jl. Kerta Dalem I No. 27 Sidakarya,<br />Denpasar Selatan, Bali.</span>
                        </a>
                    </div>

                </div>

                <div className="border-t border-red-900/60 w-full pt-6 text-xs opacity-70 flex justify-center md:justify-start">
                    <span>&copy; {new Date().getFullYear()} Bali Happy Pudding. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
