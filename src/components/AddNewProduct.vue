<template>
  <div class="add_product">
    <form @submit.prevent="onSubmit">
      <h3>Добавить товар:</h3>
      <div class="form-group my-2">
        <label>Наименование</label>
        <input
          v-model="productForm.name"
          class="form-control"
          placeholder="Наименование"
          required
        />
      </div>
      <div class="form-group my-2">
        <label>Цена</label>
        <input
          v-model="productForm.price"
          class="form-control"
          type="text"
          placeholder="Цена"
          required
        />
      </div>

      <div class="form-group my-2">
        <label>Описание</label>
        <b-form-textarea
          id="textarea"
          v-model="productForm.description"
          style="height: 80px"
          placeholder="Описание"
          rows="3"
          required
        ></b-form-textarea>
      </div>
      <div class="category_name">
        <b-dropdown
          id="dropdown-1"
          text="Выберите категорию"
          style="width: 100px; height: 40px"
        >
          <b-dropdown-item
            v-for="category in categories"
            :key="category.id"
            @click="selectCategory(category)"
            >{{ category.name }}</b-dropdown-item
          >
        </b-dropdown>
        <span>{{ productForm.category.name }}</span>
      </div>
      <input type="file" class="file" @change="uploadImage" />
      <div class="button_msg">
        <button
          class="btn btn-success btn-block my-2"
          type="submit"
          :disabled="!productForm.file || !productForm.category.id"
        >
          Добавить товар
        </button>
        <span>{{ responseData.message }}</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, reactive } from "vue";
import { useStore } from "..//store/index";
import { adminClient } from "../http/axios.config";
import { ActionTypes } from "../store/actions";
import { ProductForm } from "../types/types";

export default defineComponent({
  name: "AddNewProduct",
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GET_CATEGORIES);
    const userRole = computed(() => store.state.user?.role);
    const categories = computed(() => store.state.categories);
    const responseData = reactive({
      message: "",
    });
    const productForm: ProductForm = reactive({
      file: "",
      name: "",
      description: "",
      price: "",
      category: {
        id: "",
        name: "",
      },
    });
    const selectCategory = (category: any) => {
      productForm.category.id = category.id.toString();
      productForm.category.name = category.name;
    };
    const uploadImage = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (!files?.length) return;
      productForm.file = files[0];
    };

    const onSubmit = async () => {
      try {
        const formData = new FormData();
        formData.append("name", productForm.name);
        formData.append("price", productForm.price);
        formData.append("categoryId", productForm.category.id);
        formData.append("description", productForm.description);
        formData.append("file", productForm.file);

        const response = await adminClient.post("/product/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        if (response.status === 200) {
          responseData.message = "Добавлено";
          store.dispatch(ActionTypes.GET_PRODUCTS);
          productForm.category.id = "";
          productForm.category.name = "";
          productForm.description = "";
          productForm.file = "";
          productForm.name = "";
          productForm.price = "";
        }
      } catch (error: any) {
        responseData.message = error.data.message;
      }
    };
    return {
      userRole,
      categories,
      productForm,
      responseData,
      onSubmit,
      selectCategory,
      uploadImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.add_product {
  width: 50%;
  height: 75%;
  background-color: white;
  border-radius: 10px;
  margin-top: 50px;
  margin-left: 0;
  padding: 20px 0;
  @media (max-width: 1240px) {
    width: 100%;
  }

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
  display: flex;
  align-items: center;
  width: 100%;
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      background-color: green;
    }
  }
  span {
    margin-left: 100px;
    font-size: 20px;
  }
}
.file {
  margin-top: 5px;
}
</style>
