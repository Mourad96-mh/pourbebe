import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmation(to, order) {
  await resend.emails.send({
    from:    'Pour Bébé <commandes@pourbebe.ma>',
    to,
    subject: `Commande confirmée #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <h2>Merci pour votre commande !</h2>
      <p>Votre commande a bien été reçue et est en cours de traitement.</p>
      <p><strong>Total :</strong> ${order.total} DH</p>
    `,
  })
}
