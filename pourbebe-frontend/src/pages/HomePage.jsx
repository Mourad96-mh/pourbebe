import SEO from '../components/ui/SEO'
import HeroSection from '../components/home/HeroSection'
import FeaturedProducts from '../components/home/FeaturedProducts'
import CategoryGrid from '../components/home/CategoryGrid'
import SelectionPourBebe from '../components/home/SelectionPourBebe'
import BirthListBanner from '../components/home/BirthListBanner'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Livrez-vous partout au Maroc ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, nous livrons partout au Maroc. La livraison est gratuite à partir de 400 DH d'achat. Le délai de livraison est de 3 à 5 jours ouvrables.",
      },
    },
    {
      '@type': 'Question',
      name: 'Acceptez-vous le paiement à la livraison ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, nous acceptons le paiement à la livraison (cash on delivery) partout au Maroc, ainsi que le paiement par carte bancaire en ligne.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est votre politique de retour ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vous pouvez retourner un article sous 5 jours suivant la réception. L'article doit être non utilisé et dans son emballage d'origine. Le retour est gratuit.",
      },
    },
    {
      '@type': 'Question',
      name: 'Avez-vous un showroom physique à Casablanca ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, notre showroom est situé Rue Abou Abdellah Nafi, 1er étage Benomar Center, Maarif, Casablanca. Vous pouvez venir découvrir nos produits et retirer votre commande sur place.",
      },
    },
    {
      '@type': 'Question',
      name: "Qu'est-ce qu'une liste de naissance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La liste de naissance est un service gratuit qui permet aux futurs parents de créer une liste de produits à offrir. Elle est partageable par lien unique et les proches peuvent marquer les articles qu'ils ont achetés.",
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <SEO
        canonical="/"
        description="Boutique en ligne de vêtements et accessoires bébé au Maroc. Lits bébé, poussettes, vêtements, cadeaux de naissance. Livraison gratuite dès 400 DH partout au Maroc."
        schema={faqSchema}
      />
      <HeroSection />
      <FeaturedProducts />
      <CategoryGrid />
      <SelectionPourBebe />
      <BirthListBanner />
    </>
  )
}
