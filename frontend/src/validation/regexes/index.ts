export const onlyEnglishWordsRegex =
  /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB8A\u067E\u0686\u06AF\u200C\s۰-۹،؛؟!«»(){}\[\]\-ـ٪٫٬'"ٔ]+$/;

export const nationalIDRegex = /^[0-9]{10}$/;

export const postalCodeRegex = /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/;
