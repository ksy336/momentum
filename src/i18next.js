import i18next from 'i18next';
i18next.init({
    lng: 'en',
    debug: true,
    resources: {
        ru: {
            translation: {
                "key": ["Добрый вечер, ", "Доброй ночи, ", "Доброе утро, ", "Доброго дня, "],
            }
        },
        en: {
            translation: {
                "key": ["Good evening, ", "Good Night, ", "Good Morning, ", "Good Afternoon, "]
            }
        }
    }
}, function(err, t) {
    // init set content
    updateContent();
});

function updateContent() {
    document.getElementById('output').innerHTML = i18next.t('key');
}

function changeLng(lng) {
    i18next.changeLanguage(lng);
}

i18next.on('languageChanged', () => {
    updateContent();
});