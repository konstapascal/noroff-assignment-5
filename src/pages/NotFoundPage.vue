<script setup lang="ts">
import { onMounted } from 'vue';
import router from '../router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

onMounted(async () => setTimeout(() => router.push('/'), 2000));
</script>

<template>
	<section class="container mx-auto my-20 flex flex-col items-center">
		<h1 class="text-5xl font-bold">Page Not Found</h1>
		<div class="mt-6 text-center">
			<p class="text-blue-400 text-2xl">You might be lost!</p>
			<p class="text-2xl mt-4 text-blue-100">Redirecting...</p>
		</div>
		<div class="mt-8">
			<PulseLoader color="#63A4F6" />
		</div>
	</section>
</template>
