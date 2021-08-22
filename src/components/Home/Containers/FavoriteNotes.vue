<template>
	<div class="notes q-pa-md">
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
import { getRef } from "@/repositories/DataRepository";

export default {
	components: { NoteCard },
	setup() {
		let notes = ref([]);
		let bookmarksCount = ref(0);
		let deletedNotes = ref(0);
		onMounted(() => {
			let bookmarksRef = getRef("notes").orderByChild("bookmarked").equalTo(true);
			bookmarksRef.on("value", (snapshot) => {
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

		return { notes, bookmarksCount, deletedNotes };
	},
};
</script>
<style lang="scss" scoped>
.title {
	font-size: 18px;
	font-weight: bold;
	line-height: 1.5;
}
.row {
	margin: -16px;
	margin-top: 24px;
}
.separator {
	margin: 40px 0;
	background: #808080;
}

.statistics {
	display: flex;
	justify-content: flex-start;
	@media screen and (max-width: 768px) {
		justify-content: center;
	}
	.statisticsCard {
		width: 156px;
		height: 140px;
		border: 1px solid #e5e5e5;
		border-radius: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		font-size: 12px;
		line-height: 15px;
		color: rgba(0, 0, 0, 0.24);
		> .number {
			font-size: 24px;
			line-height: 36px;
			color: #9e9e9e;
			margin-bottom: 8px;
		}
		> i {
			color: #808080;
		}
	}
}
</style>