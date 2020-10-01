# time-ago-lite

_A liteweight library to generate time ago string from a date_

## Installation

    $ yarn add time-ago-lite

or

    $ npm add time-ago-lite

## Usage

### English (default)

    import { relativeTimeEn } from 'time-ago-lite';

    const yourRelativeTimeString = relativeTimeEn(yourDate);

### Other languages

    import { relativeTime, wordsFn } from 'time-ago-lite';

    /**
     * Words function based on your language rules
     * It needs to conform to the wordsFn interface
     */
    const yourLangWords: wordsFn = (number = 1, unitKey = 'now', isInPast = true) => {
        // Your implementation here, see the `enWords` in the `index.ts`
        // or `srWords` in the `index.spec.ts`
    };

    const relativeTimeYourLang = relativeTime(yourLangWords);

    const yourRelativeTimeStringInYourLang = relativeTimeYourLang(yourDate)
