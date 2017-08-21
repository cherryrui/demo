import message from './zh_message.js';
import appLocaleData from '../lib/zh.js';
window.appLocale = {
    messages: Object.assign({}, messages),

    // locale
    locale: 'en-US',

    // react-intl locale-data
    data: appLocaleData

};
