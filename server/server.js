const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.use(express.json());

// Mahsulotlar arrayi (database o'rniga), rasm URL'lari bilan
let products = [
  { id: 1, name: 'T-shirt', price: 29.99, imageUrl: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/12/Brown-t-shirt-template-isolated-on-transparent-background-PNG.png' },
  { id: 2, name: 'Jeans', price: 49.99, imageUrl: 'https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-ladies-jeans-png-image_2400806.jpg' },
  { id: 3, name: 'Jacket', price: 99.99, imageUrl: 'https://img.freepik.com/free-psd/classic-black-leather-jacket-timeless-fashion-staple_191095-78120.jpg?semt=ais_hybrid&w=740' },
   { id: 1, name: 'T-shirt', price: 29.99, imageUrl: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/12/Brown-t-shirt-template-isolated-on-transparent-background-PNG.png' },
  { id: 2, name: 'Jeans', price: 49.99, imageUrl: 'https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-ladies-jeans-png-image_2400806.jpg' },
  { id: 3, name: 'Jacket', price: 99.99, imageUrl: 'https://img.freepik.com/free-psd/classic-black-leather-jacket-timeless-fashion-staple_191095-78120.jpg?semt=ais_hybrid&w=740' },
   { id: 1, name: 'T-shirt', price: 29.99, imageUrl: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/12/Brown-t-shirt-template-isolated-on-transparent-background-PNG.png' },
  { id: 2, name: 'Jeans', price: 49.99, imageUrl: 'https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-ladies-jeans-png-image_2400806.jpg' },
  { id: 3, name: 'Jacket', price: 99.99, imageUrl: 'https://img.freepik.com/free-psd/classic-black-leather-jacket-timeless-fashion-staple_191095-78120.jpg?semt=ais_hybrid&w=740' },
   { id: 1, name: 'T-shirt', price: 29.99, imageUrl: 'https://image.similarpng.com/file/similarpng/very-thumbnail/2020/12/Brown-t-shirt-template-isolated-on-transparent-background-PNG.png' },
  { id: 2, name: 'Jeans', price: 49.99, imageUrl: 'https://png.pngtree.com/png-vector/20201127/ourmid/pngtree-ladies-jeans-png-image_2400806.jpg' },
  { id: 3, name: 'Jacket', price: 99.99, imageUrl: 'https://img.freepik.com/free-psd/classic-black-leather-jacket-timeless-fashion-staple_191095-78120.jpg?semt=ais_hybrid&w=740' }
];

// Savat arrayi
let cart = [];

// Barcha mahsulotlarni olish (rasm URL'lari bilan)
app.get('/products', (req, res) => {
  res.json(products);
});

// Yangi mahsulot qo‘shish
app.post('/products/add', (req, res) => {
  const { id, name, price, imageUrl } = req.body;
  if (!id || !name || !price || !imageUrl) {
    return res.status(400).json({ message: 'Barcha maydonlar to‘ldirilishi kerak' });
  }
  const existingProduct = products.find(p => p.id === id);
  if (existingProduct) {
    return res.status(400).json({ message: 'Bu ID’da mahsulot allaqachon mavjud' });
  }
  const newProduct = { id, name, price, imageUrl };
  products.push(newProduct);
  res.status(201).json({ message: 'Mahsulot muvaffaqiyatli qo‘shildi', products });
});

// Mahsulotni savatga qo‘shish
app.post('/cart/add', (req, res) => {
  const productId = req.body.id;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.json({ message: 'Mahsulot savatga qo‘shildi', cart });
  } else {
    res.status(404).json({ message: 'Mahsulot topilmadi' });
  }
});

// Savatdan mahsulotni o‘chirish
app.delete('/cart/remove/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const initialLength = cart.length;
  cart = cart.filter(item => item.id !== productId);
  if (cart.length < initialLength) {
    res.json({ message: 'Mahsulot savatdan o‘chirildi', cart });
  } else {
    res.status(404).json({ message: 'Mahsulot savatda topilmadi' });
  }
});

// Savatdagi mahsulotlarni ko‘rish
app.get('/cart', (req, res) => {
  res.json(cart);
});

app.listen(port, () => {
  console.log(`Server ${port}-portda ishga tushdi`);
});