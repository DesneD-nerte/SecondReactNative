import { LocaleConfig } from 'react-native-calendars';
import { NativeModules } from 'react-native'

LocaleConfig.locales['ru'] = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    monthNamesShort: ['Янв.', 'Фвр.', 'Март', 'Апр.', 'Mай', 'Июнь', 'Июль', 'Авг.', 'Сен.', 'Окт.', 'Ноя.', 'Дек.'],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Пн.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Сб.', 'Вс.'],
    today: "Сегодня"
};

LocaleConfig.locales['en'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'Jule',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fr.', 'Sat.'],
    today: "Today"
};

function recognizeLanguage () {
    const languageString = NativeModules.I18nManager.localeIdentifier;
    const allLocales = Object.keys(LocaleConfig.locales);
    const emptyFirstLocale = allLocales.shift();
    
    for (let locale of allLocales) {
        if(languageString.includes(locale)) {
            return locale;
        }
    }

    return "en";
}

LocaleConfig.defaultLocale = recognizeLanguage();

export { LocaleConfig as AgendaLocaleConfig}  