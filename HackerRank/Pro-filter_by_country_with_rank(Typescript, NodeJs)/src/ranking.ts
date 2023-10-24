import {Person, CountryRanking, RankedResult, InclusiveRange} from "./types";

export function filterByCountryWithRank(people: Person[],
                                        rankingData: CountryRanking[],
                                        countryFilter: string[],
                                        {min: minRank, max: maxRank}: InclusiveRange,
                                        maxCount: number): RankedResult[] {

    // TODO: write your solution here, the placeholder code below is incorrect.
    //
    // WARNING: Do NOT change the signature of this method in any way, or validation of your solution WILL fail.

    return people.map((person) => (
        {
            personId: person.id,
            rank: rankingData.find((countryRank) => countryRank.personId === person.id)?.rank ?? 1
        }
    ));
}

export default filterByCountryWithRank;
