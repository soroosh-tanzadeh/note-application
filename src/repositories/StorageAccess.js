import firebase from "@/FirebaseSetup";

export function uploadFile(ref, file) {
    return new Promise((resolve) => {
        firebase.storage().ref(`${firebase.auth().currentUser.uid}/${ref}`).put(file).then((snapshot) => {
            resolve(snapshot);
        });
    })
}

export function getDownloadURL(ref, child) {
    let storageRef = firebase.storage().ref().child(`${child}`)
    return storageRef.getDownloadURL();
}