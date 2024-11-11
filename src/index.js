import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const pizzaData = [
  { name: "Spinach Pizza", ingredients: ["Tomato", "Mozzarella", "Spinach", "Ricotta Cheese"], price: 10, image: "pizzas/spinaci.jpg" },
  { name: "Margherita Pizza", ingredients: ["Tomato", "Mozzarella"], price: 8, image: "pizzas/margherita.jpg" },
  { name: "Focaccia", ingredients: ["Mozzarella"], price: 12, image: "pizzas/focaccia.jpg" },
  { name: "Funghi", ingredients: ["Mushrooms", "Mozzarella"], price: 12, image: "pizzas/funghi.jpg" },
  { name: "Salamino", ingredients: ["Salamino", "Mozzarella", "Tomato"], price: 12, image: "pizzas/salamino.jpg" },
  { name: "Prosciutto", ingredients: ["Prosciutto", "Mozzarella", "Tomato"], price: 12, image: "pizzas/prosciutto.jpg" }
];

function App() {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 10 && currentHour < 22;

  return (
    <div className="content">
      <h1 className="header">Nick's Pizza Co.</h1>
      {isOpen && <h2 className="tagline">Authentic Italian Cuisine</h2>}
      <h2 className='menu-header'>Our Menu</h2>
      <Menu />
      <Footer isOpen={isOpen} />
      <button className='order-btn'>Order</button> {/* "Order" button outside the pizza items */}
    </div>
  );
}

// Menu component with search functionality
function Menu() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredPizzas = pizzaData.filter(pizza =>
    pizza.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="menu">
      <input
        type="text"
        placeholder="Search pizzas..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="pizzas">
        {filteredPizzas.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            image={pizza.image}
          />
        ))}
      </div>
    </div>
  );
}

// Pizza component
function Pizza({ name, image, ingredients, price }) {
  return (
    <div className="pizza-container">
      <img src={image} alt={`${name} img`} />
      <div className="pizza-details">
        <h3>{name}</h3>
        <ul>
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <p>${price}</p>
      </div>
    </div>
  );
}

// Footer component
function Footer({ isOpen }) {
  return (
    <footer className="footer">
      {isOpen ? "We're currently open" : "Sorry, we're closed"}
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
