<template>
  <div id="app">
    <Navbar @logout="handleLogout" @login="showLogin=true"/>

    <router-view />
    <Snackbar ref="snackbarRef" />
    <LoginModal
      v-if="!isAuthenticated && showLogin"
      
      @loggedIn="handleLogin"
      @close="showLogin = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import { useRoute } from 'vue-router';
import { authService } from './services/auth.service';
import LoginModal from './modals/login.page.vue';
import Navbar from './components/navbar.vue';
import Snackbar from './components/snackbar.vue';
import { registerSnackbar, useSnackbar } from './composables/usesnackbar';

const { showSnackbar } = useSnackbar();
registerSnackbar(showSnackbar);
const showLogin = ref(false);
const isAuthenticated = ref(authService.isAuthenticated());
useRoute();

const handleLogin = () => {
  isAuthenticated.value = true;
  showLogin.value = false;
};

const handleLogout = () => {
  authService.logout();
  isAuthenticated.value = false;
  showLogin.value = false;
};
</script>

<style scoped>
#app {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  color: black;
  background-color: #e1d8d7d2; /* gris clair */
}

</style>
