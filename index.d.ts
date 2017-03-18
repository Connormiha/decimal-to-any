declare interface Options {
	alphabet?: string[] | string;
	precision?: number;
}

declare var ALPHABET: Array<string>;
declare var regExpInteger: RegExp;
declare var regExpDivPart: RegExp;

declare function convertorInteger(count: any, numericSystem: number, options: Options): string;
declare function convertorDiv(count: number | string, numericSystem: number, options: Options): string;

declare function decToAny(count: string | number, numericSystem: number, options: Options): string;
declare function decToAny(count: string | number, numericSystem: number): string;


export default decToAny;
