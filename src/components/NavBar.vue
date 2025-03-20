<template>
    <nav class="navbar">
      <!-- 漢堡選單按鈕 (手機版) -->
      <div class="menu-toggle" @click="toggleMenu">
        ☰
      </div>
  
      <!-- 選單項目 -->
      <ul :class="{ 'nav-list': true, 'active': isOpen }">
        <li v-for="(item, index) in navItems" :key="index" class="nav-item">
          <a :href="item.link">{{ item.text }}</a>
        </li>
      </ul>
    </nav>
</template>
  
<script setup>
import { ref } from 'vue';

// 動態選單
const navItems = ref([
  { text: "首頁", link: "#" },
  { text: "關於我們", link: "#" },
  { text: "服務", link: "#" },
  { text: "聯絡我們", link: "#" }
]);

// 控制漢堡選單開關
const isOpen = ref(false);
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
  
<style scoped>
/* 🌑 左側固定導覽列 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* 固定寬度 */
  max-width: 50px;
  height: 100vh; /* 讓 navbar 撐滿整個視窗高度 */
  background: linear-gradient(135deg, #1a1a1a, #0d0d0d);
  box-shadow: 4px 0px 10px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 1000;
}

/* 🔥 選單樣式 */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}

.nav-item {
  margin: 10px 0;
  width: 100%;
  text-align: center;
}

.nav-item a {
  text-decoration: none;
  color: #ccc;
  font-size: 12px;
  font-weight: bold;
  padding: 10px 20px;
  display: block;
  width: 100%;
  transition: all 0.3s ease-in-out;
}

/* 🎭 懸浮動畫 */
.nav-item a:hover {
  color: #fff;
  background: linear-gradient(135deg, #333, #111);
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

/* 🔥 點擊效果 */
.nav-item a:active {
  transform: scale(0.95);
  filter: brightness(0.8);
}

/* 📱 漢堡選單 (手機版) */
.menu-toggle {
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
  position: absolute;
  top: 15px;
  right: 15px;
}

/* 響應式支援 (小於 768px 時變成漢堡選單) */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-list {
    position: absolute;
    top: 60px;
    left: 0;
    width: 50%;
    /* flex-direction: column; */
    background: #0d0d0d;
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.3s ease-in-out;
    pointer-events: none;
  }

  /* 🚀 漢堡選單展開動畫 */
  .nav-list.active {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .nav-item {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
