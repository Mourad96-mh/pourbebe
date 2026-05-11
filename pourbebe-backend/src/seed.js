import 'dotenv/config'
import mongoose from 'mongoose'
import Category from './models/Category.js'
import Product from './models/Product.js'
import Post from './models/Post.js'

/* ── Top-level categories ── */
const PARENT_CATEGORIES = [
  { slug: 'chambre',     name: 'Chambre & Sommeil' },
  { slug: 'sorties',     name: 'Sorties'            },
  { slug: 'hygiene',     name: 'Hygiène'            },
  { slug: 'vetements',   name: 'Vêtements'          },
  { slug: 'accessoires', name: 'Accessoires'        },
  { slug: 'cadeaux',     name: 'Idées Cadeaux'      },
  { slug: 'maman',       name: 'Pour Maman'         },
]

/* ── Subcategories — parentSlug references a PARENT_CATEGORY slug ── */
const SUB_CATEGORIES = [
  { slug: 'lits-berceaux',   name: 'Lits & Berceaux',      parentSlug: 'chambre'     },
  { slug: 'matelas-bebe',    name: 'Matelas',               parentSlug: 'chambre'     },
  { slug: 'literie',         name: 'Literie & Gigoteuses',  parentSlug: 'chambre'     },
  { slug: 'baby-nest',       name: 'Baby Nest & Couffins',  parentSlug: 'chambre'     },
  { slug: 'meubles-bebe',    name: 'Meubles & Rangement',   parentSlug: 'chambre'     },
  { slug: 'veilleuses',      name: 'Veilleuses & Déco',     parentSlug: 'chambre'     },
  { slug: 'poussettes',      name: 'Poussettes',            parentSlug: 'sorties'     },
  { slug: 'sieges-auto',     name: 'Sièges Auto',           parentSlug: 'sorties'     },
  { slug: 'porte-bebe',      name: 'Porte-bébé',            parentSlug: 'sorties'     },
  { slug: 'sacs-langer',     name: 'Sacs à Langer',         parentSlug: 'sorties'     },
  { slug: 'bain-bebe',       name: 'Bain',                  parentSlug: 'hygiene'     },
  { slug: 'soins-bebe',      name: 'Soins & Santé',         parentSlug: 'hygiene'     },
  { slug: 'change-couches',  name: 'Change & Couches',      parentSlug: 'hygiene'     },
  { slug: 'bodies-pyjamas',  name: 'Bodies & Pyjamas',      parentSlug: 'vetements'   },
  { slug: 'ensembles',       name: 'Ensembles',             parentSlug: 'vetements'   },
  { slug: 'packs-naissance', name: 'Packs Naissance',       parentSlug: 'vetements'   },
  { slug: 'coussins',        name: 'Coussins & Emmaillotage', parentSlug: 'accessoires' },
  { slug: 'jouets-eveil',    name: 'Jouets & Éveil',        parentSlug: 'accessoires' },
  { slug: 'bavoirs',         name: 'Bavoirs & Repas',       parentSlug: 'accessoires' },
  { slug: 'coffrets',        name: 'Coffrets Naissance',    parentSlug: 'cadeaux'     },
  { slug: 'liste-naissance', name: 'Liste de Naissance',    parentSlug: 'cadeaux'     },
  { slug: 'allaitement',     name: 'Allaitement',           parentSlug: 'maman'       },
  { slug: 'grossesse',       name: 'Grossesse & Confort',   parentSlug: 'maman'       },
]

