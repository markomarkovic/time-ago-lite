import { oneLevelTimeAgo } from './index';

// Those const are not declared or used  in index file to optimize more space
const oneMinute = 60000;
const oneHour = 60 * oneMinute;
const oneDay = 24 * oneHour;
const oneMonth = 30 * oneDay;

describe('oneLevelTimeAgo', () => {
    it('should return Just Now', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 1000))).toBe('Just Now');
    });

    it('should return Just Now If Less Then 2 Minutes', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - oneMinute - 3000))).toBe('Just Now');
    });

    it('should return  2 Minutes ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 2 * oneMinute))).toBe('2 Minutes Ago');
    });

    it('should return  54 Minutes ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 54 * oneMinute))).toBe('54 Minutes Ago');
    });

    it('should return  1 Hour ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - oneHour))).toBe('1 Hour Ago');
    });

    it('should return  9 Hours ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 9 * oneHour))).toBe('9 Hours Ago');
    });

    it('should return  23 Hours ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 23 * oneHour))).toBe('23 Hours Ago');
    });
    it('should return  1 Day ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - oneDay))).toBe('1 Day Ago');
    });

    it('should return  2 Days ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 2 * oneDay))).toBe('2 Days Ago');
    });

    it('should return  29 Days ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 29 * oneDay))).toBe('29 Days Ago');
    });

    it('should return  1 Month Ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - oneMonth))).toBe('1 Month Ago');
    });

    it('should return  2 Months Ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 2 * oneMonth))).toBe('2 Months Ago');
    });

    it('should return  11 Months Ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 11 * oneMonth))).toBe('11 Months Ago');
    });

    it('should return  47 Months Ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 47 * oneMonth))).toBe('47 Months Ago');
    });

    it('should return  5 Years Ago', () => {
        expect(oneLevelTimeAgo(new Date(new Date().getTime() - 12 * 5 * oneMonth))).toBe('5 Years Ago');
    });
});
