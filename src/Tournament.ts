import { UnplayedGame, Game } from "./Game";

export const initializeTournament = (firstRoundGames: UnplayedGame[]): Game[] => {
    if(firstRoundGames.length !== 32) {
        throw new Error("Number of games in the first round should be 32");
    }
    if(firstRoundGames.some(game => !game.teamsAreSet())) {
        throw new Error("Teams should be set for all games in the first round");
    }

    const tournament: Game[] = Array.from(Array(63))
        .map(() => new UnplayedGame(undefined, undefined));

    for(let i = 0; i < 32; i++) {
        tournament[i] = firstRoundGames[i];
    }

    return tournament;
}

export const setGameWinner = (tournament: Game[], gameIndex: number, winnerId: number): Game[] => {
    const gameIndexesToUpdate = getIndexesOfGamesToUpdate(gameIndex, [gameIndex]);

    const updatedGames = gameIndexesToUpdate.reduce((updatedGames, indexOfGameToUpdate, index) => {
        if(index === 0) {
            return {
                ...updatedGames,
                [indexOfGameToUpdate]: tournament[indexOfGameToUpdate].assignWinner(winnerId)
            }
        }
        const parentGame = updatedGames[gameIndexesToUpdate[index - 1]];
        const [team1, team2] = gameIndexesToUpdate[index - 1] % 2 === 0
            ? [parentGame, tournament[gameIndexesToUpdate[index - 1] + 1]]
            : [tournament[gameIndexesToUpdate[index - 1] - 1], parentGame];

        const updatedGame = new UnplayedGame(team1.getWinner(), team2.getWinner());

        return {
            ...updatedGames,
            [indexOfGameToUpdate]: updatedGame
        }
    }, <Record<number, Game>>{});

    try {
        const updatedTournament = tournament.map((game, index) => {
            if(index === gameIndex) {
                return updatedGames[gameIndex]
            }

            if(updatedGames[index]) {
                return updatedGames[index]
            }

            return game
        });

        return updatedTournament
    } catch (error: any) {
        console.log(`Error: ${error.message}`);
        return tournament;
    }
}

const getIndexesOfGamesToUpdate = (gameIndex: number, collection: number[]): number[] => {
    if(gameIndex === 62) return collection;

    const childGameIndex =
        gameIndex < 32 ? Math.floor(gameIndex / 2) + 32 :
        gameIndex < 48 ? Math.floor((gameIndex - 32) / 2) + 48 :
        gameIndex < 56 ? Math.floor((gameIndex - 48) / 2) + 56 :
        gameIndex < 60 ? Math.floor((gameIndex - 56) / 2) + 60 :
        62;

    collection.push(childGameIndex);

    return getIndexesOfGamesToUpdate(childGameIndex, collection);
}

type Team = {
    name: string
    seed: number
    record: [number, number]
}