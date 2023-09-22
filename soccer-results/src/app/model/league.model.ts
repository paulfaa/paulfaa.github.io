import { StandingModel } from "./standing.model";

export interface LeagueModel {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: StandingModel[];
}