<template>
	<div class="home"></div>
</template>

<script>
import firebase from "@/FirebaseSetup";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { fetchData } from "@/repositories/DataRepository";

export default {
	setup() {
		let notes = ref([]);
		let favoriteNotes = ref([]);
		let deletedNotes = ref(0);

		onMounted(async () => {
			notes.value = await fetchData("notes");
			favoriteNotes.value = await fetchData("bookmarks");
			deletedNotes.value = await fetchData("deletedNum");
		});

		return {
			notes,
			favoriteNotes,
			deletedNotes,
		};
	},
	beforeRouteEnter(to, from, next) {
		if (firebase.auth().currentUser == null) next({ path: "/login" });
		else next();
	},
};
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	flex-direction: row;
}
</style>