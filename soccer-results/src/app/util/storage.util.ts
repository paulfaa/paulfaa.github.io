import { StandingsModel } from "../model/models";


export default class StorageUtils {
    static writeToStorage(keyName: string, ratingsToSave: Map<number, StandingsModel[]>){
        console.log("saving data to storage")
        var x = JSON.stringify(Array.from(ratingsToSave.entries()));
        localStorage.setItem(keyName, x);
    }

    static readFromStorage(keyName: string): Map<number, StandingsModel[]> | undefined{
        try{
            const data = localStorage.getItem(keyName);
            if(data != null && data != undefined && data != "undefined"){;
                return new Map(JSON.parse(data!));
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