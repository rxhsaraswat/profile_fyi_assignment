import React from 'react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  isUpdating: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity, isUpdating }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div>
          <h2 className="font-semibold">{item.name}</h2>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onUpdateQuantity(item.quantity - 1)}
          className={`px-2 py-1 bg-gray-200 rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUpdating || item.quantity <= 1}
        >
          -
        </button>
        <span className="mx-2">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          className={`px-2 py-1 bg-gray-200 rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUpdating}
        >
          +
        </button>
        <span className="ml-4 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
        <button
          onClick={onRemove}
          className={`ml-4 px-3 py-1 bg-red-500 text-white rounded ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isUpdating}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartItem;
