import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

interface NavbarProps {
    title?: string;
    showBackButton?: boolean;
    backUrl?: string;
    showCart?: boolean;
    showMenu?: boolean;
    containerClass?: string;
}

export default function Navbar({
    title = 'Bali Happy Pudding',
    showBackButton = false,
    backUrl = '/katalog',
    showCart = true,
    showMenu = false,
    containerClass = 'container mx-auto flex justify-between items-center px-4 max-w-5xl'
}: NavbarProps) {
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        if (showCart) {
            const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            setCartCount(savedCart.length);
        }
    }, [showCart]);

    return (
        <nav className="bg-[#b31c24] text-white p-4 sticky top-0 z-50 shadow-md">
            <div className={containerClass}>
                {/* LEFT SECTION: Back Button OR Logo */}
                {showBackButton ? (
                    <Link
                        href={backUrl}
                        className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full text-sm font-bold transition-colors"
                    >
                        ← Kembali
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full border border-red-200 flex items-center justify-center text-[#b31c24] text-xs font-bold">
                                Logo
                            </div>
                        </div>
                        {/* Only show title here if we don't have a back button, otherwise title is centered */}
                        <span className="text-2xl tracking-wide font-normal mt-1" style={{ fontFamily: "'Pacifico', cursive" }}>
                            {title}
                        </span>
                    </div>
                )}

                {/* CENTER TITLE: Only shown when there is a back button */}
                {showBackButton && (
                    <span className="text-2xl font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>
                        {title}
                    </span>
                )}

                {/* RIGHT SECTION: Cart and/or Menu */}
                <div className="flex items-center gap-4">
                    {showCart && (
                        <Link href="/keranjang" className="relative hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-2 bg-yellow-400 text-red-900 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Dummy div to balance the flex space-between if no right-side items are shown */}
                    {!showCart && !showMenu && showBackButton && (
                        <div className="w-10"></div>
                    )}
                </div>
            </div>
        </nav>
    );
}
