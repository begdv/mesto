export function notifyApiAction(elementSelector, {defaultText, notifyText}, actionRun){
  const elementNotify = document.querySelector(elementSelector);
  if(actionRun){
    elementNotify.textContent = notifyText;
  } else {
    elementNotify.textContent = defaultText;
  }
}