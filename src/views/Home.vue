<template>
	<div class="home">
		<q-btn round color="primary" :flat="showNav" class="show-navbar-btn" :class="{ active: showNav }" @click="showNav = !showNav">
			<q-icon size="24px" name="close" v-if="showNav"></q-icon>
			<q-icon size="24px" name="menu" v-else />
		</q-btn>
		<div class="nav-menu" :class="{ active: showNav }">
			<div class="user-info-section">
				<q-avatar rounded>
					<img :src="user.photoURL != null ? user.photoURL : '/assets/profile.svg'" />
				</q-avatar>
				<strong>
					{{ displayName }}
				</strong>
				<span>
					{{ user.email }}
				</span>
			</div>
			<q-list>
				<q-item clickable v-ripple :active="contentComponent == 'notes'" @click="contentComponent = 'notes'" round>
					<q-item-section avatar>
						<q-icon name="format_align_left" />
					</q-item-section>
					<q-item-section>Notes</q-item-section>
				</q-item>
				<q-item clickable v-ripple round :active="contentComponent == 'favorite-notes'" @click="contentComponent = 'favorite-notes'">
					<q-item-section avatar>
						<q-icon name="favorite" />
					</q-item-section>
					<q-item-section>Favorite Notes</q-item-section>
				</q-item>
				<q-separator />

				<q-item clickable v-ripple round @click="signout">
					<q-item-section avatar>
						<q-icon name="logout" />
					</q-item-section>
					<q-item-section>Logout</q-item-section>
				</q-item>
			</q-list>
		</div>

		<div class="content">
			<transition name="fade" mode="out-in">
				<component :is="contentComponent"></component>
			</transition>
		</div>
	</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { fetchData } from "@/repositories/DataRepository";
import firebase from "@/FirebaseSetup";
import Notes from "../components/Home/Containers/Notes.vue";
import FavoriteNotes from "../components/Home/Containers/FavoriteNotes.vue";

import { useQuasar } from "quasar";

export default {
	components: { Notes, FavoriteNotes },
	methods: {
		signout() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					window.location = "/login";
				})
				.catch((error) => {
					this.notify(error.message);
				});
		},
	},
	setup() {
		const $q = useQuasar();

		let notes = ref([]);
		let deletedNotes = ref(0);

		let contentComponent = ref("notes");

		const showNav = ref(false);

		const user = ref(firebase.auth().currentUser);

		const displayName = ref(user.value.displayName != null ? user.value.displayName : user.value.email.substr(0, user.value.email.indexOf("@")));

		onMounted(async () => {
			notes.value = await fetchData("notes");
			deletedNotes.value = await fetchData("deletedNum");
		});

		return {
			notes,
			deletedNotes,
			//** */
			user,
			displayName,

			showNav,
			contentComponent,

			notify(options) {
				$q.notify(options);
			},
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
	min-height: 100vh;
	@media screen and (max-width: 768px) {
		padding-top: 24px;
	}
	@media screen and (min-width: 768px) {
		.content {
			padding-left: 256px;
			width: 100%;
		}
	}
	.show-navbar-btn {
		background: transparent;
		color: #000;
		outline: none;
		border: none;
		position: fixed;
		top: 16px;
		left: 16px;
		z-index: 999;
		transition: 0.5s all;
		&.active {
			left: 210px;
		}

		@media screen and (min-width: 768px) {
			display: none;
		}
	}

	.nav-menu {
		position: fixed;
		width: 256px;
		height: 100vh;
		box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.24), 0px 9px 18px rgba(0, 0, 0, 0.18);
		background: #fff;
		z-index: 1;
		top: 0;
		bottom: 0;

		@media screen and (max-width: 768px) {
			transform: translateX(-500px);
			transition: transform 0.5s linear;
			&.active {
				transform: translateX(0);
			}
		}

		.q-list {
			padding: 8px;
			&:not(.q-item--active) i {
				color: #808080;
			}
			> .q-item {
				border-radius: 4px;
			}

			.q-item--active {
				background: #e3f2fd;
				color: #2f80ed;
				i {
					color: #2f80ed;
				}
			}
		}

		.user-info-section {
			border-bottom: 1px solid #e5e5e5;
			padding: 16px;
			padding-top: 40px;

			> .q-avatar {
				margin-bottom: 24px;
			}

			strong {
				font-weight: 500;
				font-size: 20px;
				line-height: 2;
			}

			> span {
				color: rgba(0, 0, 0, 0.6);
			}

			display: flex;
			flex-direction: column;
		}
	}
}
</style>