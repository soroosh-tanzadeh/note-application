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

export function removeChild(scope) {
    firebase.database().ref(`${firebase.auth().currentUser.uid}/${scope}`).remove();
}

export function fetchAndListen(scope, action, orderBy = "time") {
    var ref = firebase.database().ref(`${firebase.auth().currentUser.uid}/${scope}`).orderByChild(orderBy);
    ref.on('value', action);
}

export function pushToScope(scope, data) {
    var listRef = firebase.database().ref(`${firebase.auth().currentUser.uid}/${scope}`);
    var newRef = listRef.push();
    newRef.set(data);
}
