<template>
  <div class="delete_category">
    <form @submit.prevent="onSubmit">
      <h4>Удалить категорию:</h4>
      <div class="category_name">
        <b-dropdown
          id="dropdown-1"
          text="Выберите категорию"
          style="width: 205px; height: 40px; margin-top: 5px"
        >
          <b-dropdown-item
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat)"
            >{{ cat.name }}</b-dropdown-item
          >
        </b-dropdown>
        <span>{{ category.name }}</span>
      </div>
      <div class="button_msg">
        <button
          class="btn btn-danger btn-block my-2"
          type="submit"
          :disabled="!category.id"
        >
          Удалить категорию
        </button>
        <span>{{ responseData.message }}</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { adminClient } from "@/http/axios.config";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { CategoryForm } from "@/types/types";
import { computed } from "@vue/reactivity";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "DeleteCategory",
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GET_CATEGORIES);
    const categories = computed(() => store.state.categories);
    const category: CategoryForm = reactive({
      id: "",
      name: "",
    });
    const responseData = reactive({
      message: "",
    });

    const selectCategory = (cat: any) => {
      category.id = cat.id;
      category.name = cat.name;
    };

    const onSubmit = async () => {
      try {
        const response = await adminClient.delete("/category/delete", {
          data: {
            id: category.id,
          },
        });
        if (response.status === 200) {
          responseData.message = "Удалено";
          store.dispatch(ActionTypes.GET_CATEGORIES);
        }
      } catch (error: any) {
        responseData.message = error.data.message;
      }
    };
    return {
      category,
      categories,
      responseData,
      onSubmit,
      selectCategory,
    };
  },
});
</script>

<style lang="scss" scoped>
.delete_category {
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  margin-top: 15px;
  margin-left: 0;
  display: flex;
  justify-content: center;
  align-self: center;
  padding: 20px 0;

  form {
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    button {
      width: 50%;
    }
  }
}
.category_name {
  span {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>
