import React from 'react';
import { Link } from '@inertiajs/react';

export default function ProductCard({ id, name, description, price, image }: any) {
    return (
        <div className="rounded-2xl overflow-hidden bg-white border border-red-700 shadow-sm flex flex-col">
            <div className="w-full aspect-4/3 bg-gray-200 relative">
                {image && image !== '' ? (
                    <img 
                        src={image} 
                        alt={name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => { 
                            e.currentTarget.style.display = 'none'; 
                            if (e.currentTarget.parentElement) 
                                e.currentTarget.parentElement.innerHTML = `<div class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm text-center px-4">[ Gambar ${name} ]</div>`; 
                        }} 
                    />
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
}
