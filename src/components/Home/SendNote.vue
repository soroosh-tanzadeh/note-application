<template>
	<div class="send-note-card">
		<div class="card-body">
			<q-input v-model="title" label="Title" />
			<q-input class="content-input" borderless v-model="text" label="Text" autogrow />
		</div>
		<div class="card-footer">
			<q-btn flat color="primary" :disable="loading" @click="attachFile"><q-icon size="24px" clickable :name="files == null ? 'attach_file' : 'close'" /> {{ files != null ? ` ${files.length} ${files.length > 1 ? "files" : "file"}` : " Attach File (Multiple select is enable)" }}</q-btn>
			<q-btn flat color="primary" :disable="loading" @click="send">
				<q-spinner color="primary" size="24px" :thickness="2" v-if="loading" />
				<q-icon size="24px" v-else clickable name="send"></q-icon>
			</q-btn>
		</div>
	</div>
</template>

<script>
import { pushToScope } from "@/repositories/DataRepository";
import { uploadFile } from "@/repositories/StorageAccess";

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
		attachFile() {
			if (this.files == null) {
				let filechooser = document.createElement("input");
				filechooser.multiple = true;
				filechooser.type = "file";
				filechooser.addEventListener("change", () => {
					let files = filechooser.files;
					this.files = files;
				});
				filechooser.click();
			} else {
				this.files = null;
			}
		},

		async send() {
			let $this = this;
			async function* asyncUpload() {
				let i = 0;
				const listSize = $this.files.length;
				while (i < listSize) {
					const file = $this.files[i];
					let attachment = await uploadFile(`attachments/${uuidv4()}.${file.name}`, file);
					yield attachment.ref.fullPath;
					i++;
				}
			}

			if (Boolean(this.title) && Boolean(this.text)) {
				if (this.files != null) {
					this.loading = true;
					for await (const attachment of asyncUpload()) {
						this.attachments.push(attachment);
					}

					pushToScope("notes", {
						id: uuidv4(),
						title: this.title,
						text: this.text,
						bookmarked: false,
						attachments: JSON.stringify(this.attachments),
						time: Date.now(),
					});
					this.loading = false;
				} else {
					pushToScope("notes", {
						id: uuidv4(),
						title: this.title,
						text: this.text,
						bookmarked: false,
						time: Date.now(),
					});
				}

				this.title = "";
				this.text = "";
				this.files = null;
				this.attachments = [];
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
			attachments: [],

			files: null,
			loading: false,
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