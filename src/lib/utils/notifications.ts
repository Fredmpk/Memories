// utils/notifications.js
export async function sendNotification(title: string, body: string) {
  try {
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });
    return true;
  } catch (error) {
    console.error("Error sending notification:", error);
    return false;
  }
}
