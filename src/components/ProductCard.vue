<template>
  <article class="product-card">
    <img :src="product.image" :alt="product.name" />
    <div class="body">
      <p class="category">{{ product.category }}</p>
      <h3>{{ product.name }}</h3>
      <p class="desc">{{ product.desc }}</p>
      <div class="footer">
        <strong>¥{{ product.price }}</strong>
        <RouterLink :to="`/product/${product.id}`" class="btn">查看详情</RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  product: {
    type: Object,
    required: true
  }
});
</script>
