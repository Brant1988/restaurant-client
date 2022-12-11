<template>
  <div class="personal">
    <div v-if="userRole === 'ADMIN'"></div>
    <AddNewProduct />
    <div class="category_product_control">
      <AddNewCategory />
      <DeleteCategory />
      <DeleteProduct />
    </div>
  </div>
</template>

<script lang="ts">
import AddNewCategory from "@/components/AddNewCategory.vue";
import AddNewProduct from "@/components/AddNewProduct.vue";
import DeleteCategory from "@/components/DeleteCategory.vue";
import DeleteProduct from "@/components/DeleteProduct.vue";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";
import { useStore } from "..//store/index";

export default defineComponent({
  name: "LoginView",
  components: {
    AddNewProduct,
    AddNewCategory,
    DeleteCategory,
    DeleteProduct,
  },
  setup() {
    const store = useStore();
    const userRole = computed(() => store.state.user?.role);
    return { userRole };
  },
});
</script>

<style lang="scss" scoped>
.personal {
  max-width: 1140px;
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  @media (max-width: 1240px) {
    flex-direction: column;
  }
}
.category_product_control {
  width: 45%;
  margin-top: 50px;
  @media (max-width: 1240px) {
    width: 100%;
  }
}
</style>
