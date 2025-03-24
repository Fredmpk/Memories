// app/test-push/page.js
"use client";
import { useState, useEffect } from "react";

export default function TestPush() {
  const [subscription, setSubscription] = useState(null);
  const [status, setStatus] = useState("Checking subscription...");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if push is supported
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      setStatus("Push notifications not supported in this browser");
      return;
    }

    // Register service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service worker registered:", registration);
        return registration.pushManager.getSubscription();
      })
      .then((sub) => {
        if (sub) {
          setSubscription(sub);
          setStatus("Already subscribed to push notifications");
        } else {
          setStatus("Not subscribed to push notifications");
        }
      })
      .catch((error) => {
        console.error("Error checking push subscription:", error);
        setStatus("Error: " + error.message);
      });
  }, []);

  const subscribe = async () => {
    try {
      setIsLoading(true);
      setStatus("Requesting permission...");

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setStatus("Permission denied");
        setIsLoading(false);
        return;
      }

      setStatus("Subscribing...");

      const registration = await navigator.serviceWorker.ready;
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

      if (!vapidKey) {
        setStatus("Error: VAPID key is not defined");
        setIsLoading(false);
        return;
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      setSubscription(sub);
      setStatus("Subscribed successfully");
      setIsLoading(false);
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("Error: " + error.message);
      setIsLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!subscription) {
      setStatus("No subscription available");
      return;
    }

    try {
      setIsLoading(true);
      setStatus("Sending notification...");

      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("Notification sent successfully! Check for a notification.");
      } else {
        setStatus("Error: " + (data.error || "Unknown error"));
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error sending notification:", error);
      setStatus("Error: " + error.message);
      setIsLoading(false);
    }
  };

  function urlBase64ToUint8Array(base64String) {
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

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Push Notification Tester</h1>

      <div className="mb-4 p-3 bg-gray-100 rounded">
        <p>{status}</p>
      </div>

      <div className="space-y-4">
        {!subscription && (
          <button
            onClick={subscribe}
            disabled={isLoading}
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            {isLoading ? "Processing..." : "Subscribe to Push Notifications"}
          </button>
        )}

        {subscription && (
          <button
            onClick={sendTestNotification}
            disabled={isLoading}
            className="w-full p-2 bg-green-600 text-white rounded"
          >
            {isLoading ? "Sending..." : "Send Test Notification"}
          </button>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>Tips:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Make sure your browser allows notifications</li>
          <li>Try switching to another tab after sending the notification</li>
          <li>
            Some browsers don't show notifications when the tab is in focus
          </li>
        </ul>
      </div>
    </div>
  );
}
