"use client";
import { useState, useEffect } from "react";

// Define the subscription type
interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export default function NotificationSubscribe() {
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [isSupported, setIsSupported] = useState<boolean>(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          // Continue with the rest of your code
          if ("PushManager" in window) {
            setIsSupported(true);
            console.log("Push API supported ✅");

            return registration.pushManager.getSubscription();
          }
        })

        .then((subscription) => {
          if (subscription) {
            console.log("Already subscribed:", subscription);
            setIsSubscribed(true);
          } else {
            console.log("Not subscribed yet ❌");
          }
        })
        .catch((error) => console.error("Error checking subscription:", error));
    } else {
      console.error("Push API not supported ❌");
    }
  }, []);

  const subscribe = async (): Promise<void> => {
    try {
      console.log("Starting subscription process...");
      const registration = await navigator.serviceWorker.ready;
      console.log("Service worker ready:", registration);

      const permission = await Notification.requestPermission();
      console.log("Notification permission:", permission);
      if (permission !== "granted") {
        console.error("Notification permission denied ❌");
        return;
      }

      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";
      console.log("VAPID Key:", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);

      if (!vapidKey) {
        console.error("Missing VAPID key ❌");
        return;
      }

      console.log("Subscribing with VAPID key:", vapidKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      console.log("Subscription successful ✅", subscription);
      console.log(
        "Full subscription details:",
        JSON.stringify(subscription, null, 2)
      );
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
      console.log("Subscription saved on server ✅");
    } catch (error) {
      console.error("Error subscribing to push notifications ❌", error);
    }
  };

  function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in your browser.</p>;
  }

  return (
    <div>
      {isSubscribed ? (
        <p className="fixed bottom-30 left-0 right-0 mx-auto w-1/2 text-xl bg-blue-500 rounded-lg p-1">
          You are subscribed to notifications
        </p>
      ) : (
        <button
          onClick={subscribe}
          className="fixed bottom-20 left-0 right-0 mx-auto w-1/2 text-xl bg-zinc-100 rounded-lg p-1"
        >
          Benachrichtigung bei neuen Einträgen aktivieren
        </button>
      )}
    </div>
  );
}
