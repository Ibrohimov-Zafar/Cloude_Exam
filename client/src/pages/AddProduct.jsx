import React, { useState } from 'react';
import { Package, DollarSign, Image, Hash, Plus, CheckCircle, AlertCircle, X } from 'lucide-react';

function AddProduct() {
  const [formData, setFormData] = useState({ 
    id: '', 
    name: '', 
    price: '', 
    imageUrl: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [errors, setErrors] = useState({});

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id.trim()) {
      newErrors.id = 'ID kiritish majburiy';
    } else if (isNaN(formData.id) || parseInt(formData.id) <= 0) {
      newErrors.id = 'ID musbat son bo\'lishi kerak';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Mahsulot nomi kiritish majburiy';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Mahsulot nomi kamida 2 ta belgi bo\'lishi kerak';
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Narx kiritish majburiy';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Narx musbat son bo\'lishi kerak';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Rasm URL kiritish majburiy';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'To\'g\'ri URL formatini kiriting';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showNotification('error', 'Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:3000/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: parseInt(formData.id),
          price: parseFloat(formData.price)
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showNotification('success', data.message || 'Mahsulot muvaffaqiyatli qo\'shildi!');
        setFormData({ id: '', name: '', price: '', imageUrl: '' });
      } else {
        showNotification('error', data.message || 'Xatolik yuz berdi');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      showNotification('error', 'Server bilan bog\'lanishda xatolik yuz berdi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeNotification = () => setNotification(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Yangi Mahsulot Qo'shish
          </h1>
          <p className="text-gray-600">
            Yangi mahsulot ma'lumotlarini kiriting va do'koningizga qo'shing
          </p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-xl shadow-lg flex items-center justify-between ${
            notification.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-3">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="font-medium">{notification.message}</span>
            </div>
            <button
              onClick={closeNotification}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center">
              <Package className="w-6 h-6 mr-2" />
              Mahsulot Ma'lumotlari
            </h2>
          </div>
          
          <div className="p-8 space-y-6">
            {/* ID Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 mr-2 text-purple-500" />
                Mahsulot ID
              </label>
              <input
                type="number"
                value={formData.id}
                onChange={(e) => handleInputChange('id', e.target.value)}
                placeholder="Masalan: 1001"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.id ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                }`}
                required
              />
              {errors.id && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.id}
                </p>
              )}
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 mr-2 text-purple-500" />
                Mahsulot Nomi
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Masalan: iPhone 15 Pro"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                }`}
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-purple-500" />
                Narx (UZS)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Masalan: 15000000"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.price ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                }`}
                required
              />
              {errors.price && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.price}
                </p>
              )}
            </div>

            {/* Image URL Input */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Image className="w-4 h-4 mr-2 text-purple-500" />
                Rasm URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                  errors.imageUrl ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-300'
                }`}
                required
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.imageUrl}
                </p>
              )}
              
              {/* Image Preview */}
              {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                <div className="mt-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Rasm ko'rinishi:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed transform-none' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Qo'shilmoqda...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Mahsulot Qo'shish</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;