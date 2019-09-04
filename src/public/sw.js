console.log("Service Worker Loaded...");


self.addEventListener("push", e => {
  if (!Notification || Notification.permission !== 'granted') {
    return;
  }
  const data = e.data.json();
  const subscribed = self.registration.showNotification(data.title, {
    body: data.message ,
    icon: './img/icons/icon-96.png'
  });
  e.waitUntil(subscribed);
});


// https://github.com/Minishlink/physbook/blob/02a0d5d7ca0d5d2cc6d308a3a9b81244c63b3f14/app/Resources/public/js/app.js
// https://developers.google.com/web/fundamentals/codelabs/push-notifications/?hl=es#instala_y_verifica_el_servidor_web