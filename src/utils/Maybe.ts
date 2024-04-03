export class Maybe<T> {
    private value: T

    constructor(value: T) {
        this.value = value
    }

    bind<N>(cb: (value: T) => N) {
        const value = cb(this.value);

        return new Maybe(value);
    }

    getValue() {
        return this.value
    }
}