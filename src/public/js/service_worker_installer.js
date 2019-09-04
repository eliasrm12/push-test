//Localizacion de la pagina
let href = window.location.origin + window.location.pathname;


const publicVapidKey = "BIYDfW00wVkR0mxUrB2Cbl-utNcxsvbu-w9p10hoCkUfTeU3ArWTv43IwaKgZc8u2GUWkkp1qplDFfkZzKd5IrU";


  // Register Service Worker
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(href + "sw.js")
  .then((reg) => {
    // registration worked
    console.log('Registration Service Worker succeeded.');
  }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

if ('Notification' in window) {
  var button = document.getElementById("notifications");
  button.addEventListener('click', sendSubscriptionToBackEnd);

  async function sendSubscriptionToBackEnd() {

     // google tutorial
    const sw = await navigator.serviceWorker.ready;
    const subscription = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch('/save_subscription', {
      method: 'POST',
      headers: {  // Se agrego este headers ya que en el app.js recibe un json / Guardar
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(subscription)
    })  
  }
}


function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}