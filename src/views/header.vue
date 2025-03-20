<template>
    <section class="headers" @mousemove="moveEyes">
      <div class="face">
        <img class="character" src="/public/images/測試.PNG" alt="人物" />
        <div class="eyes">
          <div class="eye">
            <div class="pupil" ref="leftPupil"></div>
          </div>
          <div class="eye">
            <div class="pupil" ref="rightPupil"></div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const leftPupil = ref(null);
  const rightPupil = ref(null);
  
  const moveEyes = (event) => {
  const eyes = document.querySelectorAll(".eye");

  eyes.forEach((eye) => {
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const pupil = eye.querySelector(".pupil");
    const pupilSize = pupil.offsetWidth / 2; // 瞳孔的半徑
    const maxMove = (eyeRect.width / 2) - pupilSize - 2; // 限制移動範圍，避免超出

    const deltaX = event.clientX - eyeCenterX;
    const deltaY = event.clientY - eyeCenterY;

    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxMove);

    pupil.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
  });
};




  
  onMounted(() => {
    window.addEventListener("mousemove", moveEyes);
  });
  </script>
  
  <style>
  .headers {

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

}

.face {
  position: relative;
  width: 30vw; /* 讓圖片隨著螢幕大小變化 */
  max-width: 500px;
  height: auto;
}

.character {
  width: 100%;
  height: auto;
  position: relative;
}

/* 眼睛框架 */
.eyes {
  position: absolute;
  top: 32%; /* 眼睛位置根據 .face 大小變化 */
  left: 50%;
  width: 20%; /* 讓眼睛區域相對於臉部變化 */
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
}

/* 眼睛 */
.eye {
  width: 2vw; /* 讓眼睛大小跟著 .face 變化 */
  height: 2vw;
  background: white;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3);
}

/* 瞳孔 */
.pupil {
  width: 1vw; /* 讓瞳孔大小跟著 .face 變化 */
  height: 1vw;
  background: black;
  border-radius: 50%;
  position: absolute;
  transition: transform 0.05s ease-out;
}

/* 當螢幕較小時，讓 .face 變小，眼睛等比例縮放 */
@media (max-width: 768px) {
  .face {
    width: 50vw;
  }

  .eyes {
    width: 22%;
  }

  .eye {
    width: 4vw;
    height: 4vw;
  }

  .pupil {
    width: 1.5vw;
    height: 1.5vw;
  }
}

  </style>
  