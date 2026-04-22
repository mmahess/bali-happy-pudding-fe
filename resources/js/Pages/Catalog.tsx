import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// Komponen Product Card 
const ProductCard = ({ id, name, description, price, image }: any) => {
    return (
        <div className="rounded-2xl overflow-hidden bg-white border border-red-700 shadow-sm flex flex-col">
            <div className="w-full aspect-4/3 bg-gray-200 relative">
                {image && image !== '' ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = `<div class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center px-4">[ Gambar ${name} ]</div>`; }} />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center px-4">
                        [ Gambar {name} ]
                    </div>
                )}
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
                    <Link
                        href={`/pesan?id=${id}`}
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
    const [cartCount, setCartCount] = useState(0);

    const categories = ['Semua', 'Pudding Tart', 'Whole Pudding', 'Pudding Cup', 'Pudding Tumpeng'];

    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [banners, setBanners] = useState<string[]>([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    // Membaca data dari localStorage saat halaman dimuat
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartCount(savedCart.length);

        let savedProducts = JSON.parse(localStorage.getItem('allProducts') || 'null');
        if (!savedProducts) {
            savedProducts = [
                {
                    id: 1, name: 'Whole Pudding', category: 'Whole Pudding', description: 'Puding lembut berlapis jelly bening dengan topping buah-buahan segar pilihan. Dibuat fresh setiap hari.', basePrice: 160000, price: 160000, image: '/images/whole1.jpg',
                    variants: [{ name: 'Choco Oreo' }, { name: 'Kelapa Pandan' }, { name: 'Es Teler' }, { name: 'Mozaik' }, { name: 'Regal' }, { name: 'Lumut' }],
                    sizes: [{ name: 'Diameter 18cm', price: 160000, label: '160K' }, { name: 'Diameter 20cm', price: 180000, label: '180K' }, { name: 'Diameter 22cm', price: 220000, label: '220K' }, { name: 'Diameter 26cm', price: 290000, label: '290K' }]
                },
                {
                    id: 2, name: 'Pudding Tart Kotak Panjang', category: 'Pudding Tart', description: 'Pudding tart berbentuk kotak memanjang ukuran 21x9cm, cocok untuk acara keluarga kecil atau hantaran manis.', basePrice: 160000, price: 160000, image: '/images/whole2.jpg',
                    variants: [{ name: 'Black Forest' }, { name: 'Buah' }, { name: 'Tiramissu' }, { name: 'Es Teler' }, { name: 'Strawberry Cheese' }, { name: 'Kelapa Pandan' }, { name: 'Choco Marble' }],
                    sizes: [{ name: 'Ukuran 21x9cm', price: 160000, label: '160K' }, { name: 'Ukuran 25x10cm', price: 200000, label: '200K' }]
                },
                {
                    id: 3, name: 'Pudding Tart Bulat', category: 'Pudding Tart', description: 'Pudding tart bundar elegan dengan kombinasi rasa premium, sangat pas untuk kue ulang tahun atau perayaan.', basePrice: 260000, price: 260000, image: '/images/whole3.jpg',
                    variants: [{ name: 'Black Forest' }, { name: 'Buah' }, { name: 'Tiramissu' }, { name: 'Es Teler' }, { name: 'Strawberry Cheese' }, { name: 'Kelapa Pandan' }, { name: 'Choco Marble' }],
                    sizes: [{ name: 'Diameter 18cm', price: 260000, label: '260K' }, { name: 'Diameter 20cm', price: 290000, label: '290K' }]
                },
                {
                    id: 4, name: 'Pudding Cup', category: 'Pudding Cup', description: 'Pudding mini dalam wadah cup praktis. Hadir dalam satu box yang berisi berbagai pilihan rasa menarik.', basePrice: 55000, price: 55000, image: '/images/whole3.jpg',
                    variants: [{ name: 'Choco Lava' }, { name: 'Strawberry' }, { name: 'Black Forest' }, { name: 'Tiramissu' }, { name: 'Es Teler' }, { name: 'Kelapa Pandan' }, { name: 'Buah' }, { name: 'Mango Cocktail' }],
                    sizes: [{ name: 'Box Isi 8 Pcs', price: 55000, label: '55K' }, { name: 'Box Isi 12 Pcs', price: 80000, label: '80K' }]
                }
            ];
            localStorage.setItem('allProducts', JSON.stringify(savedProducts));
        }
        setAllProducts(savedProducts);

        const savedBanners = JSON.parse(localStorage.getItem('catalogBanners') || '[]');
        setBanners(savedBanners);
    }, []);

    // Logika Slideshow Banner
    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentBannerIndex(prev => (prev + 1) % banners.length);
        }, 4000); // Ganti banner setiap 4 detik
        return () => clearInterval(interval);
    }, [banners.length]);

    return (
        <div className="min-h-screen bg-[#f4efe7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <nav className="bg-[#b31c24] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full border border-red-200 flex items-center justify-center text-[#b31c24] text-xs font-bold">
                                Logo
                            </div>
                        </div>
                        <span className="text-2xl tracking-wide font-normal mt-1" style={{ fontFamily: "'Pacifico', cursive" }}>
                            Bali Happy Pudding
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Ikon Keranjang diubah menjadi Link dan ditambah badge */}
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
                        <button className="hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Header, Main, dan Footer (Tetap sama seperti file asli Anda) */}
            <header className="w-full flex flex-col">
                <div className="w-full h-64 bg-gray-300 relative overflow-hidden">
                    {banners.length > 0 ? (
                        banners.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`Banner ${index + 1}`}
                                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                onError={(e) => { e.currentTarget.style.display = 'none'; if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = `<div class="absolute inset-0 flex items-center justify-center text-gray-500 font-medium bg-gray-300">[ Gambar Banner ${index + 1} Tidak Ditemukan ]</div>`; }}
                            />
                        ))
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                            [ Gambar Aneka Pudding - Slideshow Banner Kosong ]
                        </div>
                    )}
                </div>
                <div className="w-full bg-[#b31c24] text-white py-8 text-center relative overflow-hidden">
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
                            className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-colors ${activeCategory === cat
                                ? 'bg-[#b31c24] text-white border-[#b31c24]'
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
                    {allProducts.filter(p => activeCategory === 'Semua' || p.category === activeCategory).map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.basePrice || product.price}
                            image={product.image}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}