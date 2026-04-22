import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Cart() {
    const [cartItems, setCartItems] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        date: '',
        orderer: '',
        receiver: '',
        phone: '',
        address: '',
        note: ''
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCart);
    }, []);

    const handleInputChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 2);
    const year = minDate.getFullYear();
    const month = String(minDate.getMonth() + 1).padStart(2, '0');
    const day = String(minDate.getDate()).padStart(2, '0');
    const minDateString = `${year}-${month}-${day}`;

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    const removeItem = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const sendToWhatsApp = () => {
        if (!formData.date || !formData.orderer || !formData.receiver || !formData.phone || !formData.address) {
            alert('Mohon lengkapi data pemesan dan pengiriman yang wajib diisi (*).');
            return;
        }

        const phoneNumber = "6282236328389"; // Ganti dengan nomor WhatsApp Ibu
        let message = "*PESANAN BARU - BALI HAPPY PUDDING*\n";
        message += "------------------------------------------\n\n";

        cartItems.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `• Varian: ${item.variant}\n`;
            message += `• Ukuran: ${item.size}\n`;
            message += `• Harga: Rp ${item.price.toLocaleString('id-ID')}\n\n`;
        });

        message += "------------------------------------------\n";
        message += `*Jadwal Pengiriman:* ${formData.date}\n`;
        message += `*Pemesan:* ${formData.orderer}\n`;
        message += `*Penerima:* ${formData.receiver} (${formData.phone})\n`;
        message += `*Alamat:* ${formData.address}\n`;
        if (formData.note) message += `*Catatan Khusus:* ${formData.note}\n`;
        message += "------------------------------------------\n";
        message += `*TOTAL KESELURUHAN: Rp ${totalPrice.toLocaleString('id-ID')}*`;

        // Simpan ke Riwayat Pembelian (untuk Admin)
        const newOrder = {
            orderDate: new Date().toISOString(),
            deliveryDate: formData.date,
            customerName: formData.orderer,
            waNumber: formData.phone,
            items: cartItems,
            totalPrice: totalPrice,
        };
        const history = JSON.parse(localStorage.getItem('purchaseHistory') || '[]');
        localStorage.setItem('purchaseHistory', JSON.stringify([...history, newOrder]));

        // Buka WhatsApp
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        // Kosongkan keranjang setelah checkout (opsional, tapi disarankan)
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    return (
        <div className="min-h-screen bg-[#f4efe7]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <nav className="bg-[#b31c24] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex items-center gap-4 max-w-2xl px-2">
                    <Link href="/katalog" className="flex items-center gap-2 bg-white/15 hover:bg-white/25 px-4 py-2 rounded-full text-sm font-bold transition-colors">
                        ← Kembali
                    </Link>
                    <span className="text-2xl font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>
                        Keranjang
                    </span>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-2xl">
                {cartItems.length > 0 ? (
                    <>
                        <div className="space-y-4 mb-8">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 border-2 border-[#e8d5c4] shadow-sm relative">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                                        <button onClick={() => removeItem(item.id)} className="text-[#b31c24] text-xs font-bold bg-[#fdf0f0] px-3 py-1 rounded-full hover:bg-[#f0c8c8]">
                                            Hapus
                                        </button>
                                    </div>

                                    <div className="text-sm text-[#7a6060] mt-3 space-y-1.5 bg-[#fdf6ee] p-4 rounded-xl border border-[#e8d5c4]">
                                        <p><span className="font-bold text-gray-700">Varian:</span> {item.variant} ({item.size})</p>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-[#e8d5c4] flex justify-between items-center">
                                        <span className="text-sm font-bold text-gray-500">Harga Item</span>
                                        <span className="text-[#b31c24] font-black text-lg">Rp {item.price.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ORDER FORM SECTIONS */}
                        <div className="space-y-6 mb-8">
                            {/* SECTION 2: Jadwal Pengiriman */}
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">📅 Jadwal Pengiriman (Min H-2)</h2>
                                <input type="date" name="date" value={formData.date} min={minDateString} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800" />
                            </div>

                            {/* SECTION 3: Data Pemesan */}
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">👤 Data Pemesan & Penerima</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#7a6060] mb-2">Nama Pemesan *</label>
                                        <input type="text" name="orderer" value={formData.orderer} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-[#7a6060] mb-2">Nama Penerima *</label>
                                        <input type="text" name="receiver" value={formData.receiver} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-[#7a6060] mb-2">No WA Penerima *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-[#7a6060] mb-2">Alamat Penerima *</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold" />
                                </div>
                            </div>

                            {/* SECTION 4: Catatan Khusus */}
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm mb-4">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">✨ Special Request</h2>
                                <textarea name="note" value={formData.note} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold min-h-25"></textarea>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-md border-t-4 border-[#b31c24]">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-[#7a6060] font-bold">Total Pesanan:</span>
                                <span className="text-2xl font-black text-[#b31c24]">
                                    Rp {totalPrice.toLocaleString('id-ID')}
                                </span>
                            </div>

                            <button
                                onClick={sendToWhatsApp}
                                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1da851] transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] flex justify-center items-center gap-3"
                            >
                                <span className="text-xl">💬</span> Pesan Sekarang via WhatsApp
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🛒</div>
                        <p className="text-gray-500 font-medium mb-6">Keranjang Anda masih kosong.</p>
                        <Link href="/katalog" className="bg-[#b31c24] text-white px-6 py-3 rounded-full font-bold">
                            Lihat Menu Pudding
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}