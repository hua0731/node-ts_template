export class Rational {
    private numerator: number;
    private denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator cannot be zero.");
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }


    public getNumerator(): number {
        return this.numerator;
    }

    public getDenominator(): number {
        return this.denominator;
    }


    public normalize(): Rational {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        return new Rational(this.numerator / gcd, this.denominator / gcd);
    }


    public isWhole(): boolean {
        return this.numerator % this.denominator === 0;
    }


    public isDecimal(): boolean {
        return !this.isWhole();
    }


    public static _parseRational(numeratorChars: string[], denominatorChars: string[]): Rational {
        const numerator = parseInt(numeratorChars.join(""));
        const denominator = parseInt(denominatorChars.join(""));

        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
            throw new Error("Invalid input. Unable to parse from input arrays.");
        }

        return new Rational(numerator, denominator);
    }


    public static parseRational(rationalStr: string): Rational {
        const parts = rationalStr.split("/");

        if (parts.length !== 2) {
            throw new Error("Input string must be in the form 'numerator/denominator'.");
        }

        const numerator = parseInt(parts[0].trim());
        const denominator = parseInt(parts[1].trim());

        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
            throw new Error("Invalid input. Denominator cannot be zero.");
        }

        return new Rational(numerator, denominator);
    }


    private greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? Math.abs(a) : this.greatestCommonDivisor(b, a % b);
    }


    public toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }


    public equals(r: Rational): boolean {
        const currentNormalized = this.normalize();
        const rNormalized = r.normalize();
        return currentNormalized.numerator === rNormalized.numerator && currentNormalized.denominator === rNormalized.denominator;
    }
}
