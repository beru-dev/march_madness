import { initializeTournament, setGameWinner } from "../src/Tournament";
import { Game, UnplayedGame } from "../src/Game";
import { Maybe } from "../src/Maybe";

describe("initializeTournament", () => {
    it("should throw an error if the wrong number of games is provided", () => {
        expect.assertions(1);

        try {
            initializeTournament([new UnplayedGame(1, 2)]);
        } catch (error: any) {
            expect(error.message).toEqual("Number of games in the first round should be 32");
        }
    });

    it("should throw an error when any games have undefined teams", () => {
        expect.assertions(1);
        const firstRoundGames = getFirstRoundGames();
        firstRoundGames[1] = new UnplayedGame(undefined, 3);

        try {
            initializeTournament(firstRoundGames);
        } catch (error: any) {
            expect(error.message).toEqual("Teams should be set for all games in the first round");
        }
    });

    it("should return an array of length 63, with the first 16 games equal to the provided games, and the rest with undefined teams", () => {
        const tournament = initializeTournament(getFirstRoundGames());

        expect(tournament.length).toEqual(63);
        expect(tournament[0]).toEqual({ team1: 1, team2: 2 });
        expect(tournament[31]).toEqual({ team1: 63, team2: 64 });
        expect(tournament[32]).toEqual({ team1: undefined, team2: undefined });
        expect(tournament[62]).toEqual({ team1: undefined, team2: undefined });
    });
});

describe("setGameWinner", () => {
    const win = (gameId: number, winnerId: number) =>
        (tmnt: Game[]) => setGameWinner(tmnt, gameId, winnerId);

    it("should pass the correct winner to the next bracket", () => {
        const tournament = new Maybe(initializeTournament(getFirstRoundGames()))
            .bind(win(0, 2)) // 32
            .bind(win(1, 3))
            .bind(win(2, 5)) // 33
            .bind(win(3, 7))
            .bind(win(4, 10)) // 34
            .bind(win(5, 11))
            .bind(win(6, 13)) // 35
            .bind(win(7, 16))
            .getValue();

        expect(tournament[0].toString()).toEqual("W2, l1");
        expect(tournament[1].toString()).toEqual("W3, l4");
        expect(tournament[32].toString()).toEqual("2, 3");

        const round2 = new Maybe(tournament)
            .bind(win(32, 3)) // 48
            .bind(win(33, 7))
            .bind(win(34, 10)) // 49
            .bind(win(35, 13))
            .getValue();

        expect(round2[34].toString()).toEqual("W10, l11");
        expect(round2[49].toString()).toEqual("10, 13");

        const round3 = new Maybe(round2)
            .bind(win(48, 3)) // 56
            .bind(win(49, 10))
            .getValue();

        expect(round3[49].toString()).toEqual("W10, l13");
        expect(round3[56].toString()).toEqual("3, 10");
    });
});

const getFirstRoundGames = () => {
    return [
        new UnplayedGame(1, 2),
        new UnplayedGame(3, 4),
        new UnplayedGame(5, 6),
        new UnplayedGame(7, 8),
        new UnplayedGame(9, 10),
        new UnplayedGame(11, 12),
        new UnplayedGame(13, 14),
        new UnplayedGame(15, 16),

        new UnplayedGame(17, 18),
        new UnplayedGame(19, 20),
        new UnplayedGame(21, 22),
        new UnplayedGame(23, 24),
        new UnplayedGame(25, 26),
        new UnplayedGame(27, 28),
        new UnplayedGame(29, 30),
        new UnplayedGame(31, 32),

        new UnplayedGame(33, 34),
        new UnplayedGame(35, 36),
        new UnplayedGame(37, 38),
        new UnplayedGame(39, 40),
        new UnplayedGame(41, 42),
        new UnplayedGame(43, 44),
        new UnplayedGame(45, 46),
        new UnplayedGame(47, 48),

        new UnplayedGame(49, 50),
        new UnplayedGame(51, 52),
        new UnplayedGame(53, 54),
        new UnplayedGame(55, 56),
        new UnplayedGame(57, 58),
        new UnplayedGame(59, 60),
        new UnplayedGame(61, 62),
        new UnplayedGame(63, 64)
    ]
}