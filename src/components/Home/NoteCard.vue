<template>
	<div class="note-card">
		<div class="card-header">
			<strong class="title">{{ note.title }}</strong>
			<q-btn flat @click="bookmark" class="q-pa-none"><q-icon size="24px" :name="`favorite${note.bookmarked ? '' : '_border'}`"></q-icon></q-btn>
		</div>
		<div class="card-body">
			{{ note.text }}
		</div>
		<div class="card-footer">
			<q-btn flat color="red" @click="remove" class="q-pa-none"> <q-icon size="24px" name="delete"></q-icon></q-btn>
		</div>
	</div>
</template>

<script>
import { removeChild, updateRef } from "@/repositories/DataRepository";

export default {
	props: {
		note: { required: true },
	},

	methods: {
		bookmark() {
			updateRef(`notes/${this.note.key}`, { bookmarked: !this.note.bookmarked });
		},
		remove() {
			removeChild(`notes/${this.note.key}`);
		},
	},
};
</script>

<style lang="scss" scoped>
.note-card {
	display: flex;
	flex-direction: column;
	background: #fff;
	box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.14);
	border-radius: 4px;
	padding: 16px;
	min-height: 196px;

	> .card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title {
			font-size: 18px;
			font-weight: 500;
		}
	}

	> .card-footer {
		display: flex;
		justify-content: flex-end;
	}

	> .card-body {
		flex: 1 1 auto;
		padding: 16px 0;
	}
}
</style>