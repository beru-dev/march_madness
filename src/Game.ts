export class UnplayedGame {
    readonly team1: number | undefined
    readonly team2: number | undefined

    constructor(team1: number | undefined, team2: number | undefined) {
        this.team1 = team1;
        this.team2 = team2;
    }

    assignWinner(winnerId: number) {
        if(
            winnerId !== this.team1 && winnerId !== this.team2
            || !this.team1
            || !this.team2
        ) {
            throw new Error(`${winnerId} did not play in the game between team id ${this.team1} and team id ${this.team2}`);
        }

        const [winner, loser] = winnerId === this.team1
            ? [this.team1, this.team2]
            : [this.team2, this.team1];

        return new FinishedGame(winner, loser);
    }

    getWinner() {
        return undefined
    }

    teamsAreSet(): boolean {
        return Boolean(this.team1 && this.team2)
    }

    toString() {
        return `${this.team1}, ${this.team2}`
    }
}

export class FinishedGame {
    readonly winner: number
    readonly loser: number

    constructor(winner: number, loser: number) {
        this.winner = winner;
        this.loser = loser;
    }

    assignWinner(winnerId: number): FinishedGame {
        if(winnerId !== this.winner && winnerId !== this.loser) {
            throw new Error(`${winnerId} did not play in the game between team id ${this.winner} and team id ${this.loser}`)
        }

        const [winner, loser] = winnerId === this.winner
            ? [winnerId, this.loser]
            : [winnerId, this.winner];

        return new FinishedGame(winner, loser)
    }

    getWinner() {
        return this.winner
    }

    toString() {
        return `W${this.winner}, l${this.loser}`
    }
}

export type Game = UnplayedGame | FinishedGame