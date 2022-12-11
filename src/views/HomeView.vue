<template>
  <div class="home">
    <img src="@/assets/home_picture.jpeg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  img {
    width: 100%;
    height: 30%;
    margin: auto;
  }
}
</style>
