<template>
  <div class="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./components/NavBar.vue";
export default defineComponent({
  name: "App",
  components: {
    NavBar,
  },
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
.button_msg {
  display: flex;
  align-items: center;
  span {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>
