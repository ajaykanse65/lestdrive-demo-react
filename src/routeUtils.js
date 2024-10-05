// src/routeUtils.js

let check = false;
let lanCheck = '';

export function generateRoutes() {
  if (
    sessionStorage.getItem('language') === 'ar' &&
    window.location.href.includes('/ar')
  ) {
    if (sessionStorage.getItem('clicked')) {
      lanCheck = sessionStorage.getItem('language');
    } else {
      lanCheck = window.location.href.includes('/ar') ? 'ar' : 'en';
    }
    check = true;
  }

  if (
    sessionStorage.getItem('language') === 'en' &&
    window.location.href.includes('/en')
  ) {
    if (sessionStorage.getItem('clicked')) {
      lanCheck = sessionStorage.getItem('language');
    } else {
      lanCheck = window.location.href.includes('/ar') ? 'ar' : 'en';
    }
    check = true;
  }

  if (
    sessionStorage.getItem('language') === 'en' &&
    window.location.href.includes('/ar')
  ) {
    if (sessionStorage.getItem('clicked')) {
      lanCheck = sessionStorage.getItem('language');
    } else {
      lanCheck = window.location.href.includes('/ar') ? 'ar' : 'en';
    }
    check = true;
  }

  if (
    sessionStorage.getItem('language') === 'ar' &&
    window.location.href.includes('/en')
  ) {
    if (sessionStorage.getItem('clicked')) {
      lanCheck = sessionStorage.getItem('language');
    } else {
      lanCheck = window.location.href.includes('/en') ? 'en' : 'ar';
    }
    check = true;
  }

  if (window.location.href.includes('/ar') && !sessionStorage.getItem('language')) {
    lanCheck = 'ar';
  } else if (window.location.href.includes('/en') && !sessionStorage.getItem('language')) {
    lanCheck = 'en';
  } else if (sessionStorage.getItem('language') && !check) {
    lanCheck = sessionStorage.getItem('language');
  }

  return lanCheck;
}
