
export const transactions = async (session_id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/transactions`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ session_id }),
    },
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || data.error || "Transaction failed")
  }

  return data
}

