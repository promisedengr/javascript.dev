import filterByCountryWithRank from '../src/ranking';
import {CountryRanking, Person, RankedResult} from '../src/types';

describe('Tests', function () {

    // TODO: add additional test cases to be sure you are covering all requirements.
    //       all additional test cases must pass.

    test('test basic query for one country', () => {
        const expected: RankedResult[] = [
            {personId: 32, rank: 1},  // Jennifer
            {personId: 62, rank: 2},  // Stacey
            {personId: 766, rank: 3}, // Michael
            {personId: 393, rank: 4},  // Farfy
            {personId: 12, rank: 5}   // Lonnie
        ];

        const actual = filterByCountryWithRank(testPeople,
            testCountryRanks,
            ['Canada'],
            {min: 1, max: 10},
            5);

        expect(actual).toEqual(expected);
    });


    // raw test data that is converted into the people and country ranking lists later...

    interface TestPerson {
        id: number;
        name: string;
        rank: number;
        country: string;
    }

    const allTestPeople: TestPerson[] = [
        {id: 11, name: 'frank', rank: 1, country: 'USA'},
        {id: 22, name: 'David', rank: 2, country: 'USA'},
        {id: 99, name: 'Amy', rank: 3, country: 'USA'},
        {id: 244, name: 'Dana', rank: 3, country: 'USA'},
        {id: 333, name: 'Jeff', rank: 4, country: 'USA'},
        {id: 77, name: 'Zinsky', rank: 4, country: 'USA'},
        {id: 55, name: 'Pila', rank: 5, country: 'USA'},
        {id: 88, name: 'Nord', rank: 6, country: 'USA'},
        {id: 66, name: 'Frances', rank: 7, country: 'USA'},
        {id: 211, name: 'Lulu', rank: 8, country: 'USA'},
        {id: 533, name: 'Zila', rank: 8, country: 'USA'},
        {id: 388, name: 'Derik', rank: 8, country: 'USA'},
        {id: 977, name: 'Kevin', rank: 9, country: 'USA'},
        {id: 744, name: 'Laurie', rank: 10, country: 'USA'},
        {id: 655, name: 'Maria', rank: 11, country: 'USA'},

        {id: 32, name: 'Jennifer', rank: 1, country: 'Canada'},
        {id: 62, name: 'Stacey', rank: 2, country: 'Canada'},
        {id: 766, name: 'Michael', rank: 3, country: 'Canada'},
        {id: 393, name: 'Faerfy', rank: 4, country: 'Canada'},
        {id: 12, name: 'Lonnie', rank: 5, country: 'Canada'},
        {id: 14, name: 'Zerk', rank: 6, country: 'Canada'},
        {id: 981, name: 'George', rank: 7, country: 'Canada'},
        {id: 741, name: 'Lindsly', rank: 8, country: 'Canada'},
        {id: 692, name: 'Deborah', rank: 9, country: 'Canada'},
        {id: 49, name: 'Tammy', rank: 10, country: 'Canada'},
        {id: 51, name: 'Tamarak', rank: 11, country: 'Canada'},
        {id: 404, name: 'Leah', rank: 12, country: 'Canada'},

        {id: 3, name: 'Amelia', rank: 1, country: 'Mexico'},
        {id: 1000, name: 'Pamela', rank: 2, country: 'Mexico'},
        {id: 72, name: 'Ana Sofia', rank: 2, country: 'Mexico'},
        {id: 85, name: 'Maria Fernanda', rank: 3, country: 'Mexico'},
        {id: 1002, name: 'Jorge', rank: 4, country: 'Mexico'},
        {id: 40, name: 'Luis', rank: 5, country: 'Mexico'},
        {id: 60, name: 'Pancho', rank: 5, country: 'Mexico'},
        {id: 50, name: 'Francisco', rank: 5, country: 'Mexico'},
        {id: 36, name: 'Denaldo', rank: 5, country: 'Mexico'},
        {id: 1010, name: 'Ala', rank: 5, country: 'Mexico'},
        {id: 2020, name: 'Paula', rank: 5, country: 'Mexico'},
        {id: 1092, name: 'Kimberlia', rank: 5, country: 'Mexico'},
        {id: 27, name: 'Carlos', rank: 5, country: 'Mexico'},
        {id: 58, name: 'Mimi', rank: 6, country: 'Mexico'}
    ];

    const testPeople: Person[] = allTestPeople.map(p => ({ id: p.id, name: p.name }));
    const testCountryRanks: CountryRanking[] = allTestPeople.map(p => ({ personId: p.id, country: p.country, rank: p.rank }));
});

