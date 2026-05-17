import { Resend } from 'resend'

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY is not set')
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendPasswordReset(to, rawToken) {
  const resend = getResend()
  const link = `${process.env.CLIENT_URL}/reinitialiser-mot-de-passe/${rawToken}`
  await resend.emails.send({
    from:    'Pour Bébé <noreply@pourbebes.ma>',
    to,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous :</p>
      <p><a href="${link}" style="color:#4BBDD4;font-weight:bold;">Réinitialiser mon mot de passe</a></p>
      <p>Ce lien est valable <strong>1 heure</strong>. Si vous n'avez pas fait cette demande, ignorez cet email.</p>
    `,
  })
}

export async function sendOrderConfirmation(to, order) {
  const resend = getResend()
  await resend.emails.send({
    from:    'Pour Bébé <commandes@pourbebes.ma>',
    to,
    subject: `Commande confirmée #${order._id.toString().slice(-8).toUpperCase()}`,
    html: `
      <h2>Merci pour votre commande !</h2>
      <p>Votre commande a bien été reçue et est en cours de traitement.</p>
      <p><strong>Total :</strong> ${order.total} DH</p>
    `,
  })
}
