import axios from "axios";

class communityService{
    async communityCreate(data, firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182/community",
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                firebase_uid: firebase_uid
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })        
    };

    async communityGetAll(firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182/community/info",
            method: "GET",
            timeout: 5000,
            headers:{
                firebase_uid: firebase_uid,
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })
        
    };

    async communityEnter(data, firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182/community/enter",
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                firebase_uid: firebase_uid
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })        
    };
}

const communityServices = new communityService()
export default communityServices