<template>
  <div class="delete_product">
    <form @submit.prevent="onSubmit">
      <h4>Удалить товар:</h4>
      <div class="product_name">
        <b-dropdown
          id="dropdown-1"
          text="Выберите товар"
          style="width: 205px; height: 40px; margin-top: 5px"
        >
          <b-dropdown-item
            v-for="prod in products"
            :key="prod.id"
            @click="selectProduct(prod)"
            >{{ prod.name }}</b-dropdown-item
          >
        </b-dropdown>
        <span>{{ product.name }}</span>
      </div>
      <div class="button_msg">
        <button
          class="btn btn-danger btn-block my-2"
          type="submit"
          :disabled="!product.id"
        >
          Удалить товар
        </button>
        <span>{{ responseData.message }}</span>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { adminClient } from "../http/axios.config";
import { useStore } from "../store";
import { ActionTypes } from "../store/actions";
import { ProductDelete } from "../types/types";

export default defineComponent({
  name: "DeleteProduct",
  setup() {
    const store = useStore();
    store.dispatch(ActionTypes.GET_PRODUCTS);
    const products = computed(() => store.state.products);
    const product: ProductDelete = reactive({
      id: null,
      name: "",
    });

    const responseData = reactive({
      message: "",
    });

    const selectProduct = (prod: any) => {
      product.id = prod.id;
      product.name = prod.name;
    };

    const onSubmit = async () => {
      try {
        const response = await adminClient.delete("/product/delete", {
          data: {
            id: product.id,
          },
        });

        if (response.status === 200) {
          responseData.message === "Удалено";
          product.name = "";
          store.dispatch(ActionTypes.GET_PRODUCTS);
        }
      } catch (error: any) {
        responseData.message = error.data.message;
      }
    };
    return {
      product,
      products,
      responseData,
      onSubmit,
      selectProduct,
    };
  },
});
</script>

<style lang="scss" scoped>
.delete_product {
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
.product_name {
  span {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>
