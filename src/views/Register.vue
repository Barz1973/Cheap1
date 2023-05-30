<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { db } from "../firebase/init.js";
import { collection, addDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const gender = ref("");
const errMsg = ref("");
const router = useRouter();
const isLoading = ref(false);

// creating a users

const createUser = async () => {
  const colRef = collection(db, "users");

  const userObj = {
    name: email.value,
    password: password.value,
    gender: gender.value,
  };

  await addDoc(colRef, userObj);
  // isLoading.value = true;
  console.log(gender.value);
};

const register = async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("password dont match");
    confirmPassword.value = "";
    password.value = "";
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push("/authors");
    })
    .catch((err) => (errMsg.value = extractValueInParenthesis(err.message)));
  isLoading.value = true;
  createUser();
  console.log(gender.value);
};

function extractValueInParenthesis(str) {
  const regex = /\((.*?)\)/; // regex to match text inside parentheses
  const matches = str.match(regex);
  if (matches) {
    const value = matches[1].replace("auth/", ""); // remove "auth/" prefix
    return value;
  }
  return ""; // return empty string if no match found
}
</script>
<template>
  <div v-if="isLoading">
    <Spinner />
  </div>
  <div class="container" v-else>
    <div class="login-box">
      <form class="form" @submit.prevent="register">
        <p class="form-title">Register account</p>
        <div class="user-box">
          <input type="email" v-model="email" required />
          <label>Email</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="password" required />
          <label>Password</label>
        </div>
        <div class="user-box">
          <input type="password" v-model="confirmPassword" required />
          <label>Confirm Password</label>
        </div>

        <div class="radio-style">
          <div>
            <input type="radio" id="male" value="male" v-model="gender" />
            <label for="male">Male</label>
          </div>
          <div>
            <input type="radio" id="female" value="female" v-model="gender" />
            <label for="female">Female</label>
          </div>
        </div>
        <button type="submit">
          Register
          <span></span>
        </button>
      </form>
    </div>
  </div>
</template>
<style scoped>
.radio-style,
.form-title {
  color: rgb(41, 38, 38);
}
.form-title {
  text-align: center;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: #f2f8f9;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #2e2c2c;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #494545;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #292727;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
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
