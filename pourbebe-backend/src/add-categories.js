/**
 * Adds missing navigation categories + subcategories.
 * Safe to run multiple times — skips slugs that already exist.
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import Category from './models/Category.js'

const PARENTS = [
  { slug: 'chambre',     name: 'Chambre & Sommeil' },
  { slug: 'sorties',     name: 'Sorties'            },
  { slug: 'hygiene',     name: 'Hygiène'            },
  { slug: 'vetements',   name: 'Vêtements'          },
  { slug: 'accessoires', name: 'Accessoires'        },
  { slug: 'cadeaux',     name: 'Idées Cadeaux'      },
  { slug: 'maman',       name: 'Pour Maman'         },
]

const SUBS = [
  { slug: 'lits-berceaux',   name: 'Lits & Berceaux',        parentSlug: 'chambre'     },
  { slug: 'matelas-bebe',    name: 'Matelas',                 parentSlug: 'chambre'     },
  { slug: 'literie',         name: 'Literie & Gigoteuses',    parentSlug: 'chambre'     },
  { slug: 'baby-nest',       name: 'Baby Nest & Couffins',    parentSlug: 'chambre'     },
  { slug: 'meubles-bebe',    name: 'Meubles & Rangement',     parentSlug: 'chambre'     },
  { slug: 'veilleuses',      name: 'Veilleuses & Déco',       parentSlug: 'chambre'     },
  { slug: 'poussettes',      name: 'Poussettes',              parentSlug: 'sorties'     },
  { slug: 'sieges-auto',     name: 'Sièges Auto',             parentSlug: 'sorties'     },
  { slug: 'porte-bebe',      name: 'Porte-bébé',              parentSlug: 'sorties'     },
  { slug: 'sacs-langer',     name: 'Sacs à Langer',           parentSlug: 'sorties'     },
  { slug: 'bain-bebe',       name: 'Bain',                    parentSlug: 'hygiene'     },
  { slug: 'soins-bebe',      name: 'Soins & Santé',           parentSlug: 'hygiene'     },
  { slug: 'change-couches',  name: 'Change & Couches',        parentSlug: 'hygiene'     },
  { slug: 'bodies-pyjamas',  name: 'Bodies & Pyjamas',        parentSlug: 'vetements'   },
  { slug: 'ensembles',       name: 'Ensembles',               parentSlug: 'vetements'   },
  { slug: 'packs-naissance', name: 'Packs Naissance',         parentSlug: 'vetements'   },
  { slug: 'coussins',        name: 'Coussins & Emmaillotage', parentSlug: 'accessoires' },
  { slug: 'jouets-eveil',    name: 'Jouets & Éveil',          parentSlug: 'accessoires' },
  { slug: 'bavoirs',         name: 'Bavoirs & Repas',         parentSlug: 'accessoires' },
  { slug: 'coffrets',        name: 'Coffrets Naissance',      parentSlug: 'cadeaux'     },
  { slug: 'liste-naissance', name: 'Liste de Naissance',      parentSlug: 'cadeaux'     },
  { slug: 'allaitement',     name: 'Allaitement',             parentSlug: 'maman'       },
  { slug: 'grossesse',       name: 'Grossesse & Confort',     parentSlug: 'maman'       },
]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('Connected')

  const existing = await Category.find().lean()
  const existingSlugs = new Set(existing.map((c) => c.slug))

  /* 1 — upsert parent categories */
  const parentMap = {}
  for (const p of PARENTS) {
    if (existingSlugs.has(p.slug)) {
      const found = existing.find((c) => c.slug === p.slug)
      parentMap[p.slug] = found._id
      console.log(`  skip (exists): ${p.slug}`)
    } else {
      const created = await Category.create({ ...p, parentId: null })
      parentMap[p.slug] = created._id
      console.log(`  created parent: ${p.slug}`)
    }
  }

  /* 2 — upsert subcategories */
  for (const s of SUBS) {
    if (existingSlugs.has(s.slug)) {
      console.log(`  skip (exists): ${s.slug}`)
      continue
    }
    const parentId = parentMap[s.parentSlug]
    if (!parentId) { console.warn(`  WARN: no parent for ${s.slug}`); continue }
    await Category.create({ slug: s.slug, name: s.name, parentId })
    console.log(`  created sub: ${s.slug} → ${s.parentSlug}`)
  }

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch((err) => { console.error(err); process.exit(1) })
