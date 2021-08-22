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
			<div>
				<q-btn flat color="red" class="q-pa-none" v-if="attachments.length > 0">
					<q-icon size="24px" name="attach_file"></q-icon>
				</q-btn>

				<q-menu class="attachments-menu" v-model="showAttachments">
					<q-list style="min-width: 100px">
						<q-item clickable v-for="attachment in attachments" :key="attachment" @click="selectAttachment(attachment)" v-close-popup>
							<q-item-section>{{ attachment.substr(attachment.indexOf(".") + 1) }}</q-item-section>
						</q-item>
					</q-list>
				</q-menu>
			</div>

			<q-btn flat color="red" @click="remove" class="q-pa-none"> <q-icon size="24px" name="delete"></q-icon></q-btn>
		</div>
	</div>
</template>

<script>
import { removeChild, updateRef } from "@/repositories/DataRepository";
import { getDownloadURL } from "@/repositories/StorageAccess";
import { useQuasar } from "quasar";

export default {
	props: {
		note: { required: true },
	},
	setup() {
		const $q = useQuasar();
		return {
			notify(options) {
				$q.notify(options);
			},
		};
	},
	data() {
		return {
			showAttachments: false,
		};
	},
	computed: {
		attachments() {
			return this.note.attachments ? JSON.parse(this.note.attachments) : [];
		},
	},
	methods: {
		selectAttachment(attachment) {
			console.log(attachment);
			getDownloadURL("attachments", attachment)
				.then((url) => {
					var element = document.createElement("a");
					element.setAttribute("href", url);
					element.setAttribute("target", "_blank");

					element.style.display = "none";
					document.body.appendChild(element);
					element.click();
					document.body.removeChild(element);
				})
				.catch(() => {
					this.notify({
						type: "warning",
						message: "Error while getting file url.",
					});
				});
		},
		bookmark() {
			updateRef(`notes/${this.note.key}`, { bookmarked: !this.note.bookmarked });
		},
		remove() {
			removeChild(`notes/${this.note.key}`);
		},
	},
};
</script>

<style>
.attachments-menu {
	max-width: 320px;
	white-space: nowrap;
	overflow: hidden;
}
</style>

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
		justify-content: space-between;
	}

	> .card-body {
		flex: 1 1 auto;
		padding: 16px 0;
	}
}
</style>