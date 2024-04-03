"use client"

import { Game } from "../utils/Game";
import { BracketGames, BracketGame } from "./BracketGame";
import { SetWinner } from "../utils/useMadness";
import "./region.scss";

export const Region = ({ name, firstRound, secondRound, sweetSixteen, eliteEight, setWinner }: RegionProps) => {
    return <section className={`region ${name.toLocaleLowerCase()}`}>
        {/* <h2>{name}</h2> */}

        {/* <h3>First Round</h3> */}
        <BracketGames games={firstRound} {...{ setWinner }} />

        {/* <h3>Second Round</h3> */}
        <BracketGames games={secondRound} {...{ setWinner }} />

        {/* <h3>Sweet Sixteen</h3> */}
        <BracketGames games={sweetSixteen} {...{ setWinner }} />

        {/* <h3>Elite Eight</h3> */}
        <BracketGame game={eliteEight} {...{ setWinner }} />
    </section>
}

type RegionProps = {
    name: string
    firstRound: Game[]
    secondRound: Game[]
    sweetSixteen: Game[]
    eliteEight: Game
    setWinner: SetWinner
}