import firebase from "@/FirebaseSetup";
export default {
    methods: {
        auth() {
            return firebase.auth();
        },
        database() {
            return firebase.database();
        }
    },
}