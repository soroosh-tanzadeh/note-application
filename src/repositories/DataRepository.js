import { reactive } from "vue";
import firebase from "@/FirebaseSetup";

export function fetchData(scope) {
    return new Promise((resolve, reject) => {
        firebase
            .database()
            .ref(`${firebase.auth().currentUser.uid}/${scope}`)
            .get()
            .then((snapshot) => {
                if (snapshot.exists()) {
                    resolve(reactive(snapshot.val()));
                } else {
                    resolve(reactive(null));
                }
            }).catch(error => reject(error));
    })
}

