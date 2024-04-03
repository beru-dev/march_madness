"use client"

import { useState } from "react";
import { UnplayedGame, Game } from "../utils/Game";
import { initializeTournament, setGameWinner } from "../utils/Tournament";

export const useMadness = (firstRound: UnplayedGame[]): [Game[], SetWinner] => {
    const [tournament, setTournament] = useState(initializeTournament(firstRound));

    const setWinner = (gameIndex: number, winnerId: number) => {
        setTournament(prev => {
            return setGameWinner(prev, gameIndex, winnerId);
        });
    }

    return [tournament, setWinner]
}

export type SetWinner = (gameIndex: number, winnerId: number) => void