<template>
	<div class="notes q-pa-md">
		<send-note></send-note>
		<div class="row q-mt-md">
			<div class="col-lg-3 q-pa-md col-6" v-for="note in notes" :k="note.key" :key="note.id">
				<note-card :note="note"></note-card>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import NoteCard from "../NoteCard.vue";
import { fetchAndListen } from "@/repositories/DataRepository";
import SendNote from "../SendNote.vue";

export default {
	components: { NoteCard, SendNote },
	setup() {
		let notes = ref([]);

		onMounted(() => {
			fetchAndListen("notes", (snapshot) => {
				const items = snapshot.val();
				if (items) {
					notes.value = Object.keys(items)
						.map((item) => {
							return {
								...items[item],
								key: item,
							};
						})
						.reverse();
				} else {
					notes.value = [];
				}
			});
		});

		return { notes };
	},
};
</script>
<style scoped>
.row {
	margin: -16px;
	margin-top: 24px;
}
</style>