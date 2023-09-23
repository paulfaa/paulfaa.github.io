import { LeagueModel, StandingModel, StandingsResponseModel } from "../model/models";


export default class StorageUtils {
    static writeToStorage(keyName: string, ratingsToSave: Map<number, StandingModel[]>){
        localStorage.setItem(keyName, JSON.stringify(ratingsToSave));
    }

    static readFromStorage(keyName: string): Map<number, StandingModel[]> | undefined{
        try{
            const data = localStorage.getItem(keyName);
            if(data != null && data != undefined && data != "undefined"){;
                return JSON.parse(data!);
            }
            else{
                console.log("Nothing in local storage with key " + keyName);
                return undefined;
            }
        }
        catch(error){
            console.log('Error: ', error);
            return undefined;
        }
    }

    static clearAllStorage(): void {
        localStorage.clear();
    }
}