import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function ProductDetail() {
    // State untuk Pilihan Produk
    const [selectedVariant, setSelectedVariant] = useState<any>(null);
    const [selectedSize, setSelectedSize] = useState<any>(null);
    
    // State untuk Form Input
    const [formData, setFormData] = useState({
        date: '',
        orderer: '',
        receiver: '',
        phone: '',
        address: '',
        note: ''
    });

    // State untuk Modal Konfirmasi
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Data Pilihan (Bisa dari Database nantinya)
    const variants = [
        { name: 'Buah Tropis', price: 160000 },
        { name: 'Strawberry Lychee', price: 175000 },
        { name: 'Mix Buah Premium', price: 195000 },
        { name: 'Mangga Kiwi', price: 180000 },
        { name: 'Coklat Mousse', price: 170000 },
    ];

    const sizes = [
        { name: 'Diameter 18cm', addPrice: 0, labelLabel: '' },
        { name: 'Diameter 22cm', addPrice: 60000, labelLabel: '+60K' },
        { name: 'Diameter 26cm', addPrice: 130000, labelLabel: '+130K' },
    ];

    // Perhitungan Total Harga Dinamis
    const basePrice = selectedVariant ? selectedVariant.price : 160000;
    const extraPrice = selectedSize ? selectedSize.addPrice : 0;
    const totalPrice = basePrice + extraPrice;

    // Handle Perubahan Input Form
    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Submit Pesanan
    const handleSubmit = () => {
        if (!selectedVariant || !selectedSize) {
            alert('Silakan pilih varian dan ukuran puding terlebih dahulu.');
            return;
        }
        if (!formData.date || !formData.orderer || !formData.receiver || !formData.phone || !formData.address) {
            alert('Mohon lengkapi data pemesan dan pengiriman yang wajib diisi (*).');
            return;
        }
        setIsModalOpen(true);
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

            {/* PAGE LAYOUT */}
            <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8 items-start">
                
                {/* KIRI: PRODUCT INFO (Sticky) */}
                <div className="w-full md:w-100 md:sticky md:top-24">
                    {/* Gambar Produk */}
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
                            Whole Pudding Buah Segar
                        </h1>
                        <p className="text-[#7a6060] text-sm leading-relaxed mb-4 text-justify">
                            Puding lembut berlapis jelly bening dengan topping buah-buahan segar pilihan. 
                            Dibuat fresh setiap hari, tanpa pengawet, cocok untuk hadiah maupun konsumsi keluarga.
                        </p>

                        <p className="text-[#7a6060] text-sm leading-relaxed mb-4">
                            Harga sudah termasuk: <br />
                            - Vla (200 ml) <br />
                            - Lilin (hanya untuk ulang tahun) <br />
                            - Ucapan (sesuai request) <br />
                            - Greeting Card (sesuai request)
                        </p>

                        {/* Summary Box (Muncul jika ada yang dipilih) */}
                        {(selectedVariant || selectedSize) && (
                            <div className="bg-[#fdf0f0] border-2 border-[#f0c8c8] rounded-xl p-4 mt-4 animate-fade-in">
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

                {/* KANAN: ORDER FORM */}
                <div className="w-full flex-1 flex flex-col gap-5">
                    
                    {/* SECTION 1: Pilihan Produk */}
                    <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#fdf0f0] rounded-lg flex items-center justify-center text-sm">🍮</span>
                            Pilihan Produk
                        </h2>

                        {/* Varian */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-3">
                                Varian Pudding <span className="text-[#b31c24]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {variants.map((v) => (
                                    <button 
                                        key={v.name}
                                        onClick={() => setSelectedVariant(v)}
                                        className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                                            selectedVariant?.name === v.name 
                                            ? 'bg-[#b31c24] border-[#b31c24] text-white shadow-md' 
                                            : 'bg-white border-[#e8d5c4] text-gray-700 hover:border-[#b31c24] hover:text-[#b31c24]'
                                        }`}
                                    >
                                        {v.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ukuran */}
                        <div>
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-3">
                                Ukuran <span className="text-[#b31c24]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((s) => (
                                    <button 
                                        key={s.name}
                                        onClick={() => setSelectedSize(s)}
                                        className={`px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                                            selectedSize?.name === s.name 
                                            ? 'bg-[#b31c24] border-[#b31c24] text-white shadow-md' 
                                            : 'bg-white border-[#e8d5c4] text-gray-700 hover:border-[#b31c24] hover:text-[#b31c24]'
                                        }`}
                                    >
                                        {s.name} {s.labelLabel && <span className="text-xs opacity-70 ml-1">{s.labelLabel}</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Jadwal Pengiriman */}
                    <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#fdf0f0] rounded-lg flex items-center justify-center text-sm">📅</span>
                            Jadwal Pengiriman
                        </h2>
                        <div>
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">
                                Tanggal Pengambilan / Pengiriman <span className="text-[#b31c24]">*</span>
                            </label>
                            <input 
                                type="date" 
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white focus:ring-4 focus:ring-[#fdf0f0] outline-none transition-all"
                            />
                            <p className="text-xs text-[#7a6060] mt-2 font-medium">⚠️ Pemesanan minimal H-2 hari sebelum tanggal pengiriman.</p>
                        </div>
                    </div>

                    {/* SECTION 3: Data Pemesan */}
                    <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#fdf0f0] rounded-lg flex items-center justify-center text-sm">👤</span>
                            Data Pemesan & Penerima
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">Nama Pemesan <span className="text-[#b31c24]">*</span></label>
                                <input type="text" name="orderer" value={formData.orderer} onChange={handleInputChange} placeholder="Nama kamu" className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">Nama Penerima <span className="text-[#b31c24]">*</span></label>
                                <input type="text" name="receiver" value={formData.receiver} onChange={handleInputChange} placeholder="Nama penerima" className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white outline-none transition-all" />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">Nomor WhatsApp Penerima <span className="text-[#b31c24]">*</span></label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="08xxxxxxxxxx" className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white outline-none transition-all" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">Alamat Penerima <span className="text-[#b31c24]">*</span></label>
                            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Jl. ..., Kelurahan, Kota" className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white outline-none transition-all" />
                        </div>
                    </div>

                    {/* SECTION 4: Catatan Khusus */}
                    <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm mb-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <span className="w-8 h-8 bg-[#fdf0f0] rounded-lg flex items-center justify-center text-sm">✨</span>
                            Special Request
                        </h2>
                        <div>
                            <label className="block text-xs font-bold text-[#7a6060] tracking-wider uppercase mb-2">Catatan / Permintaan Khusus</label>
                            <textarea name="note" value={formData.note} onChange={handleInputChange} placeholder="Contoh: Ucapan 'Selamat Ulang Tahun Aji'" className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800 focus:border-[#b31c24] focus:bg-white outline-none transition-all min-h-25 resize-y"></textarea>
                            <p className="text-xs text-[#7a6060] mt-2 font-medium">💡 Opsional — isi jika ada permintaan tema atau ucapan.</p>
                            <p className="text-xs text-[#7a6060] mt-2 font-medium">Permintaan tambahan seperti cake topper, cetak foto, dan edible print dapat mempengaruhi harga. Lihat additional request untuk info lebih lanjut. </p>
                        </div>
                    </div>

                    {/* Tombol Submit (Sticky Bottom Mobile) */}
                    <div className="sticky bottom-4 md:static z-40 bg-[#fdf6ee]/90 backdrop-blur-sm p-2 -mx-2 md:mx-0 md:p-0 md:bg-transparent rounded-2xl">
                        <button 
                            onClick={handleSubmit}
                            className="w-full bg-[#b31c24] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(179,28,36,0.3)] hover:bg-[#8a1219] hover:-translate-y-1 transition-all flex justify-center items-center gap-2"
                        >
                            🛒 Tambah ke Keranjang
                        </button>
                    </div>

                </div>
            </div>

            {/* MODAL KONFIRMASI */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl scale-100 transition-transform">
                        <div className="text-5xl mb-4">🎉</div>
                        <h3 className="text-2xl text-[#b31c24] mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>Pesanan Dibuat!</h3>
                        <p className="text-gray-500 text-sm mb-6">Ringkasan pesananmu sudah diterima. Lanjutkan ke WhatsApp untuk konfirmasi dan menyelesaikan pembayaran</p>
                        
                        <div className="bg-[#fdf0f0] rounded-xl p-4 text-left text-sm text-gray-700 mb-6 space-y-1">
                            <p><strong>Produk:</strong> Whole Pudding Buah Segar</p>
                            <p><strong>Varian:</strong> {selectedVariant?.name}</p>
                            <p><strong>Ukuran:</strong> {selectedSize?.name}</p>
                            <p><strong>Tanggal:</strong> {formData.date}</p>
                            <p><strong>Penerima:</strong> {formData.receiver} ({formData.phone})</p>
                            <hr className="border-[#f0c8c8] my-2" />
                            <p className="text-lg font-bold text-[#b31c24]">Total: Rp {totalPrice.toLocaleString('id-ID')}</p>
                        </div>

                        <button className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold mb-3 hover:bg-[#1da851] transition-colors shadow-md flex justify-center items-center gap-2">
                            💬 Kirim via WhatsApp
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="w-full bg-white text-gray-500 border-2 border-gray-200 py-3 rounded-xl font-bold hover:border-gray-400 hover:text-gray-700 transition-colors"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}