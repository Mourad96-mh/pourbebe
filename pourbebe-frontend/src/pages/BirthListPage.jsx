import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import useCart from '../hooks/useCart'
import Button from '../components/ui/Button'
import Spinner from '../components/ui/Spinner'
import BirthListItemCard from '../components/birthlist/BirthListItemCard'
import api from '../lib/api'
import styles from './BirthListPage.module.css'

export default function BirthListPage() {
  const { shareId }  = useParams()
  const { user }     = useAuth()
  const qc           = useQueryClient()
  const addItem      = useCart((s) => s.addItem)
  const openCart     = useCart((s) => s.openCart)

  const isGuestView = Boolean(shareId)

  const { data: list, isLoading } = useQuery({
    queryKey: ['birthlist', shareId ?? 'mine'],
    queryFn: async () => {
      const res = shareId
        ? await api.get(`/birthlist/${shareId}`)
        : await api.get('/birthlist/mine')
      const raw = res.data.data
      if (!raw) return null
      return {
        ...raw,
        id: raw._id,
        items: (raw.items ?? []).map((i) => ({
          ...i,
          id:      i._id,
          product: i.productId,
        })),
      }
    },
    enabled: isGuestView ? true : !!user,
    retry:   false,
  })

  const { register, handleSubmit, reset } = useForm()

  const create = useMutation({
    mutationFn: (data) => api.post('/birthlist', data),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['birthlist', 'mine'] }); reset() },
  })

  const reserve = useMutation({
    mutationFn: ({ itemId }) =>
      api.patch(`/birthlist/${shareId}/items/${itemId}/reserve`),
    onSuccess: (_, { item, listName }) => {
      qc.invalidateQueries({ queryKey: ['birthlist', shareId] })
      addItem(item.product, 1, null, { giftListItemId: item.id, listName })
      openCart()
    },
  })

  if (isLoading) return <Spinner />

  /* ── Gate: not logged in and not a guest link ── */
  if (!isGuestView && !user) {
    return (
      <div className={styles.gate}>
        <h1 className={styles.title}>Liste de naissance</h1>
        <p className={styles.desc}>Connectez-vous pour créer ou gérer votre liste de naissance.</p>
        <a href="/connexion"><Button variant="primary">Se connecter</Button></a>
      </div>
    )
  }

  /* ── Create form: logged in but no list yet ── */
  if (!isGuestView && !list) {
    return (
      <div className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.sectionTag}>Pour les futurs parents</p>
          <h1 className={styles.title}>Ma liste de naissance</h1>
          <p className={styles.desc}>Créez votre liste et partagez-la avec vos proches.</p>

          <form className={styles.form} onSubmit={handleSubmit((d) => create.mutate(d))}>
            <div className={styles.field}>
              <label className={styles.label}>Nom de la liste</label>
              <input
                className={styles.input}
                {...register('name', { required: true })}
                placeholder="ex : Liste de naissance de Yasmine"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Date de naissance prévue</label>
              <input type="date" className={styles.input} {...register('dueDate')} />
            </div>
            <Button type="submit" variant="primary" disabled={create.isPending}>
              {create.isPending ? 'Création…' : 'Créer ma liste'}
            </Button>
          </form>
        </div>
      </div>
    )
  }

  /* ── Guest view: list not found ── */
  if (isGuestView && !list) {
    return (
      <div className={styles.gate}>
        <h1 className={styles.title}>Liste introuvable</h1>
        <p className={styles.desc}>Ce lien de liste de naissance n'existe pas ou a expiré.</p>
      </div>
    )
  }

  const items      = list.items ?? []
  const total      = items.length
  const offered    = items.filter((i) => i.purchased).length
  const reserved   = items.filter((i) => i.reserved && !i.purchased).length
  const available  = total - offered - reserved
  const progressPct = total > 0 ? Math.round((offered / total) * 100) : 0

  const shareUrl = `${window.location.origin}/liste-naissance/${list.shareId}`

  function handleOffer(item) {
    if (reserve.isPending) return
    reserve.mutate({ itemId: item.id, item, listName: list.name })
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* ── Header ── */}
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <p className={styles.sectionTag}>
              {isGuestView ? 'Liste de naissance' : 'Ma liste de naissance'}
            </p>
            <h1 className={styles.title}>{list.name}</h1>
            {list.dueDate && (
              <p className={styles.dueDate}>
                Naissance prévue le{' '}
                {new Date(list.dueDate).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            )}
          </div>

          {!isGuestView && (
            <div className={styles.share}>
              <p className={styles.shareLabel}>Lien de partage</p>
              <div className={styles.shareRow}>
                <input readOnly value={shareUrl} className={styles.shareInput} />
                <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(shareUrl)}>
                  Copier
                </Button>
              </div>
            </div>
          )}
        </header>

        {/* ── Progress ── */}
        {total > 0 && (
          <div className={styles.progress}>
            <div className={styles.progressStats}>
              {isGuestView ? (
                <>
                  <span className={styles.progressHighlight}>{available}</span>
                  <span className={styles.progressLabel}>
                    {available === 1 ? 'article disponible' : 'articles disponibles'}
                  </span>
                  {reserved > 0 && (
                    <span className={styles.progressMuted}> · {reserved} réservé{reserved > 1 ? 's' : ''}</span>
                  )}
                </>
              ) : (
                <>
                  <span className={styles.progressHighlight}>{offered}</span>
                  <span className={styles.progressLabel}> sur {total} articles offerts</span>
                </>
              )}
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        {/* ── Items grid ── */}
        {items.length > 0 ? (
          <div className={styles.grid}>
            {items.map((item) => (
              <BirthListItemCard
                key={item.id}
                item={item}
                isGuestView={isGuestView}
                onOffer={handleOffer}
                isPending={reserve.isPending && reserve.variables?.itemId === item.id}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p className={styles.empty}>
              {isGuestView
                ? "Aucun article dans cette liste pour l'instant."
                : 'Votre liste est vide. Parcourez le catalogue et cliquez sur « Ajouter à ma liste de naissance » sur chaque produit.'}
            </p>
            {!isGuestView && (
              <Link to="/categorie/chambre">
                <Button variant="ghost">Parcourir le catalogue</Button>
              </Link>
            )}
          </div>
        )}

        {/* ── Guest gift note ── */}
        {isGuestView && items.length > 0 && (
          <div className={styles.giftNote}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="20 12 20 22 4 22 4 12" />
              <rect x="2" y="7" width="20" height="5" />
              <line x1="12" y1="22" x2="12" y2="7" />
              <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
              <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
            </svg>
            <p>
              En cliquant sur <strong>Offrir ce cadeau</strong>, l'article est réservé à votre nom et ajouté à votre panier.
              Vous pouvez choisir de le faire livrer directement aux parents lors du paiement.
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
