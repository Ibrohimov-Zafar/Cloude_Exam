import React, { useState } from "react";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showQuickView, setShowQuickView] = useState(false);

  const addToCart = async () => {
    setIsLoading(true);
    try {
      // Simulyatsiya uchun delay qo'yilgan, haqiqiy fetch axios yoki fetch bilan o'zgartiring
      await new Promise((r) => setTimeout(r, 1000));
      
      // Success notification (toast yoki modal bilan almashtirishingiz mumkin)
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300';
      notification.textContent = 'Mahsulot savatga qo\'shildi ✓';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
      
    } catch (error) {
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      notification.textContent = 'Xatolik yuz berdi!';
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    // Favorite notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = isFavorite ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo\'shildi ♥';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickView = () => {
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = (e) => {
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1haHN1bG90IHJhc21pPC90ZXh0Pjwvc3ZnPg==';
    setIsImageLoading(false);
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
      {/* Sale Badge */}
      {product.isOnSale && discount > 0 && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg animate-pulse">
          -{discount}%
        </div>
      )}

      {/* New Badge */}
      {product.isNew && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold z-20 shadow-lg">
          YANGI
        </div>
      )}

      {/* Favorite Button */}
      <button 
        className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 z-20 ${
          isFavorite 
            ? 'bg-red-500 text-white shadow-lg scale-110' 
            : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'
        } shadow-md hover:shadow-lg`}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
      >
        <svg className="w-5 h-5 transition-transform duration-200" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        <img
          src={product.imageUrl || "/api/placeholder/300/300"}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Quick View Overlay */}
         
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        {product.category && (
          <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Product Description */}
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviewCount || 0} sharh)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock !== undefined && (
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              product.stock > 10 ? 'bg-green-500' : 
              product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            <span className={`text-sm font-medium ${
              product.stock > 10 ? 'text-green-600' : 
              product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {product.stock > 10 ? 'Omborda mavjud' : 
               product.stock > 0 ? `Faqat ${product.stock} ta qoldi` : 'Tugadi'}
            </span>
          </div>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button 
          className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
          } flex items-center justify-center gap-2`}
          onClick={addToCart} 
          disabled={isLoading || (product.stock === 0)}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Qo'shilmoqda...
            </>
          ) : product.stock === 0 ? (
            'Tugadi'
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Savatga qo'shish
            </>
          )}
        </button>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent to-transparent group-hover:from-blue-500/[0.02] group-hover:to-purple-500/[0.02] pointer-events-none transition-all duration-300"></div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeQuickView}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Tez ko'rish</h2>
              <button 
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                onClick={closeQuickView}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={product.imageUrl || "/api/placeholder/500/500"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={handleImageError}
                  />
                </div>
                
                {/* Thumbnail Gallery (agar bir nechta rasm bo'lsa) */}
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div key={index} className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                      <img
                        src={product.imageUrl || "/api/placeholder/100/100"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Details */}
              <div className="space-y-6">
                {/* Category */}
                {product.category && (
                  <span className="inline-block text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
                
                {/* Product Name */}
                <h3 className="text-3xl font-bold text-gray-900">{product.name}</h3>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg text-gray-600 font-medium">
                      {product.rating} ({product.reviewCount || 0} sharh)
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <>
                        <span className="text-2xl text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-bold">
                          -{discount}% chegirma
                        </span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Tavsif:</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || "Bu mahsulot haqida batafsil ma'lumot mavjud. Yuqori sifat va ishonchli xizmat kafolatlanadi. Mahsulot barcha standartlarga javob beradi va uzoq muddat xizmat qiladi."}
                  </p>
                </div>
                
                {/* Stock Status */}
                {product.stock !== undefined && (
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      product.stock > 10 ? 'bg-green-500' : 
                      product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`font-medium ${
                      product.stock > 10 ? 'text-green-600' : 
                      product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock > 10 ? 'Omborda mavjud' : 
                       product.stock > 0 ? `Faqat ${product.stock} ta qoldi` : 'Tugadi'}
                    </span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button 
                    className={`flex-1 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                      isLoading 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                    } flex items-center justify-center gap-3`}
                    onClick={addToCart} 
                    disabled={isLoading || (product.stock === 0)}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Qo'shilmoqda...
                      </>
                    ) : product.stock === 0 ? (
                      'Tugadi'
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Savatga qo'shish
                      </>
                    )}
                  </button>
                  
                  <button 
                    className={`p-4 rounded-xl transition-all duration-300 ${
                      isFavorite 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    onClick={toggleFavorite}
                  >
                    <svg className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}