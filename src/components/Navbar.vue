<script setup>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
import { auth } from "../firebase/init.js";
import { onMounted, ref } from "vue";

const isLoggedIn = ref(false);
const emailName = ref("");

const router = useRouter();

onMounted(() => {
  // Check the current logged-in user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
      emailName.value = getEmailName(user.email);
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignout = () => {
  if (confirm("Are you sure you want to sign out?")) {
    signOut(auth).then(() => {
      router.push("/sign-in");
    });
  }
};

function getEmailName(email) {
  // Split the email address on the @ symbol.
  const parts = email.split("@");

  // Return the first part of the email address.
  return parts[0];
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/" class="logo-text">Cheaptalk</router-link>
    </div>
    <div class="menu">
      <ul>
        <li v-if="isLoggedIn">
          <router-link to="/">Home</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/create-post">Posts</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/authors">Authors</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/feed">Authors Post</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/register">Register</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <router-link to="/sign-in">Login</router-link>
        </li>
        <li v-if="isLoggedIn">
          <button @click="handleSignout">
            <span class="box">{{ emailName }}</span>
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav.navbar {
  width: 100%;
  height: 75px;
  background: linear-gradient(45deg, #ff0000, #00ff00); /* Update background colors here */
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.navbar .logo {
  display: flex;
  align-items: center;
}

.logo-text {
  color: white;
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
}

.menu ul {
  display: flex;
  align-items: center;
  list-style-type: none;
}

.menu li {
  margin: 0 15px;
}

.menu li a {
  color: white;
  font-size: 17px;
  font-weight: 500;
  text-decoration: none;
}

.box {
  width: 140px;
  height: auto;
  float: left;
  transition: 0.3s ease-in-out;
  position: relative;
  display: block;
  overflow: hidden;
  padding: 8px;
  text-align: center;
  margin: 0 3px;
  background: transparent;
  text-transform: uppercase;
  font-weight: 900;
}

.box:before {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  border-bottom: 4px solid transparent;
  border-left: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(100%);
}

.box:after {
  position: absolute;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(-100%);
}

.box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

button {
  color: white;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
}
</style>
