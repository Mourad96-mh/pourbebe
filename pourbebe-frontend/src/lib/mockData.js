export const MOCK_CATEGORIES = [
  { id: 'cat-1', slug: 'chambre',      name: 'Chambre bébé'  },
  { id: 'cat-2', slug: 'accessoires',  name: 'Accessoires'   },
  { id: 'cat-3', slug: 'vetements',    name: 'Vêtements'     },
]

export const MOCK_PRODUCTS = [

  /* ─────────── Chambre bébé — Lits & Berceaux ─────────── */
  {
    id: 'p-01',
    slug: 'lit-bebe-evolutif-60x120-blanc',
    name: 'Lit Bébé Évolutif 60×120 cm — Blanc',
    brand: 'Bébé 9',
    description:
      'Lit bébé évolutif en bois massif certifié FSC. Se transforme en lit junior 90×190 cm. 3 hauteurs de sommier, côté abaissable. Livré avec matelas inclus. De la naissance à 7 ans.',
    price: 1999,
    compareAt: 2499,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/01/profil-lit-cododo-evolutif-et-pratique-neusy-60-x-120-cm-ikid-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['lit', 'evolutif', 'bois'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-02',
    slug: 'lit-bebe-barreaux-pin-naturel',
    name: 'Lit à Barreaux en Pin Naturel 60×120',
    brand: 'Combelle',
    description:
      'Lit bébé classique en pin massif naturel. 3 hauteurs de sommier réglables. Côté abaissable pour les nuits. Traitement laqué non toxique certifié. De la naissance à 3 ans.',
    price: 1499,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/01/profil-lit-cododo-evolutif-et-pratique-neusy-60-x-120-cm-ikid-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['lit', 'bois', 'pin'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-03',
    slug: 'berceau-cododo-amara-2en1-bebe-confort',
    name: 'Berceau Cododo Amara 2en1 — Gris',
    brand: 'Bébé Confort',
    description:
      'Berceau cododo convertible 2en1 : lit d\'appoint accolé au lit parental + berceau autonome sur roulettes. Matelas inclus. Hauteur réglable sur 8 positions. De la naissance à 6 mois.',
    price: 1990,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-pratique-et-confortable-bebe-confort-maroc-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['berceau', 'cododo', 'lit'],
    inStock: false,
    isNew: false,
  },
  {
    id: 'p-04',
    slug: 'berceau-cododo-iora-air-maxi-cosi',
    name: 'Berceau Cododo Iora Air — Graphite',
    brand: 'Maxi-Cosi',
    description:
      'Berceau cododo premium avec paroi escamotable brevetée. Structure 3D Airflow pour une ventilation optimale. Roulettes avec blocage. 3 hauteurs réglables. De la naissance à 6 mois.',
    price: 3400,
    compareAt: 4990,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/12/profil-berceau-cododo-iora-air-beyond-graphite-dorel-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['berceau', 'cododo', 'premium'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-05',
    slug: 'couffin-osier-naturel-avec-matelas',
    name: 'Couffin en Osier Naturel avec Matelas',
    brand: 'Théophile & Patachou',
    description:
      'Couffin traditionnel en osier naturel tressé à la main. Matelas ferme certifié Oeko-Tex inclus. Habillage en coton lavable amovible. Anses de transport. De la naissance à 3 mois.',
    price: 750,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/02/couffin-tresse-avec-oreiller-confortable-bebekevi-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/05/couffin-nestn-go-0m-grey-doomoo-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['couffin', 'osier', 'naissance'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-06',
    slug: 'couffin-moise-blanc-dentelle',
    name: 'Couffin Moïse Blanc Dentelle',
    brand: 'Babycalin',
    description:
      'Moïse élégant en coton brodé avec habillage blanc et dentelle fine. Structure légère en bois. Matelas ferme inclus. Balancement doux intégré. De la naissance à 4 mois.',
    price: 890,
    compareAt: 1050,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/05/couffin-nest-go-0m-sand-doomoo-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['couffin', 'moise', 'naissance'],
    inStock: true,
    isNew: true,
  },

  /* ─────────── Chambre bébé — Baby Nests & Réducteurs ─────────── */
  {
    id: 'p-07',
    slug: 'baby-nest-reducteur-lit-meyco',
    name: 'Baby Nest Réducteur de Lit — Gris',
    brand: 'Meyco',
    description:
      'Baby nest réducteur de lit en coton doux. Crée un environnement rassurant et contenu pour le nouveau-né. Housse amovible lavable à 60°C. Certifié Oeko-Tex. 0–4 mois.',
    price: 590,
    compareAt: 890,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/11/couffin-nest-210x210.jpeg',
      'https://gobebe.ma/wp-content/uploads/2024/03/lovenest-anti-tete-plate_1-210x210.png',
    ],
    categoryId: 'cat-1',
    tags: ['baby-nest', 'reducteur', 'naissance'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-08',
    slug: 'baby-nest-premium-nattou',
    name: 'Baby Nest Premium — Beige & Étoiles',
    brand: 'Nattou',
    description:
      'Baby nest premium rembourré avec côtés surélevés pour un cocooning optimal. Tissu velours ultra-doux. Fond ferme pour la sécurité. Lavable en machine. 0–6 mois.',
    price: 749,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/couffin-tresse-avec-oreiller-confortable-bebekevi-maroc-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['baby-nest', 'premium', 'naissance'],
    inStock: true,
    isNew: true,
  },

  /* ─────────── Chambre bébé — Commodes & Rangement ─────────── */
  {
    id: 'p-09',
    slug: 'commode-langer-4-tiroirs-blanche',
    name: 'Commode à Langer 4 Tiroirs — Blanche',
    brand: 'CAM',
    description:
      'Commode à langer en bois laqué blanc. 4 grands tiroirs avec fermeture douce anti-pincement. Plan à langer amovible avec rebords de sécurité. Fixation murale incluse.',
    price: 2890,
    compareAt: 3400,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/03/Asia-C-260-CAM-1-210x210.jpg',
      'https://gobebe.ma/wp-content/uploads/2024/01/48-min-2-210x210.jpg',
    ],
    categoryId: 'cat-1',
    tags: ['commode', 'langer', 'rangement'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-10',
    slug: 'commode-langer-3-tiroirs-bois-naturel',
    name: 'Commode à Langer 3 Tiroirs — Bois Naturel',
    brand: 'Combelle',
    description:
      'Commode à langer en pin massif naturel. 3 tiroirs spacieux avec guides en bois. Plan à langer sécurisé avec rebords hauts. Traitement non toxique. Hauteur ergonomique 90 cm.',
    price: 2299,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/01/48-min-2-210x210.jpg',
      'https://gobebe.ma/wp-content/uploads/2024/03/Asia-C-260-CAM-1-210x210.jpg',
    ],
    categoryId: 'cat-1',
    tags: ['commode', 'langer', 'rangement'],
    inStock: true,
    isNew: false,
  },

  /* ─────────── Chambre bébé — Literie & Textiles ─────────── */
  {
    id: 'p-11',
    slug: 'matelas-ferme-respirant-60x120-babycalin',
    name: 'Matelas Ferme Respirant 60×120 cm',
    brand: 'BabyCalin',
    description:
      'Matelas ferme pour lit bébé 60×120 cm. Déhoussable lavable à 60°C. Tissu respirant certifié Oeko-Tex, imperméable. Indice de fermeté optimal pour la sécurité du nourrisson.',
    price: 649,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/matelas-bebe-confortable-120-x-60-epaisseur-21-cm-gobebe.ma_-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/11/matelas-bebe-confortable-60-x-120-cm-epaisseur-12cm-dwirty-maroc-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['matelas', 'literie'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-12',
    slug: 'gigoteuse-chaude-tog25-nattou',
    name: 'Gigoteuse Chaude TOG 2,5 — Étoiles',
    brand: 'Nattou',
    description:
      'Gigoteuse hiver TOG 2,5 en coton certifié Oeko-Tex. Motif étoiles doux. Ouverture zip réversible pour les changes nocturnes. Épaules protégées. Du 0 au 6 mois.',
    price: 749,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/05/gigoteuse-douillette-et-confortable-pour-bebe-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2024/03/product-56491-688x550-1-210x210.jpg',
    ],
    categoryId: 'cat-1',
    tags: ['gigoteuse', 'literie', 'hiver'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-13',
    slug: 'gigoteuse-legere-tog1-babycalin',
    name: 'Gigoteuse Légère TOG 1 — Étoiles Pastel',
    brand: 'BabyCalin',
    description:
      'Gigoteuse légère été/mi-saison TOG 1 en coton doux. Fermeture zip double sens. Certifiée Oeko-Tex. Motif étoiles pastel délicat. Du 0 au 6 mois et 6 au 24 mois.',
    price: 349,
    compareAt: 420,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/12/gigoteuse--210x210.jpeg',
      'https://gobebe.ma/wp-content/uploads/2024/03/gigoteuse-b_b__1-210x210.jpeg',
    ],
    categoryId: 'cat-1',
    tags: ['gigoteuse', 'literie', 'ete'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-14',
    slug: 'parure-lit-4-pieces-naf-naf',
    name: 'Parure de Lit Bébé 3 Pièces — Motif Girafe',
    brand: 'Naf Naf',
    description:
      'Parure de lit bébé 3 pièces : housse de couette 100×135 cm, taie et drap housse 60×120 cm. 100% coton doux. Motif girafe tendance. Lavable à 60°C.',
    price: 1290,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/parure-lit-bebe-3-pieces-60-x-120-cm-motif-lapin-naf-naf-maroc-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['parure', 'literie', 'drap'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-15',
    slug: 'lange-emmaillotage-interbaby',
    name: 'Pack 3 Langes d\'Emmaillotage — Panda',
    brand: 'Interbaby',
    description:
      'Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Ultra-doux et respirants. Multi-usage : emmaillotage, bavoirs, couverture de poussette, tapis de jeu. Naissance.',
    price: 320,
    compareAt: 490,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/01/profil-pack-3-langes-panda-80-x-80-en-gaze-de-coton-bleu-inter-baby-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['lange', 'emmaillotage', 'literie'],
    inStock: true,
    isNew: false,
  },

  /* ─────────── Chambre bébé — Décoration & Ambiance ─────────── */
  {
    id: 'p-16',
    slug: 'veilleuse-musicale-projecteur-kids-melody',
    name: 'Veilleuse Musicale Projecteur 3en1',
    brand: 'Kids Melody',
    description:
      'Veilleuse musicale avec projecteur d\'étoiles au plafond. 10 berceuses et sons de la nature. 3 couleurs de lumière douce. Minuterie automatique. Télécommande incluse.',
    price: 449,
    compareAt: 519,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/11/Mobile-musical-projecteur-et-veilleuse-210x210.jpeg',
      'https://gobebe.ma/wp-content/uploads/2024/05/Mobile-musical-avec-projecteur-Kids-melody-1-210x210.jpeg',
    ],
    categoryId: 'cat-1',
    tags: ['veilleuse', 'decoration', 'musical'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-17',
    slug: 'mobile-musical-3en1-tiny-love',
    name: 'Mobile Musical de Voyage 3en1',
    brand: 'Tiny Love',
    description:
      'Mobile musical évolutif 3en1 : mobile de lit, jouet de poussette et jouet de tapis. 18 mélodies et sons. Fixation universelle sur tous les lits à barreaux. Dès la naissance.',
    price: 650,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/01/90-min-1-210x210.jpg',
      'https://gobebe.ma/wp-content/uploads/2025/11/profil-projecteur-de-nuit-mobile-3en1-winfun-210x210.webp',
    ],
    categoryId: 'cat-1',
    tags: ['mobile', 'musical', 'decoration'],
    inStock: true,
    isNew: true,
  },

  /* ─────────── Accessoires ─────────── */
  {
    id: 'p-18',
    slug: 'sac-langer-bowling-badabulle',
    name: 'Sac à Langer Bowling — Gris',
    brand: 'Badabulle',
    description:
      'Sac à langer spacieux avec tapis à langer intégré, poche isotherme pour biberons, 8 poches organisées. Matière imperméable. Attaches poussette universelles incluses.',
    price: 849,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-gris-epacieux-badabulle-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-olive-epqcieux-badabulle-maroc-210x210.webp',
    ],
    categoryId: 'cat-2',
    tags: ['sac-langer', 'accessoire'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-19',
    slug: 'sac-langer-3en1-premium-mommy-bag',
    name: 'Sac à Langer Révolutionnaire 3en1 Premium',
    brand: 'Mommy Bag',
    description:
      'Sac à langer 3en1 : sac à dos, sac à main et sac de voyage. Tapis à langer, compartiment isotherme, 12 poches. Matière imperméable et résistante. Compatible poussette.',
    price: 699,
    compareAt: 850,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/10/sac-a-langer-revolutionnaire-3en1-mommy-bag-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/10/sac-a-langer-spacieux-mommy-bag-bleu-210x210.webp',
    ],
    categoryId: 'cat-2',
    tags: ['sac-langer', 'accessoire', 'backpack'],
    inStock: true,
    isNew: true,
  },
  {
    id: 'p-20',
    slug: 'coussin-allaitement-multifonction',
    name: 'Coussin d\'Allaitement Multifonctions',
    brand: 'Candide',
    description:
      'Coussin d\'allaitement multipositions en coton bio certifié GOTS. Ferme et confortable. Housse amovible lavable à 30°C. 185 cm de tour. Idéal grossesse et allaitement.',
    price: 549,
    compareAt: 649,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/coussin-dallaitement-–-confort-superieur-pour-maman-et-bebe-maroc-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2024/10/coussin-dallaitement-multifonctions-gobebe-maroc-210x210.webp',
    ],
    categoryId: 'cat-2',
    tags: ['coussin', 'allaitement', 'accessoire'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-21',
    slug: 'coussin-grossesse-cale-bebekevi',
    name: 'Coussin Cale de Grossesse',
    brand: 'Bebekevi',
    description:
      'Grand coussin de positionnement pour femmes enceintes. Soutien lombaire, abdominal et dorsal. Housse déhoussable lavable. Adaptable en coussin d\'allaitement post-partum.',
    price: 89,
    compareAt: 120,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/coussin-cale-de-grossesse-confortable-rose-bebekevi-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2024/10/coussin-dallaitement-multifonctions-gobebe-maroc-210x210.webp',
    ],
    categoryId: 'cat-2',
    tags: ['coussin', 'grossesse', 'accessoire'],
    inStock: false,
    isNew: false,
  },
  {
    id: 'p-22',
    slug: 'tour-de-lit-decoratif-gris',
    name: 'Tour de Lit Décoratif — Gris',
    brand: 'Baby Monsy',
    description:
      'Tour de lit tressé décoratif pour décorer le lit de bébé. 100% coton hypoallergénique. Fixation facile. Lavable en machine à 30°C. Compatible avec tous les lits 60×120 cm.',
    price: 180,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/04/tour-de-lit-baby-monsy-gris-1-630x630-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/03/organisateur-de-berceau-en-mousseline-bebekevi-210x210.webp',
    ],
    categoryId: 'cat-2',
    tags: ['tour-de-lit', 'decoration', 'chambre'],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-23',
    slug: 'coussin-anti-tete-plate-kikkaboo',
    name: 'Coussin Anti-tête Plate — Memory Foam',
    brand: 'Kikkaboo',
    description:
      'Coussin anti-tête plate en memory foam à mémoire de forme. Maintien parfait de la tête du nourrisson. Taie amovible lavable. Certifié sans substances nocives. 0–6 mois.',
    price: 110,
    compareAt: 170,
    images: [
      'https://gobebe.ma/wp-content/uploads/2024/03/Ergonomic-Pillow_Heart_Grey_2_31106010057_WEB-600x750-1-210x210.jpg',
      'https://gobebe.ma/wp-content/uploads/2024/03/lovenest-anti-tete-plate_1-210x210.png',
    ],
    categoryId: 'cat-2',
    tags: ['coussin', 'anti-tete-plate', 'accessoire'],
    inStock: true,
    isNew: false,
  },

  /* ─────────── Vêtements ─────────── */
  {
    id: 'p-24',
    slug: 'pack-naissance-5pcs-cayzen-fille',
    name: 'Pack Naissance 5 pcs avec Broderie — Fille',
    brand: 'Cayzen',
    description:
      'Pack naissance complet 5 pièces brodé pour fille : body, grenouillère, bonnet, chaussettes et bavoir. Coton doux certifié. Idéal cadeau de naissance. Du 0 au 3 mois.',
    price: 199,
    compareAt: 240,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/09/profil-pack-de-naissance-5-pieces-pour-fille-cayzen-2-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['pack', 'naissance', 'cadeau', 'fille'],
    gender: 'fille',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-25',
    slug: 'coffret-naissance-5pcs-cayzen',
    name: 'Coffret de Naissance 5 Pièces',
    brand: 'Cayzen',
    description:
      'Coffret naissance élégant 5 pièces en coton doux : body, pyjama, bavoir, bonnet et chaussons. Présenté dans une jolie boîte cadeau. Du 0 au 3 mois.',
    price: 199,
    compareAt: 240,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/09/profil-coffret-de-naissance-5-pieces-cayzen--210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['coffret', 'naissance', 'cadeau'],
    gender: 'unisexe',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-26',
    slug: 'pack-3-langes-interbaby',
    name: 'Pack 3 Langes Gaze de Coton — Panda Gris',
    brand: 'Interbaby',
    description:
      'Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Multi-usage : emmaillotage, bavoir géant, couverture légère. Certifié Oeko-Tex. Lavable à 60°C. Naissance.',
    price: 279,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/01/profil-pack-3-langes-panda-80-x-80-en-gaze-de-coton-bleu-inter-baby-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['lange', 'naissance', 'cadeau'],
    gender: 'unisexe',
    inStock: true,
    isNew: true,
  },
  {
    id: 'p-27',
    slug: 'grenouillere-bonnet-unisexe-aybus',
    name: 'Grenouillère + Bonnet Unisexe — Motif Animal',
    brand: 'Aybus Baby',
    description:
      'Grenouillère en coton doux avec bonnet assorti. Motif animaux adorable. Pressions-pression pour faciliter les changes. Coutures plates non irritantes. Unisexe. 0–9 mois.',
    price: 159,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-unisexe-grenouillere-et-bonnet-bebe-blanc-aybus-baby-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/grenouillere-bonnet-motif-ours-vert-aybus-baby-maroc-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['grenouillere', 'naissance', 'coton'],
    gender: 'unisexe',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-28',
    slug: 'grenouillere-coton-bio-midirik-fille',
    name: 'Grenouillère Coton Bio — Fille',
    brand: 'Midirik',
    description:
      'Grenouillère en coton 100% biologique certifié GOTS. Motif floral délicat pour fille. Fermeture zip intégrale pour les changes nocturnes. Coutures plates. Du 0 au 9 mois.',
    price: 179,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/09/profil-lot-3-grenouilleres-fille-en-coton-biologique-midirik--210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-grenouillere-bonnet-blanc-pour-fille-et-garcon-en-coton-doux-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['grenouillere', 'fille', 'coton-bio'],
    gender: 'fille',
    inStock: true,
    isNew: true,
  },
  {
    id: 'p-29',
    slug: 'body-encolure-croisee-minisoft',
    name: 'Body à Encolure Croisée — Minisoft',
    brand: 'Minisoft',
    description:
      'Body en coton doux à encolure croisée pour faciliter l\'habillage. Pressions-pression sur les jambes pour changer facilement. Disponible en plusieurs coloris. 0–18 mois.',
    price: 45,
    compareAt: 70,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/02/body-a-encolure-croisee-minisoft-BLEU-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2025/02/body-bebe-a-Motif-cerise-minisoft-1-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['body', 'naissance', 'coton'],
    gender: 'unisexe',
    inStock: false,
    isNew: false,
  },
  {
    id: 'p-30',
    slug: 'coffret-bain-3pcs-lapin-eke-baby',
    name: 'Coffret de Bain 3 Pièces — Lapin',
    brand: 'Eke Baby',
    description:
      'Coffret bain 3 pièces : cape de bain 100×100 cm + gant de toilette + débarbouillette. Motif lapin adorable. 100% coton doux certifié. Idéal en cadeau de naissance.',
    price: 320,
    compareAt: 400,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/02/coffret-de-bain-gris-3-pieces-motif-lapin-eke-baby-maroc-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/coffret-de-bain-bebe-3-pieces-rose-motif-chat-eke-baby-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['coffret', 'bain', 'cadeau'],
    gender: 'unisexe',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-31',
    slug: 'cape-bain-premium-cygne-naf-naf',
    name: 'Cape de Bain Premium — Motif Cygne',
    brand: 'Naf Naf',
    description:
      'Cape de bain bébé en coton premium 100×100 cm. Capuche avec oreilles de cygne brodées. Douceur et absorbance optimales. Certifié Oeko-Tex. Lavable à 40°C.',
    price: 210,
    compareAt: 240,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/sortie-de-bain-beige-naf-naf-motif-cygne-gobebe.ma_-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/03/sortie-de-bain-bebe-en-coton-premium-100-x-100-cm-naf-naf-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['cape-bain', 'premium'],
    gender: 'unisexe',
    inStock: true,
    isNew: false,
  },

  /* ─────────── Vêtements — Garçon ─────────── */
  {
    id: 'p-32',
    slug: 'ensemble-garcon-3-pieces-pakel',
    name: 'Ensemble Garçon 3 Pièces — Fashion',
    brand: 'Pakel',
    description:
      'Ensemble garçon 3 pièces à manches longues : veste, pantalon et body. Tissu doux et confortable. Coutures plates non irritantes. Idéal pour les sorties. 3–18 mois.',
    price: 249,
    compareAt: 320,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/03/ensemble-garcon-3-pieces-fashion-pakel-gobebe.ma_-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/03/vetement-garcon-3-pieces-marron-fashion-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['ensemble', 'garcon', 'vetement'],
    gender: 'garcon',
    inStock: true,
    isNew: true,
  },
  {
    id: 'p-33',
    slug: 'coffret-naissance-garcon-5pcs-mini-zeyn',
    name: 'Coffret Naissance Garçon 5 Pièces',
    brand: 'Mini Zeyn',
    description:
      'Coffret naissance garçon 5 pièces : body, pyjama, bonnet, chaussons et bavoir. Coton doux certifié Oeko-Tex. Présenté en boîte cadeau. Du 0 au 3 mois.',
    price: 219,
    compareAt: 270,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-naissance-5pieces-garcon-gobebe.ma_-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-naissance-5pieces-garcon-bleu-blanc-gobebe.ma-1-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['coffret', 'naissance', 'cadeau', 'garcon'],
    gender: 'garcon',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-34',
    slug: 'ensemble-garcon-2-pieces-bleu-aybus',
    name: 'Ensemble Garçon 2 Pièces — Bleu',
    brand: 'Aybus Baby',
    description:
      'Ensemble confortable 2 pièces pour garçon : haut à capuche et pantalon. Molleton doux et chaud. Pressions rapides. Lavable à 30°C. 3–24 mois.',
    price: 169,
    compareAt: null,
    images: [
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-bleu-2-pieces-aybus-baby-gobebe.ma_-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-confortable-2-pieces-beige-aybus-baby-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['ensemble', 'garcon', 'vetement'],
    gender: 'garcon',
    inStock: true,
    isNew: false,
  },
  {
    id: 'p-35',
    slug: 'ensemble-garcon-2-pieces-nikuby',
    name: 'Ensemble Bébé Garçon 2 Pièces — Nikuby',
    brand: 'Nikuby',
    description:
      'Ensemble bébé garçon 2 pièces tendance : sweat imprimé et jogger assorti. Coton mélangé doux et respirant. Lavable en machine. 6–18 mois.',
    price: 189,
    compareAt: 230,
    images: [
      'https://gobebe.ma/wp-content/uploads/2025/12/profil-ensemble-bebe-garcon-2-pieces-nikuby-1-210x210.webp',
      'https://gobebe.ma/wp-content/uploads/2026/02/ensemble-bleu-2-pieces-aybus-baby-gobebe.ma_-210x210.webp',
    ],
    categoryId: 'cat-3',
    tags: ['ensemble', 'garcon', 'vetement'],
    gender: 'garcon',
    inStock: true,
    isNew: false,
  },
]

/* ── helpers ── */

export function getProductsByCategory(categorySlug) {
  const cat = MOCK_CATEGORIES.find((c) => c.slug === categorySlug)
  if (!cat) return []
  return MOCK_PRODUCTS.filter((p) => p.categoryId === cat.id)
}

export function getProductBySlug(slug) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null
}

export function getCategoryBySlug(slug) {
  return MOCK_CATEGORIES.find((c) => c.slug === slug) ?? null
}
