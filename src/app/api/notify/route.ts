// app/api/notify/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import webpush from "web-push";

const prisma = new PrismaClient();

interface NotificationRequest {
  title: string;
  body: string;
}

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(request: Request) {
  try {
    const { title, body }: NotificationRequest = await request.json();

    // Get all subscriptions
    const subscriptions = await prisma.pushSubscription.findMany();

    // Send notification to each subscription
    const notifications = subscriptions.map((sub) => {
      const subscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      return webpush
        .sendNotification(subscription, JSON.stringify({ title, body }))
        .catch((error) => {
          // If subscription is expired or invalid, remove it
          if (error.statusCode === 410) {
            return prisma.pushSubscription.delete({
              where: { id: sub.id },
            });
          }
          console.error("Error sending notification:", error);
          return null;
        });
    });

    await Promise.all(notifications);
    return NextResponse.json({ message: "Notifications sent" });
  } catch (error) {
    console.error("Error processing notification request:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}
