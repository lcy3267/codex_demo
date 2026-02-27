<template>
  <section>
    <h2 class="section-title">购物车</h2>

    <div v-if="!cart.items.length" class="empty">
      购物车还是空的，快去首页挑选商品吧！
    </div>

    <div v-else class="cart-list">
      <article v-for="item in cart.items" :key="item.id" class="cart-item">
        <img :src="item.image" :alt="item.name" />
        <div class="meta">
          <h3>{{ item.name }}</h3>
          <p>¥{{ item.price }}</p>
          <div class="count-box">
            <button @click="cart.updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="cart.updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
        </div>
        <button class="remove" @click="cart.removeItem(item.id)">移除</button>
      </article>

      <footer class="summary">
        <p>共 {{ cart.totalCount }} 件商品</p>
        <strong>合计：¥{{ cart.totalPrice }}</strong>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '../stores/cart';

const cart = useCartStore();
</script>
