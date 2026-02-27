<template>
  <section>
    <div class="hero">
      <h2>今日推荐</h2>
      <p>海量商品，轻松选购。PC 浏览体验完整，移动端同样丝滑。</p>
    </div>

    <div class="grid products-grid">
      <ProductCard v-for="item in products" :key="item.id" :product="item" />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue';
import { products } from '../data/products';
</script>
