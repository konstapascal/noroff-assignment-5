<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../router';

onMounted(async () => setTimeout(() => router.push('/'), 10000));
</script>

<template>
	<section class="container mx-auto flex flex-col items-center">
		<h1 class="text-4xl">Not Found Page</h1>
		<div class="mt-4">
			<p>You might be lost</p>
			<p class="text-lg mt-4">Redirecting you...</p>
		</div>
	</section>
</template>
