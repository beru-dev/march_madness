"use client"

import { UnplayedGame } from "../utils/Game";
import { Region } from "../components/Region";
import { Finals } from "../components/Finals";
import { useMadness } from "../utils/useMadness";
import "../main.scss";

export default () => {
    const [tournament, setWinner] = useMadness(firstRound);

    return <>
        <header>
            <h1>March Madness</h1>
        </header>

        <main>
            <Region
                name="East"
                firstRound={tournament.slice(0, 8)}
                secondRound={tournament.slice(32, 36)}
                sweetSixteen={tournament.slice(48, 50)}
                eliteEight={tournament[56]}
                {...{ setWinner }}
            />

            <Region
                name="South"
                firstRound={tournament.slice(8, 16)}
                secondRound={tournament.slice(36, 40)}
                sweetSixteen={tournament.slice(50, 52)}
                eliteEight={tournament[57]}
                {...{ setWinner }}
            />

            <Region
                name="West"
                firstRound={tournament.slice(16, 24)}
                secondRound={tournament.slice(40, 44)}
                sweetSixteen={tournament.slice(52, 54)}
                eliteEight={tournament[58]}
                {...{ setWinner }}
            />

            <Region
                name="Midwest"
                firstRound={tournament.slice(24, 32)}
                secondRound={tournament.slice(44, 48)}
                sweetSixteen={tournament.slice(54, 56)}
                eliteEight={tournament[59]}
                {...{ setWinner }}
            />

            <Finals
                finalFour={tournament.slice(60, 62)}
                championship={tournament[62]}
                {...{ setWinner }}
            />
        </main>
    </>
}

const firstRound: UnplayedGame[] = [
    [59, 52],
    [17, 42],
    [49, 58],
    [3, 67],
    [4, 16],
    [24, 36],
    [64, 14],
    [25, 51],

    [22, 30],
    [38, 56],
    [66, 26],
    [15, 61],
    [57, 37],
    [28, 43],
    [18, 10],
    [31, 65],

    [41, 63],
    [34, 33],
    [46, 21],
    [1, 7],
    [8, 40],
    [5, 9],
    [13, 39],
    [2, 29],

    [45, 20],
    [60, 53],
    [19, 32],
    [27, 48],
    [50, 44],
    [12, 0],
    [55, 11],
    [54, 47]
].map(([team1, team2], id) => new UnplayedGame(team1, team2, id));

// const firstRound: UnplayedGame[] = [
//     [1, 2],
//     [3, 4],
//     [5, 6],
//     [7, 8],
//     [9, 10],
//     [11, 12],
//     [13, 14],
//     [15, 16],

//     [17, 18],
//     [19, 20],
//     [21, 22],
//     [23, 24],
//     [25, 26],
//     [27, 28],
//     [29, 30],
//     [31, 32],

//     [33, 34],
//     [35, 36],
//     [37, 38],
//     [39, 40],
//     [41, 42],
//     [43, 44],
//     [45, 46],
//     [47, 48],

//     [49, 50],
//     [51, 52],
//     [53, 54],
//     [55, 56],
//     [57, 58],
//     [59, 60],
//     [61, 62],
//     [63, 64]
// ].map(([team1, team2], id) => new UnplayedGame(team1, team2, id));
