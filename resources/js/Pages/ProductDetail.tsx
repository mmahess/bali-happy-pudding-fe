import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function ProductDetail() {
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState<any>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [addedItemDetails, setAddedItemDetails] = useState<any>(null);



    const productsDatabase = [
        {
            id: 1,
            name: 'Whole Pudding',
            description: 'Puding lembut berlapis jelly bening dengan topping buah-buahan segar pilihan. Dibuat fresh setiap hari.',
            basePrice: 160000,
            variants: [
                { name: 'Choco Oreo' },
                { name: 'Kelapa Pandan' },
                { name: 'Es Teler' },
                { name: 'Mozaik' },
                { name: 'Regal' },
                { name: 'Lumut' },
            ],
            sizes: [
                { name: 'Diameter 18cm', price: 160000, label: '160K' },
                { name: 'Diameter 20cm', price: 180000, label: '180K' },
                { name: 'Diameter 22cm', price: 220000, label: '220K' },
                { name: 'Diameter 26cm', price: 290000, label: '290K' },
            ]
        },
        {
            id: 2,
            name: 'Pudding Tart Kotak Panjang',
            description: 'Pudding tart berbentuk kotak memanjang ukuran 21x9cm, cocok untuk acara keluarga kecil atau hantaran manis.',
            basePrice: 160000,
            variants: [
                { name: 'Black Forest' },
                { name: 'Buah' },
                { name: 'Tiramissu' },
                { name: 'Es Teler' },
                { name: 'Strawberry Cheese' },
                { name: 'Kelapa Pandan' },
                { name: 'Choco Marble' },
            ],
            sizes: [
                { name: 'Ukuran 21x9cm', price: 160000, label: '160K' },
                { name: 'Ukuran 25x10cm', price: 200000, label: '200K' },
            ]
        },
        {
            id: 3,
            name: 'Pudding Tart Bulat',
            description: 'Pudding tart bundar elegan dengan kombinasi rasa premium, sangat pas untuk kue ulang tahun atau perayaan.',
            basePrice: 260000,
            variants: [
                { name: 'Black Forest' },
                { name: 'Buah' },
                { name: 'Tiramissu' },
                { name: 'Es Teler' },
                { name: 'Strawberry Cheese' },
                { name: 'Kelapa Pandan' },
                { name: 'Choco Marble' },
            ],
            sizes: [
                { name: 'Diameter 18cm', price: 260000, label: '260K' },
                { name: 'Diameter 20cm', price: 290000, label: '290K' },
            ]
        },
        {
            id: 4,
            name: 'Pudding Cup',
            description: 'Pudding mini dalam wadah cup praktis. Hadir dalam satu box yang berisi berbagai pilihan rasa menarik.',
            basePrice: 55000,
            variants: [
                { name: 'Choco Lava' },
                { name: 'Strawberry' },
                { name: 'Black Forest' },
                { name: 'Tiramissu' },
                { name: 'Es Teler' },
                { name: 'Kelapa Pandan' },
                { name: 'Buah' },
                { name: 'Mango Cocktail' },
            ],
            sizes: [
                { name: 'Box Isi 8 Pcs', price: 55000, label: '55K' },
                { name: 'Box Isi 12 Pcs', price: 80000, label: '80K' },
            ]
        }
    ];

    // Dapatkan ID dari URL
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const idParam = params.get('id');
    const productId = idParam ? parseInt(idParam) : 1;

    const product = productsDatabase.find(p => p.id === productId) || productsDatabase[0];
    const variants = product.variants;
    const sizes = product.sizes;
    const totalPrice = selectedSize ? selectedSize.price : product.basePrice;

    const handleSubmit = () => {
        if (!selectedVariant || !selectedSize) {
            alert('Silakan pilih varian dan ukuran puding terlebih dahulu.');
            return;
        }

        // Simpan semua data ke objek keranjang
        const newItem = {
            id: Date.now(),
            name: product.name,
            variant: selectedVariant.name,
            size: selectedSize.name,
            price: totalPrice
        };

        // Simpan ke localStorage
        const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
        localStorage.setItem('cart', JSON.stringify([...existingCart, newItem]));

        setAddedItemDetails(newItem);
        setShowSuccessModal(true);
    };

    return (
        <div className="min-h-screen bg-[#f4efe7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <nav className="bg-[#b31c24] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center max-w-5xl px-2">
                    <Link
                        href="/katalog"
                        className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full text-sm font-bold transition-colors"
                    >
                        ← Kembali
                    </Link>
                    <span className="text-2xl font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>
                        Buat Pesanan
                    </span>
                    <div className="flex items-center gap-4">
                        <Link href="/keranjang" className="hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-start">

                {/* KIRI: PRODUCT INFO (Sticky) - Tetap sama */}
                <div className="w-full md:w-100 md:sticky md:top-24">
                    <div className="w-full h-64 bg-gray-300 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                            [ Gambar Puding ]
                        </div>
                    </div>

                    <div className="pt-6">
                        <div className="text-xs font-extrabold text-[#b31c24] tracking-[0.15em] uppercase mb-2">
                            Whole Pudding
                        </div>
                        <h1 className="text-3xl text-gray-900 mb-3 leading-tight" style={{ fontFamily: "'Pacifico', cursive" }}>
                            {product.name}
                        </h1>
                        <p className="text-[#7a6060] text-sm leading-relaxed mb-4 text-justify">
                            {product.description}
                        </p>

                        {(selectedVariant || selectedSize) && (
                            <div className="bg-[#fdf0f0] border-2 border-[#f0c8c8] rounded-xl p-4 mt-4">
                                <div className="flex justify-between text-sm text-[#7a6060] mb-2 font-medium">
                                    <span>{selectedVariant ? selectedVariant.name : '—'}</span>
                                    <span>{selectedSize ? selectedSize.name : '—'}</span>
                                </div>
                                <div className="flex justify-between border-t border-[#f0c8c8] pt-2 mt-2 font-bold text-[#b31c24] text-base">
                                    <span>Total Harga</span>
                                    <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* KANAN: ORDER FORM - Tetap sama, hanya tombol disesuaikan */}
                <div className="w-full flex-1 flex flex-col gap-5">
                    {/* SECTION 1: Pilihan Produk */}
                    <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">Pilihan Produk</h2>
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-[#7a6060] uppercase mb-3">Varian <span className="text-[#b31c24]">*</span></label>
                            <div className="flex flex-wrap gap-2">
                                {variants.map((v) => (
                                    <button
                                        key={v.name} onClick={() => setSelectedVariant(v)}
                                        className={`px-4 py-2 rounded-xl border-2 font-bold text-sm ${selectedVariant?.name === v.name ? 'bg-[#b31c24] border-[#b31c24] text-white' : 'bg-white border-[#e8d5c4] text-gray-700'}`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#7a6060] uppercase mb-3">Ukuran <span className="text-[#b31c24]">*</span></label>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((s) => (
                                    <button
                                        key={s.name} onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 rounded-xl border-2 font-bold text-sm ${selectedSize?.name === s.name ? 'bg-[#b31c24] border-[#b31c24] text-white' : 'bg-white border-[#e8d5c4] text-gray-700'}`}
                                    >
                                        {s.name} <span className="text-xs opacity-70 ml-1">({s.label})</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tombol Submit Mengarah ke Keranjang */}
                    <div className="sticky bottom-4 md:static z-40 bg-[#fdf6ee]/90 backdrop-blur-sm p-2 rounded-2xl">
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#b31c24] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(179,28,36,0.3)] hover:bg-[#8a1219] transition-all"
                        >
                            🛒 Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Sukses */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all text-center">
                        <div className="w-20 h-20 bg-[#fdf0f0] rounded-full flex items-center justify-center mx-auto mb-5 text-4xl">
                            ✅
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil!</h2>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            Pesanan <strong>{addedItemDetails?.variant}</strong> ({addedItemDetails?.size}) telah ditambahkan ke keranjang.
                        </p>

                        <div className="flex flex-col gap-3">
                            <Link
                                href="/keranjang"
                                className="w-full bg-[#b31c24] text-white py-3 rounded-xl font-bold text-base shadow-md hover:bg-[#8a1219] transition-all flex items-center justify-center"
                            >
                                🛒 Lihat Keranjang
                            </Link>
                            <Link
                                href="/katalog"
                                className="w-full bg-white text-[#b31c24] border-2 border-[#b31c24] py-3 rounded-xl font-bold text-base hover:bg-[#fdf0f0] transition-all flex items-center justify-center"
                            >
                                Pesan Lagi
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}