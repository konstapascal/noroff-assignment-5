<script setup>
import LoginRegisterForm from "../components/LoginRegisterForm.vue"
import {useRouter} from "vue-router";
const router = useRouter()
const handleLogin = () => {
	console.log("Successfully logged in");
	router.push("/questions")
}
</script>

<template>
  <h1 class="text-4xl">Start Page</h1>
	<LoginRegisterForm @onLogin="handleLogin"/>
</template>
