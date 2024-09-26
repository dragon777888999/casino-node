// load new scss file by lang code
export default function dynamicLang(code) {

    if (code) {

        switch (code) {

            // Ukraine
            case 'uk':
                require('../styles/languages/uk.scss');
                return;

            // Russian
            case 'ru':
                require('../styles/languages/ru.scss');
                return;

            // Korean
            case 'ko':
                require('../styles/languages/ko.scss');
                return;

            // Polish
            case 'pl':
                require('../styles/languages/pl.scss');
                return;

            // Thai
            case 'th':
                require('../styles/languages/th.scss');
                return;
            
            // Chinese
            case 'sc':
                require('../styles/languages/sc.scss');
                return;

            // Chinese (hong kong)
            case 'cn':
                require('../styles/languages/cn.scss');
                return;
            
            // Japanese
            case 'jp':
                require('../styles/languages/jp.scss');
                return;

            // Malasian
            case 'ms':
                require('../styles/languages/ms.scss');
                return;
            
            // Vietnamese
            case 'vi':
                require('../styles/languages/vi.scss');
                return;
           
            // Indonesian
            case 'id':
                require('../styles/languages/id.scss');
                return;

            // Arabic
            case 'ar':
                require('../styles/languages/ar.scss');
                return;
           
            // Portuguese
            case 'pt':
                require('../styles/languages/pt.scss');
                return;

            // Dutch
            case 'de':
                require('../styles/languages/de.scss');
                return;
           
            // French
            case 'fr':
                require('../styles/languages/fr.scss');
                return;
           
            // Italian
            case 'it':
                require('../styles/languages/it.scss');
                return;
           
            // Turkish
            case 'tr':
                require('../styles/languages/tr.scss');
                return;
           
            // Espaniol
            case 'es':
                require('../styles/languages/es.scss');
                return;
           
            // Hindi
            case 'hi':
                require('../styles/languages/hi.scss');
                return;

            default:
                return;
        }
    }
}