import React from 'react';
import { Toaster } from 'react-hot-toast';
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
            <Toaster 
                position="bottom-center"
                toastOptions={{
                    success: {
                        style: {
                            border: '2px solid #e8d5c4',
                            padding: '16px',
                            color: '#b31c24',
                            fontWeight: 'bold',
                            background: '#fdf6ee'
                        },
                        iconTheme: {
                            primary: '#b31c24',
                            secondary: '#FFFAEE',
                        },
                    },
                    error: {
                        style: {
                            border: '2px solid #b31c24',
                            padding: '16px',
                            color: '#fff',
                            fontWeight: 'bold',
                            background: '#b31c24'
                        },
                        iconTheme: {
                            primary: '#fff',
                            secondary: '#b31c24',
                        },
                    }
                }}
            />
        </div>
    );
}
