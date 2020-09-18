const SUFFIXES = [
    'Just Now',
    'Minutes Ago',
    '1 Hour Ago',
    'Hours Ago',
    '1 Day Ago',
    'Days Ago',
    '1 Month Ago',
    'Months Ago',
    'Years Ago',
];
export const oneLevelTimeAgo = (date: Date, suffixes = SUFFIXES): string => {
    const time = date.getTime();
    const diffSecondsFromNow = (new Date().getTime() - time) / 1000;
    if (diffSecondsFromNow < 120) {
        return `${suffixes[0]}`;
    } else if (diffSecondsFromNow < 3600) {
        return `${Math.floor(diffSecondsFromNow / 60)} ${suffixes[1]}`;
    } else if (diffSecondsFromNow < 7200) {
        return `${suffixes[2]}`;
    } else if (diffSecondsFromNow < 86400) {
        return `${Math.floor(diffSecondsFromNow / 3600)} ${suffixes[3]}`;
    } else if (diffSecondsFromNow < 172800) {
        return `${suffixes[4]}`;
    } else if (diffSecondsFromNow < 2592000) {
        return `${Math.floor(diffSecondsFromNow / 86400)} ${suffixes[5]}`;
    } else if (diffSecondsFromNow < 5184000) {
        return `${suffixes[6]}`;
    } else if (diffSecondsFromNow < 155520000) {
        return `${Math.floor(diffSecondsFromNow / 2592000)} ${suffixes[7]}`;
    } else {
        return `${Math.floor(diffSecondsFromNow / 31104000)} ${suffixes[8]}`;
    }
};
