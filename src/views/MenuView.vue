<template>
  <div>
    <ProductMenu />
    <ProductsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductMenu from "../components/ProductMenu.vue";
import ProductsList from "../components/ProductsList.vue";

export default defineComponent({
  name: "MenuView",
  components: {
    ProductMenu,
    ProductsList,
  },
});
</script>
