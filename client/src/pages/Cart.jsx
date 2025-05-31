import { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  // 🔄 Savatni yangilash funksiyasi
  const fetchCart = () => {
    fetch('http://localhost:3000/cart')
      .then((res) => res.json())
      .then((data) => setCart(data))
      .catch((err) => console.error('Savatni olishda xatolik:', err));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ Mahsulotni o'chirish funksiyasi
  const removeFromCart = (id) => {
    // Optimistically update the UI by removing the item locally
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

    // Send DELETE request to the backend
    fetch(`http://localhost:3000/cart/remove/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          // If the request fails, refetch the cart to revert to the server state
          alert("O'chirishda xatolik yuz berdi");
          fetchCart();
        }
      })
      .catch((err) => {
        console.error('O‘chirishda xatolik:', err);
        // Refetch the cart to ensure consistency with the backend
        fetchCart();
      });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        🛒 Savat ({cart.length} ta mahsulot)
      </h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center p-4 border rounded-lg hover:shadow transition"
          >
            {/* Rasm */}
            <img
              src={item.imageUrl || 'https://via.placeholder.com/80'} // imageUrl ishlatiladi
              alt={item.name}
              className="w-20 h-20 object-cover rounded mr-4"
            />

            {/* Mahsulot nomi va narxi */}
            <div className="flex-grow">
              <h3 className="text-lg font-medium text-gray-700">{item.name}</h3>
              <p className="text-gray-500">${item.price.toFixed(2)}</p>
            </div>

            {/* O'chirish tugmasi */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              O'chirish
            </button>
          </div>
        ))}
      </div>

      {cart.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">Savat bo‘sh</p>
      )}
    </div>
  );
}

export default Cart;