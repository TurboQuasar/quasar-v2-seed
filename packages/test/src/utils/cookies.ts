import * as Cookies from 'js-cookie';
import settings from 'src/settings.json';
// https://github.com/js-cookie/js-cookie/wiki/Frequently-Asked-Questions#expire-cookies-in-less-than-a-day
// const in30Minutes = 1 / 48;
const inFifteenMinutes = new Date(new Date().getTime() + 1440 * 60 * 1000);
const config = {
  path: '/',
  expires: inFifteenMinutes,
};
// App
const sidebarStatusKey = settings.title + '-' + 'sidebar-status';
export const getSidebarStatus = () => Cookies.get(sidebarStatusKey);
export const setSidebarStatus = (sidebarStatus: string) => Cookies.set(sidebarStatusKey, sidebarStatus, config);

const languageKey = settings.title + '-' + 'quasar-language';
export const getLanguage = () => Cookies.get(languageKey);
export const setLanguage = (language: string) => Cookies.set(languageKey, language, config);

const sizeKey = 'size';
export const getSize = () => Cookies.get(sizeKey);
export const setSize = (size: string) => Cookies.set(sizeKey, size, config);

// User
const tokenKey = settings.title + '-' + 'token';
export const getToken = () => Cookies.get(tokenKey);
export const setToken = (token: string) => Cookies.set(tokenKey, token, config);
export const removeToken = () => Cookies.remove(tokenKey);

const usernameKey = settings.title + '-' + 'username';
export const getUsername = (): any => Cookies.get(usernameKey);
export const setUsername = (username: string) => Cookies.set(usernameKey, username, config);
export const removeUsername = () => Cookies.remove(usernameKey);
