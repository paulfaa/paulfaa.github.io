import { StandingsModel } from "../model/models";

export default class StorageUtils {

    private static ratingsKey: string = "ratings";
    private static leagueIdKey: string = "leagueId";

    static writeLeagueIdToStorage(leagueId: number): void {
        localStorage.setItem(StorageUtils.leagueIdKey, leagueId.toString());
    }

    static readLeagueIdFromStorage(): number | undefined{
        const result = localStorage.getItem(this.leagueIdKey);
        if(result){
            return parseInt(result);
        } 
        else{
            return undefined;
        }
    }

    static writeRatingsToStorage(ratingsToSave: Map<number, StandingsModel[]>): void{
        console.log("saving data to storage")
        const ratings = JSON.stringify(Array.from(ratingsToSave.entries()));
        localStorage.setItem(StorageUtils.ratingsKey, ratings);
    }

    static readRatingsFromStorage(): Map<number, StandingsModel[]> | undefined{
        try{
            const data = localStorage.getItem(StorageUtils.ratingsKey);
            if(data != null && data != undefined && data != "undefined"){;
                return new Map(JSON.parse(data!));
            }
            else{
                console.log("Nothing in local storage with key: ", StorageUtils.ratingsKey);
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