<template>
    <div ref="scrollElement" :class="{ show: isVisible }" class="fade-in">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  
  const isVisible = ref(false);
  const scrollElement = ref(null);
  
  let observer = null;
  
  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect(); // 觸發後停止監測，避免重複
      }
    }, {
      root: null, // 監測視口
      threshold: 0.2 // 20% 進入時觸發
    });
  
    if (scrollElement.value) {
      observer.observe(scrollElement.value);
    }
  });
  
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });
  </script>
  
  <style scoped>
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  
  .show {
    opacity: 1;
    transform: translateY(0);
  }
  </style>
  