<template>
  <section>
    <h2 class="section-title">商品分类</h2>

    <div class="chips">
      <button
        v-for="item in categories"
        :key="item"
        :class="['chip', { selected: item === activeCategory }]"
        @click="activeCategory = item"
      >
        {{ item }}
      </button>
    </div>

    <div class="grid products-grid">
      <ProductCard v-for="item in filteredProducts" :key="item.id" :product="item" />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { products } from '../data/products';

const categories = ['全部', ...new Set(products.map((item) => item.category))];
const activeCategory = ref('全部');

const filteredProducts = computed(() => {
  if (activeCategory.value === '全部') return products;
  return products.filter((item) => item.category === activeCategory.value);
});
</script>
