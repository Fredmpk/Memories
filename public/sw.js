// public/sw.js
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  self.skipWaiting(); // Ensure the service worker activates immediately
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
  clients.claim(); // Take control of all clients
});

self.addEventListener("push", function (event) {
  console.log("Push event received!", event);

  let payload;
  try {
    if (event.data) {
      payload = event.data.json();
      console.log("Payload successfully parsed:", payload);
    } else {
      console.warn("Push event has no data");
      payload = {
        title: "New Notification",
        body: "No payload received",
      };
    }
  } catch (e) {
    console.error("Error parsing payload:", e);
    payload = {
      title: "New Notification",
      body: "Unable to parse notification details",
    };
  }

  const options = {
    body: payload.body || "No message content",
    icon: "/icon.png",
    badge: "/badge.png",
    data: {
      url: payload.url || "/",
    },
    timestamp: Date.now(),
    requireInteraction: true,
  };

  console.log("Showing notification with options:", options);

  event.waitUntil(
    self.registration
      .showNotification(payload.title || "New Notification", options)
      .then(() => console.log("Notification shown successfully"))
      .catch((error) => console.error("Error showing notification:", error))
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked:", event);
  event.notification.close();

  const urlToOpen = event.notification.data.url || "/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      // If a window is already open, focus it
      for (const client of clientList) {
        if (client.url === urlToOpen && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      return clients.openWindow(urlToOpen);
    })
  );
});
