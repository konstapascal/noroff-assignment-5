<script setup lang="ts">
interface SummaryProps {
	username: string;
	userScore: number;
}

defineProps<SummaryProps>();
</script>

<template>
	<div class="text-center text-blue-400 italic text-md mt-2 items-center">
		<p>
			Played as <span class="font-semibold not-italic">{{ username }}</span>
		</p>
		<p>
			Scored <span class="font-semibold not-italic">{{ userScore }}/100</span>
		</p>
	</div>
</template>
