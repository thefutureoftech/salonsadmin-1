import {Injectable, Inject, transition, EventEmitter} from '@angular/core';
import { TRANSLATIONS } from './translation'; // import our opaque token

@Injectable()
export class TranslateService {
    private _currentLang: string;
    public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

    public get currentLang() {
        return this._currentLang;
    }

    // inject our translations
    constructor(@Inject(TRANSLATIONS) private _translations: any) {
    }

    public use(lang: string): void {
        // set current language
        this._currentLang = lang;
        this.onLangChanged.emit(lang); // publish changes
    }

    private translate(key: string): string {
        // private perform translation
        let translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string, words?: string | string[]) { // add optional parameter
        const translation: string = this.translate(key);
        if (!words) return translation;
        return this.replace(translation, words); // call replace function
    }

    private PLACEHOLDER = '%'; // our placeholder

    public replace(word: string = '', words: string | string[] = '') {

        let translation: string = word;

        const values: string[] = [].concat(words);

        values.forEach((e, i) => {
            translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
        });
    
        return translation;

    }

}