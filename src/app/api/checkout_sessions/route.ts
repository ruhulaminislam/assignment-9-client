import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { stripe } from "@/lib/stripe"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const origin = headersList.get("origin")

    const sessionUser = await auth.api.getSession({
      headers: headersList,
    })

    if (!sessionUser?.user) {
      return NextResponse.json(
        { error: "Please login before making payment" },
        { status: 401 },
      )
    }

    const { appointmentId, serviceName, servicePrice } =
      await request.json()

    if (!appointmentId || !serviceName || servicePrice == null) {
      return NextResponse.json(
        { error: "Appointment information is required" },
        { status: 400 },
      )
    }

    const amount = Number(servicePrice)

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid appointment amount" },
        { status: 400 },
      )
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: sessionUser.user.email,
      metadata: {
        appointmentId: String(appointmentId),
        userId: String(sessionUser.user.id),
        amount: String(Math.round(amount * 100)),
      },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/success/payment?canceled=true`,
      integration_identifier: "appointment-payment",
    })

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    })
  } catch (err) {
    console.error("Error creating checkout session:", err)

    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Unable to create checkout session",
      },
      { status: 500 },
    )
  }
}