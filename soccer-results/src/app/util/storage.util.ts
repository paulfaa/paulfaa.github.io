import { StandingsResponseModel } from "../model/standings-response.model";

export default class StorageUtils {
    static writeToStorage(keyName: string, ratingsToSave: StandingsResponseModel){
        localStorage.setItem(keyName, JSON.stringify(ratingsToSave));
    }

    static readFromStorage(keyName: string): any{
        try{
            const data = localStorage.getItem(keyName);
            if(data != null || data != undefined || data != "undefined"){
                //console.log("Stored data for key " +  keyName + ": " + data);
                return JSON.parse(data!);
            }
            else{
                console.log("Nothing in local storage with key " + keyName);
                return null;
            }
        }
        catch(error){
            console.log('Error: ', error);
        }
    }

    static clearAllStorage(): void {
        localStorage.clear();
    }
}