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
    standings: StandingsModel[][];
}

export interface LeagueModel {
    league: LeagueDetailsModel;
}

export interface StandingsModel {
    rank: number;
    team: StandingsTeamModel;
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

export interface StandingsTeamModel {
    id: number;
    name: string;
    logo: string;
}

export interface FixtureResponseModel {
    response: FixtureDetailsModel[];
}

export interface FixtureDetailsModel {
    fixture: FixtureModel;
    league: FixtureLeagueModel;
    teams: FixtureTeamsModel;
    goals: GoalsModel;
}

export interface FixtureModel {
    id: number;
    date: Date;
}

export interface GoalsModel {
    home: number;
    away: number;
}

export interface FixtureTeamsModel {
    home: FixtureTeamModel;
    away: FixtureTeamModel;
}

export interface FixtureTeamModel {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
}

export interface FixtureLeagueModel {
    id: number;
    name: string;
}