<template>
  <keep-alive>
    <router-view class="fadeIn" />
  </keep-alive>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  animation-name: fadeIn;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
}
</style>
