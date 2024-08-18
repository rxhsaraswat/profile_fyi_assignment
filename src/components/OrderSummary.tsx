import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  deliveryCharges: number;
  discount: number;
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, tax, deliveryCharges, discount, total }) => {
  return (
    <div className="mt-8 bg-gray-100 p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-2">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Tax:</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Delivery Charges:</span>
        <span>${deliveryCharges.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount:</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold mt-4">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
