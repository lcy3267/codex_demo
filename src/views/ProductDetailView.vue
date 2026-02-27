<template>
  <section v-if="product" class="detail">
    <img :src="product.image" :alt="product.name" class="cover" />
    <div class="content">
      <p class="category">{{ product.category }}</p>
      <h2>{{ product.name }}</h2>
      <p class="desc">{{ product.desc }}</p>
      <div class="tags">
        <span v-for="tag in product.tags" :key="tag">{{ tag }}</span>
      </div>
      <strong class="price">¥{{ product.price }}</strong>
      <div class="actions">
        <button @click="addCart">加入购物车</button>
        <RouterLink to="/cart" class="goto">去购物车</RouterLink>
      </div>
      <p v-if="addedTip" class="tip">{{ addedTip }}</p>
    </div>
  </section>

  <p v-else>未找到商品信息。</p>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { products } from '../data/products';
import { useCartStore } from '../stores/cart';

const route = useRoute();
const cart = useCartStore();
const addedTip = ref('');

const product = computed(() =>
  products.find((item) => item.id === Number(route.params.id))
);

function addCart() {
  if (!product.value) return;
  cart.addToCart(product.value);
  addedTip.value = '已加入购物车。';
}
</script>
