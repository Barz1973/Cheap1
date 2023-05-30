<template>
  <!-- <SearchInput /> -->
  <div class="search">
    <select
      name="category"
      id="category"
      v-model="selectedCat"
      class="search__input"
    >
      <option disabled value="">Select Category</option>
      <option value="all">All</option>
      <option v-for="post in posts" :value="post.category" :key="post.id">
        {{ post.category }}
      </option>
    </select>
  </div>

  <div class="container">
    <div class="grid">
      <div class="card" v-for="post in paginatedPosts" :key="post.id">
        <a class="card-link" href="#">
          <div class="card-content">
            <h2 class="card-title">{{ post.title }}</h2>
            <p class="card-description">{{ post.description }}</p>
            <div class="card-corner">
              <div class="card-arrow">→</div>
            </div>
          </div>
          <div class="card-buttons">
            <button @click.prevent="editPost(post.id)">
              <Icon icon="mdi-light:pencil" width="20" color="green" />
            </button>
            <button @click.prevent="deletePost(post.id)">
              <Icon icon="mdi-light:delete" width="20" color="red" />
            </button>
          </div>
        </a>
      </div>
    </div>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="goToPage(1)">First</button>
      <button :disabled="currentPage === 1" @click="prevPage">Prev</button>
      <button
        v-for="page in pages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        Next
      </button>
      <button
        :disabled="currentPage === totalPages"
        @click="goToPage(totalPages)"
      >
        Last
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
}

.card-link {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-decoration: none;
  color: inherit;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 20px;
  margin-bottom: 10px;
}

.card-description {
  font-size: 14px;
  margin-bottom: 20px;
}

.card-corner {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.card-arrow {
  background-color: #000;
  color: #fff;
  padding: 6px 10px;
  border-radius: 0 0 0 8px;
}

.card-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button.active {
  background-color: #000;
  color: #fff;
}

.search {
  margin-bottom: 20px;
}

.search__input {
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>

<script setup>
import { ref, onMounted, computed } from "vue";
import { db } from "../firebase/init.js";
import { collection, getDocs } from "firebase/firestore";

import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
const posts = ref([]);
const isLoading = ref(true);
const pageSize = 5; // Number of posts per page
const currentPage = ref(1);
const selectedCat = ref("");

const router = useRouter();

const filteredPosts = computed(() => {
  return posts.value.filter((post) =>
    selectedCat.value === "all"
      ? true
      : post.category.includes(selectedCat.value)
  );
});
const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return filteredPosts.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / pageSize);
});

const pages = computed(() => {
  const pagesArray = [];
  for (let i = 1; i <= totalPages.value; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
});

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const postsLocal = [];

  querySnapshot.forEach((doc) => {
    const post = {
      id: doc.id,
      title: doc.data().title,
      description: doc.data().description,
      category: doc.data().category,
      createdAt: doc.data().createdAt,
    };
    postsLocal.push(post);
  });
  posts.value = postsLocal;
  isLoading.value = false;
});

const editPost = (id) => {
  router.push(`/edit/${id}`);
};

const deletePost = (id) => {
  router.push(`/delete/${id}`);
};

const goToPage = (page) => {
  currentPage.value = page;
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

