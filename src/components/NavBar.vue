<template>
  <header>
    <nav>
      <div class="logo">
        <img src="@/assets/logo.png" />
      </div>
      <ul v-show="!mobile" class="navigation">
        <li><router-link class="link" to="/">ГЛАВНАЯ</router-link></li>
        <li><router-link class="link" to="/menu">МЕНЮ</router-link></li>
        <li v-if="!user">
          <router-link class="link" to="/login">ВОЙТИ</router-link>
        </li>
        <li>
          <router-link class="link" to="/personal">{{
            user?.email
          }}</router-link>
        </li>
        <li v-if="user" @click="logOut">
          <router-link class="link" to="/">ВЫЙТИ</router-link>
        </li>
      </ul>
      <div class="icon">
        <i
          v-show="mobile"
          class="fas fa-bars"
          :class="{ 'icon-active': mobileNav }"
          @click="toggleMobileNav"
        ></i>
      </div>
      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown_nav">
          <li><router-link class="link" to="/">ГЛАВНАЯ</router-link></li>
          <li><router-link class="link" to="/menu">МЕНЮ</router-link></li>
          <li v-if="!user" class="link">
            <router-link class="link" to="/login">ВОЙТИ</router-link>
          </li>
          <li>
            <router-link class="link" to="/personal">{{
              user?.email
            }}</router-link>
          </li>
          <li v-if="user" @click="logOut">
            <router-link class="link" to="/">ВЫЙТИ</router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script lang="ts">
import router from "@/router";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/actions";
import { computed } from "@vue/reactivity";
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    return { user, store };
  },
  data() {
    return {
      mobile: false,
      mobileNav: false,
      windowWidth: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      if (window.innerWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    logOut() {
      this.store.dispatch(ActionTypes.LOGOUT);
      router.push("/");
    },
  },
});
</script>

<style lang="scss" scoped>
header {
  background-color: white;
  z-index: 99;
  width: 100%;
  transition: 0.5s ease all;
  color: white;

  nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0;
    position: relative;
    transition: 0.5 ease all;
    width: 90%;
    margin: 0 auto;
    @media (min-width: 1140px) {
      max-width: 1140px;
    }
    ul,
    .link {
      font-weight: 500;
      color: rgb(22, 22, 22);
      list-style: none;
      text-decoration: none;
      margin-bottom: 0;
    }

    li {
      text-transform: uppercase;
      padding: 16px;
      margin-left: 16px;
    }

    .link {
      font-size: 14px;
      transition: 0.5s ease all;
      border-bottom: 1px solid transparent;

      &:hover {
        color: black;
        border-color: black;
      }
    }

    .logo {
      display: flex;
      align-items: center;

      img {
        width: 70px;
        transition: 0.5s ease all;
      }
    }

    .icon {
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      right: 24px;
      height: 100%;
      color: black;

      i {
        cursor: pointer;
        font-size: 24px;
        transition: 0.5s ease all;
      }
    }

    .navigation {
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
    }
    .icon-active {
      transform: rotate(90deg);
    }

    .dropdown_nav {
      display: flex;
      flex-direction: column;
      position: fixed;
      width: 100%;
      max-width: 250px;
      height: 100%;
      background-color: white;
      top: 0;
      left: 0;

      li {
        margin-left: 0;
        .link {
          color: black;
        }
      }
    }
  }
}
</style>
