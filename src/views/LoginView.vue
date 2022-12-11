<template>
  <div class="login">
    <div class="exist">
      <h6>
        {{ loginStatus.isExst ? "Нет аккаунта?..." : "Есть аккаунт?..." }}
      </h6>
      <button @click="toggleExist">
        {{ loginStatus.isExst ? "Зарегестрируйтесь" : "Войдите" }}
      </button>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="form-group my-2">
        <label>Email</label>
        <div class="email_password">
          <input
            v-model="form.email"
            class="form-control"
            placeholder="example@email.ru"
            type="email"
            required
          />
          <i class="fa-solid fa-envelope"></i>
        </div>
      </div>
      <div class="form-group my-2">
        <label>Password</label>
        <div class="email_password">
          <input
            v-model="form.password"
            class="form-control"
            :type="loginStatus.isPasswordVisible ? 'text' : 'password'"
            placeholder="Password"
            required
          />
          <i class="fa-solid fa-eye" @click="toggleVisible"></i>
        </div>
      </div>
      <div class="alert">
        <button class="btn btn-success btn-block my-2" type="submit">
          {{ loginStatus.isExst ? "ВОЙТИ" : "РЕГИСТРАЦИЯ" }}
        </button>
        <span v-if="errorMsg" class="text-danger my-2">{{ errorMsg }}</span>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import router from "@/router";
import { computed } from "@vue/reactivity";
import { defineComponent, reactive } from "vue";
import { useStore } from "..//store/index";
import { ActionTypes } from "../store/actions";
import { LoginForm } from "../types/types";
export default defineComponent({
  setup() {
    const store = useStore();
    const errorMsg = computed(() => store.state.errorMsg);

    const loginStatus = reactive({
      isExst: true,
      isPasswordVisible: false,
    });

    const form: LoginForm = reactive({
      email: "",
      password: "",
    });
    const toggleExist = () => {
      loginStatus.isExst = !loginStatus.isExst;
    };
    const toggleVisible = () => {
      loginStatus.isPasswordVisible = !loginStatus.isPasswordVisible;
    };

    const onSubmit = () => {
      if (loginStatus.isExst) {
        store.dispatch(ActionTypes.LOGIN_USER, {
          email: form.email,
          password: form.password,
        });
      }
      if (!loginStatus.isExst) {
        store.dispatch(ActionTypes.REGISTER_USER, {
          email: form.email,
          password: form.password,
        });
      }
      if (!errorMsg) {
        form.email = "";
        form.password = "";
        router.push("/personal");
      }
    };
    return {
      form,
      errorMsg,
      loginStatus,
      onSubmit,
      toggleExist,
      toggleVisible,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  width: 30%;
  height: 30%;
  margin: auto;
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  form {
    width: 80%;
    height: 100%;
  }
}
.exist {
  width: 80%;
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: white;
    border: none;
    border-bottom: 1px solid black;
  }
  h6 {
    margin-top: 5px;
  }
}
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 0;
}
.email_password {
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: row;
  i {
    margin-left: 5px;
  }
}
.form-control {
  width: 90%;
}
</style>
