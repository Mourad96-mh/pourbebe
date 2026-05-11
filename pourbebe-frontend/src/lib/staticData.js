export const CATEGORIES = [
  { slug: 'chambre',        name: 'Chambre & Sommeil',       parentSlug: null          },
  { slug: 'sorties',        name: 'Sorties',                 parentSlug: null          },
  { slug: 'hygiene',        name: 'Hygiène',                 parentSlug: null          },
  { slug: 'vetements',      name: 'Vêtements',               parentSlug: null          },
  { slug: 'accessoires',    name: 'Accessoires',             parentSlug: null          },
  { slug: 'cadeaux',        name: 'Idées Cadeaux',           parentSlug: null          },
  { slug: 'maman',          name: 'Pour Maman',              parentSlug: null          },
  { slug: 'lits-berceaux',  name: 'Lits & Berceaux',         parentSlug: 'chambre'     },
  { slug: 'matelas-bebe',   name: 'Matelas',                 parentSlug: 'chambre'     },
  { slug: 'literie',        name: 'Literie & Gigoteuses',    parentSlug: 'chambre'     },
  { slug: 'baby-nest',      name: 'Baby Nest & Couffins',    parentSlug: 'chambre'     },
  { slug: 'meubles-bebe',   name: 'Meubles & Rangement',     parentSlug: 'chambre'     },
  { slug: 'veilleuses',     name: 'Veilleuses & Déco',       parentSlug: 'chambre'     },
  { slug: 'poussettes',     name: 'Poussettes',              parentSlug: 'sorties'     },
  { slug: 'sieges-auto',    name: 'Sièges Auto',             parentSlug: 'sorties'     },
  { slug: 'porte-bebe',     name: 'Porte-bébé',              parentSlug: 'sorties'     },
  { slug: 'sacs-langer',    name: 'Sacs à Langer',           parentSlug: 'sorties'     },
  { slug: 'bain-bebe',      name: 'Bain',                    parentSlug: 'hygiene'     },
  { slug: 'soins-bebe',     name: 'Soins & Santé',           parentSlug: 'hygiene'     },
  { slug: 'change-couches', name: 'Change & Couches',        parentSlug: 'hygiene'     },
  { slug: 'bodies-pyjamas', name: 'Bodies & Pyjamas',        parentSlug: 'vetements'   },
  { slug: 'ensembles',      name: 'Ensembles',               parentSlug: 'vetements'   },
  { slug: 'packs-naissance',name: 'Packs Naissance',         parentSlug: 'vetements'   },
  { slug: 'coussins',       name: 'Coussins & Emmaillotage', parentSlug: 'accessoires' },
  { slug: 'jouets-eveil',   name: 'Jouets & Éveil',          parentSlug: 'accessoires' },
  { slug: 'bavoirs',        name: 'Bavoirs & Repas',         parentSlug: 'accessoires' },
  { slug: 'coffrets',       name: 'Coffrets Naissance',      parentSlug: 'cadeaux'     },
  { slug: 'liste-naissance',name: 'Liste de Naissance',      parentSlug: 'cadeaux'     },
  { slug: 'allaitement',    name: 'Allaitement',             parentSlug: 'maman'       },
  { slug: 'grossesse',      name: 'Grossesse & Confort',     parentSlug: 'maman'       },
]

