<template>
	<router-view />
</template>

<script>
// Setup Firebase
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTHDOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECTID,
	storageBucket: process.env.FIREBASE_STORAGEBUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
	appId: process.env.FIREBASE_APP_ID,
});

export default {
	provide: {
		firebase: firebase,
	},
	mixins: [
		{
			inject: ["firebase"],
		},
	],
};
</script>