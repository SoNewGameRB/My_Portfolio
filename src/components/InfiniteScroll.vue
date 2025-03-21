<template>
    <div class="container">
      <h2>無限滾動加載數據</h2>
      
      <div class="list">
        <div v-for="item in items" :key="item.id" class="list-item">
          📌 {{ item.text }}
        </div>
      </div>
  
      <div ref="loadMoreRef" class="loading">🔄 加載中...</div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const items = ref([]); // 存儲數據
  const page = ref(1); // 當前頁碼
  const loadMoreRef = ref(null); // 監測的 DOM 元素
  let observer = null;
  
  // 模擬 API 獲取數據
  const fetchMoreData = () => {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: items.value.length + i + 1,
        text: `項目 ${items.value.length + i + 1}`
      }));
      items.value.push(...newItems);
      page.value++;
    }, 1000); // 模擬網路延遲
  };
  
  onMounted(() => {
    fetchMoreData(); // 頁面載入時先載入第一批數據
  
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchMoreData();
      }
    }, {
      root: null, // 監聽視口
      threshold: 0.5 // 50% 可見時觸發
    });
  
    if (loadMoreRef.value) {
      observer.observe(loadMoreRef.value);
    }
  });
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: auto;
    text-align: center;
  }
  
  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .list-item {
    background: lightblue;
    padding: 15px;
    border-radius: 8px;
    font-size: 18px;
  }
  
  .loading {
    font-size: 18px;
    padding: 20px;
    color: gray;
  }
  </style>
  