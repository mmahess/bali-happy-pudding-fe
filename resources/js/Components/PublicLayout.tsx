import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PublicLayoutProps {
    children: React.ReactNode;
    navbarProps?: {
        title?: string;
        showBackButton?: boolean;
        backUrl?: string;
        showCart?: boolean;
        showMenu?: boolean;
        containerClass?: string;
    };
}

export default function PublicLayout({ children, navbarProps }: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f4efe7] flex flex-col" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <Navbar {...navbarProps} />
            <div className="flex-grow">
                {children}
            </div>
            <Footer />
        </div>
    );
}
