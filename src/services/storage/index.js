import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const DeleteStorage = async (url) => {
    const storageRef = storage().refFromURL(url);
    const imageRef = storage().ref(storageRef.fullPath);

    imageRef.delete().then(() => {
        console.log('image deleted')
    }).catch(() => {
        console.log('error delete image')
    });
}

const GetFileStorage = async (ref) => {
    return await storage().ref(ref).getDownloadURL();
}

const SendFileStorage = async (ref, path) => {
    await storage().ref(ref).putFile(path)
        .then(() => {
            return 'file send';
        }).catch((cat) => {
            return 'error send file to storage: ' + cat
        })
}

export default { DeleteStorage, SendFileStorage, GetFileStorage };
