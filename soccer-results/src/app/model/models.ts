export interface StandingsResponseModel {
    response: LeagueModel[];
}

export interface LeagueDetailsModel {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    standings: StandingModel[];
}

export interface LeagueModel {
    league: LeagueDetailsModel;
}

export interface StandingModel {
    rank: number;
    team: TeamModel;
    points: number;
    goalsDiff: number;
    all: AllMatchesPlayedModel;
    update: Date;
}

export interface AllMatchesPlayedModel {
    played: number;
    win: number;
    draw: number;
    lose: number;
}

export interface TeamModel {
    id: number;
    name: string;
    logo: string;
}