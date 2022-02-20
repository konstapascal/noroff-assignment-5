<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../router';

onMounted(async () => setTimeout(() => router.push('/'), 2000));
</script>

<template>
	<section>
		<h1 class="text-4xl">Not Found page</h1>
		<p>You might be lost</p>
		<p class="text-lg mt-4">Redirecting you...</p>
	</section>
</template>
