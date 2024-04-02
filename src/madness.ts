const teams = [
    { name: "Duke" },
    { name: "Gonzaga" }
]

const games = [
    { team1: 1, team2: 2, winner: 1 }, // 1
    { team1: 3, team2: 4, winner: 1 }, // 3

    { team1: 5, team2: 6, winner: 2 }, // 6
    { team1: 7, team2: 8, winner: 1 }, // 7

    { team1: 9, team2: 10, winner: 2 }, // 10
    { team1: 11, team2: 12, winner: 0 }, // null

    { team1: 13, team2: 14, winner: 2 }, // 14
    { team1: 15, team2: 0, winner: 1 }, // 15
]

const games2 = [];

for(let i = 0; i < games.length; i += 2) {
    const game1 = games[i];
    const game2 = games[i + 1];
//@ts-ignore
    const team1 = game1[`team${game1.winner}`];
    // @ts-ignore
    const team2 = game2[`team${game2.winner}`];
//@ts-ignore
    games2.push({ team1, team2, winner: 0 });
}

console.log("OUT", games2)