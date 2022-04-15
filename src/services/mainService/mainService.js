import axios from "axios";

class mainService{
    async GetConfigMenu(firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182/menu/main/config",
            method: "GET",
            timeout: 5000,
            headers:{
                firebase_uid: firebase_uid
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })        
    };

    async Get(route, firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182" + route,
            method: "GET",
            timeout: 5000,
            headers:{
                firebase_uid: firebase_uid
            }
        }).then((response) => {
            return Promise.resolve(response);
        }).catch((error) => {
            return Promise.reject(error);
        })        
    };

    async Post(route, firebase_uid, data){
        return axios({
            url: "http://137.184.207.191:8182" + route,
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

const mainServices = new mainService()

export default mainServices