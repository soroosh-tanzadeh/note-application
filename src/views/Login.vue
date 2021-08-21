<template>
	<div class="login">
		<q-card class="login-card">
			<q-card-section class="login-header"> Login </q-card-section>
			<q-card-section class="content">
				<form action="javascript:;" class="q-gutter-y-md">
					<text-input type="email" required v-model="email" placeholder="Email" />
					<text-input type="password" required v-model="password" placeholder="Password" />
				</form>
			</q-card-section>
			<q-card-section class="actions">
				<q-btn color="primary" @click="login">Login</q-btn>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import firebase from "@/FirebaseSetup";
import TextInput from "../components/Input/TextInput.vue";
import { useQuasar } from "quasar";

export default {
	watch: {},
	components: { TextInput },
	name: "Login",
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
			email: "Hi",
			password: "",
		};
	},
	beforeRouteEnter(to, from, next) {
		if (firebase.auth().currentUser != null) next({ name: "Home" });
		else next();
	},
	methods: {
		doLogin() {
			this.auth()
				.createUserWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push("/");
				})
				.catch((error) => {
					this.notify({
						type: "warning",
						message: error.message,
					});
				});
		},
		createUser() {
			this.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.then(() => {
					this.$router.push("/");
				})
				.catch((error) => {
					this.notify({
						type: "warning",
						message: error.message,
					});
				});
		},
		login() {
			this.auth()
				.fetchSignInMethodsForEmail(this.email)
				.then((result) => {
					if (result.length > 0) {
						this.createUser();
					} else {
						this.doLogin();
					}
				})
				.catch((error) => {
					this.notify({
						type: "warning",
						message: error.message,
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	align-items: center;
	justify-content: center;

	min-height: 100vh;
	max-height: 100vh;

	> .login-card {
		width: 360px;
		height: 334px;
		display: flex;
		flex-direction: column;

		> .login-header {
			font-weight: 500;
			font-size: 24px;
			text-align: center;
			padding-bottom: 36px;
		}
		> .actions {
			display: flex;
			justify-content: flex-end;
		}
		> .content {
			flex: 1 1 auto;
		}
	}
}
</style>