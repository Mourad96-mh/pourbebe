const CALLMEBOT_URL = 'https://api.callmebot.com/whatsapp.php'

export async function notifyNewOrder(order) {
  const phone  = process.env.BOUTIQUE_WHATSAPP
  const apiKey = process.env.CALLMEBOT_API_KEY

  if (!phone || !apiKey) return

  const { address, items, total } = order
  const clientName = `${address.firstName} ${address.lastName}`.trim()

  const text = [
    '🛒 Nouvelle commande — Pour Bébé',
    `👤 Client : ${clientName}`,
    `📞 Tél : ${address.phone}`,
    `📍 Ville : ${address.city}`,
    `📦 Articles : ${items.length}`,
    `💰 Total : ${total} DH`,
  ].join('\n')

  const url = `${CALLMEBOT_URL}?phone=${phone}&text=${encodeURIComponent(text)}&apikey=${apiKey}`

  try {
    await fetch(url)
  } catch {
    // non-bloquant — une erreur WA ne doit pas faire échouer la commande
  }
}
