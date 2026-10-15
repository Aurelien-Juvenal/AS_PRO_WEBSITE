# AS PRO — Next.js

Conversion du site statique (HTML + Tailwind CDN) vers Next.js 14 (App Router) + TypeScript + Tailwind CSS.

## Structure

```
app/
  layout.tsx        # Layout racine (police Inter, styles globaux, SessionProvider)
  page.tsx           # Page d'accueil (/)
  about/page.tsx      # Page À propos (/about)
  contact/            # Page Contact (/contact) + formulaire relié à un Message en base
  globals.css         # Styles globaux + classes personnalisées
  services/
    page.tsx          # Page Services (/services)
  login/
    page.tsx           # Page de connexion (/login)
components/
  Header.tsx           # Navigation partagée (Accueil / Services / À propos / Contact)
  Footer.tsx            # Footer complet partagé
public/
  image.png             # Image de l'équipe
```

> ⚠️ Le schéma Prisma a été mis à jour (ajout du modèle `Message` pour la boîte de réception admin). Si tu avais déjà fait `npm run db:push`, relance-le après avoir tiré ces changements.


## Changements par rapport au HTML d'origine

- Le CDN Tailwind (`cdn.tailwindcss.com`) est remplacé par une installation Tailwind classique (`tailwind.config.ts`, `postcss.config.mjs`).
- Les icônes Lucide (`unpkg.com/lucide@latest` + `lucide.createIcons()`) sont remplacées par le package `lucide-react`, plus adapté à React.
- La police Google Fonts Inter est chargée via `next/font/google` au lieu d'un `@import` CSS (plus rapide, pas de flash de police).
- Les liens internes (`index.html`, `services.html`, `login.html`) sont remplacés par le composant `<Link>` de Next.js et les routes `/`, `/services`, `/login`.
- Le champ mot de passe de la page de connexion est maintenant un vrai champ contrôlé avec un bouton "afficher/masquer" fonctionnel (React state) plutôt qu'une valeur factice codée en dur.
- La navigation (en-tête) est factorisée dans un composant `Header` réutilisé sur les pages Accueil et Services.

## Authentification & espace administrateur

Structure ajoutée pour la connexion (email/mot de passe + Google) et l'espace admin :

```
auth.ts                          # Config Auth.js : providers Google + Credentials
middleware.ts                    # Protège /admin (redirige si non-admin)
types/next-auth.d.ts             # Ajoute le rôle (ADMIN/CLIENT) à la session
lib/prisma.ts                    # Client Prisma singleton
prisma/
  schema.prisma                  # Modèles : User, Account, Session, Client, Intervention
  seed.ts                        # Crée un compte admin de démarrage
app/
  api/auth/[...nextauth]/route.ts # Route Auth.js (OAuth callbacks, etc.)
  login/actions.ts                # Server actions : signIn Google / Credentials
  admin/
    layout.tsx                    # Sidebar + protection (rôle vérifié par le middleware)
    page.tsx                      # Tableau de bord (stats)
    clients/                      # Liste + création de clients
    services/                     # Historique des prestations + changement de statut
    messages/                      # Messages reçus via le formulaire /contact (marquer comme lu)
```

### Formulaire de contact → boîte de réception admin

Le formulaire sur `/contact` enregistre chaque envoi comme un `Message` en base (`app/contact/actions.ts`). Ces messages apparaissent en temps réel dans `/admin/messages`, avec un badge de compteur non-lus dans la sidebar admin et sur le tableau de bord.

### Mise en place

1. **Base de données** — renseigne `DATABASE_URL` dans `.env` (copie `.env.example`). N'importe quelle base PostgreSQL fonctionne (Neon, Supabase, Railway, local...).
2. **Google OAuth** — crée un ID client OAuth 2.0 sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials), avec comme URI de redirection : `http://localhost:3000/api/auth/callback/google`. Renseigne `GOOGLE_CLIENT_ID` et `GOOGLE_CLIENT_SECRET`.
3. **Secret Auth.js** — génère une valeur avec `npx auth secret` et renseigne `AUTH_SECRET`.
4. **Schéma + compte admin** :
   ```bash
   npm install
   npm run db:push     # crée les tables à partir du schema.prisma
   npm run db:seed     # crée un compte admin (email/mot de passe dans .env)
   ```
5. Connecte-toi sur `/login` avec le compte admin créé, puis accède à `/admin`.

### Comment ça fonctionne

- **Connexion Google** : bouton "Continuer avec Google" → `signIn("google")` → Auth.js crée/relie automatiquement l'utilisateur via `PrismaAdapter`. Rôle par défaut : `CLIENT`.
- **Connexion classique** : formulaire email/mot de passe → provider `Credentials`, mot de passe vérifié avec `bcryptjs`.
- **Rôles** : chaque `User` a un rôle `ADMIN` ou `CLIENT`, stocké en base et injecté dans la session via les callbacks `jwt`/`session` dans `auth.ts`.
- **Protection de `/admin`** : `middleware.ts` vérifie la session à chaque requête vers `/admin/*` ; redirige vers `/login` si non connecté, vers `/` si connecté mais pas admin.
- **Gestion des clients et prestations** : pages admin en Server Components (lecture directe via Prisma) + Server Actions pour créer/modifier (`app/admin/clients/actions.ts`, `app/admin/services/actions.ts`) — pas d'API REST à écrire séparément.

Pour promouvoir un utilisateur Google en admin : modifie son `role` en `ADMIN` directement en base (ou via `npm run db:studio`, qui ouvre une interface Prisma pour éditer les données).

## Installation et lancement

```bash
npm install
npm run dev
```

Puis ouvrez [http://localhost:3000](http://localhost:3000).

## Build de production

```bash
npm run build
npm run start
```
