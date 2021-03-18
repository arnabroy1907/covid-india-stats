import { formatNumberString } from '../common.util';

describe('test format number string function', () => {

    it('number is 0', () => {
        const output = formatNumberString('0');
        expect(output).toBe('0');
    });

    it('number is single digit - ones', () => {
        const output = formatNumberString('2');
        expect(output).toBe('2');
    });

    it('number is double digit - tens', () => {
        const output = formatNumberString('56');
        expect(output).toBe('56');
    });

    it('number is triple digit - hundreds', () => {
        const output = formatNumberString('487');
        expect(output).toBe('487');
    });

    it('number is 4 digits - thousands', () => {
        const output = formatNumberString('2345');
        expect(output).toBe('2,345');
    });

    it('number is 4 digits international - thousands', () => {
        const outputIntl = formatNumberString('2,345');
        expect(outputIntl).toBe('2,345');
    });

    it('number is 5 digits - ten thousands', () => {
        const output = formatNumberString('27345');
        expect(output).toBe('27,345');
    });

    it('number is 5 digits international - ten thousands', () => {
        const outputIntl = formatNumberString('27,345');
        expect(outputIntl).toBe('27,345');
    });

    it('number is 6 digits - hundred thousands', () => {
        const output = formatNumberString('218345');
        expect(output).toBe('2,18,345');
    });

    it('number is 6 digits international - hundred thousands', () => {
        const outputIntl = formatNumberString('218,345');
        expect(outputIntl).toBe('2,18,345');
    });

    it('number is 7 digits - millions', () => {
        const output = formatNumberString('2904345');
        expect(output).toBe('29,04,345');
    });

    it('number is 7 digits international - millions', () => {
        const outputIntl = formatNumberString('2,904,345');
        expect(outputIntl).toBe('29,04,345');
    });

    it('number is 8 digits - ten millions', () => {
        const output = formatNumberString('23457863');
        expect(output).toBe('2,34,57,863');
    });

    it('number is 8 digits international - ten millions', () => {
        const outputIntl = formatNumberString('23,457,863');
        expect(outputIntl).toBe('2,34,57,863');
    });

    it('number is 9 digits - hundred millions', () => {
        const output = formatNumberString('234507863');
        expect(output).toBe('23,45,07,863');
    });

    it('number is 9 digits international - hundred millions', () => {
        const outputIntl = formatNumberString('234,507,863');
        expect(outputIntl).toBe('23,45,07,863');
    });

    it('number is 10 digits - billions', () => {
        const output = formatNumberString('2345078639');
        expect(output).toBe('234,50,78,639');
    });

    it('number is 10 digits international - billions', () => {
        const outputIntl = formatNumberString('2,345,078,639');
        expect(outputIntl).toBe('234,50,78,639');
    });

    it('number is 11 digits - ten billions', () => {
        const output = formatNumberString('21345078639');
        expect(output).toBe('2134,50,78,639');
    });

    it('number is 11 digits international - ten billions', () => {
        const outputIntl = formatNumberString('21,345,078,639');
        expect(outputIntl).toBe('2134,50,78,639');
    });

    it('number is 12 digits - hundred billions', () => {
        const output = formatNumberString('219345078639');
        expect(output).toBe('21934,50,78,639');
    });

    it('number is 12 digits international - hundred billions', () => {
        const outputIntl = formatNumberString('219,345,078,639');
        expect(outputIntl).toBe('21934,50,78,639');
    });

    it('number is 13 digits - trillions', () => {
        const output = formatNumberString('2193450278639');
        expect(output).toBe('219345,02,78,639');
    });

    it('number is 13 digits international - trillions', () => {
        const outputIntl = formatNumberString('2,193,450,278,639');
        expect(outputIntl).toBe('219345,02,78,639');
    });

});