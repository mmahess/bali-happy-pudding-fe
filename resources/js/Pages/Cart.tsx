import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import toast from 'react-hot-toast';
import PublicLayout from '../Components/PublicLayout';

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

    const [isSameAsOrderer, setIsSameAsOrderer] = useState(false);

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

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const updateQuantity = (id: number, change: number) => {
        const updated = cartItems.map(item => {
            if (item.id === id) {
                const newQty = (item.quantity || 1) + change;
                return { ...item, quantity: Math.max(1, newQty) };
            }
            return item;
        });
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id);
        setCartItems(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
    };

    const sendToWhatsApp = () => {
        const finalReceiver = isSameAsOrderer ? formData.orderer : formData.receiver;
        const finalPhone = isSameAsOrderer ? '-' : formData.phone;

        if (!formData.date || !formData.orderer || !finalReceiver || (!isSameAsOrderer && !formData.phone) || !formData.address) {
            toast.error('Mohon lengkapi data yang wajib diisi (*).');
            return;
        }

        const phoneNumber = "6282236328389"; // Ganti dengan nomor WhatsApp Ibu
        let message = "*PESANAN BARU - BALI HAPPY PUDDING*\n";
        message += "------------------------------------------\n\n";

        cartItems.forEach((item, index) => {
            message += `*${index + 1}. ${item.name}*\n`;
            message += `• Varian: ${item.variant}\n`;
            message += `• Ukuran: ${item.size}\n`;
            if (item.ucapanTusuk) message += `• Ucapan Tusuk: ${item.ucapanTusuk}\n`;
            if (item.greetingCard) message += `• Greeting Card: ${item.greetingCard}\n`;
            if (item.specialRequest) message += `• Special Request: ${item.specialRequest}\n`;
            message += `• Jumlah: ${item.quantity || 1}x\n`;
            message += `• Harga: Rp ${(item.price * (item.quantity || 1)).toLocaleString('id-ID')}\n\n`;
        });

        message += "------------------------------------------\n";
        message += `*Jadwal Pengiriman:* ${formData.date}\n`;
        message += `*Pemesan:* ${formData.orderer}\n`;
        message += `*Penerima:* ${finalReceiver} ${!isSameAsOrderer ? `(${finalPhone})` : ''}\n`;
        message += `*Alamat:* ${formData.address}\n`;
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
        <PublicLayout navbarProps={{
            title: 'Keranjang',
            showBackButton: true,
            backUrl: '/katalog',
            showCart: false
        }}>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                {cartItems.length > 0 ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* KOLOM KIRI: FORMULIR */}
                        <div className="w-full lg:w-3/5 space-y-6 order-2 lg:order-1">
                            {/* SECTION 2: Jadwal Pengiriman */}
                            {/* CART ITEMS WILL BE MOVED TO RIGHT COLUMN */}
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">📅 Jadwal Pengiriman (Min H-2)</h2>
                                <input type="date" name="date" value={formData.date} min={minDateString} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold text-gray-800" />
                            </div>

                            {/* SECTION 3: Data Pemesan */}
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-5">
                                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">👤 Data Pemesan & Penerima</h2>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-xs font-bold text-[#7a6060] mb-2">Nama Pemesan *</label>
                                    <input type="text" name="orderer" value={formData.orderer} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold placeholder-gray-400" />
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer mb-5 bg-[#fdf6ee] p-3 rounded-xl border border-[#e8d5c4]">
                                    <input type="checkbox" checked={isSameAsOrderer} onChange={(e) => setIsSameAsOrderer(e.target.checked)} className="w-4 h-4 text-[#b31c24] rounded focus:ring-[#b31c24]" />
                                    <span className="text-sm font-bold text-gray-700">Penerima sama dengan Pemesan</span>
                                </label>

                                {!isSameAsOrderer && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#7a6060] mb-2">Nama Penerima *</label>
                                            <input type="text" name="receiver" value={formData.receiver} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold placeholder-gray-400" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-[#7a6060] mb-2">No WA Penerima *</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold placeholder-gray-400" />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <label className="block text-xs font-bold text-[#7a6060] mb-2">Alamat Penerima *</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-[#fdf6ee] border-2 border-[#e8d5c4] rounded-xl px-4 py-3 font-semibold placeholder-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* KOLOM KANAN: RINCIAN & CHECKOUT */}
                        <div className="w-full lg:w-2/5 order-1 lg:order-2">
                            <div className="bg-white border-2 border-[#e8d5c4] rounded-2xl p-6 shadow-md lg:sticky lg:top-24 h-max">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2 border-b border-[#e8d5c4] pb-4">🛒 Rincian Belanja</h2>

                                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 relative">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-gray-800 text-base">{item.name}</h3>
                                                <button onClick={() => removeItem(item.id)} className="text-[#b31c24] text-[10px] font-bold bg-[#fdf0f0] px-2 py-1 rounded hover:bg-[#f0c8c8]">
                                                    ✕
                                                </button>
                                            </div>

                                            <div className="text-xs text-[#7a6060] mb-3 space-y-1">
                                                <p className="font-medium text-gray-700">{item.variant} ({item.size})</p>
                                                {item.ucapanTusuk && <p className="italic text-gray-500">Tusuk: "{item.ucapanTusuk}"</p>}
                                                {item.greetingCard && <p className="italic text-gray-500">Card: "{item.greetingCard}"</p>}
                                                {item.specialRequest && <p className="italic text-orange-600 font-medium">Spesial: "{item.specialRequest}"</p>}
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 bg-white rounded-md border border-gray-200 px-1 py-0.5">
                                                    <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 rounded">-</button>
                                                    <span className="text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                                                    <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-5 h-5 flex items-center justify-center text-gray-600 font-bold hover:bg-gray-100 rounded">+</button>
                                                </div>
                                                <div className="text-[#b31c24] font-bold text-sm">
                                                    Rp {(item.price * (item.quantity || 1)).toLocaleString('id-ID')}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-5 border-t-2 border-dashed border-[#e8d5c4]">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-[#7a6060] font-bold text-sm uppercase tracking-wider">Total Pesanan</span>
                                        <span className="text-2xl font-black text-[#b31c24]">
                                            Rp {totalPrice.toLocaleString('id-ID')}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={sendToWhatsApp}
                                        className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#1da851] transition-all shadow-md flex justify-center items-center gap-3"
                                    >
                                        <span className="text-xl">💬</span> Pesan via WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
        </PublicLayout>
    );
}