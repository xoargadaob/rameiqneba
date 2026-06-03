self.addEventListener('install', (e) => {
    console.log('[Service Worker] ინსტალაცია წარმატებულია');
});

self.addEventListener('fetch', (e) => {
    // ეს უბრალოდ ფორმალობაა, რომ ბრაუზერმა საიტი აპლიკაციად ჩათვალოს
});