const PRODUCTS = [
  { slug: 'lit-bebe-evolutif-60x120-blanc', name: 'Lit Bébé Évolutif 60×120 cm — Blanc', brand: 'Bébé 9', description: 'Lit bébé évolutif en bois massif certifié FSC. Se transforme en lit junior 90×190 cm. 3 hauteurs de sommier, côté abaissable. Livré avec matelas inclus. De la naissance à 7 ans.', usageTips: "Commencez avec la hauteur de sommier la plus haute pour faciliter le couchage, puis abaissez-la dès que bébé peut s'asseoir seul. Vérifiez régulièrement le serrage des vis. N'utilisez jamais d'oreiller ni de couette avant 2 ans.", price: 1999, compareAt: 2499, images: ['https://gobebe.ma/wp-content/uploads/2026/01/profil-lit-cododo-evolutif-et-pratique-neusy-60-x-120-cm-ikid-210x210.webp', 'https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp'], categorySlug: 'chambre', tags: ['lit', 'evolutif', 'bois'], inStock: true, isNewArrival: false },
  { slug: 'lit-bebe-barreaux-pin-naturel', name: 'Lit à Barreaux en Pin Naturel 60×120', brand: 'Combelle', description: 'Lit bébé classique en pin massif naturel. 3 hauteurs de sommier réglables. Côté abaissable pour les nuits. Traitement laqué non toxique certifié. De la naissance à 3 ans.', usageTips: "Placez le lit à distance des rideaux, cordons et prises électriques. Abaissez le côté uniquement lorsque vous surveillez bébé. Essuyez le bois avec un chiffon légèrement humide, sans produit chimique.", price: 1499, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp'], categorySlug: 'chambre', tags: ['lit', 'bois', 'pin'], inStock: true, isNewArrival: false },
  { slug: 'berceau-cododo-amara-2en1-bebe-confort', name: 'Berceau Cododo Amara 2en1 — Gris', brand: 'Bébé Confort', description: "Berceau cododo convertible 2en1 : lit d'appoint accolé au lit parental + berceau autonome sur roulettes. Matelas inclus. Hauteur réglable sur 8 positions. De la naissance à 6 mois.", usageTips: "Réglez la hauteur de façon à ce que la surface du matelas soit au même niveau que votre matelas adulte. Fixez toujours la sangle de sécurité au lit parental. Retirez le tour de lit dès que bébé peut se retourner seul.", price: 1990, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['berceau', 'cododo'], inStock: false, isNewArrival: false },
  { slug: 'berceau-cododo-iora-air-maxi-cosi', name: 'Berceau Cododo Iora Air — Graphite', brand: 'Maxi-Cosi', description: 'Berceau cododo premium avec paroi escamotable brevetée. Structure 3D Airflow pour une ventilation optimale. Roulettes avec blocage. 3 hauteurs réglables. De la naissance à 6 mois.', usageTips: "Vérifiez que les roulettes sont bien bloquées avant d'y déposer bébé. La paroi escamotable facilite l'allaitement nocturne : remettez-la en place dès que vous vous rendormez. Lavez la housse à 30°C maximum.", price: 3400, compareAt: 4990, images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-berceau-cododo-iora-air-beyond-graphite-dorel-210x210.webp'], categorySlug: 'chambre', tags: ['berceau', 'cododo', 'premium'], inStock: true, isNewArrival: false },
  { slug: 'couffin-osier-naturel-avec-matelas', name: 'Couffin en Osier Naturel avec Matelas', brand: 'Théophile & Patachou', description: 'Couffin traditionnel en osier naturel tressé à la main. Matelas ferme certifié Oeko-Tex inclus. Habillage en coton lavable amovible. Anses de transport. De la naissance à 3 mois.', usageTips: "Placez le couffin sur une surface stable et plane. Ne le posez jamais sur une hauteur sans surveillance. Lavez l'habillage en coton à 30°C. Rangez l'osier à l'abri de l'humidité après utilisation.", price: 750, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/02/couffin-tresse-avec-oreiller-confortable-bebekevi-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['couffin', 'osier', 'naissance'], inStock: true, isNewArrival: false },
  { slug: 'couffin-moise-blanc-dentelle', name: 'Couffin Moïse Blanc Dentelle', brand: 'Babycalin', description: 'Moïse élégant en coton brodé avec habillage blanc et dentelle fine. Structure légère en bois. Matelas ferme inclus. Balancement doux intégré. De la naissance à 4 mois.', usageTips: "Bercez doucement en poussant d'un bout à l'autre — jamais de mouvements brusques. Dès que bébé commence à rouler sur le côté, cessez d'utiliser le mode balancement. Lavage de l'habillage : 30°C, cycle délicat.", price: 890, compareAt: 1050, images: ['https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['couffin', 'moise', 'naissance'], inStock: true, isNewArrival: true },
  { slug: 'baby-nest-reducteur-lit-meyco', name: 'Baby Nest Réducteur de Lit — Gris', brand: 'Meyco', description: 'Baby nest réducteur de lit en coton doux. Crée un environnement rassurant et contenu pour le nouveau-né. Housse amovible lavable à 60°C. Certifié Oeko-Tex. 0–4 mois.', usageTips: "Utilisez le baby nest uniquement sous surveillance. Ne le placez jamais dans un lit avec couette ou oreiller. Lavez la housse à 60°C pour une hygiène optimale. Cessez l'utilisation dès que bébé peut se retourner.", price: 590, compareAt: 890, images: ['https://gobebe.ma/wp-content/uploads/2024/11/couffin-nest-210x210.jpeg'], categorySlug: 'chambre', tags: ['baby-nest', 'reducteur', 'naissance'], inStock: true, isNewArrival: false },
  { slug: 'baby-nest-premium-nattou', name: 'Baby Nest Premium — Beige & Étoiles', brand: 'Nattou', description: 'Baby nest premium rembourré avec côtés surélevés pour un cocooning optimal. Tissu velours ultra-doux. Fond ferme pour la sécurité. Lavable en machine. 0–6 mois.', usageTips: "Posez le baby nest sur une surface ferme et plane. Assurez-vous que bébé est couché sur le dos. Lavez en machine à 30°C, cycle délicat, sans assouplissant pour préserver le velours.", price: 749, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['baby-nest', 'premium', 'naissance'], inStock: true, isNewArrival: true },
  { slug: 'commode-langer-4-tiroirs-blanche', name: 'Commode à Langer 4 Tiroirs — Blanche', brand: 'CAM', description: 'Commode à langer en bois laqué blanc. 4 grands tiroirs avec fermeture douce anti-pincement. Plan à langer amovible avec rebords de sécurité. Fixation murale incluse.', usageTips: "Fixez impérativement la commode au mur avec la sangle fournie. Gardez toujours une main sur bébé pendant le change. Rangez les produits de soin hors de portée dans les tiroirs du bas. Nettoyez le plan à langer après chaque utilisation.", price: 2890, compareAt: 3400, images: ['https://gobebe.ma/wp-content/uploads/2024/03/Asia-C-260-CAM-1-210x210.jpg'], categorySlug: 'chambre', tags: ['commode', 'langer', 'rangement'], inStock: true, isNewArrival: false },
  { slug: 'commode-langer-3-tiroirs-bois-naturel', name: 'Commode à Langer 3 Tiroirs — Bois Naturel', brand: 'Combelle', description: 'Commode à langer en pin massif naturel. 3 tiroirs spacieux avec guides en bois. Plan à langer sécurisé avec rebords hauts. Traitement non toxique. Hauteur ergonomique 90 cm.', usageTips: "Appliquez une cire naturelle pour bois tous les 6 mois pour nourrir le pin. Fixez la commode au mur. Ne dépassez pas 10 kg sur le plan à langer. Nettoyez avec un chiffon légèrement humide.", price: 2299, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2024/01/48-min-2-210x210.jpg'], categorySlug: 'chambre', tags: ['commode', 'langer', 'rangement'], inStock: true, isNewArrival: false },
  { slug: 'matelas-ferme-respirant-60x120-babycalin', name: 'Matelas Ferme Respirant 60×120 cm', brand: 'BabyCalin', description: 'Matelas ferme pour lit bébé 60×120 cm. Déhoussable lavable à 60°C. Tissu respirant certifié Oeko-Tex, imperméable. Indice de fermeté optimal pour la sécurité du nourrisson.', usageTips: "Vérifiez que le matelas s'ajuste parfaitement dans le lit sans laisser d'espace sur les côtés. Retournez-le tous les 3 mois pour une usure uniforme. Lavez la housse à 60°C. N'ajoutez aucune sur-épaisseur (sur-matelas, tapis).", price: 649, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2025/11/matelas-bebe-confortable-60-x-120-cm-epaisseur-12cm-dwirty-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['matelas', 'literie'], inStock: true, isNewArrival: false },
  { slug: 'gigoteuse-chaude-tog25-nattou', name: 'Gigoteuse Chaude TOG 2,5 — Étoiles', brand: 'Nattou', description: 'Gigoteuse hiver TOG 2,5 en coton certifié Oeko-Tex. Motif étoiles doux. Ouverture zip réversible pour les changes nocturnes. Épaules protégées. Du 0 au 6 mois.', usageTips: "Habiller bébé d'un simple body sous la gigoteuse TOG 2,5 suffit pour une chambre à 18–20°C. Ne couvrez pas bébé d'une couverture supplémentaire. Vérifiez que la nuque de bébé n'est pas en sueur — signe de surchauffe.", price: 749, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2025/05/gigoteuse-douillette-et-confortable-pour-bebe-1-210x210.webp'], categorySlug: 'chambre', tags: ['gigoteuse', 'literie', 'hiver'], inStock: true, isNewArrival: false },
  { slug: 'gigoteuse-legere-tog1-babycalin', name: 'Gigoteuse Légère TOG 1 — Étoiles Pastel', brand: 'BabyCalin', description: 'Gigoteuse légère été/mi-saison TOG 1 en coton doux. Fermeture zip double sens. Certifiée Oeko-Tex. Motif étoiles pastel délicat. Du 0 au 6 mois et 6 au 24 mois.', usageTips: "Idéale pour une chambre entre 20 et 24°C avec un body ou un pyjama léger. Fermez le zip de bas en haut pour les changes rapides. Lavage en machine à 40°C, séchage à plat recommandé.", price: 349, compareAt: 420, images: ['https://gobebe.ma/wp-content/uploads/2024/12/gigoteuse--210x210.jpeg'], categorySlug: 'chambre', tags: ['gigoteuse', 'literie', 'ete'], inStock: true, isNewArrival: false },
  { slug: 'parure-lit-4-pieces-naf-naf', name: 'Parure de Lit Bébé 3 Pièces — Motif Girafe', brand: 'Naf Naf', description: 'Parure de lit bébé 3 pièces : housse de couette 100×135 cm, taie et drap housse 60×120 cm. 100% coton doux. Motif girafe tendance. Lavable à 60°C.', usageTips: "Lavez la parure avant la première utilisation. N'utilisez pas la couette avant les 2 ans de bébé — préférez une gigoteuse. Lavage à 60°C pour éliminer les acariens. Repassez à température moyenne.", price: 1290, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/03/parure-lit-bebe-3-pieces-60-x-120-cm-motif-lapin-naf-naf-maroc-210x210.webp'], categorySlug: 'chambre', tags: ['parure', 'literie'], inStock: true, isNewArrival: false },
  { slug: 'lange-emmaillotage-interbaby', name: "Pack 3 Langes d'Emmaillotage — Panda", brand: 'Interbaby', description: "Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Ultra-doux et respirants. Multi-usage : emmaillotage, bavoirs, couverture de poussette, tapis de jeu. Naissance.", usageTips: "Pour emmailloter : posez le lange en losange, rabattez le bas puis les côtés. L'emmaillotage ne doit pas être trop serré au niveau des hanches. Lavez à 60°C. Plus vous lavez la gaze, plus elle devient douce.", price: 320, compareAt: 490, images: ['https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp'], categorySlug: 'chambre', tags: ['lange', 'emmaillotage'], inStock: true, isNewArrival: false },
  { slug: 'veilleuse-musicale-projecteur-kids-melody', name: 'Veilleuse Musicale Projecteur 3en1', brand: 'Kids Melody', description: "Veilleuse musicale avec projecteur d'étoiles au plafond. 10 berceuses et sons de la nature. 3 couleurs de lumière douce. Minuterie automatique. Télécommande incluse.", usageTips: "Choisissez la lumière ambre ou rouge pour les réveils nocturnes — elle perturbe moins le cycle de sommeil. Activez la minuterie 20–30 min pour ne pas laisser la lumière allumée toute la nuit. Gardez l'appareil hors de portée de bébé.", price: 449, compareAt: 519, images: ['https://gobebe.ma/wp-content/uploads/2024/11/Mobile-musical-projecteur-et-veilleuse-210x210.jpeg'], categorySlug: 'chambre', tags: ['veilleuse', 'decoration', 'musical'], inStock: true, isNewArrival: false },
  { slug: 'mobile-musical-3en1-tiny-love', name: 'Mobile Musical de Voyage 3en1', brand: 'Tiny Love', description: 'Mobile musical évolutif 3en1 : mobile de lit, jouet de poussette et jouet de tapis. 18 mélodies et sons. Fixation universelle sur tous les lits à barreaux. Dès la naissance.', usageTips: "Accrochez le mobile à une hauteur de 25–30 cm au-dessus du visage de bébé pour stimuler le regard. Retirez le mobile dès que bébé peut s'asseoir ou se lever en s'appuyant sur les barreaux.", price: 650, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2024/01/90-min-1-210x210.jpg'], categorySlug: 'chambre', tags: ['mobile', 'musical', 'decoration'], inStock: true, isNewArrival: true },
  { slug: 'sac-langer-bowling-badabulle', name: 'Sac à Langer Bowling — Gris', brand: 'Badabulle', description: 'Sac à langer spacieux avec tapis à langer intégré, poche isotherme pour biberons, 8 poches organisées. Matière imperméable. Attaches poussette universelles incluses.', usageTips: "Glissez le tapis à langer dans la poche dédiée au fond du sac pour un accès rapide. La poche isotherme maintient les biberons à température 4h maximum. Nettoyez l'intérieur avec un chiffon humide après chaque sortie.", price: 849, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-gris-epacieux-badabulle-maroc-210x210.webp'], categorySlug: 'accessoires', tags: ['sac-langer', 'accessoire'], inStock: true, isNewArrival: false },
  { slug: 'sac-langer-3en1-premium-mommy-bag', name: 'Sac à Langer Révolutionnaire 3en1 Premium', brand: 'Mommy Bag', description: 'Sac à langer 3en1 : sac à dos, sac à main et sac de voyage. Tapis à langer, compartiment isotherme, 12 poches. Matière imperméable et résistante. Compatible poussette.', usageTips: "En mode sac à dos, répartissez les charges lourdes (biberons, eau) au plus proche du dos. Utilisez les crochets de poussette pour libérer vos mains en sortie. Essuyez régulièrement les fermetures éclair avec un chiffon sec.", price: 699, compareAt: 850, images: ['https://gobebe.ma/wp-content/uploads/2025/10/sac-a-langer-revolutionnaire-3en1-mommy-bag-1-210x210.webp'], categorySlug: 'accessoires', tags: ['sac-langer', 'accessoire'], inStock: true, isNewArrival: true },
  { slug: 'coussin-allaitement-multifonction', name: "Coussin d'Allaitement Multifonctions", brand: 'Candide', description: "Coussin d'allaitement multipositions en coton bio certifié GOTS. Ferme et confortable. Housse amovible lavable à 30°C. 185 cm de tour. Idéal grossesse et allaitement.", usageTips: "Positionnez le coussin autour de votre taille, le côté le plus plat vers vous. Bébé doit être au niveau du sein, ventre contre ventre. En grossesse, glissez-le entre les genoux pour soulager le bas du dos la nuit.", price: 549, compareAt: 649, images: ['https://gobebe.ma/wp-content/uploads/2026/03/coussin-dallaitement-–-confort-superieur-pour-maman-et-bebe-maroc-1-210x210.webp'], categorySlug: 'accessoires', tags: ['coussin', 'allaitement'], inStock: true, isNewArrival: false },
  { slug: 'coussin-grossesse-cale-bebekevi', name: 'Coussin Cale de Grossesse', brand: 'Bebekevi', description: 'Grand coussin de positionnement pour femmes enceintes. Soutien lombaire, abdominal et dorsal. Housse déhoussable lavable. Adaptable en coussin allaitement post-partum.', usageTips: "Dormez sur le côté gauche avec le coussin calé entre les genoux et sous le ventre — cela améliore la circulation. Lavez la housse à 30°C, cycle délicat. Après l'accouchement, transformez-le en coussin d'allaitement.", price: 89, compareAt: 120, images: ['https://gobebe.ma/wp-content/uploads/2026/03/coussin-cale-de-grossesse-confortable-rose-bebekevi-maroc-210x210.webp'], categorySlug: 'accessoires', tags: ['coussin', 'grossesse'], inStock: false, isNewArrival: false },
  { slug: 'tour-de-lit-decoratif-gris', name: 'Tour de Lit Décoratif — Gris', brand: 'Baby Monsy', description: 'Tour de lit tressé décoratif pour décorer le lit de bébé. 100% coton hypoallergénique. Fixation facile. Lavable en machine à 30°C. Compatible avec tous les lits 60×120 cm.', usageTips: "Attention : le tour de lit est uniquement décoratif — retirez-le avant de coucher bébé. Fixez-le solidement aux barreaux avec tous les liens fournis. Lavez à 30°C en cycle délicat.", price: 180, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2025/04/tour-de-lit-baby-monsy-gris-1-630x630-1-210x210.webp'], categorySlug: 'accessoires', tags: ['tour-de-lit', 'decoration'], inStock: true, isNewArrival: false },
  { slug: 'coussin-anti-tete-plate-kikkaboo', name: 'Coussin Anti-tête Plate — Memory Foam', brand: 'Kikkaboo', description: 'Coussin anti-tête plate en memory foam à mémoire de forme. Maintien parfait de la tête du nourrisson. Taie amovible lavable. Certifié sans substances nocives. 0–6 mois.', usageTips: "Placez le creux du coussin sous la nuque de bébé, pas sous la tête entière. Variez alternativement la position de la tête de bébé à droite et à gauche lors de chaque sieste. Lavez la taie à 40°C.", price: 110, compareAt: 170, images: ['https://gobebe.ma/wp-content/uploads/2024/03/Ergonomic-Pillow_Heart_Grey_2_31106010057_WEB-600x750-1-210x210.jpg'], categorySlug: 'accessoires', tags: ['coussin', 'anti-tete-plate'], inStock: true, isNewArrival: false },
  { slug: 'pack-naissance-5pcs-cayzen-fille', name: 'Pack Naissance 5 pcs avec Broderie — Fille', brand: 'Cayzen', description: 'Pack naissance complet 5 pièces brodé pour fille : body, grenouillère, bonnet, chaussettes et bavoir. Coton doux certifié. Idéal cadeau de naissance. Du 0 au 3 mois.', usageTips: "Lavez les vêtements avant la première utilisation avec une lessive hypoallergénique sans parfum. Fermez les pressions avant le lavage pour éviter qu'elles n'accrochent d'autres textiles. Séchage à l'air libre recommandé.", price: 199, compareAt: 240, images: ['https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp'], categorySlug: 'vetements', tags: ['pack', 'naissance', 'fille'], inStock: true, isNewArrival: false },
  { slug: 'coffret-naissance-5pcs-cayzen', name: 'Coffret de Naissance 5 Pièces', brand: 'Cayzen', description: 'Coffret naissance élégant 5 pièces en coton doux : body, pyjama, bavoir, bonnet et chaussons. Présenté dans une jolie boîte cadeau. Du 0 au 3 mois.', usageTips: "Prélavez chaque pièce séparément à 30°C avant utilisation. Conservez la boîte cadeau pour un joli emballage lors de l'offrir. Repassez les broderies à l'envers pour les préserver.", price: 199, compareAt: 240, images: ['https://gobebe.ma/wp-content/uploads/2025/09/profil-coffret-de-naissance-5-pieces-cayzen--210x210.webp'], categorySlug: 'vetements', tags: ['coffret', 'naissance', 'cadeau'], inStock: true, isNewArrival: false },
  { slug: 'pack-3-langes-interbaby', name: 'Pack 3 Langes Gaze de Coton — Panda Gris', brand: 'Interbaby', description: 'Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Multi-usage : emmaillotage, bavoir géant, couverture légère. Certifié Oeko-Tex. Lavable à 60°C. Naissance.', usageTips: "Lavez les langes à 60°C lors des premières utilisations — la gaze de coton devient plus douce et absorbante à chaque lavage. Idéaux comme protège-épaule lors du rot de bébé. Séchage rapide à l'air libre.", price: 279, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp'], categorySlug: 'vetements', tags: ['lange', 'naissance'], inStock: true, isNewArrival: true },
  { slug: 'grenouillere-bonnet-unisexe-aybus', name: 'Grenouillère + Bonnet Unisexe — Motif Animal', brand: 'Aybus Baby', description: 'Grenouillère en coton doux avec bonnet assorti. Motif animaux adorable. Pressions-pression pour faciliter les changes. Coutures plates non irritantes. Unisexe. 0–9 mois.', usageTips: "Choisissez une taille au-dessus si bébé est entre deux tailles — les grenouillères se portent un peu amples. Fermez toutes les pressions avant le lavage à 30°C. Ne repassez pas directement sur le motif imprimé.", price: 159, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-unisexe-grenouillere-et-bonnet-bebe-blanc-aybus-baby-maroc-210x210.webp'], categorySlug: 'vetements', tags: ['grenouillere', 'naissance'], inStock: true, isNewArrival: false },
  { slug: 'grenouillere-coton-bio-midirik-fille', name: 'Grenouillère Coton Bio — Fille', brand: 'Midirik', description: 'Grenouillère en coton 100% biologique certifié GOTS. Motif floral délicat pour fille. Fermeture zip intégrale pour les changes nocturnes. Coutures plates. Du 0 au 9 mois.', usageTips: "Lavez avec une lessive certifiée GOTS ou Ecocert pour préserver la certification bio du tissu. La fermeture zip double sens permet de changer bébé la nuit sans le déshabiller entièrement. Séchage à l'air libre.", price: 179, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2025/09/profil-lot-3-grenouilleres-fille-en-coton-biologique-midirik--210x210.webp'], categorySlug: 'vetements', tags: ['grenouillere', 'fille'], inStock: true, isNewArrival: true },
  { slug: 'body-encolure-croisee-minisoft', name: 'Body à Encolure Croisée — Minisoft', brand: 'Minisoft', description: "Body en coton doux à encolure croisée pour faciliter l'habillage. Pressions-pression sur les jambes pour changer facilement. 0–18 mois.", usageTips: "L'encolure croisée s'étire pour passer facilement sur la tête de bébé. Lavage à 30°C, envers, avec les pressions fermées. Préférez des lessives sans enzymes pour les peaux sensibles.", price: 45, compareAt: 70, images: ['https://gobebe.ma/wp-content/uploads/2025/02/body-a-encolure-croisee-minisoft-BLEU-210x210.webp'], categorySlug: 'vetements', tags: ['body', 'naissance'], inStock: false, isNewArrival: false },
  { slug: 'coffret-bain-3pcs-lapin-eke-baby', name: 'Coffret de Bain 3 Pièces — Lapin', brand: 'Eke Baby', description: 'Coffret bain 3 pièces : cape de bain 100×100 cm + gant de toilette + débarbouillette. Motif lapin adorable. 100% coton doux certifié. Idéal en cadeau de naissance.', usageTips: "Préchauffez la cape en la posant sur un radiateur quelques minutes avant le bain. Enveloppez bébé immédiatement à la sortie de l'eau en commençant par la tête. Lavez à 60°C pour maintenir l'hygiène. Séchage en machine à basse température.", price: 320, compareAt: 400, images: ['https://gobebe.ma/wp-content/uploads/2026/02/coffret-de-bain-gris-3-pieces-motif-lapin-eke-baby-maroc-210x210.webp'], categorySlug: 'vetements', tags: ['coffret', 'bain', 'cadeau'], inStock: true, isNewArrival: false },
  { slug: 'cape-bain-premium-cygne-naf-naf', name: 'Cape de Bain Premium — Motif Cygne', brand: 'Naf Naf', description: "Cape de bain bébé en coton premium 100×100 cm. Capuche avec oreilles de cygne brodées. Douceur et absorbance optimales. Certifié Oeko-Tex. Lavable à 40°C.", usageTips: "Attendez quelques lavages pour que le coton atteigne sa pleine absorbance. Glissez vos mains dans la cape avant de saisir bébé à la sortie du bain — plus pratique et sécurisé. Lavage à 40°C, sans adoucissant pour préserver l'absorbance.", price: 210, compareAt: 240, images: ['https://gobebe.ma/wp-content/uploads/2026/03/sortie-de-bain-beige-naf-naf-motif-cygne-gobebe.ma_-1-210x210.webp'], categorySlug: 'vetements', tags: ['cape-bain', 'premium'], inStock: true, isNewArrival: false },
  { slug: 'ensemble-garcon-3-pieces-pakel', name: 'Ensemble Garçon 3 Pièces — Fashion', brand: 'Pakel', description: 'Ensemble garçon 3 pièces à manches longues : veste, pantalon et body. Tissu doux et confortable. Coutures plates non irritantes. Idéal pour les sorties. 3–18 mois.', usageTips: "Lavez à 30°C, cycle délicat, à l'envers pour préserver les couleurs. Ne pas utiliser de sèche-linge. Repassez à température basse, à l'envers. Taille généreuse : commandez votre taille habituelle.", price: 249, compareAt: 320, images: ['https://gobebe.ma/wp-content/uploads/2026/03/ensemble-garcon-3-pieces-fashion-pakel-gobebe.ma_-210x210.webp'], categorySlug: 'vetements', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: true },
  { slug: 'coffret-naissance-garcon-5pcs-mini-zeyn', name: 'Coffret Naissance Garçon 5 Pièces', brand: 'Mini Zeyn', description: 'Coffret naissance garçon 5 pièces : body, pyjama, bonnet, chaussons et bavoir. Coton doux certifié Oeko-Tex. Présenté en boîte cadeau. Du 0 au 3 mois.', usageTips: "Lavez les pièces avant la première utilisation avec une lessive douce sans parfum. Fermez les pressions du body avant de mettre en machine. Le bonnet peut être lavé à la main à l'eau tiède pour plus de douceur.", price: 219, compareAt: 270, images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-naissance-5pieces-garcon-gobebe.ma_-210x210.webp'], categorySlug: 'vetements', tags: ['coffret', 'naissance', 'garcon'], inStock: true, isNewArrival: false },
  { slug: 'ensemble-garcon-2-pieces-bleu-aybus', name: 'Ensemble Garçon 2 Pièces — Bleu', brand: 'Aybus Baby', description: "Ensemble confortable 2 pièces pour garçon : haut à capuche et pantalon. Molleton doux et chaud. Pressions rapides. Lavable à 30°C. 3–24 mois.", usageTips: "Le molleton est plus chaud après quelques lavages. Lavez à 30°C, à l'envers pour conserver l'éclat du coloris bleu. Évitez de laver avec des vêtements à fermeture Velcro qui pourraient abîmer le tissu.", price: 169, compareAt: null, images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-bleu-2-pieces-aybus-baby-gobebe.ma_-210x210.webp'], categorySlug: 'vetements', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: false },
  { slug: 'ensemble-garcon-2-pieces-nikuby', name: 'Ensemble Bébé Garçon 2 Pièces — Nikuby', brand: 'Nikuby', description: 'Ensemble bébé garçon 2 pièces tendance : sweat imprimé et jogger assorti. Coton mélangé doux et respirant. Lavable en machine. 6–18 mois.', usageTips: "Lavez à 30°C, cycle délicat, à l'envers pour protéger le print. Ne pas sécher en machine. Repassez le jogger à la vapeur légère pour détendre les fibres après lavage.", price: 189, compareAt: 230, images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-ensemble-bebe-garcon-2-pieces-nikuby-1-210x210.webp'], categorySlug: 'vetements', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: false },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected to MongoDB')

  await Category.deleteMany({})
  await Product.deleteMany({})
  console.log('Cleared existing data')

  /* 1 — insert parent categories */
  const parents    = await Category.insertMany(PARENT_CATEGORIES)
  const parentMap  = Object.fromEntries(parents.map((c) => [c.slug, c._id]))

  /* 2 — insert subcategories with resolved parentId */
  const subDocs = SUB_CATEGORIES.map(({ parentSlug, ...s }) => ({
    ...s,
    parentId: parentMap[parentSlug],
  }))
  const subs   = await Category.insertMany(subDocs)
  const subMap = Object.fromEntries(subs.map((c) => [c.slug, c._id]))

  /* combined slug → _id map for product assignment */
  const categoryMap = { ...parentMap, ...subMap }
  console.log(`Inserted ${parents.length} parent + ${subs.length} sub categories`)

  /* 3 — remap products to more specific subcategories */
  const SLUG_REMAP = {
    /* chambre products → their subcategory */
    'lit-bebe-evolutif-60x120-blanc':        'lits-berceaux',
    'lit-bebe-barreaux-pin-naturel':         'lits-berceaux',
    'berceau-cododo-amara-2en1-bebe-confort':'lits-berceaux',
    'berceau-cododo-iora-air-maxi-cosi':     'lits-berceaux',
    'couffin-osier-naturel-avec-matelas':    'baby-nest',
    'couffin-moise-blanc-dentelle':          'baby-nest',
    'baby-nest-reducteur-lit-meyco':         'baby-nest',
    'baby-nest-premium-nattou':              'baby-nest',
    'commode-langer-4-tiroirs-blanche':      'meubles-bebe',
    'commode-langer-3-tiroirs-bois-naturel': 'meubles-bebe',
    'matelas-ferme-respirant-60x120-babycalin': 'matelas-bebe',
    'gigoteuse-chaude-tog25-nattou':         'literie',
    'gigoteuse-legere-tog1-babycalin':       'literie',
    'parure-lit-4-pieces-naf-naf':           'literie',
    'lange-emmaillotage-interbaby':          'literie',
    'veilleuse-musicale-projecteur-kids-melody': 'veilleuses',
    'mobile-musical-3en1-tiny-love':         'veilleuses',
    /* accessoires products */
    'sac-langer-bowling-badabulle':          'sacs-langer',
    'sac-langer-3en1-premium-mommy-bag':     'sacs-langer',
    'coussin-allaitement-multifonction':     'allaitement',
    'coussin-grossesse-cale-bebekevi':       'grossesse',
    'tour-de-lit-decoratif-gris':            'coussins',
    'coussin-anti-tete-plate-kikkaboo':      'coussins',
    /* vetements products */
    'pack-naissance-5pcs-cayzen-fille':      'packs-naissance',
    'coffret-naissance-5pcs-cayzen':         'packs-naissance',
    'pack-3-langes-interbaby':               'packs-naissance',
    'grenouillere-bonnet-unisexe-aybus':     'bodies-pyjamas',
    'grenouillere-coton-bio-midirik-fille':  'bodies-pyjamas',
    'body-encolure-croisee-minisoft':        'bodies-pyjamas',
    'coffret-bain-3pcs-lapin-eke-baby':      'coffrets',
    'cape-bain-premium-cygne-naf-naf':       'bain-bebe',
    'ensemble-garcon-3-pieces-pakel':        'ensembles',
    'coffret-naissance-garcon-5pcs-mini-zeyn': 'packs-naissance',
    'ensemble-garcon-2-pieces-bleu-aybus':   'ensembles',
    'ensemble-garcon-2-pieces-nikuby':       'ensembles',
  }

  const products = PRODUCTS.map(({ categorySlug, ...p }) => ({
    ...p,
    categoryId: categoryMap[SLUG_REMAP[p.slug] ?? categorySlug],
  }))

  await Product.insertMany(products)
  console.log(`Inserted ${products.length} products`)

  /* ── Blog posts ── */
  await Post.deleteMany({})

  const POSTS = [
    {
      title: 'Quel lit bébé choisir au Maroc ? Guide complet 2025',
      slug: 'quel-lit-bebe-choisir-maroc',
      excerpt: 'Lit à barreaux, couffin ou baby nest ? Découvrez notre guide complet pour choisir le lit idéal pour votre bébé selon votre budget et votre espace.',
      category: 'conseils',
      publishedAt: new Date('2025-04-10'),
      coverImage: '',
      body: `<p>Le choix du lit pour votre bébé est l'une des décisions les plus importantes avant l'arrivée de votre enfant. Il existe plusieurs options adaptées aux familles marocaines.</p>

<h2>Les différents types de lits pour bébé</h2>

<h3>Le couffin et le baby nest (0–3 mois)</h3>
<p>Pour les nouveau-nés de 0 à 3 mois, le <a href="/categorie/baby-nest">baby nest ou couffin</a> est la solution idéale. Il offre un espace douillet et rassurant qui rappelle le ventre maternel. Léger et transportable, il se déplace facilement d'une pièce à l'autre.</p>

<h3>Le lit à barreaux standard (0–3 ans)</h3>
<p>Le lit à barreaux classique (60×120 cm ou 70×140 cm) est la solution la plus courante. Robuste et sécurisé, il accompagne bébé jusqu'à l'âge de 2–3 ans. Choisissez un modèle avec des barreaux espacés de 45 à 65 mm pour la sécurité.</p>

<h3>Le lit évolutif (0–6 ans)</h3>
<p>Le lit évolutif est l'option la plus économique sur le long terme. Il se transforme en lit enfant en retirant les barreaux et en ajoutant une extension. Un excellent investissement pour les familles au Maroc.</p>

<h2>Critères de sécurité à vérifier</h2>
<ul>
  <li>Écartement des barreaux : entre 45 et 65 mm</li>
  <li>Hauteur de la bordure : au moins 60 cm une fois le matelas posé</li>
  <li>Peintures et vernis non toxiques</li>
  <li>Stabilité : secouez le lit pour tester sa solidité</li>
</ul>

<h2>Notre recommandation</h2>
<p>Pour les budgets intermédiaires, nous recommandons un <a href="/categorie/lits-berceaux">lit à barreaux évolutif</a> combiné avec un <a href="/categorie/baby-nest">baby nest</a> pour les premières semaines. Cette combinaison offre le meilleur rapport qualité-sécurité-prix pour les familles au Maroc.</p>

<blockquote>La règle d'or : jamais de coussin, tour de lit ou couverture lourde dans le lit d'un nourrisson de moins de 12 mois.</blockquote>`,
    },
    {
      title: 'Guide des tailles de gigoteuse bébé : comment bien choisir ?',
      slug: 'taille-gigoteuse-bebe-guide',
      excerpt: 'Taille 0-6 mois, 6-18 mois, TOG 0.5 ou 2.5 ? Notre guide explique comment choisir la bonne gigoteuse selon l\'âge de bébé et la température de la chambre.',
      category: 'conseils',
      publishedAt: new Date('2025-04-25'),
      coverImage: '',
      body: `<p>La gigoteuse est l'accessoire indispensable pour que bébé dorme en toute sécurité et au chaud. Contrairement aux couvertures, elle ne peut pas remonter sur le visage de votre enfant. Mais comment choisir la bonne taille ?</p>

<h2>Les tailles de gigoteuse selon l'âge</h2>
<p>Les gigoteuses sont classées par taille en centimètres, correspondant à la taille de bébé :</p>
<ul>
  <li><strong>Taille 0–6 mois (50–70 cm)</strong> : pour les nouveau-nés jusqu'à 6 mois</li>
  <li><strong>Taille 6–18 mois (70–90 cm)</strong> : pour les bébés de 6 à 18 mois</li>
  <li><strong>Taille 18 mois–3 ans (90–110 cm)</strong> : pour les grands bébés et jeunes enfants</li>
</ul>

<h2>Le TOG : la mesure thermique de la gigoteuse</h2>
<p>Le TOG indique la capacité thermique de la gigoteuse. Voici les recommandations selon la température de la chambre :</p>
<ul>
  <li><strong>0,5 TOG</strong> : chambre entre 24 et 27°C (été au Maroc)</li>
  <li><strong>1 TOG</strong> : chambre entre 21 et 23°C</li>
  <li><strong>2,5 TOG</strong> : chambre entre 16 et 20°C (hiver)</li>
</ul>

<h2>Comment mesurer correctement</h2>
<p>Mesurez la taille de votre bébé debout (ou étendu) avant d'acheter. Une gigoteuse trop grande présente un risque : bébé peut y glisser et se retrouver la tête dans le sac. Une gigoteuse trop petite sera inconfortable.</p>

<p>Découvrez notre sélection de <a href="/categorie/literie">gigoteuses et linge de lit</a> pour bébé, disponibles en livraison partout au Maroc.</p>`,
    },
    {
      title: 'Les meilleurs cadeaux de naissance 2025 au Maroc',
      slug: 'meilleurs-cadeaux-naissance-maroc-2025',
      excerpt: 'Coffret naissance, baby nest, baignoire bébé... Découvrez notre sélection 2025 des cadeaux de naissance les plus appréciés par les jeunes parents marocains.',
      category: 'naissance',
      publishedAt: new Date('2025-03-20'),
      coverImage: '',
      body: `<p>Vous cherchez un cadeau de naissance qui fera vraiment plaisir aux jeunes parents ? Voici notre sélection 2025 des cadeaux les plus appréciés au Maroc.</p>

<h2>Les indispensables (budget 200–400 DH)</h2>

<h3>Le coffret de naissance</h3>
<p>Un <a href="/categorie/coffrets">coffret de naissance</a> comprenant body, pyjama et bavoir est toujours apprécié. Choisissez la taille 3 mois plutôt que naissance — bébé grandira vite !</p>

<h3>Le doudou de qualité</h3>
<p>Un doudou peut devenir le compagnon préféré de bébé pour des années. Optez pour des matières naturelles et des formes douces.</p>

<h2>Les cadeaux pratiques (budget 400–800 DH)</h2>

<h3>La baignoire bébé</h3>
<p>Une <a href="/categorie/bain-bebe">baignoire ergonomique</a> est un cadeau très utile pour les premières semaines. Les modèles avec support pliable sont particulièrement pratiques dans les petits espaces marocains.</p>

<h3>Le baby nest</h3>
<p>Le <a href="/categorie/baby-nest">baby nest</a> est devenu l'un des cadeaux de naissance tendance au Maroc. Cocooning et rassurant pour bébé, il est aussi très utile pour les parents.</p>

<h2>L'idée cadeau ultime : la liste de naissance</h2>
<p>Évitez les doublons en créant ou en consultant la <a href="/liste-naissance">liste de naissance</a> des futurs parents. Ce service gratuit de Pour Bébé permet aux proches de voir exactement ce dont bébé a besoin.</p>`,
    },
    {
      title: 'Coliques du nourrisson : causes, signes et conseils pour soulager bébé',
      slug: 'coliques-nourrisson-conseils',
      excerpt: 'Bébé pleure beaucoup en fin de journée ? Ce sont peut-être des coliques. Découvrez les causes, comment les reconnaître et les gestes pour soulager votre enfant.',
      category: 'sante',
      publishedAt: new Date('2025-05-01'),
      coverImage: '',
      body: `<p>Les coliques du nourrisson touchent environ 20 % des bébés. Elles apparaissent généralement entre la 2e et la 4e semaine de vie, et disparaissent spontanément vers l'âge de 3 mois. Elles restent une source d'inquiétude importante pour les parents marocains.</p>

<h2>Comment reconnaître les coliques ?</h2>
<p>La règle des "3" est souvent utilisée par les pédiatres :</p>
<ul>
  <li>Bébé pleure plus de <strong>3 heures par jour</strong></li>
  <li>Plus de <strong>3 jours par semaine</strong></li>
  <li>Pendant plus de <strong>3 semaines consécutives</strong></li>
</ul>
<p>Les pleurs surviennent souvent en fin d'après-midi ou en soirée. Bébé ramène ses jambes sur le ventre, son visage rougit et son ventre est tendu.</p>

<h2>Les causes probables</h2>
<p>Les médecins ne s'accordent pas sur une cause unique. Plusieurs facteurs sont évoqués :</p>
<ul>
  <li>Immaturité du système digestif</li>
  <li>Ingestion d'air pendant les tétées</li>
  <li>Sensibilité aux protéines de lait de vache (en cas d'allaitement artificiel)</li>
  <li>Hypersensibilité sensorielle</li>
</ul>

<h2>Les gestes qui soulagent</h2>
<h3>Le portage</h3>
<p>Tenir bébé contre soi en position verticale aide à évacuer les gaz et le rassure. Un <a href="/categorie/porte-bebe">porte-bébé physiologique</a> permet de le porter confortablement tout en gardant les mains libres.</p>

<h3>Les massages du ventre</h3>
<p>Massez doucement le ventre de bébé dans le sens des aiguilles d'une montre, avec une légère pression. Quelques minutes suffisent.</p>

<h3>La chaleur douce</h3>
<p>Une bouillotte tiède (pas chaude) enveloppée dans un linge, posée sur le ventre de bébé, peut aider à détendre les muscles abdominaux.</p>

<h2>Quand consulter un médecin ?</h2>
<p>Si bébé perd du poids, vomit, a de la fièvre ou si les pleurs semblent très intenses et inhabituels, consultez un pédiatre sans attendre. Les coliques ne doivent pas faire passer à côté d'une autre cause médicale.</p>

<blockquote>Les coliques sont douloureuses pour bébé et épuisantes pour les parents. N'hésitez pas à vous relayer et à demander du soutien à votre entourage.</blockquote>`,
    },
    {
      title: 'Poussette ou porte-bébé : que choisir pour votre bébé ?',
      slug: 'poussette-ou-porte-bebe',
      excerpt: 'Poussette classique, combinée ou porte-bébé physiologique ? Comparatif complet pour vous aider à choisir le meilleur moyen de transport pour bébé au Maroc.',
      category: 'produits',
      publishedAt: new Date('2025-02-15'),
      coverImage: '',
      body: `<p>La question du transport de bébé est centrale pour les jeunes parents. Poussette ou porte-bébé ? Les deux ont leurs avantages. Voici un comparatif honnête pour vous aider à choisir.</p>

<h2>La poussette : polyvalence et confort</h2>
<p>La <a href="/categorie/poussettes">poussette</a> est incontournable pour les sorties longues. Elle permet de transporter bébé sans effort physique et offre souvent un espace de rangement appréciable. Pour les rues de Casablanca ou Rabat, choisissez un modèle avec de grandes roues et une suspension efficace.</p>

<h3>Poussette combinée (naissance + landau)</h3>
<p>Le meilleur choix pour les nouveau-nés. La nacelle permet à bébé de rester allongé à plat jusqu'à 6 mois environ.</p>

<h3>Poussette légère / canne</h3>
<p>Idéale à partir de 6 mois, ultra-maniable et légère. Parfaite pour les voyages et les déplacements en ville.</p>

<h2>Le porte-bébé : le lien privilégié</h2>
<p>Le <a href="/categorie/porte-bebe">porte-bébé physiologique</a> favorise le portage respectueux de la physiologie de bébé. La position "grenouille" (M-position) est recommandée par les pédiatres pour le bon développement des hanches.</p>

<h2>Notre verdict</h2>
<p>L'idéal est d'avoir les deux : un porte-bébé pour les premières semaines et les trajets courts, et une poussette pour les sorties longues. Si le budget ne permet qu'un seul choix, une poussette combinée naissance reste le plus polyvalent.</p>`,
    },
  ]

  await Post.insertMany(POSTS)
  console.log(`Inserted ${POSTS.length} blog posts`)

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch((err) => { console.error(err); process.exit(1) })
