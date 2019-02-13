import * as jwt_decode from "jwt-decode";

export class Token {
    private _data;

    constructor(public value) {
        try {
            if (value == "token") {
                console.log("STIJN TOKEN " + value);
            }
            this._data = jwt_decode(value);
        } catch (e) {
            throw new Error(`Could not parse token ${value}. ` + e);
        }
    }

    public hasExpired() {
        return this.getExpirationDate().getTime() < Date.now();
    }

    public getExpirationDate() {
        const date = new Date(0);
        date.setUTCSeconds(this._data.exp);

        return date;
    }

    static copy(token: Token) {
        if (token) {
            return new Token(token.value);
        } else {
            return null;
        }
    }
}
