<template>
	<div class="send-note-card">
		<div class="card-body">
			<q-input v-model="title" label="Title" />
			<q-input class="content-input" borderless v-model="text" label="Text" autogrow />
		</div>
		<div class="card-footer">
			<q-btn flat color="primary"><q-icon size="24px" clickable name="attach_file"></q-icon></q-btn>
			<q-btn flat color="primary" @click="send"><q-icon size="24px" clickable name="send"></q-icon></q-btn>
		</div>
	</div>
</template>

<script>
import { pushToScope } from "@/repositories/DataRepository";
import { v4 as uuidv4 } from "uuid";
import { useQuasar } from "quasar";

export default {
	setup() {
		const $q = useQuasar();
		return {
			notify(options) {
				$q.notify(options);
			},
		};
	},
	methods: {
		send() {
			if (Boolean(this.title) && Boolean(this.text)) {
				pushToScope("notes", {
					id: uuidv4(),
					title: this.title,
					text: this.text,
					bookmarked: false,
					time: Date.now(),
				});
			} else {
				this.notify({
					type: "warning",
					message: "Fill both Title and Text",
				});
			}
		},
	},
	data() {
		return {
			title: "",
			text: "",
			file: null,
		};
	},
};
</script>

<style lang="scss" scoped>
.content-input {
	height: 150px;
	font-size: 14px;
}
.send-note-card {
	display: flex;
	flex-direction: column;
	background: #fff;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	padding: 16px;

	> .card-footer {
		display: flex;
		justify-content: space-between;
		padding-top: 8px;
	}

	> .card-body {
		flex: 1 1 auto;
	}
}
</style>