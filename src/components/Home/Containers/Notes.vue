<template>
	<div class="notes q-pa-md">
		<h1 class="title">Add Note</h1>
		<send-note></send-note>
		<q-separator class="separator"></q-separator>

		<div class="statistics q-gutter-lg">
			<div class="statisticsCard">
				<q-icon name="format_align_left" size="48px"></q-icon>
				<span class="number">{{ notes.length }}</span>
				<span>Notes</span>
			</div>
			<div class="statisticsCard">
				<q-icon name="favorite" size="48px"></q-icon>
				<span class="number">{{ bookmarksCount }}</span>
				<span>Favorite Notes</span>
			</div>
			<div class="statisticsCard">
				<q-icon name="delete_sweep" size="48px"></q-icon>
				<span class="number">{{ deletedNotes }}</span>
				<span>Deleted Notes</span>
			</div>
		</div>

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
import { fetchAndListen, getRef } from "@/repositories/DataRepository";
import SendNote from "../SendNote.vue";

export default {
	components: { NoteCard, SendNote },
	setup() {
		let notes = ref([]);
		let bookmarksCount = ref(0);
		let deletedNotes = ref(0);
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

			let bookmarksRef = getRef("notes").orderByChild("bookmarked").equalTo(true);

			bookmarksRef.on("value", (snapshot) => {
				const bookmarks = snapshot.val();
				if (bookmarks) {
					bookmarksCount.value = Object.keys(bookmarks).length;
				}
			});

			fetchAndListen(
				"deletedNotes",
				(snapshot) => {
					const number = snapshot.val();
					if (number) {
						deletedNotes.value = deletedNotes;
					}
				},
				null
			);
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