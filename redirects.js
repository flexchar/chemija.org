module.exports = [
    {
        from: '/cheminis-skaiciuotuvas.html',
        to: '/cheminis-skaiciuotuvas',
        code: 301,
    },
    {
        from: '/egzaminai.html',
        to: '/egzaminai',
        code: 301,
    },
    {
        from: '/*',
        to: 'https://chemija-legacy.netlify.app/:splat',
        code: 200,
    },
];
