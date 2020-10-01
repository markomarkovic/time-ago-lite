import { relativeTimeEn, relativeTime, wordsFn } from './index';

import c from './constants';

/**
 * Date change helper
 *
 * Use positive number of seconds to change to the future
 * Use negative number of seconds to change to the future
 *
 * @param date Date to change
 * @param offsetSeconds How many seconds to change by
 */
const timeOffset = (date: Date, offsetSeconds: number): Date => new Date(date.getTime() + offsetSeconds);

const now = timeOffset(new Date(), 0);

describe('English, past', () => {
    it('should return just now', () => {
        expect(relativeTimeEn(now)).toEqual('just now');
    });

    it('should return just now if less then 2 minutes', () => {
        expect(relativeTimeEn(timeOffset(now, -(2 * c.minute - c.second)))).toEqual('just now');
    });

    it('should return 2 minutes ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(2 * c.minute)))).toEqual('2 minutes ago');
    });

    it('should return 54 minutes ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(54 * c.minute)))).toEqual('54 minutes ago');
    });

    it('should return 1 hour ago', () => {
        expect(relativeTimeEn(timeOffset(now, -c.hour))).toEqual('1 hour ago');
    });

    it('should return 9 hours ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(9 * c.hour)))).toEqual('9 hours ago');
    });

    it('should return 23 hours ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(23 * c.hour)))).toEqual('23 hours ago');
    });
    it('should return 1 day ago', () => {
        expect(relativeTimeEn(timeOffset(now, -c.day))).toEqual('1 day ago');
    });

    it('should return 2 days ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(2 * c.day)))).toEqual('2 days ago');
    });

    it('should return 29 days ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(29 * c.day)))).toEqual('29 days ago');
    });

    it('should return 1 month ago', () => {
        expect(relativeTimeEn(timeOffset(now, -c.month))).toEqual('1 month ago');
    });

    it('should return 2 months ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(2 * c.month)))).toEqual('2 months ago');
    });

    it('should return 11 months ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(11 * c.month)))).toEqual('11 months ago');
    });

    it('should return 47 months ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(47 * c.month)))).toEqual('47 months ago');
    });

    it('should return 5 years ago', () => {
        expect(relativeTimeEn(timeOffset(now, -(5 * c.year)))).toEqual('5 years ago');
    });
});

describe('English, future', () => {
    it('should return just now', () => {
        expect(relativeTimeEn(now)).toEqual('just now');
    });

    it('should return just now if less then 2 minutes', () => {
        expect(relativeTimeEn(timeOffset(now, 2 * c.minute - c.second))).toEqual('just now');
    });

    it('should return in 2 minutes', () => {
        expect(relativeTimeEn(timeOffset(now, 2 * c.minute))).toEqual('in 2 minutes');
    });

    it('should return in 54 minutes', () => {
        expect(relativeTimeEn(timeOffset(now, 54 * c.minute))).toEqual('in 54 minutes');
    });

    it('should return in 1 hour', () => {
        expect(relativeTimeEn(timeOffset(now, c.hour))).toEqual('in 1 hour');
    });

    it('should return in 9 hours', () => {
        expect(relativeTimeEn(timeOffset(now, 9 * c.hour))).toEqual('in 9 hours');
    });

    it('should return in 23 hours', () => {
        expect(relativeTimeEn(timeOffset(now, 23 * c.hour))).toEqual('in 23 hours');
    });
    it('should return in 1 day', () => {
        expect(relativeTimeEn(timeOffset(now, c.day))).toEqual('in 1 day');
    });

    it('should return in 2 days', () => {
        expect(relativeTimeEn(timeOffset(now, 2 * c.day))).toEqual('in 2 days');
    });

    it('should return in 29 days', () => {
        expect(relativeTimeEn(timeOffset(now, 29 * c.day))).toEqual('in 29 days');
    });

    it('should return in 1 month', () => {
        expect(relativeTimeEn(timeOffset(now, c.month))).toEqual('in 1 month');
    });

    it('should return in 2 months', () => {
        expect(relativeTimeEn(timeOffset(now, 2 * c.month))).toEqual('in 2 months');
    });

    it('should return in 11 months', () => {
        expect(relativeTimeEn(timeOffset(now, 11 * c.month))).toEqual('in 11 months');
    });

    it('should return in 47 months', () => {
        expect(relativeTimeEn(timeOffset(now, 47 * c.month))).toEqual('in 47 months');
    });

    it('should return in 5 years', () => {
        expect(relativeTimeEn(timeOffset(now, 5 * c.year))).toEqual('in 5 years');
    });
});

/**
 * Words function based on Serbian rules
 */
const srWords: wordsFn = (number = 1, unitKey = 'now', isInPast = true) => {
    const words = {
        now: 'sad',
        // second: ['{{n}} second', '{{n}} seconds'],
        minute: ['{{n}} minut', '{{n}} minuta', '{{n}} minuta'],
        hour: ['{{n}} sat', '{{n}} sata', '{{n}} sati'],
        day: ['{{n}} dan', '{{n}} dana', '{{n}} dana'],
        month: ['{{n}} mesec', '{{n}} meseca', '{{n}} meseci'],
        year: ['{{n}} godinu', '{{n}} godine', '{{n}} godina'],
    };
    const pluralIndex =
        number % 10 == 1 && number % 100 != 11
            ? 0
            : number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)
            ? 1
            : 2;
    if (unitKey === 'now') {
        return words['now'];
    }
    const word = words[unitKey][pluralIndex].replace('{{n}}', number.toString());
    return isInPast ? `pre ${word}` : `za ${word}`;
};

