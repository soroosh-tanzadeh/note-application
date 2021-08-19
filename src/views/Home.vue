<template>
	<div></div>
</template>

<script>
export default {
	beforeRouteEnter(to, from, next) {
		if (to.name !== "Login") next({ name: "Login" });
		else next();
	},
};
</script>