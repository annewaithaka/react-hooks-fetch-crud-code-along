import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handler for adding/removing item to/from the cart
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {  // Template literals are now properly enclosed in backticks
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem))
      .catch((error) => console.error('Error updating item:', error)); // Added error handling
  }

  // Handler for deleting an item
  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {  // Template literals are now properly enclosed in backticks
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteItem(item))
      .catch((error) => console.error('Error deleting item:', error)); // Added error handling
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
