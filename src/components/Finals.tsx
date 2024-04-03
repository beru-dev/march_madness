import { Game } from "../utils/Game";
import { BracketGame, BracketGames } from "./BracketGame";
import { SetWinner } from "../utils/useMadness";

export const Finals = ({ finalFour, championship, setWinner }: FinalsProps) => {
    return <section className="finals">
        <BracketGames games={finalFour} {...{ setWinner }} />
        <BracketGame game={championship} {...{ setWinner }} />
    </section>
}

type FinalsProps = {
    finalFour: Game[]
    championship: Game
    setWinner: SetWinner
}