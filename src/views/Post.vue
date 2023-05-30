<script setup>
import { ref, onMounted } from "vue";

import { db, auth } from "../firebase/init.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useRouter } from "vue-router";


const title = ref("");
const description = ref("");
const errMsg = ref("");
const category = ref("");
const isLoading = ref(false);
const userIdPost = ref(null);

const router = useRouter();

const createPost = async () => {
  const colref = collection(db, "posts");

  const dataObj = {
    title: title.value,
    description: description.value,
    category: category.value,
    createdAt: serverTimestamp(),
    userId: userIdPost.value,
  };

  await addDoc(colref, dataObj);
  router.push("/");
  isLoading.value = true;
};

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      userIdPost.value = uid;
    } else {
      // User is signed out
      // ...
    }
  });
});
</script>

<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="login-box" v-else>
    <form @submit.prevent="createPost">
      <div class="user-box">
        <input type="text" v-model="title" required />
        <label>Title</label>
      </div>
      <div class="user-box">
        <input type="text" v-model="description" required />
        <label>Description</label>
      </div>
      <div class="user-box">
        <input type="text" v-model="category" required />
        <label>Category</label>
      </div>
      <span class="text-center">
        <button type="submit">
        POST
        <span></span>
      </button>
      </span>
    </form>
  </div>
</template>

<style scoped>
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(24, 20, 20, 0.987);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.text-center {
  display: flex;
  justify-content: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus~label,
.login-box .user-box input:valid~label {
  top: -20px;
  left: 0;
  color: #bdb8b8;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03f40f;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03f40f, 0 0 25px #03f40f, 0 0 50px #03f40f,
    0 0 100px #03f40f;
}

.login-box a span {
  position: absolute;
  display: block;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(1) {
  bottom: 2px;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03f40f);
  animation: btn-anim1 2s linear infinite;
}

/* button style */
button {
  border: none;
  display: block;
  position: relative;
  padding: 0.7em 2.4em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: royalblue;
  z-index: 1;
  font-family: inherit;
  font-weight: 500;
}

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid royalblue;
}

button span::before {
  content: "";
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

button:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: royalblue;
}

button:hover {
  color: white;
}

button:active span::before {
  background: #2751cd;
}
</style>
