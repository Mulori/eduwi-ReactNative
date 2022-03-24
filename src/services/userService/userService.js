import axios from "axios";

class userService{
    async userCreate(data){
        return axios({
            url: "http://137.184.207.191:8182/users",
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                key_auth: 'b306c6142c05b5b4c5213550ee2c50376d0e4ca9fa738aa7bc7bc0d6fb2cbc27'
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
}

const userServices = new userService()

export default userServices