import axios from "axios";

class activityService{
    async GetActivitys(firebase_uid){
        return axios({
            url: "http://137.184.207.191:8182/activity",
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

const activityServices = new activityService()

export default activityServices