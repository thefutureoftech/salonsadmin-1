import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_AR_NAME, LANG_AR_TRANS } from './lang-ar';


// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all translations
<<<<<<< HEAD
export const dictionary = {
=======
const dictionary = {
>>>>>>> 43e2d8523ea1db4e4a932c580087ddad5b842588
    [LANG_EN_NAME]: LANG_EN_TRANS,
    [LANG_AR_NAME]: LANG_AR_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary },
];