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
				<q-btn color="primary">Login</q-btn>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
import InjectFirebase from "@/mixins/InjectFirebase";
import "firebase/auth";
import { ref } from "@vue/reactivity";
import TextInput from "../components/Input/TextInput.vue";
export default {
	components: { TextInput },
	name: "Login",
	setup() {
		return {
			email: ref(""),
			password: ref(""),
		};
	},
	mixins: [InjectFirebase],
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