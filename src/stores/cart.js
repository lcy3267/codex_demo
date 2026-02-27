import { computed, reactive } from 'vue';

const state = reactive({
  items: []
});

export function useCartStore() {
  const totalCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

  function addToCart(product) {
    const existing = state.items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
      return;
    }

    state.items.push({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1
    });
  }

  function updateQuantity(id, nextQuantity) {
    const target = state.items.find((item) => item.id === id);
    if (!target) return;
    target.quantity = Math.max(1, nextQuantity);
  }

  function removeItem(id) {
    const idx = state.items.findIndex((item) => item.id === id);
    if (idx >= 0) state.items.splice(idx, 1);
  }

  return {
    items: state.items,
    totalCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem
  };
}
