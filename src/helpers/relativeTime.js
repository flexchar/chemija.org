export default dateString => {
    const date = new Date(dateString);

    if (isNaN(date)) {
        return 'faulty date provided: ' + dateString;
    }

    if ('Intl' in window) {
        const daysDiff = Math.round((date - new Date()) / (24 * 3600 * 1000));
        const yearsDiff = Math.round(daysDiff / 365);
        const monthsDiff = Math.round(yearsDiff * 12);

        const intlRelative = new Intl.RelativeTimeFormat('lt', {
            numeric: 'auto',
        });

        if (yearsDiff < 0 || yearsDiff > 0) {
            return intlRelative.format(yearsDiff, 'year');
        }

        if (monthsDiff < 0 || monthsDiff > 0) {
            return intlRelative.format(monthsDiff, 'month');
        }

        return intlRelative.format(daysDiff, 'day');
    }

    return date.toLocaleDateString();
};
