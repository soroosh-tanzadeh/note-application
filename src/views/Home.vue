<template>
	<div></div>
</template>

<script>
import firebase from "@/FirebaseSetup";
export default {
	beforeRouteEnter(to, from, next) {
		if (firebase.auth().currentUser == null) next({ path: "/login" });
		else next();
	},
};
</script>