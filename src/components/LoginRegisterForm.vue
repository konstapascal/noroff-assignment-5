<script  setup>
import { ref } from "vue";
import {useStore} from "vuex";
import { apiUserRegister, ApiGetUser } from "./../api/users";

const store = useStore();
const emit = defineEmits(["onLogin"])
const user = ref("");
// const displayError = ref("");


const onSubmit = async () => {
  const [error, username, highScore] = await ApiGetUser(user.value);
  if (username !== null) {
    // displayError.value = "USER ALREADY REGISTERED:";
    emit("onLogin");
    store.commit("setUser",username)
    store.commit("setHighScore",highScore)
  } else {
    const [error, username, highScore] = await apiUserRegister(user.value);
    store.commit("setUser",username)
    store.commit("setHighScore",highScore)
    emit("onLogin");
  }
};
</script>
<template>
  <form @submit.prevent="onSubmit">
    <label for="username" aria-label="Username">Choose your username</label>
    <input
      class="border-2 block p-2 mt-2"
      type="text"
      name="username"
      id="username"
      v-model="user"
    />
    <button class="bg-green-400 py-2 px-4">Choose name</button>
  </form>
  <!-- <div v-if="displayError" class="bg-red-500 text-black">
    <span class="text-lg">Error</span>
    <p>{{ displayError }}</p>
  </div> -->
</template>