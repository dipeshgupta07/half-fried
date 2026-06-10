const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: {
    tagLabel: (tag) => {
      const map = { bestseller: '🔥 Bestseller', popular: '⭐ Popular', spicy: '🌶️ Spicy' };
      return map[tag] || '';
    },
    isActive: (a, b) => a === b,
    times: (n, block) => {
      let out = '';
      for (let i = 0; i < n; i++) out += block.fn(i);
      return out;
    }
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// ── DATA ──────────────────────────────────────────────────
const menu = {
  momos: [
    { name: 'Steamed Momos (Veg)', price: 120, desc: 'Classic soft-steamed dumplings stuffed with spiced veggies', tag: 'bestseller', emoji: '🥟', color: '#4a9c6f' },
    { name: 'Fried Momos (Veg)', price: 130, desc: 'Crispy golden fried dumplings with a crunchy shell', tag: null, emoji: '🥟', color: '#c8854a' },
    { name: 'Kurkure Momos (Veg)', price: 150, desc: 'The crunchiest momos you\'ll ever have — panko-coated & deep fried', tag: 'popular', emoji: '🥟', color: '#d4a22a' },
    { name: 'Steamed Momos (Chicken)', price: 140, desc: 'Juicy chicken-stuffed steamed dumplings', tag: null, emoji: '🥟', color: '#8b6b4a' },
    { name: 'Fried Momos (Chicken)', price: 150, desc: 'Crispy fried momos with minced chicken filling', tag: null, emoji: '🥟', color: '#b5692a' },
    { name: 'Kurkure Momos (Paneer)', price: 160, desc: 'Paneer stuffed & panko-coated for that ultimate crunch', tag: 'popular', emoji: '🥟', color: '#c4a050' },
    { name: 'Tandoori Momos', price: 170, desc: 'Smoked in tandoor with spiced yogurt marinade', tag: null, emoji: '🔴', color: '#c44a2a' },
    { name: 'Chilli Momos', price: 160, desc: 'Tossed in our signature house chilli sauce, dry-style', tag: 'spicy', emoji: '🌶️', color: '#d43020' },
  ],
  chinese: [
    { name: 'Chilli Chicken (Dry)', price: 200, desc: 'Crispy chicken tossed with peppers in spicy sauce', tag: 'bestseller', emoji: '🍗', color: '#c85a1a' },
    { name: 'Chilli Chicken (Gravy)', price: 210, desc: 'Same bold flavors in a rich saucy version', tag: null, emoji: '🍗', color: '#b04a15' },
    { name: 'Chilli Paneer (Dry)', price: 190, desc: 'Soft paneer cubes in tangy chilli sauce', tag: null, emoji: '🧀', color: '#d4a030' },
    { name: 'Chicken Fried Rice', price: 180, desc: 'Wok-tossed jasmine rice with egg & chicken', tag: null, emoji: '🍚', color: '#8b7a40' },
    { name: 'Veg Fried Rice', price: 150, desc: 'Classic Indo-Chinese fried rice with mixed vegetables', tag: null, emoji: '🍚', color: '#5a8a3a' },
    { name: 'Egg Fried Rice', price: 160, desc: 'Perfectly seasoned rice loaded with scrambled egg', tag: null, emoji: '🥚', color: '#c8a830' },
    { name: 'Singapore Noodles', price: 190, desc: 'Wok noodles with a curry-spiced kick', tag: 'popular', emoji: '🍜', color: '#c87820' },
    { name: 'Chicken Noodles', price: 180, desc: 'Schezwan-style noodles with tender chicken strips', tag: null, emoji: '🍜', color: '#a05a20' },
    { name: 'Veg Hakka Noodles', price: 150, desc: 'Indo-Chinese classic with crunchy veggies', tag: null, emoji: '🍜', color: '#4a8a4a' },
  ],
  pasta: [
    { name: 'White Sauce Pasta', price: 160, desc: 'Creamy béchamel with penne, herbs & cheese', tag: 'bestseller', emoji: '🍝', color: '#d4c090' },
    { name: 'Red Sauce Pasta', price: 150, desc: 'Tangy tomato base with Italian-style seasoning', tag: null, emoji: '🍝', color: '#c04030' },
    { name: 'Pink Sauce Pasta', price: 170, desc: 'The perfect blend of red & white, with added cream', tag: 'popular', emoji: '🍝', color: '#d47080' },
    { name: 'Cheesy Pasta', price: 180, desc: 'Loaded with two kinds of melted cheese', tag: null, emoji: '🧀', color: '#d4a030' },
  ],
  burgers: [
    { name: 'Crispy Veg Burger', price: 110, desc: 'Golden fried veggie patty with lettuce, slaw & sauce', tag: null, emoji: '🍔', color: '#5a8a30' },
    { name: 'Chilli Chicken Burger', price: 140, desc: 'Spicy fried chicken fillet with jalapeños & chipotle mayo', tag: 'spicy', emoji: '🍔', color: '#c83020' },
    { name: 'Cheese Burger', price: 130, desc: 'Double cheese slice with a crispy patty & pickles', tag: 'popular', emoji: '🍔', color: '#d4a020' },
    { name: 'Paneer Tikka Burger', price: 140, desc: 'Grilled paneer with mint chutney & caramelized onions', tag: null, emoji: '🍔', color: '#c87020' },
  ],
  rolls: [
    { name: 'Veg Spring Rolls', price: 100, desc: 'Classic golden-fried rolls with spiced veggie filling', tag: null, emoji: '🌯', color: '#8a9a3a' },
    { name: 'Chicken Roll', price: 140, desc: 'Flaky paratha wrap with spiced chicken filling', tag: 'popular', emoji: '🌯', color: '#b07030' },
    { name: 'Paneer Roll', price: 130, desc: 'Paratha wrap loaded with tandoor-kissed paneer', tag: null, emoji: '🌯', color: '#c08040' },
    { name: 'Chilli Chicken Roll', price: 150, desc: 'Our chilli chicken tucked into a crispy roll', tag: 'bestseller', emoji: '🌯', color: '#c05020' },
  ],
  soups: [
    { name: 'Hot & Sour Soup (Veg)', price: 90, desc: 'The classic Indo-Chinese warm-up', tag: null, emoji: '🍲', color: '#8a5a30' },
    { name: 'Sweet Corn Soup', price: 90, desc: 'Creamy corn broth with silky egg drop', tag: null, emoji: '🌽', color: '#d4b820' },
    { name: 'Chicken Hot & Sour Soup', price: 110, desc: 'Bold, tangy & packed with chicken', tag: 'popular', emoji: '🍲', color: '#a04020' },
    { name: 'Mushroom Soup', price: 100, desc: 'Earthy mushrooms in a light broth', tag: null, emoji: '🍄', color: '#7a6040' },
  ]
};

const stores = [
  {
    id: 1,
    name: 'Lado Sarai (Flagship)',
    address: 'F-328, Ground Floor, Mehrauli Badarpur Road, Near Chatri Wala Kuan, Lado Sarai',
    city: 'New Delhi – 110030',
    phone: '+91 93154 38432',
    hours: '12:00 PM – 11:59 PM (All Days)',
    mapLink: 'https://maps.google.com/?q=Half+Fried+Lado+Sarai+New+Delhi',
    area: 'South Delhi'
  },
  {
    id: 2,
    name: 'Mayur Vihar Phase 1',
    address: 'Main Market, Mayur Vihar Phase 1',
    city: 'New Delhi – 110091',
    phone: '+91 98110 00001',
    hours: '12:00 PM – 11:00 PM (All Days)',
    mapLink: 'https://maps.google.com/?q=Half+Fried+Mayur+Vihar+New+Delhi',
    area: 'East Delhi'
  },
  {
    id: 3,
    name: 'Saket',
    address: 'Shop 12, Community Centre, Block C, Saket',
    city: 'New Delhi – 110017',
    phone: '+91 98110 00002',
    hours: '12:00 PM – 11:00 PM (All Days)',
    mapLink: 'https://maps.google.com/?q=Half+Fried+Saket+New+Delhi',
    area: 'South Delhi'
  }
];

// ── ROUTES ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.render('home', { title: 'Half Fried — Momos · Burger · Aur Bhi Bahut Kuchh' });
});

app.get('/menu', (req, res) => {
  const cat = req.query.cat || 'momos';
  const categories = [
    { key: 'momos', label: '🥟 Momos' },
    { key: 'chinese', label: '🍜 Chinese' },
    { key: 'pasta', label: '🍝 Pasta' },
    { key: 'burgers', label: '🍔 Burgers' },
    { key: 'rolls', label: '🌯 Rolls' },
    { key: 'soups', label: '🍲 Soups' },
  ];
  res.render('menu', {
    title: 'Menu — Half Fried',
    items: menu[cat] || menu.momos,
    categories: categories.map(c => ({ ...c, active: c.key === cat })),
    currentCat: cat,
  });
});

app.get('/stores', (req, res) => {
  res.render('stores', { title: 'Find Us — Half Fried', stores });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Our Story — Half Fried' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404 — Half Fried' });
});

app.listen(PORT, () => {
  console.log(`Half Fried is sizzling at http://localhost:${PORT}`);
});

module.exports = app;
