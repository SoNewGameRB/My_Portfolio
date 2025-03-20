<template>
  <div class="layout">
    <!-- 左側導覽列 -->
    <navbar class="navbar"></navbar>
    
    <!-- 中間主要內容 -->
    <main class="content">
      <slot><contents/></slot> <!-- 可填入內容 -->
    </main>

    <!-- 右側標題區 -->
    <headers class="headers"></headers>
  </div>
</template>

<script setup>
import navbar from './components/NavBar.vue'
import headers from './views/header.vue';
import contents from './components/contents.vue';
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+15&family=Noto+Sans+JP:wght@100..900&family=Noto+Serif+Hentaigana:wght@200..900&display=swap');

* {
  font-family: "Noto Sans JP", sans-serif;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}

/* 三欄式佈局 */
.layout {
  display: flex;
  height: 100vh; /* 讓整個畫面填滿視窗 */
  background-image: url('./assets/images/黑森林.jpg'); /* 設置背景圖片 */
  background-size: cover; /* 讓圖片填滿整個畫面 */
  background-position: center; /* 讓圖片置中 */
  background-repeat: no-repeat; /* 防止背景圖片重複 */
}

/* 左側導覽列 */
.navbar {
  width: 10%; /* 佔整體寬度 20% */
  background-color: #2c3e50;
  color: white;
}

/* 中間內容區 */
.content {
  flex-grow: 1; /* 佔據剩餘可用空間 */
  padding: 20px;
  /* border:  solid 1px black; */
  position: relative;
  left: 8%;
  /* z-index: -100; */
}

/* 右側標題區 */
.headers {
  width: 40%; /* 佔整體寬度 20% */
  /* background-color: #ecf0f1; */
  padding: 20px;

}

/* 響應式設計 */
@media (max-width: 768px) {
  .layout {
    flex-direction: column;
  }

  .navbar, .headers {
    width: 100%;
    height: auto;
  }

  .content {
    width: 100%;
  }
}
</style>
