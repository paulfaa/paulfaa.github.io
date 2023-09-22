import { AllMatchesPlayedModel } from "./all-matches-played.model";
import { TeamModel } from "./team.model";

export interface StandingModel {
    rank: number;
    team: TeamModel;
    points: number;
    goalsDiff: number;
    all: AllMatchesPlayedModel;
    update: Date;
}