export interface Person {
    id: number
    name: string
}

export interface CountryRanking {
    personId: number
    country: string
    rank: number
}

export interface RankedResult {
    personId: number
    rank: number
}

export interface InclusiveRange {
    min: number
    max: number
}
