<template>
  <div class="app-shell">
    <header class="top-bar">
      <h1>轻享商城</h1>
      <p>精选好物，随时下单</p>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <nav class="tab-bar">
      <RouterLink to="/" class="tab" active-class="active">首页</RouterLink>
      <RouterLink to="/categories" class="tab" active-class="active">分类</RouterLink>
      <RouterLink to="/cart" class="tab" active-class="active">购物车</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>
