/**
 * Truncate string
 *
 * @param {*} string Text to truncate
 * @param {int} characters Number of characters to tructate at
 * @param {boolean} useWordBoundary Preserve last word
 */
export function truncate(string, characters, useWordBoundary = true) {
    if (string.length <= characters) {
        return string;
    }
    var subString = string.substr(0, characters - 1);
    return (
        (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '&hellip;'
    );
}
