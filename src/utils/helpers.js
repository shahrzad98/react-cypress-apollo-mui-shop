import moment from 'moment-jalaali';
import { useEffect, useRef } from 'react';

const CLIENT_DATE_FORMAT = 'jYYYY/jM/jD';

export const formatDate = (str = '-', format = CLIENT_DATE_FORMAT) => {
  if (moment(str).isValid()) return moment(str).format(format);
  return str;
};

export const diffDays = date => {
  const diff = new Date().getTime() - new Date(date).getTime();
  if (diff > 0) {
    if (Math.floor(Math.round(diff / (1000 * 60 * 60 * 24))) === 0) {
      return 'امروز';
    }
    return (
      Math.floor(Math.round(diff / (1000 * 60 * 60 * 24))).toLocaleString() +
      ' روز پیش'
    );
  }
  return 0;
};

export const formatNumber = (n, acceptNegative = false) => {
  if (!n) n = 0;

  if (Number.isNaN(n)) return n;

  if (!acceptNegative) n = Math.abs(n);

  return Number(n).toLocaleString();
};

export const useDidUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    else didMountRef.current = true;
  }, inputs);
};

export const formatEngDate = date => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  return `${year}-${month}-${dt}`;
};

export function arrayOfNumber(start, len) {
  const arr = new Array(len);
  for (let i = 0; i < len; i++, start++) {
    arr[i] = start;
  }
  return arr;
}

export const redirectToAP = refIdValue => {
  let form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://asan.shaparak.ir');
  form.setAttribute('target', '_self');
  let hiddenField = document.createElement('input');
  hiddenField.setAttribute('name', 'RefId');
  hiddenField.setAttribute('value', refIdValue);
  form.appendChild(hiddenField);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export const redirectToSEP = refIdValue => {
  let form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', 'https://sep.shaparak.ir/OnlinePG/OnlinePG');
  form.setAttribute('target', '_self');
  let hiddenField = document.createElement('input');
  let hiddenField2 = document.createElement('input');
  hiddenField.setAttribute('name', 'Token');
  hiddenField.setAttribute('value', refIdValue);
  hiddenField2.setAttribute('name', 'GetMethod');
  hiddenField2.setAttribute('value', false);
  form.appendChild(hiddenField);
  form.appendChild(hiddenField2);
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

export function getCookieByName(cookieName) {
  let cookie = {};
  document.cookie.split(';').forEach(function (el) {
    const [key, value] = el.split('=');
    cookie[key.trim()] = value;
  });
  return cookie[cookieName];
}
