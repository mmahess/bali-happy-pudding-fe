import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminIndex() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('products');

    // States for data
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [purchaseHistory, setPurchaseHistory] = useState<any[]>([]);
    const [banners, setBanners] = useState<string[]>([]);

    // Form states
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [newProduct, setNewProduct] = useState({
        category: 'Pudding Tart',
        name: '',
        description: '',
        image: '',
        variants: [] as { name: string }[],
        sizes: [] as { name: string, price: number, label: string }[]
    });
    const [tempVariant, setTempVariant] = useState('');
    const [tempSize, setTempSize] = useState({ name: '', price: '' });

    const [newBanner, setNewBanner] = useState('');

    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') setIsAuthenticated(true);

        // Load data
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
        setPurchaseHistory(JSON.parse(localStorage.getItem('purchaseHistory') || '[]'));

        const savedBanners = JSON.parse(localStorage.getItem('catalogBanners') || '[]');
        if (savedBanners.length > 0) {
            setBanners(savedBanners);
        } else {
            setBanners(['/images/whole1.jpg', '/images/whole2.jpg', '/images/whole3.jpg']); // Defaults
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Password salah!');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
        setPassword('');
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.name || newProduct.sizes.length === 0) {
            return alert('Nama Produk dan minimal satu Ukuran wajib diisi!');
        }

        const basePrice = newProduct.sizes[0].price;

        const productData = {
            id: editingProductId || Date.now(),
            name: newProduct.name,
            category: newProduct.category,
            description: newProduct.description,
            basePrice: basePrice,
            price: basePrice, // untuk kompatibilitas tampilan Katalog
            image: newProduct.image || '/images/whole1.jpg',
            variants: newProduct.variants,
            sizes: newProduct.sizes
        };

        let updatedProducts;
        if (editingProductId) {
            updatedProducts = allProducts.map(p => p.id === editingProductId ? productData : p);
            alert('Produk berhasil diperbarui!');
        } else {
            updatedProducts = [...allProducts, productData];
            alert('Produk baru berhasil ditambahkan!');
        }
        
        setAllProducts(updatedProducts);
        localStorage.setItem('allProducts', JSON.stringify(updatedProducts));
        
        // Reset & Close form
        setIsFormOpen(false);
        setEditingProductId(null);
        setNewProduct({
            category: 'Pudding Tart',
            name: '',
            description: '',
            image: '',
            variants: [],
            sizes: []
        });
    };

    const handleEditProduct = (product: any) => {
        setNewProduct({
            category: product.category,
            name: product.name,
            description: product.description,
            image: product.image,
            variants: product.variants || [],
            sizes: product.sizes || []
        });
        setEditingProductId(product.id);
        setIsFormOpen(true);
    };

    const handleCancelEdit = () => {
        setIsFormOpen(false);
        setEditingProductId(null);
        setNewProduct({
            category: 'Pudding Tart',
            name: '',
            description: '',
            image: '',
            variants: [],
            sizes: []
        });
    };

    const handleAddVariant = () => {
        if (!tempVariant) return;
        setNewProduct({
            ...newProduct,
            variants: [...newProduct.variants, { name: tempVariant }]
        });
        setTempVariant('');
    };

    const handleRemoveVariant = (index: number) => {
        const updated = [...newProduct.variants];
        updated.splice(index, 1);
        setNewProduct({ ...newProduct, variants: updated });
    };

    const handleAddSize = () => {
        if (!tempSize.name || !tempSize.price) return;
        const priceNum = parseInt(tempSize.price);
        setNewProduct({
            ...newProduct,
            sizes: [...newProduct.sizes, { 
                name: tempSize.name, 
                price: priceNum,
                label: `${priceNum / 1000}K`
            }]
        });
        setTempSize({ name: '', price: '' });
    };

    const handleRemoveSize = (index: number) => {
        const updated = [...newProduct.sizes];
        updated.splice(index, 1);
        setNewProduct({ ...newProduct, sizes: updated });
    };

    const handleDeleteProduct = (id: number) => {
        if (!confirm('Anda yakin ingin menghapus produk ini? Produk akan hilang dari katalog secara permanen.')) return;
        const updatedProducts = allProducts.filter(p => p.id !== id);
        setAllProducts(updatedProducts);
        localStorage.setItem('allProducts', JSON.stringify(updatedProducts));
    };

    const handleAddBanner = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBanner) return;
        const updatedBanners = [...banners, newBanner];
        setBanners(updatedBanners);
        localStorage.setItem('catalogBanners', JSON.stringify(updatedBanners));
        setNewBanner('');
    };

    const handleDeleteBanner = (index: number) => {
        if (!confirm('Hapus banner ini?')) return;
        const updatedBanners = banners.filter((_, i) => i !== index);
        setBanners(updatedBanners);
        localStorage.setItem('catalogBanners', JSON.stringify(updatedBanners));
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f4efe7] flex items-center justify-center" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border-2 border-[#b31c24]">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl text-[#b31c24] font-normal mb-2" style={{ fontFamily: "'Pacifico', cursive" }}>Admin Panel</h1>
                        <p className="text-gray-500 text-sm">Masukan password untuk mengakses dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-[#b31c24] focus:outline-none transition-colors"
                                placeholder="Masukkan password (admin123)"
                            />
                        </div>
                        <button type="submit" className="w-full bg-[#b31c24] text-white py-3 rounded-xl font-bold hover:bg-[#8a1219] transition-all shadow-md">
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link href="/katalog" className="text-sm text-gray-500 hover:text-[#b31c24] transition-colors underline">
                            Kembali ke Katalog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            {/* Navbar Admin */}
            <nav className="bg-[#b31c24] text-white p-4 sticky top-0 z-50 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-normal" style={{ fontFamily: "'Pacifico', cursive" }}>Admin Dashboard</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/katalog" className="text-sm font-medium hover:text-red-200 underline">Lihat Katalog</Link>
                        <button onClick={handleLogout} className="bg-white text-[#b31c24] px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-8 max-w-6xl flex flex-col md:flex-row gap-8">
                {/* Sidebar Menu */}
                <div className="w-full md:w-64 flex flex-col gap-2">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`text-left px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-[#b31c24] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        📦 Manajemen Produk
                    </button>
                    <button
                        onClick={() => setActiveTab('history')}
                        className={`text-left px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-[#b31c24] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        📝 Riwayat Pembelian
                    </button>
                    <button
                        onClick={() => setActiveTab('banners')}
                        className={`text-left px-5 py-3 rounded-xl font-bold transition-all ${activeTab === 'banners' ? 'bg-[#b31c24] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        🖼️ Slideshow Banner
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1">

                    {/* TAB: PRODUK */}
                    {activeTab === 'products' && (
                        <div className="flex flex-col gap-6">
                            
                            {!isFormOpen ? (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">Daftar Produk (Katalog)</h2>
                                        <button 
                                            onClick={() => setIsFormOpen(true)} 
                                            className="bg-[#b31c24] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#8a1219] transition-all"
                                        >
                                            + Tambah Produk Baru
                                        </button>
                                    </div>
                                    
                                    {allProducts.length === 0 ? (
                                        <p className="text-gray-500 text-sm text-center py-8">Katalog kosong. Belum ada produk.</p>
                                    ) : (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left border-collapse min-w-[600px]">
                                                <thead>
                                                    <tr className="border-b-2 bg-gray-50">
                                                        <th className="p-3 text-xs font-bold text-gray-500 uppercase">Nama & Kategori</th>
                                                        <th className="p-3 text-xs font-bold text-gray-500 uppercase">Varian & Ukuran</th>
                                                        <th className="p-3 text-xs font-bold text-gray-500 uppercase">Harga Dasar</th>
                                                        <th className="p-3 text-xs font-bold text-gray-500 uppercase text-center">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allProducts.map(product => (
                                                        <tr key={product.id} className="border-b hover:bg-gray-50">
                                                            <td className="p-3">
                                                                <div className="font-bold text-gray-800">{product.name}</div>
                                                                <div className="text-xs text-gray-500 mt-1 px-2 py-0.5 bg-gray-200 inline-block rounded-full">{product.category}</div>
                                                            </td>
                                                            <td className="p-3 text-sm">
                                                                <div><span className="font-medium">Varian:</span> {(product.variants || []).length} macam</div>
                                                                <div><span className="font-medium">Ukuran:</span> {(product.sizes || []).length} pilihan</div>
                                                            </td>
                                                            <td className="p-3 text-red-600 font-bold">Rp {product.basePrice?.toLocaleString('id-ID')}</td>
                                                            <td className="p-3 text-center">
                                                                <div className="flex items-center justify-center gap-2">
                                                                    <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:text-blue-800 text-sm font-bold bg-blue-50 px-3 py-1.5 rounded-md transition-colors">
                                                                        Edit
                                                                    </button>
                                                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 text-sm font-bold bg-red-50 px-3 py-1.5 rounded-md transition-colors">
                                                                        Hapus
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {editingProductId ? 'Edit Produk' : 'Tambah Produk Baru'}
                                        </h2>
                                        <button 
                                            onClick={handleCancelEdit} 
                                            className="text-gray-500 hover:text-gray-700 font-bold"
                                        >
                                            ✕ Batal
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleAddProduct} className="flex flex-col gap-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Kategori</label>
                                                <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full border rounded-lg p-2.5 focus:border-[#b31c24] focus:outline-none">
                                                    <option value="Pudding Tart">Pudding Tart</option>
                                                    <option value="Whole Pudding">Whole Pudding</option>
                                                    <option value="Pudding Cup">Pudding Cup</option>
                                                    <option value="Pudding Tumpeng">Pudding Tumpeng</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nama Produk (Jenis)</label>
                                                <input type="text" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border rounded-lg p-2.5 focus:border-[#b31c24] focus:outline-none" required placeholder="Contoh: Tart Kotak Panjang" />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Deskripsi Singkat</label>
                                                <textarea value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full border rounded-lg p-2.5 focus:border-[#b31c24] focus:outline-none" rows={2} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">URL Gambar (Opsional)</label>
                                                <input type="text" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} placeholder="/images/whole1.jpg atau link gambar" className="w-full border rounded-lg p-2.5 focus:border-[#b31c24] focus:outline-none" />
                                            </div>
                                        </div>

                                        {/* Sub-form Varian */}
                                        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                            <label className="block text-sm font-bold text-gray-800 mb-3">🎨 Varian Rasa</label>
                                            <div className="flex gap-2 mb-3">
                                                <input type="text" value={tempVariant} onChange={e => setTempVariant(e.target.value)} placeholder="Contoh: Black Forest" className="flex-1 border rounded-lg p-2 text-sm focus:border-[#b31c24] focus:outline-none" onKeyDown={e => { if(e.key==='Enter') { e.preventDefault(); handleAddVariant(); } }} />
                                                <button type="button" onClick={handleAddVariant} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">Tambah Varian</button>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {newProduct.variants.length === 0 && <span className="text-xs text-gray-400 italic">Belum ada varian ditambahkan</span>}
                                                {newProduct.variants.map((v, i) => (
                                                    <span key={i} className="bg-white border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2">
                                                        {v.name}
                                                        <button type="button" onClick={() => handleRemoveVariant(i)} className="text-red-500 hover:text-red-700">×</button>
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Sub-form Ukuran */}
                                        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                                            <label className="block text-sm font-bold text-gray-800 mb-3">📏 Ukuran & Harga (Wajib)</label>
                                            <div className="flex flex-col md:flex-row gap-2 mb-3">
                                                <input type="text" value={tempSize.name} onChange={e => setTempSize({...tempSize, name: e.target.value})} placeholder="Contoh: Ukuran 21x9cm" className="flex-1 border rounded-lg p-2 text-sm focus:border-[#b31c24] focus:outline-none" onKeyDown={e => { if(e.key==='Enter') { e.preventDefault(); } }} />
                                                <input type="number" value={tempSize.price} onChange={e => setTempSize({...tempSize, price: e.target.value})} placeholder="Harga (Rp)" className="w-full md:w-32 border rounded-lg p-2 text-sm focus:border-[#b31c24] focus:outline-none" onKeyDown={e => { if(e.key==='Enter') { e.preventDefault(); handleAddSize(); } }} />
                                                <button type="button" onClick={handleAddSize} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-700">Tambah Ukuran</button>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {newProduct.sizes.length === 0 && <span className="text-xs text-gray-400 italic">Belum ada ukuran ditambahkan. Wajib minimal 1.</span>}
                                                {newProduct.sizes.map((s, i) => (
                                                    <div key={i} className="bg-white border border-gray-300 rounded-lg p-2 flex justify-between items-center text-sm">
                                                        <div><span className="font-bold text-gray-700">{s.name}</span> <span className="text-red-600 font-bold ml-2">Rp{s.price.toLocaleString('id-ID')}</span></div>
                                                        <button type="button" onClick={() => handleRemoveSize(i)} className="text-red-500 hover:text-red-700 font-bold text-lg px-2">×</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <button type="submit" className="w-full bg-[#b31c24] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#8a1219] transition-all text-lg shadow-md">
                                                {editingProductId ? '💾 Simpan Perubahan' : '💾 Simpan Produk ke Katalog'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: HISTORY */}
                    {activeTab === 'history' && (
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Riwayat Pembelian</h2>
                            {purchaseHistory.length === 0 ? (
                                <p className="text-gray-500 text-sm">Belum ada pesanan yang masuk.</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="border-b-2 bg-gray-50">
                                                <th className="p-3 text-xs font-bold text-gray-500 uppercase">Tanggal Order</th>
                                                <th className="p-3 text-xs font-bold text-gray-500 uppercase">Pemesan</th>
                                                <th className="p-3 text-xs font-bold text-gray-500 uppercase">Item</th>
                                                <th className="p-3 text-xs font-bold text-gray-500 uppercase">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {purchaseHistory.slice().reverse().map((order, idx) => (
                                                <tr key={idx} className="border-b hover:bg-gray-50 align-top">
                                                    <td className="p-3 text-sm text-gray-600">
                                                        {new Date(order.orderDate).toLocaleString('id-ID')}
                                                    </td>
                                                    <td className="p-3 text-sm">
                                                        <div className="font-bold text-gray-800">{order.customerName}</div>
                                                        <div className="text-xs text-gray-500">{order.waNumber}</div>
                                                        <div className="text-xs text-gray-500 mt-1">Kirim: {new Date(order.deliveryDate).toLocaleDateString('id-ID')}</div>
                                                    </td>
                                                    <td className="p-3 text-sm">
                                                        <ul className="list-disc pl-4 text-gray-700">
                                                            {order.items.map((item: any, i: number) => (
                                                                <li key={i}>{item.name} ({item.variant} - {item.size}) - <span className="text-red-600">Rp{(item.price || 0).toLocaleString('id-ID')}</span></li>
                                                            ))}
                                                        </ul>
                                                    </td>
                                                    <td className="p-3 font-bold text-[#b31c24]">
                                                        Rp {order.totalPrice.toLocaleString('id-ID')}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: BANNERS */}
                    {activeTab === 'banners' && (
                        <div className="flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Tambah Gambar Slideshow</h2>
                                <form onSubmit={handleAddBanner} className="flex flex-col md:flex-row gap-3">
                                    <input
                                        type="text"
                                        value={newBanner}
                                        onChange={e => setNewBanner(e.target.value)}
                                        placeholder="Masukkan URL gambar banner..."
                                        className="flex-1 border rounded-lg p-3 focus:border-[#b31c24] focus:outline-none"
                                        required
                                    />
                                    <button type="submit" className="bg-[#b31c24] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#8a1219] transition-all whitespace-nowrap">
                                        + Tambah Banner
                                    </button>
                                </form>
                            </div>

                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Daftar Banner Saat Ini</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {banners.map((url, idx) => (
                                        <div key={idx} className="relative group rounded-xl overflow-hidden border-2 border-gray-200">
                                            <div className="aspect-video bg-gray-100 relative">
                                                {/* Fallback to gray box if image fails to load during mockup */}
                                                <img src={url} alt={`Banner ${idx + 1}`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center'); if (e.currentTarget.parentElement) e.currentTarget.parentElement.innerHTML = `<span class="text-gray-400 font-medium">[ Gambar: ${url} ]</span>`; }} />
                                            </div>
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button onClick={() => handleDeleteBanner(idx)} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 shadow-lg">
                                                    Hapus Banner
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
