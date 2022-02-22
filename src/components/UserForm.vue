<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useStore } from '../store';

const username = ref('');
const store = useStore();

const onInputChange = () => store.commit('setUsername', username.value);
const onButtonClick = () => router.push('/questions');
</script>

<template>
	<div class="mt-4 max-w-md text-center">
		<label class="text-lg font-semibold text-blue-100" for="username">Choose your username</label>
		<input
			@input="onInputChange()"
			v-model.trim="username"
			class="border-2 block px-2 py-1 mt-2 text-gray-900 rounded-sm"
			type="text"
			name="username"
			id="username"
		/>
		<div class="mt-4">
			<button
				@click="onButtonClick()"
				class="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-sm transition-colors py-2 px-4"
			>
				Play now
			</button>
		</div>
	</div>
</template>
