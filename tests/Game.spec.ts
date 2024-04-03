import { UnplayedGame, FinishedGame } from "../src/utils/Game";

describe("UnplayedGame", () => {
    it("should return a FinishedGame from assignWinner", () => {
        const game = new UnplayedGame(5, 9, 1);
        const finishedGame = game.assignWinner(9);

        expect(finishedGame.winner).toEqual(9);
        expect(finishedGame.loser).toEqual(5);
    });
});