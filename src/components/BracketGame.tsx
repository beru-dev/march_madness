"use client"

import { Game } from "../utils/Game";
import { SetWinner } from "../utils/useMadness";
import "./bracket-game.scss";
import teams from "../data/teams.json";

export const BracketGame = ({ game, setWinner }: BracketGameProps) => {
    const wasPlayed = "winner" in game;
    const team1 = wasPlayed ? game.winner : game.team1;
    const team2 = wasPlayed ? game.loser : game.team2;

    const canSelectWinner = team1 !== undefined && team2 !== undefined;

    return <div className="bracket-game">
        <div className={wasPlayed ? "winner" : ""}>
            {team1 !== undefined && teams[team1].name || "-"}
            {canSelectWinner && <button onClick={() => setWinner(game.id, team1 as number)}>+</button>}
        </div>
        <div>
            {team2 !== undefined && teams[team2].name || "-"}
            {canSelectWinner && <button onClick={() => setWinner(game.id, team2 as number)}>+</button>}
        </div>
    </div>
}

type BracketGameProps = {
    game: Game
    setWinner: SetWinner
}

export const BracketGames = ({ games, setWinner }: BracketGamesProps) => {
    return games.map((game, index) => <BracketGame key={index} {...{ game, setWinner }} />)
}

type BracketGamesProps = {
    games: Game[]
    setWinner: SetWinner
}