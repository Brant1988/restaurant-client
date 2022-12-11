<template>
  <div class="add_category">
    <form @submit.prevent="onSubmit">
      <h4>Добавить категорию:</h4>
      <div class="form-group my-2">
        <label>Наименование</label>
        <input
          v-model="category.name"
          class="form-control"
          placeholder="Наименование"
          required
        />
      </div>
      <div class="button_msg">
        <button
          class="btn btn-success btn-block my-2"
          type="submit"
          :disabled="!category.name"
        >
          Добавить категорию
        </button>
        <span>{{ responseData.message }}</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { adminClient } from "../http/axios.config";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { CategoryForm } from "../types/types";

export default defineComponent({
  name: "AddNewCategory",
  setup() {
    const store = useStore();
    const category: CategoryForm = reactive({
      id: "",
      name: "",
    });
    const responseData = reactive({
      message: "",
    });
    const onSubmit = async () => {
      try {
        const response = await adminClient.post("/category/add", {
          name: category.name,
        });
        if (response.status === 200) {
          responseData.message = "Добавлено";
          category.name = "";
          store.dispatch(ActionTypes.GET_CATEGORIES);
        }
      } catch (error: any) {
        responseData.message = error.data.message;
      }
    };
    return {
      category,
      responseData,
      onSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.add_category {
  width: 100%;
  height: auto;
  background-color: white;
  border-radius: 10px;
  margin-left: 0;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;

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
</style>
