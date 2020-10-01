import c from './constants';
/**
 * A function to give the unit word correctly pluralized based on locale rules,
 * including the number itself.
 *
 * @param number How many of the unit
 * @param unitKey Which unit to use:
 */
interface wordsFn {
    (
        //
        number?: number,
        unitKey?: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year',
        isInPast?: boolean,
    ): string;
}

/**
 * Words function based on English rules
 */
const enWords: wordsFn = (number = 1, unitKey = 'now', isInPast = true) => {
    const words = {
        now: 'just now',
        minute: ['{{n}} minute', '{{n}} minutes'],
        hour: ['{{n}} hour', '{{n}} hours'],
        day: ['{{n}} day', '{{n}} days'],
        month: ['{{n}} month', '{{n}} months'],
        year: ['{{n}} year', '{{n}} years'],
    };
    if (unitKey === 'now') {
        return words['now'];
    }
    const word =
        number === 1
            ? words[unitKey][0].replace('{{n}}', number.toString())
            : words[unitKey][1].replace('{{n}}', number.toString());
    return isInPast ? `${word} ago` : `in ${word}`;
};

const relativeTime = (words: wordsFn = enWords) => (date: Date): string => {
    // We don't care about milliseconds
    const now = new Date(new Date().setMilliseconds(0)).getTime();
    const time = new Date(date.setMilliseconds(0)).getTime();
    const isInPast = time < now;
    const diff = Math.abs(time - now);

    if (diff < 2 * c.minute) {
        return words(1, 'now');
    }
    if (diff < c.hour) {
        return words(Math.round(diff / c.minute), 'minute', isInPast);
    }
    if (diff < 2 * c.hour) {
        return words(1, 'hour', isInPast);
    }
    if (diff < c.day) {
        return words(Math.round(diff / c.hour), 'hour', isInPast);
    }
    if (diff < 2 * c.day) {
        return words(1, 'day', isInPast);
    }
    if (diff < c.month) {
        return words(Math.round(diff / c.day), 'day', isInPast);
    }
    if (diff < 2 * c.month) {
        return words(1, 'month', isInPast);
    }
    if (diff < c.year) {
        return words(Math.round(diff / c.month), 'month', isInPast);
    }
    if (diff < 4 * c.year) {
        return words(Math.round(diff / c.month), 'month', isInPast);
    }
    return words(Math.round(diff / c.year), 'year', isInPast);
};

const relativeTimeEn = relativeTime();

export { wordsFn, relativeTime, relativeTimeEn };
