export function notifyApiAction(elementSelector, {defaultMessage, notifyMessage}, actionRun){
    const elementNotify = document.querySelector(elementSelector);
    if(actionRun){
        elementNotify.textContent = notifyMessage;
    } else {
        elementNotify.textContent = defaultMessage;
    }
}