// app/api/send-notification/route.js
import webpush from "web-push";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { subscription } = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription" },
        { status: 400 }
      );
    }

    // Set VAPID details
    webpush.setVapidDetails(
      "mailto:your-email@example.com", // Replace with your email
      process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    console.log("Server: Sending push notification to:", subscription.endpoint);

    const payload = JSON.stringify({
      title: "Test Notification",
      body: "This is a test message sent at " + new Date().toLocaleTimeString(),
      url: "/",
    });

    console.log("Server: Notification payload:", payload);

    const result = await webpush.sendNotification(subscription, payload);

    console.log(
      "Server: Push notification sent successfully:",
      result.statusCode
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server: Error sending push notification:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
