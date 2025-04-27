// // redux/reducers/cartSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItemIndex = state.items.findIndex(
//         item => item.itemId === action.payload.itemId && item.color === action.payload.color
//       );

//       if (existingItemIndex !== -1) {
//         // If already in cart, increase quantity
//         state.items[existingItemIndex].quantity += 1;
//       } else {
//         state.items.push({ ...action.payload, quantity: 1 });
//       }
//     },

//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         item => !(item.itemId === action.payload.itemId && item.color === action.payload.color)
//       );
//     },

//     updateCartQuantity: (state, action) => {
//       const { itemId, color, quantity } = action.payload;
//       const item = state.items.find(
//         item => item.itemId === itemId && item.color === color
//       );
//       if (item) {
//         item.quantity = quantity;
//       }
//     },

//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;


// redux/reducers/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartItems, clearCart } = cartSlice.actions; // ✅ must export like this
export default cartSlice.reducer;
