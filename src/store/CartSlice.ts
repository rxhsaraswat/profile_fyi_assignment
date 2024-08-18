import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  productId: string; // Add this line
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await fetch('/api/cart');
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json() as Promise<CartItem[]>;
});

export const addToCartAsync = createAsyncThunk(
  'cart/addToCartAsync',
  async (product: Omit<CartItem, 'quantity' | 'id'>, { dispatch }) => {
    console.log("Adding to cart:", product);
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, quantity: 1 }),
    });
    if (!response.ok) throw new Error('Failed to add item to cart');
    const addedItem = await response.json() as CartItem;
    console.log("Added item:", addedItem);
    return addedItem;
  }
);
export const updateQuantityAsync = createAsyncThunk(
  'cart/updateQuantityAsync',
  async ({ id, quantity }: { id: string; quantity: number }, { dispatch }) => {
    const response = await fetch(`/api/cart`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, quantity }),
    });
    if (!response.ok) throw new Error('Failed to update quantity');
    const updatedItem = await response.json() as CartItem;
    dispatch(cartSlice.actions.updateQuantity({ id, quantity }));
    return updatedItem;
  }
);

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCartAsync',
  async (id: string, { dispatch }) => {
    const response = await fetch(`/api/cart`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) throw new Error('Failed to remove item from cart');
    dispatch(cartSlice.actions.removeFromCart(id));
    return id;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const existingItemIndex = state.items.findIndex(item => item.productId === action.payload.productId);
        if (existingItemIndex !== -1) {
          state.items[existingItemIndex].quantity += 1;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action: PayloadAction<CartItem>) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
