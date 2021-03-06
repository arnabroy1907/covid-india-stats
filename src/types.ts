export interface WorldData {
    country_name: string;
    active_cases: string;
    cases: string;
    deaths: string;
    total_recovered: string;
    new_deaths: string;
    new_cases: string;
}

export interface GlobalData {
    active_cases: string;
    total_cases: string;
    total_deaths: string;
    total_recovered: string;
    new_cases: string;
    new_deaths: string;
}

export interface WorldApiResponse {
    countries_stat: WorldData[];
    statistic_taken_at: string;
    world_total: GlobalData;
}

export interface CardData {
    activeCases: string;
    totalCases: string;
    totalRecovered: string;
    totalDeaths: string;
    newCases: string;
    newDeaths: string;
    newRecovered?: string;
}

export interface IndiaTotal {
    confirmed: string;
    active: string;
    deaths: string;
    recovered: string;
    deltaconfirmed: string;
    deltadeaths: string;
    deltarecovered: string;
    lastupdatedtime: string;
}

export interface DistrictData {
    active: number;
    confirmed: number;
    deceased: number;
    recovered: number;
    name: string;
    delta: {
        confirmed: number;
        deceased: number;
        recovered: number;
    }
}

export interface StateData {
    confirmed: string;
    active: string;
    deaths: string;
    recovered: string;
    deltaconfirmed: string;
    deltadeaths: string;
    deltarecovered: string;
    state: string;
    district: {
        [key: string]: DistrictData;
    }
}

export interface IndiaApiResponse {
    total_values: IndiaTotal;
    state_wise: {
        [key: string]: StateData;
    }
}