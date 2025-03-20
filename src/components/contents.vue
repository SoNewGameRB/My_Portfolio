<template>
    <section class="box">
      <!-- 內容輪播區 -->
      <div class="carousel">
        <transition name="fade" mode="out-in">
          <div v-if="items.length > 0" :key="currentIndex" class="slide">
            <h2>{{ items[currentIndex].title }}</h2>
            <p>{{ items[currentIndex].description }}</p>
          </div>
        </transition>
      </div>
  
      <!-- 左右切換按鈕 -->
      <div class="controls">
        <button @click="prevItem">◀</button>
        <button @click="nextItem">▶</button>
      </div>
  
      <!-- 內容指示點 -->
      <div class="dots">
        <span v-for="(item, index) in items" :key="index"
          @click="currentIndex = index"
          :class="{ active: currentIndex === index }"></span>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  
  // 存放 API 取得的資料
  const items = ref([]);
  const currentIndex = ref(0);
  
  // 取得 API 資料
  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5"); // 假設這是 API
      const data = await response.json();
      // 轉換 API 格式
      items.value = data.map((item, index) => ({
        title: item.title,
        description: item.body
      }));
    } catch (error) {
      console.error("API 請求失敗:", error);
    }
  };
  
  // 切換到下一個
  const nextItem = () => {
    currentIndex.value = (currentIndex.value + 1) % items.value.length;
  };
  
  // 切換到上一個
  const prevItem = () => {
    currentIndex.value = (currentIndex.value - 1 + items.value.length) % items.value.length;
  };
  
  // 初始載入 API
  onMounted(fetchData);
  </script>
  
  <style scoped>
@keyframes neonBorder {
  0% {
    box-shadow: inset 20px 0 30px rgba(255, 0, 0, 0.8);
  }
  25% {
    box-shadow: inset 0 20px 30px rgba(0, 255, 0, 0.8);
  }
  50% {
    box-shadow: inset -20px 0 30px rgba(0, 0, 255, 0.8);
  }
  75% {
    box-shadow: inset 0 -20px 30px rgba(255, 255, 0, 0.8);
  }
  100% {
    box-shadow: inset 20px 0 30px rgba(255, 0, 0, 0.8);
  }
}
  /* 🌟 外框 */
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 30rem;
	height: 20rem;
	box-shadow: 0 0 1rem 0 rgb(0, 0, 0);	
	border-radius: 5px;
	background-color: rgba(255, 255, 255, .15);
	
	backdrop-filter: blur(5px);
    
  }

  /* 🌟 內容區塊 */
  .slide {
    text-align: center;
    padding: 20px;
  }
  
  .slide h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .slide p {
    font-size: 16px;
    color: #666;
  }
  
  /* 🌟 切換按鈕 */
  .controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
  
  .controls button {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 18px;
    border-radius: 50%;
    pointer-events: auto;
    transition: background-color 0.3s ease;
  }
  
  .controls button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  /* 🌟 內容指示點 */
  .dots {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  
  .dots span {
    width: 10px;
    height: 10px;
    margin: 5px;
    background-color: #ccc;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .dots span.active {
    background-color: #333;
  }
  
  /* 🌟 Vue 過渡動畫 */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  </style>
  