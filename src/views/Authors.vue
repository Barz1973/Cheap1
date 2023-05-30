<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "../firebase/init.js";

import { collection, getDocs } from "firebase/firestore";



const authors = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const authorLocal = [];

  querySnapshot.forEach((doc) => {
    const auth = {
      id: doc.id,
      name: doc.data().name,
      password: doc.data().password,
      gender: doc.data().gender,
    };

    authorLocal.push(auth);
  });
  authors.value = authorLocal;
  isLoading.value = false;
  console.log(authors.value);
});
</script>
<template>
  <div>
    <h1>Authors</h1>
    <div class="grid">
      <div class="card" v-for="author in authors" :key="author.id">
        <div class="card-content">
          <div class="card-back">
            <p :style="{ color: author.gender === 'male' ? 'white' : 'red' }">
              {{ author.name }}
            </p>
            
          </div>
          <div class="card-front">
            <div class="card-image">
              <div class="circle"></div>
              <div class="circle" id="right"></div>
              <div class="circle" id="bottom"></div>
            </div>
            <div class="card-info">
              <small class="card-badge">Pasta</small>
              <div class="card-description">
                <div class="card-title">
                  <p
                    :style="{
                      color: author.gender === 'male' ? 'white' : 'pink',
                    }"
                  >
                    {{ author.gender }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.card-content {
  position: relative;
}

.card-back {
  background-color: #000;
  padding: 10px;
  text-align: center;
  color: #fff;
  transition: transform 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card:hover .card-back {
  transform: translateY(-100%);
}

.card-front {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateY(100%);
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s;
}

.card:hover .card-front {
  transform: translateY(0);
}

.card-image {
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.circle {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
}

#right {
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
}

#bottom {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.card-info {
  text-align: center;
}

.card-badge {
  background-color: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 10px;
  display: inline-block;
}

.card-description {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-title {
  font-size: 14px;
  font-weight: bold;
  color: #000;
  margin: 0;
}

.card p {
  margin: 0;
}
</style>
