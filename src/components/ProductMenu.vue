<template>
  <div class="menu">
    <p v-if="isLoading">Loading...</p>
    <ul v-for="category in categories" :key="category.id">
      <span
        :class="
          category.id.toString() === selectedCategory
            ? 'selected'
            : 'not_selected'
        "
        @click="selectCategory(category.id.toString())"
        >{{ category.name }}</span
      >
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

import { computed } from "@vue/reactivity";
import { ActionTypes } from "../store/actions";
import { store, useStore } from "../store/index";

export default defineComponent({
  name: "ProductMenu",
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);
    const categories = computed(() => store.state.categories);
    const selectedCategory = computed(() => store.state.selectedCategory);
    onMounted(() => store.dispatch(ActionTypes.GET_CATEGORIES));
    return { isLoading, categories, selectedCategory };
  },
  methods: {
    selectCategory(category: string) {
      store.dispatch(ActionTypes.SELECT_CATEGORY, category);
      store.dispatch(ActionTypes.GET_PRODUCTS, category);
    },
  },
});
</script>

<style lang="scss" scoped>
.menu {
  max-width: 1140px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  max-width: 1140px;
  margin: auto;

  ul {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-left: 1rem;
    padding-left: 0;
  }
  .not_selected {
    cursor: pointer;
    font-size: 20px;
    margin-right: 2rem;
    transition: 0.5s ease all;
    border-bottom: 1px solid transparent;

    &:hover {
      color: black;
      border-color: black;
    }
  }
  .selected {
    cursor: pointer;
    font-size: 20px;
    margin-right: 2rem;

    border-bottom: 1px solid black;
  }
}
</style>
