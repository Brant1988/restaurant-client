<template>
  <div class="products">
    <p v-if="isLoading">Loading...</p>
    <div v-for="product in products" :key="product.id">
      <b-card
        no-body
        style="
          width: 300px;
          height: 350px;
          margin-left: 15px;
          margin-bottom: 15px;
        "
        :img-src="apiUrl + product.img + '.jpg'"
        img-alt="Image"
        img-top
      >
        <template #header>
          <h5 class="mb-0">{{ product.name }}</h5>
        </template>
        <b-card-body>
          <b-card-title>{{ product.price + " руб" }}</b-card-title>
          <b-card-text style="font-size: 15px">
            {{ product.description }}
          </b-card-text>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "@vue/reactivity";
import { defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { ActionTypes } from "../store/actions";
import { API_URL } from "../utils/apiUrl";

export default defineComponent({
  name: "ProducList",
  setup() {
    const apiUrl = API_URL;
    const store = useStore();
    const isLoading = computed(() => store.state.isLoading);
    const products = computed(() => store.state.products);
    onMounted(() => store.dispatch(ActionTypes.GET_PRODUCTS));
    return { isLoading, products, apiUrl };
  },
});
</script>

<style lang="scss">
.products {
  max-width: 1140px;
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  max-width: 1140px;
  margin: auto;
}
.card {
  img {
    width: 300px;
    height: 150px;
  }
}
</style>
