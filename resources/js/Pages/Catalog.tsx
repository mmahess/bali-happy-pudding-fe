import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

// Komponen Product Card 
const ProductCard = ({ name, description, price, image }: any) => {
    return (
        <div className="rounded-2xl overflow-hidden bg-white border border-red-700 shadow-sm flex flex-col">
            <div className="w-full aspect-4/3 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                    [ Gambar {name} ]
                </div>
            </div>
            
            <div className="p-4 flex flex-col grow">
                <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{name}</h3>
                <p className="text-gray-500 text-xs mb-4 grow font-normal">
                    {description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-2">
                    <p className="text-red-700 font-bold">
                        Rp{price.toLocaleString('id-ID')}
                    </p>
                    {/* 2. Ubah button menjadi Link dan arahkan ke rute /pesan */}
                    <Link 
                        href="/pesan" 
                        className="px-4 py-1.5 rounded-full border border-red-700 text-red-700 text-sm font-semibold hover:bg-red-50 transition-colors"
                    >
                        Buat Pesanan
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default function Catalog() {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const categories = ['Semua', 'Pudding Tart', 'Whole Pudding', 'Pudding Cup', 'Pudding Tumpeng'];

    const products = [
        { 
            id: 1, 
            name: 'Whole Pudding1', 
            description: 'Medium whole pudding size diameter 18cm dengan berbagai macam variant',
            price: 160000, 
            image: '/images/whole1.jpg' 
        },
        { 
            id: 2, 
            name: 'Whole Pudding2', 
            description: 'Medium whole pudding size diameter 18cm dengan berbagai macam variant',
            price: 260000, 
            image: '/images/whole2.jpg' 
        },
        { 
            id: 3, 
            name: 'Whole Pudding3', 
            description: 'Medium whole pudding size diameter 18cm dengan berbagai macam variant',
            price: 360000, 
            image: '/images/whole3.jpg' 
        },
        { 
            id: 4, 
            name: 'Whole Pudding4', 
            description: 'Medium whole pudding size diameter 18cm dengan berbagai macam variant',
            price: 360000, 
            image: '/images/whole3.jpg' 
        },
    ];

    return (
        // Mengubah font utama seluruh halaman menjadi Montserrat
        <div className="min-h-screen bg-[#f4efe7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            <nav className="bg-[#b91c1c] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full border border-red-200 flex items-center justify-center text-red-700 text-xs font-bold">
                                Logo
                            </div>
                        </div>
                        {/* Menggunakan Pacifico untuk nama brand */}
                        <span className="text-2xl tracking-wide font-normal mt-1" style={{ fontFamily: "'Pacifico', cursive" }}>
                            Bali Happy Pudding
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <button className="hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </button>
                        <button className="hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <header className="w-full flex flex-col">
                <div className="w-full h-64 bg-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                        [ Gambar Aneka Puding Potong ]
                    </div>
                </div>
                
                <div className="w-full bg-[#b91c1c] text-white py-8 text-center relative overflow-hidden">
                    <div className="absolute left-0 bottom-0 w-32 h-32 border border-white/10 rounded-full -ml-16 -mb-16"></div>
                    <div className="absolute right-0 bottom-0 w-32 h-32 border border-white/10 rounded-full -mr-16 -mb-16"></div>
                    
                    {/* Menggunakan Pacifico untuk judul utama hero */}
                    <h1 className="text-4xl mb-3 font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>
                        Fresh, Healthy, and Delicious
                    </h1>
                    <p className="text-sm font-medium text-red-100">
                        Pudding hias sehat dibuat segar, hanya untuk kamu
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                                activeCategory === cat 
                                ? 'bg-[#b91c1c] text-white border-[#b91c1c]' 
                                : 'bg-white text-gray-700 border-yellow-500 hover:border-red-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-800 inline-block border-b-2 border-red-700 pb-1">
                        Menu Pudding
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            name={product.name} 
                            description={product.description}
                            price={product.price} 
                            image={product.image} 
                        />
                    ))}
                </div>
            </main>

            <footer className="bg-[#b91c1c] text-white pt-10 pb-6 mt-12">
                <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
                             <div className="w-full h-full rounded-full border border-red-200 flex items-center justify-center text-red-700 text-xs font-bold">
                                Logo
                            </div>
                        </div>
                        <div>
                            {/* Menggunakan Pacifico untuk nama brand di footer */}
                            <h3 className="text-2xl mb-1 font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>Bali Happy Pudding</h3>
                            <p className="text-xs text-red-200 font-medium">Coz you're special | est. 2012</p>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <h4 className="font-bold mb-3 text-sm">Contact Us</h4>
                        <div className="flex justify-center md:justify-end gap-4 mb-3">
                            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">IG</span>
                            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">TK</span>
                            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">FB</span>
                            <span className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-xs">WA</span>
                        </div>
                        <p className="text-xs text-red-100 max-w-xs ml-auto font-medium">
                            Jl. Kerta Dalem I No. 27, Sidakarya, Denpasar Selatan, Bali
                        </p>
                    </div>
                </div>

                <div className="text-center text-xs text-red-300 mt-10 font-medium">
                    © 2026 Bali Happy Pudding
                </div>
            </footer>
        </div>
    );
}