export const PRODUCTS = [
  {
    id: 'p1', slug: 'lit-bebe-evolutif-60x120-blanc',
    name: 'Lit Bébé Évolutif 60×120 cm — Blanc', brand: 'Bébé 9',
    description: 'Lit bébé évolutif en bois massif certifié FSC. Se transforme en lit junior 90×190 cm. 3 hauteurs de sommier, côté abaissable. Livré avec matelas inclus. De la naissance à 7 ans.',
    usageTips: "Commencez avec la hauteur de sommier la plus haute pour faciliter le couchage, puis abaissez-la dès que bébé peut s'asseoir seul. Vérifiez régulièrement le serrage des vis. N'utilisez jamais d'oreiller ni de couette avant 2 ans.",
    price: 1999, compareAt: 2499,
    images: ['https://gobebe.ma/wp-content/uploads/2026/01/profil-lit-cododo-evolutif-et-pratique-neusy-60-x-120-cm-ikid-210x210.webp', 'https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp'],
    categorySlug: 'lits-berceaux', tags: ['lit', 'evolutif', 'bois'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p2', slug: 'lit-bebe-barreaux-pin-naturel',
    name: 'Lit à Barreaux en Pin Naturel 60×120', brand: 'Combelle',
    description: 'Lit bébé classique en pin massif naturel. 3 hauteurs de sommier réglables. Côté abaissable pour les nuits. Traitement laqué non toxique certifié. De la naissance à 3 ans.',
    usageTips: "Placez le lit à distance des rideaux, cordons et prises électriques. Abaissez le côté uniquement lorsque vous surveillez bébé. Essuyez le bois avec un chiffon légèrement humide, sans produit chimique.",
    price: 1499, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-lit-bebe-star-nature-avec-fonction-cododo-interbaby-315x315-1-210x210.webp'],
    categorySlug: 'lits-berceaux', tags: ['lit', 'bois', 'pin'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p3', slug: 'berceau-cododo-amara-2en1-bebe-confort',
    name: 'Berceau Cododo Amara 2en1 — Gris', brand: 'Bébé Confort',
    description: "Berceau cododo convertible 2en1 : lit d'appoint accolé au lit parental + berceau autonome sur roulettes. Matelas inclus. Hauteur réglable sur 8 positions. De la naissance à 6 mois.",
    usageTips: "Réglez la hauteur de façon à ce que la surface du matelas soit au même niveau que votre matelas adulte. Fixez toujours la sangle de sécurité au lit parental. Retirez le tour de lit dès que bébé peut se retourner seul.",
    price: 1990, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/01/berceau-cododo-2en1-gris-pratique-et-confortable-bebe-confort-maroc-210x210.webp'],
    categorySlug: 'lits-berceaux', tags: ['berceau', 'cododo'], inStock: false, isNewArrival: false,
  },
  {
    id: 'p4', slug: 'berceau-cododo-iora-air-maxi-cosi',
    name: 'Berceau Cododo Iora Air — Graphite', brand: 'Maxi-Cosi',
    description: 'Berceau cododo premium avec paroi escamotable brevetée. Structure 3D Airflow pour une ventilation optimale. Roulettes avec blocage. 3 hauteurs réglables. De la naissance à 6 mois.',
    usageTips: "Vérifiez que les roulettes sont bien bloquées avant d'y déposer bébé. La paroi escamotable facilite l'allaitement nocturne : remettez-la en place dès que vous vous rendormez. Lavez la housse à 30°C maximum.",
    price: 3400, compareAt: 4990,
    images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-berceau-cododo-iora-air-beyond-graphite-dorel-210x210.webp'],
    categorySlug: 'lits-berceaux', tags: ['berceau', 'cododo', 'premium'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p5', slug: 'couffin-osier-naturel-avec-matelas',
    name: 'Couffin en Osier Naturel avec Matelas', brand: 'Théophile & Patachou',
    description: 'Couffin traditionnel en osier naturel tressé à la main. Matelas ferme certifié Oeko-Tex inclus. Habillage en coton lavable amovible. Anses de transport. De la naissance à 3 mois.',
    usageTips: "Placez le couffin sur une surface stable et plane. Ne le posez jamais sur une hauteur sans surveillance. Lavez l'habillage en coton à 30°C. Rangez l'osier à l'abri de l'humidité après utilisation.",
    price: 750, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/02/couffin-tresse-avec-oreiller-confortable-bebekevi-maroc-210x210.webp'],
    categorySlug: 'baby-nest', tags: ['couffin', 'osier', 'naissance'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p6', slug: 'couffin-moise-blanc-dentelle',
    name: 'Couffin Moïse Blanc Dentelle', brand: 'Babycalin',
    description: 'Moïse élégant en coton brodé avec habillage blanc et dentelle fine. Structure légère en bois. Matelas ferme inclus. Balancement doux intégré. De la naissance à 4 mois.',
    usageTips: "Bercez doucement en poussant d'un bout à l'autre — jamais de mouvements brusques. Dès que bébé commence à rouler sur le côté, cessez d'utiliser le mode balancement. Lavage de l'habillage : 30°C, cycle délicat.",
    price: 890, compareAt: 1050,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp'],
    categorySlug: 'baby-nest', tags: ['couffin', 'moise', 'naissance'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p7', slug: 'baby-nest-reducteur-lit-meyco',
    name: 'Baby Nest Réducteur de Lit — Gris', brand: 'Meyco',
    description: 'Baby nest réducteur de lit en coton doux. Crée un environnement rassurant et contenu pour le nouveau-né. Housse amovible lavable à 60°C. Certifié Oeko-Tex. 0–4 mois.',
    usageTips: "Utilisez le baby nest uniquement sous surveillance. Ne le placez jamais dans un lit avec couette ou oreiller. Lavez la housse à 60°C pour une hygiène optimale. Cessez l'utilisation dès que bébé peut se retourner.",
    price: 590, compareAt: 890,
    images: ['https://gobebe.ma/wp-content/uploads/2024/11/couffin-nest-210x210.jpeg'],
    categorySlug: 'baby-nest', tags: ['baby-nest', 'reducteur', 'naissance'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p8', slug: 'baby-nest-premium-nattou',
    name: 'Baby Nest Premium — Beige & Étoiles', brand: 'Nattou',
    description: 'Baby nest premium rembourré avec côtés surélevés pour un cocooning optimal. Tissu velours ultra-doux. Fond ferme pour la sécurité. Lavable en machine. 0–6 mois.',
    usageTips: "Posez le baby nest sur une surface ferme et plane. Assurez-vous que bébé est couché sur le dos. Lavez en machine à 30°C, cycle délicat, sans assouplissant pour préserver le velours.",
    price: 749, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/couffin-bebe-avec-oreiller-confortable-et-douillets-bebekevi-maroc-210x210.webp'],
    categorySlug: 'baby-nest', tags: ['baby-nest', 'premium', 'naissance'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p9', slug: 'commode-langer-4-tiroirs-blanche',
    name: 'Commode à Langer 4 Tiroirs — Blanche', brand: 'CAM',
    description: 'Commode à langer en bois laqué blanc. 4 grands tiroirs avec fermeture douce anti-pincement. Plan à langer amovible avec rebords de sécurité. Fixation murale incluse.',
    usageTips: "Fixez impérativement la commode au mur avec la sangle fournie. Gardez toujours une main sur bébé pendant le change. Rangez les produits de soin hors de portée dans les tiroirs du bas. Nettoyez le plan à langer après chaque utilisation.",
    price: 2890, compareAt: 3400,
    images: ['https://gobebe.ma/wp-content/uploads/2024/03/Asia-C-260-CAM-1-210x210.jpg'],
    categorySlug: 'meubles-bebe', tags: ['commode', 'langer', 'rangement'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p10', slug: 'commode-langer-3-tiroirs-bois-naturel',
    name: 'Commode à Langer 3 Tiroirs — Bois Naturel', brand: 'Combelle',
    description: 'Commode à langer en pin massif naturel. 3 tiroirs spacieux avec guides en bois. Plan à langer sécurisé avec rebords hauts. Traitement non toxique. Hauteur ergonomique 90 cm.',
    usageTips: "Appliquez une cire naturelle pour bois tous les 6 mois pour nourrir le pin. Fixez la commode au mur. Ne dépassez pas 10 kg sur le plan à langer. Nettoyez avec un chiffon légèrement humide.",
    price: 2299, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2024/01/48-min-2-210x210.jpg'],
    categorySlug: 'meubles-bebe', tags: ['commode', 'langer', 'rangement'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p11', slug: 'matelas-ferme-respirant-60x120-babycalin',
    name: 'Matelas Ferme Respirant 60×120 cm', brand: 'BabyCalin',
    description: 'Matelas ferme pour lit bébé 60×120 cm. Déhoussable lavable à 60°C. Tissu respirant certifié Oeko-Tex, imperméable. Indice de fermeté optimal pour la sécurité du nourrisson.',
    usageTips: "Vérifiez que le matelas s'ajuste parfaitement dans le lit sans laisser d'espace sur les côtés. Retournez-le tous les 3 mois pour une usure uniforme. Lavez la housse à 60°C. N'ajoutez aucune sur-épaisseur.",
    price: 649, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2025/11/matelas-bebe-confortable-60-x-120-cm-epaisseur-12cm-dwirty-maroc-210x210.webp'],
    categorySlug: 'matelas-bebe', tags: ['matelas', 'literie'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p12', slug: 'gigoteuse-chaude-tog25-nattou',
    name: 'Gigoteuse Chaude TOG 2,5 — Étoiles', brand: 'Nattou',
    description: 'Gigoteuse hiver TOG 2,5 en coton certifié Oeko-Tex. Motif étoiles doux. Ouverture zip réversible pour les changes nocturnes. Épaules protégées. Du 0 au 6 mois.',
    usageTips: "Habiller bébé d'un simple body sous la gigoteuse TOG 2,5 suffit pour une chambre à 18–20°C. Ne couvrez pas bébé d'une couverture supplémentaire. Vérifiez que la nuque de bébé n'est pas en sueur — signe de surchauffe.",
    price: 749, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2025/05/gigoteuse-douillette-et-confortable-pour-bebe-1-210x210.webp'],
    categorySlug: 'literie', tags: ['gigoteuse', 'literie', 'hiver'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p13', slug: 'gigoteuse-legere-tog1-babycalin',
    name: 'Gigoteuse Légère TOG 1 — Étoiles Pastel', brand: 'BabyCalin',
    description: 'Gigoteuse légère été/mi-saison TOG 1 en coton doux. Fermeture zip double sens. Certifiée Oeko-Tex. Motif étoiles pastel délicat. Du 0 au 6 mois et 6 au 24 mois.',
    usageTips: "Idéale pour une chambre entre 20 et 24°C avec un body ou un pyjama léger. Fermez le zip de bas en haut pour les changes rapides. Lavage en machine à 40°C, séchage à plat recommandé.",
    price: 349, compareAt: 420,
    images: ['https://gobebe.ma/wp-content/uploads/2024/12/gigoteuse--210x210.jpeg'],
    categorySlug: 'literie', tags: ['gigoteuse', 'literie', 'ete'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p14', slug: 'parure-lit-4-pieces-naf-naf',
    name: 'Parure de Lit Bébé 3 Pièces — Motif Girafe', brand: 'Naf Naf',
    description: 'Parure de lit bébé 3 pièces : housse de couette 100×135 cm, taie et drap housse 60×120 cm. 100% coton doux. Motif girafe tendance. Lavable à 60°C.',
    usageTips: "Lavez la parure avant la première utilisation. N'utilisez pas la couette avant les 2 ans de bébé — préférez une gigoteuse. Lavage à 60°C pour éliminer les acariens. Repassez à température moyenne.",
    price: 1290, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/parure-lit-bebe-3-pieces-60-x-120-cm-motif-lapin-naf-naf-maroc-210x210.webp'],
    categorySlug: 'literie', tags: ['parure', 'literie'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p15', slug: 'lange-emmaillotage-interbaby',
    name: "Pack 3 Langes d'Emmaillotage — Panda", brand: 'Interbaby',
    description: "Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Ultra-doux et respirants. Multi-usage : emmaillotage, bavoirs, couverture de poussette, tapis de jeu. Naissance.",
    usageTips: "Pour emmailloter : posez le lange en losange, rabattez le bas puis les côtés. L'emmaillotage ne doit pas être trop serré au niveau des hanches. Lavez à 60°C. Plus vous lavez la gaze, plus elle devient douce.",
    price: 320, compareAt: 490,
    images: ['https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp'],
    categorySlug: 'literie', tags: ['lange', 'emmaillotage'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p16', slug: 'veilleuse-musicale-projecteur-kids-melody',
    name: 'Veilleuse Musicale Projecteur 3en1', brand: 'Kids Melody',
    description: "Veilleuse musicale avec projecteur d'étoiles au plafond. 10 berceuses et sons de la nature. 3 couleurs de lumière douce. Minuterie automatique. Télécommande incluse.",
    usageTips: "Choisissez la lumière ambre ou rouge pour les réveils nocturnes — elle perturbe moins le cycle de sommeil. Activez la minuterie 20–30 min pour ne pas laisser la lumière allumée toute la nuit. Gardez l'appareil hors de portée de bébé.",
    price: 449, compareAt: 519,
    images: ['https://gobebe.ma/wp-content/uploads/2024/11/Mobile-musical-projecteur-et-veilleuse-210x210.jpeg'],
    categorySlug: 'veilleuses', tags: ['veilleuse', 'decoration', 'musical'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p17', slug: 'mobile-musical-3en1-tiny-love',
    name: 'Mobile Musical de Voyage 3en1', brand: 'Tiny Love',
    description: 'Mobile musical évolutif 3en1 : mobile de lit, jouet de poussette et jouet de tapis. 18 mélodies et sons. Fixation universelle sur tous les lits à barreaux. Dès la naissance.',
    usageTips: "Accrochez le mobile à une hauteur de 25–30 cm au-dessus du visage de bébé pour stimuler le regard. Retirez le mobile dès que bébé peut s'asseoir ou se lever en s'appuyant sur les barreaux.",
    price: 650, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2024/01/90-min-1-210x210.jpg'],
    categorySlug: 'veilleuses', tags: ['mobile', 'musical', 'decoration'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p18', slug: 'sac-langer-bowling-badabulle',
    name: 'Sac à Langer Bowling — Gris', brand: 'Badabulle',
    description: 'Sac à langer spacieux avec tapis à langer intégré, poche isotherme pour biberons, 8 poches organisées. Matière imperméable. Attaches poussette universelles incluses.',
    usageTips: "Glissez le tapis à langer dans la poche dédiée au fond du sac pour un accès rapide. La poche isotherme maintient les biberons à température 4h maximum. Nettoyez l'intérieur avec un chiffon humide après chaque sortie.",
    price: 849, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/sac-a-langer-bowling-gris-epacieux-badabulle-maroc-210x210.webp'],
    categorySlug: 'sacs-langer', tags: ['sac-langer', 'sorties'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p19', slug: 'sac-langer-3en1-premium-mommy-bag',
    name: 'Sac à Langer Révolutionnaire 3en1 Premium', brand: 'Mommy Bag',
    description: 'Sac à langer 3en1 : sac à dos, sac à main et sac de voyage. Tapis à langer, compartiment isotherme, 12 poches. Matière imperméable et résistante. Compatible poussette.',
    usageTips: "En mode sac à dos, répartissez les charges lourdes (biberons, eau) au plus proche du dos. Utilisez les crochets de poussette pour libérer vos mains en sortie. Essuyez régulièrement les fermetures éclair avec un chiffon sec.",
    price: 699, compareAt: 850,
    images: ['https://gobebe.ma/wp-content/uploads/2025/10/sac-a-langer-revolutionnaire-3en1-mommy-bag-1-210x210.webp'],
    categorySlug: 'sacs-langer', tags: ['sac-langer', 'sorties'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p20', slug: 'coussin-allaitement-multifonction',
    name: "Coussin d'Allaitement Multifonctions", brand: 'Candide',
    description: "Coussin d'allaitement multipositions en coton bio certifié GOTS. Ferme et confortable. Housse amovible lavable à 30°C. 185 cm de tour. Idéal grossesse et allaitement.",
    usageTips: "Positionnez le coussin autour de votre taille, le côté le plus plat vers vous. Bébé doit être au niveau du sein, ventre contre ventre. En grossesse, glissez-le entre les genoux pour soulager le bas du dos la nuit.",
    price: 549, compareAt: 649,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/coussin-dallaitement-–-confort-superieur-pour-maman-et-bebe-maroc-1-210x210.webp'],
    categorySlug: 'allaitement', tags: ['coussin', 'allaitement'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p21', slug: 'coussin-grossesse-cale-bebekevi',
    name: 'Coussin Cale de Grossesse', brand: 'Bebekevi',
    description: 'Grand coussin de positionnement pour femmes enceintes. Soutien lombaire, abdominal et dorsal. Housse déhoussable lavable. Adaptable en coussin allaitement post-partum.',
    usageTips: "Dormez sur le côté gauche avec le coussin calé entre les genoux et sous le ventre — cela améliore la circulation. Lavez la housse à 30°C, cycle délicat. Après l'accouchement, transformez-le en coussin d'allaitement.",
    price: 89, compareAt: 120,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/coussin-cale-de-grossesse-confortable-rose-bebekevi-maroc-210x210.webp'],
    categorySlug: 'grossesse', tags: ['coussin', 'grossesse'], inStock: false, isNewArrival: false,
  },
  {
    id: 'p22', slug: 'tour-de-lit-decoratif-gris',
    name: 'Tour de Lit Décoratif — Gris', brand: 'Baby Monsy',
    description: 'Tour de lit tressé décoratif pour décorer le lit de bébé. 100% coton hypoallergénique. Fixation facile. Lavable en machine à 30°C. Compatible avec tous les lits 60×120 cm.',
    usageTips: "Attention : le tour de lit est uniquement décoratif — retirez-le avant de coucher bébé. Fixez-le solidement aux barreaux avec tous les liens fournis. Lavez à 30°C en cycle délicat.",
    price: 180, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2025/04/tour-de-lit-baby-monsy-gris-1-630x630-1-210x210.webp'],
    categorySlug: 'coussins', tags: ['tour-de-lit', 'decoration'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p23', slug: 'coussin-anti-tete-plate-kikkaboo',
    name: 'Coussin Anti-tête Plate — Memory Foam', brand: 'Kikkaboo',
    description: 'Coussin anti-tête plate en memory foam à mémoire de forme. Maintien parfait de la tête du nourrisson. Taie amovible lavable. Certifié sans substances nocives. 0–6 mois.',
    usageTips: "Placez le creux du coussin sous la nuque de bébé, pas sous la tête entière. Variez alternativement la position de la tête de bébé à droite et à gauche lors de chaque sieste. Lavez la taie à 40°C.",
    price: 110, compareAt: 170,
    images: ['https://gobebe.ma/wp-content/uploads/2024/03/Ergonomic-Pillow_Heart_Grey_2_31106010057_WEB-600x750-1-210x210.jpg'],
    categorySlug: 'coussins', tags: ['coussin', 'anti-tete-plate'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p24', slug: 'pack-naissance-5pcs-cayzen-fille',
    name: 'Pack Naissance 5 pcs avec Broderie — Fille', brand: 'Cayzen',
    description: 'Pack naissance complet 5 pièces brodé pour fille : body, grenouillère, bonnet, chaussettes et bavoir. Coton doux certifié. Idéal cadeau de naissance. Du 0 au 3 mois.',
    usageTips: "Lavez les vêtements avant la première utilisation avec une lessive hypoallergénique sans parfum. Fermez les pressions avant le lavage pour éviter qu'elles n'accrochent d'autres textiles. Séchage à l'air libre recommandé.",
    price: 199, compareAt: 240,
    images: ['https://gobebe.ma/wp-content/uploads/2025/09/pack-de-naissance-5-pieces-avec-broderie-pour-fille-cayzen-210x210.webp'],
    categorySlug: 'packs-naissance', tags: ['pack', 'naissance', 'fille'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p25', slug: 'coffret-naissance-5pcs-cayzen',
    name: 'Coffret de Naissance 5 Pièces', brand: 'Cayzen',
    description: 'Coffret naissance élégant 5 pièces en coton doux : body, pyjama, bavoir, bonnet et chaussons. Présenté dans une jolie boîte cadeau. Du 0 au 3 mois.',
    usageTips: "Prélavez chaque pièce séparément à 30°C avant utilisation. Conservez la boîte cadeau pour un joli emballage lors de l'offrir. Repassez les broderies à l'envers pour les préserver.",
    price: 199, compareAt: 240,
    images: ['https://gobebe.ma/wp-content/uploads/2025/09/profil-coffret-de-naissance-5-pieces-cayzen--210x210.webp'],
    categorySlug: 'packs-naissance', tags: ['coffret', 'naissance', 'cadeau'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p26', slug: 'pack-3-langes-interbaby',
    name: 'Pack 3 Langes Gaze de Coton — Panda Gris', brand: 'Interbaby',
    description: 'Pack de 3 langes en gaze de coton double épaisseur 80×80 cm. Multi-usage : emmaillotage, bavoir géant, couverture légère. Certifié Oeko-Tex. Lavable à 60°C. Naissance.',
    usageTips: "Lavez les langes à 60°C lors des premières utilisations — la gaze de coton devient plus douce et absorbante à chaque lavage. Idéaux comme protège-épaule lors du rot de bébé. Séchage rapide à l'air libre.",
    price: 279, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/01/pack-3-langes-panda-80-x-80-en-gaze-de-coton-gris-inter-baby-210x210.webp'],
    categorySlug: 'packs-naissance', tags: ['lange', 'naissance'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p27', slug: 'grenouillere-bonnet-unisexe-aybus',
    name: 'Grenouillère + Bonnet Unisexe — Motif Animal', brand: 'Aybus Baby',
    description: 'Grenouillère en coton doux avec bonnet assorti. Motif animaux adorable. Pressions-pression pour faciliter les changes. Coutures plates non irritantes. Unisexe. 0–9 mois.',
    usageTips: "Choisissez une taille au-dessus si bébé est entre deux tailles — les grenouillères se portent un peu amples. Fermez toutes les pressions avant le lavage à 30°C. Ne repassez pas directement sur le motif imprimé.",
    price: 159, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-unisexe-grenouillere-et-bonnet-bebe-blanc-aybus-baby-maroc-210x210.webp'],
    categorySlug: 'bodies-pyjamas', tags: ['grenouillere', 'naissance'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p28', slug: 'grenouillere-coton-bio-midirik-fille',
    name: 'Grenouillère Coton Bio — Fille', brand: 'Midirik',
    description: 'Grenouillère en coton 100% biologique certifié GOTS. Motif floral délicat pour fille. Fermeture zip intégrale pour les changes nocturnes. Coutures plates. Du 0 au 9 mois.',
    usageTips: "Lavez avec une lessive certifiée GOTS ou Ecocert pour préserver la certification bio du tissu. La fermeture zip double sens permet de changer bébé la nuit sans le déshabiller entièrement. Séchage à l'air libre.",
    price: 179, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2025/09/profil-lot-3-grenouilleres-fille-en-coton-biologique-midirik--210x210.webp'],
    categorySlug: 'bodies-pyjamas', tags: ['grenouillere', 'fille'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p29', slug: 'body-encolure-croisee-minisoft',
    name: 'Body à Encolure Croisée — Minisoft', brand: 'Minisoft',
    description: "Body en coton doux à encolure croisée pour faciliter l'habillage. Pressions-pression sur les jambes pour changer facilement. 0–18 mois.",
    usageTips: "L'encolure croisée s'étire pour passer facilement sur la tête de bébé. Lavage à 30°C, envers, avec les pressions fermées. Préférez des lessives sans enzymes pour les peaux sensibles.",
    price: 45, compareAt: 70,
    images: ['https://gobebe.ma/wp-content/uploads/2025/02/body-a-encolure-croisee-minisoft-BLEU-210x210.webp'],
    categorySlug: 'bodies-pyjamas', tags: ['body', 'naissance'], inStock: false, isNewArrival: false,
  },
  {
    id: 'p30', slug: 'coffret-bain-3pcs-lapin-eke-baby',
    name: 'Coffret de Bain 3 Pièces — Lapin', brand: 'Eke Baby',
    description: 'Coffret bain 3 pièces : cape de bain 100×100 cm + gant de toilette + débarbouillette. Motif lapin adorable. 100% coton doux certifié. Idéal en cadeau de naissance.',
    usageTips: "Préchauffez la cape en la posant sur un radiateur quelques minutes avant le bain. Enveloppez bébé immédiatement à la sortie de l'eau en commençant par la tête. Lavez à 60°C pour maintenir l'hygiène.",
    price: 320, compareAt: 400,
    images: ['https://gobebe.ma/wp-content/uploads/2026/02/coffret-de-bain-gris-3-pieces-motif-lapin-eke-baby-maroc-210x210.webp'],
    categorySlug: 'coffrets', tags: ['coffret', 'bain', 'cadeau'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p31', slug: 'cape-bain-premium-cygne-naf-naf',
    name: 'Cape de Bain Premium — Motif Cygne', brand: 'Naf Naf',
    description: "Cape de bain bébé en coton premium 100×100 cm. Capuche avec oreilles de cygne brodées. Douceur et absorbance optimales. Certifié Oeko-Tex. Lavable à 40°C.",
    usageTips: "Attendez quelques lavages pour que le coton atteigne sa pleine absorbance. Glissez vos mains dans la cape avant de saisir bébé à la sortie du bain — plus pratique et sécurisé. Lavage à 40°C, sans adoucissant.",
    price: 210, compareAt: 240,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/sortie-de-bain-beige-naf-naf-motif-cygne-gobebe.ma_-1-210x210.webp'],
    categorySlug: 'bain-bebe', tags: ['cape-bain', 'premium'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p32', slug: 'ensemble-garcon-3-pieces-pakel',
    name: 'Ensemble Garçon 3 Pièces — Fashion', brand: 'Pakel',
    description: 'Ensemble garçon 3 pièces à manches longues : veste, pantalon et body. Tissu doux et confortable. Coutures plates non irritantes. Idéal pour les sorties. 3–18 mois.',
    usageTips: "Lavez à 30°C, cycle délicat, à l'envers pour préserver les couleurs. Ne pas utiliser de sèche-linge. Repassez à température basse, à l'envers. Taille généreuse : commandez votre taille habituelle.",
    price: 249, compareAt: 320,
    images: ['https://gobebe.ma/wp-content/uploads/2026/03/ensemble-garcon-3-pieces-fashion-pakel-gobebe.ma_-210x210.webp'],
    categorySlug: 'ensembles', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: true,
  },
  {
    id: 'p33', slug: 'coffret-naissance-garcon-5pcs-mini-zeyn',
    name: 'Coffret Naissance Garçon 5 Pièces', brand: 'Mini Zeyn',
    description: 'Coffret naissance garçon 5 pièces : body, pyjama, bonnet, chaussons et bavoir. Coton doux certifié Oeko-Tex. Présenté en boîte cadeau. Du 0 au 3 mois.',
    usageTips: "Lavez les pièces avant la première utilisation avec une lessive douce sans parfum. Fermez les pressions du body avant de mettre en machine. Le bonnet peut être lavé à la main à l'eau tiède pour plus de douceur.",
    price: 219, compareAt: 270,
    images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-naissance-5pieces-garcon-gobebe.ma_-210x210.webp'],
    categorySlug: 'packs-naissance', tags: ['coffret', 'naissance', 'garcon'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p34', slug: 'ensemble-garcon-2-pieces-bleu-aybus',
    name: 'Ensemble Garçon 2 Pièces — Bleu', brand: 'Aybus Baby',
    description: "Ensemble confortable 2 pièces pour garçon : haut à capuche et pantalon. Molleton doux et chaud. Pressions rapides. Lavable à 30°C. 3–24 mois.",
    usageTips: "Le molleton est plus chaud après quelques lavages. Lavez à 30°C, à l'envers pour conserver l'éclat du coloris bleu. Évitez de laver avec des vêtements à fermeture Velcro qui pourraient abîmer le tissu.",
    price: 169, compareAt: null,
    images: ['https://gobebe.ma/wp-content/uploads/2026/02/ensemble-bleu-2-pieces-aybus-baby-gobebe.ma_-210x210.webp'],
    categorySlug: 'ensembles', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: false,
  },
  {
    id: 'p35', slug: 'ensemble-garcon-2-pieces-nikuby',
    name: 'Ensemble Bébé Garçon 2 Pièces — Nikuby', brand: 'Nikuby',
    description: 'Ensemble bébé garçon 2 pièces tendance : sweat imprimé et jogger assorti. Coton mélangé doux et respirant. Lavable en machine. 6–18 mois.',
    usageTips: "Lavez à 30°C, cycle délicat, à l'envers pour protéger le print. Ne pas sécher en machine. Repassez le jogger à la vapeur légère pour détendre les fibres après lavage.",
    price: 189, compareAt: 230,
    images: ['https://gobebe.ma/wp-content/uploads/2025/12/profil-ensemble-bebe-garcon-2-pieces-nikuby-1-210x210.webp'],
    categorySlug: 'ensembles', tags: ['ensemble', 'garcon'], inStock: true, isNewArrival: false,
  },
]

function getCategoryFamily(slug) {
  const children = CATEGORIES.filter((c) => c.parentSlug === slug).map((c) => c.slug)
  return [slug, ...children]
}

export function filterProducts({ category, isNew, brand, min, max, type, types, gender, age, ages, q } = {}) {
  let list = [...PRODUCTS]

  if (category) {
    const slugs = getCategoryFamily(category)
    list = list.filter((p) => slugs.includes(p.categorySlug))
  }
  if (isNew)         list = list.filter((p) => p.isNewArrival)
  if (brand)         list = list.filter((p) => p.brand.toLowerCase().includes(brand.toLowerCase()))
  if (min)           list = list.filter((p) => p.price >= Number(min))
  if (max)           list = list.filter((p) => p.price <= Number(max))
  if (type)          list = list.filter((p) => p.productType === type)
  if (types?.length) list = list.filter((p) => types.includes(p.productType))
  if (gender)        list = list.filter((p) => p.gender === gender)
  if (age)           list = list.filter((p) => p.ageRange === age)
  if (ages?.length)  list = list.filter((p) => ages.includes(p.ageRange))
  if (q) {
    const lq = q.toLowerCase()
    list = list.filter((p) =>
      p.name.toLowerCase().includes(lq) ||
      p.brand.toLowerCase().includes(lq) ||
      p.tags.some((t) => t.includes(lq))
    )
  }
  return list
}

export function getCategoryTree() {
  const parents = CATEGORIES.filter((c) => !c.parentSlug)
  return parents.map((p) => ({
    ...p,
    children: CATEGORIES.filter((c) => c.parentSlug === p.slug),
  }))
}