const relativeTimeSr = relativeTime(srWords);

describe('Serbian, past', () => {
    it('should return just now', () => {
        expect(relativeTimeSr(now)).toEqual('sad');
    });

    it('should return just now if less then 2 minutes', () => {
        expect(relativeTimeSr(timeOffset(now, -(2 * c.minute - c.second)))).toEqual('sad');
    });

    it('should return 2 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(2 * c.minute)))).toEqual('pre 2 minuta');
    });

    it('should return 51 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(51 * c.minute)))).toEqual('pre 51 minut');
    });

    it('should return 54 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(54 * c.minute)))).toEqual('pre 54 minuta');
    });

    it('should return 1 hour ago', () => {
        expect(relativeTimeSr(timeOffset(now, -c.hour))).toEqual('pre 1 sat');
    });

    it('should return 4 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(4 * c.hour)))).toEqual('pre 4 sata');
    });

    it('should return 9 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(9 * c.hour)))).toEqual('pre 9 sati');
    });

    it('should return 20 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(20 * c.hour)))).toEqual('pre 20 sati');
    });

    it('should return 21 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(21 * c.hour)))).toEqual('pre 21 sat');
    });

    it('should return 23 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(23 * c.hour)))).toEqual('pre 23 sata');
    });

    it('should return 1 day ago', () => {
        expect(relativeTimeSr(timeOffset(now, -c.day))).toEqual('pre 1 dan');
    });

    it('should return 2 days ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(2 * c.day)))).toEqual('pre 2 dana');
    });

    it('should return 29 days ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(29 * c.day)))).toEqual('pre 29 dana');
    });

    it('should return 1 month ago', () => {
        expect(relativeTimeSr(timeOffset(now, -c.month))).toEqual('pre 1 mesec');
    });

    it('should return 2 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(2 * c.month)))).toEqual('pre 2 meseca');
    });

    it('should return 6 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(6 * c.month)))).toEqual('pre 6 meseci');
    });

    it('should return 11 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(11 * c.month)))).toEqual('pre 11 meseci');
    });

    it('should return 47 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(47 * c.month)))).toEqual('pre 47 meseci');
    });

    it('should return 5 years ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(5 * c.year)))).toEqual('pre 5 godina');
    });

    it('should return 21 years ago', () => {
        expect(relativeTimeSr(timeOffset(now, -(21 * c.year)))).toEqual('pre 21 godinu');
    });
});

describe('Serbian, future', () => {
    it('should return just now', () => {
        expect(relativeTimeSr(now)).toEqual('sad');
    });

    it('should return just now if less then 2 minutes', () => {
        expect(relativeTimeSr(timeOffset(now, 2 * c.minute - c.second))).toEqual('sad');
    });

    it('should return 2 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, 2 * c.minute))).toEqual('za 2 minuta');
    });

    it('should return 51 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, 51 * c.minute))).toEqual('za 51 minut');
    });

    it('should return 54 minutes ago', () => {
        expect(relativeTimeSr(timeOffset(now, 54 * c.minute))).toEqual('za 54 minuta');
    });

    it('should return 1 hour ago', () => {
        expect(relativeTimeSr(timeOffset(now, c.hour))).toEqual('za 1 sat');
    });

    it('should return 4 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, 4 * c.hour))).toEqual('za 4 sata');
    });

    it('should return 9 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, 9 * c.hour))).toEqual('za 9 sati');
    });

    it('should return 20 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, 20 * c.hour))).toEqual('za 20 sati');
    });

    it('should return 21 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, 21 * c.hour))).toEqual('za 21 sat');
    });

    it('should return 23 hours ago', () => {
        expect(relativeTimeSr(timeOffset(now, 23 * c.hour))).toEqual('za 23 sata');
    });

    it('should return 1 day ago', () => {
        expect(relativeTimeSr(timeOffset(now, c.day))).toEqual('za 1 dan');
    });

    it('should return 2 days ago', () => {
        expect(relativeTimeSr(timeOffset(now, 2 * c.day))).toEqual('za 2 dana');
    });

    it('should return 29 days ago', () => {
        expect(relativeTimeSr(timeOffset(now, 29 * c.day))).toEqual('za 29 dana');
    });

    it('should return 1 month ago', () => {
        expect(relativeTimeSr(timeOffset(now, c.month))).toEqual('za 1 mesec');
    });

    it('should return 2 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, 2 * c.month))).toEqual('za 2 meseca');
    });

    it('should return 6 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, 6 * c.month))).toEqual('za 6 meseci');
    });

    it('should return 11 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, 11 * c.month))).toEqual('za 11 meseci');
    });

    it('should return 47 months ago', () => {
        expect(relativeTimeSr(timeOffset(now, 47 * c.month))).toEqual('za 47 meseci');
    });

    it('should return 5 years ago', () => {
        expect(relativeTimeSr(timeOffset(now, 5 * c.year))).toEqual('za 5 godina');
    });

    it('should return 21 years ago', () => {
        expect(relativeTimeSr(timeOffset(now, 21 * c.year))).toEqual('za 21 godinu');
    });
});
