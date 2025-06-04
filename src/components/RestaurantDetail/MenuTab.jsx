import React from 'react';

const MenuTab = ({ menu = [], onAddToCart }) => {
  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    } else {
      // Default behavior - could show a toast or modal
      console.log('Added to cart:', item.name);
    }
  };

  return (
    <div className="tab-content">
      <div className="menu-section">
        <h3>Full Menu</h3>
        <div className="menu-grid">
          {menu.map((item, idx) => (
            <div key={idx} className="menu-item">
              <div className="menu-item-icon">{item.image}</div>
              <div className="menu-item-details">
                <h4>{item.name}</h4>
                <p className="menu-item-description">{item.description}</p>
                <p className="menu-item-price">{item.price}</p>
              </div>
              {/* <button 
                className="add-btn"
                onClick={() => handleAddToCart(item)}
                aria-label={`Add ${item.name} to cart`}
              >
                +
              </button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuTab;