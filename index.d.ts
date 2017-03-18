declare interface Options {
	alphabet?: string[] | string;
	precision?: number;
}

declare function decToAny(count: string | number, numericSystem: number, options: Options): string;
declare function decToAny(count: string | number, numericSystem: number): string;

export default decToAny;
