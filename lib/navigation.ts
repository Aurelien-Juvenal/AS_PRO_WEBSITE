export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavItem = {
  key: "accueil" | "services" | "about" | "contact";
  href: string;
  label: string;
  children?: NavChild[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    key: "accueil",
    href: "/",
    label: "Accueil",
  },
  {
    key: "services",
    href: "/services",
    label: "Services",
    children: [
      {
        href: "/services#bureaux",
        label: "Nettoyage de bureaux",
        description: "Entretien quotidien de vos locaux administratifs",
      },
      {
        href: "/services#commerces",
        label: "Nettoyage de commerces",
        description: "Surfaces de vente, vitrines et zones de stockage",
      },
      {
        href: "/services#industriel",
        label: "Nettoyage industriel",
        description: "Usines, entrepôts et ateliers",
      },
      {
        href: "/services#espaces-communs",
        label: "Espaces communs",
        description: "Copropriétés, résidences et immeubles collectifs",
      },
      {
        href: "/services#vitres",
        label: "Nettoyage de vitres",
        description: "Fenêtres, verrières et vitrines",
      },
      {
        href: "/services#desinfection",
        label: "Désinfection & assainissement",
        description: "Traitements certifiés anti-virus et bactéries",
      },
    ],
  },
  {
    key: "about",
    href: "/about",
    label: "À propos de nous",
    children: [
      {
        href: "/about#mission",
        label: "Notre histoire & mission",
        description: "Ce qui nous anime au quotidien",
      },
      {
        href: "/about#valeurs",
        label: "Notre charte d'engagement",
        description: "Les quatre valeurs qui nous guident",
      },
      {
        href: "/about#chiffres",
        label: "AS PRO en chiffres",
        description: "Expérience, clients et satisfaction",
      },
    ],
  },
  {
    key: "contact",
    href: "/contact",
    label: "Contact",
    children: [
      {
        href: "/contact#coordonnees",
        label: "Nos coordonnées",
        description: "Téléphone, e-mail, adresse et horaires",
      },
      {
        href: "/contact#formulaire",
        label: "Envoyer un message",
        description: "Demandez un devis en moins de 24h",
      },
    ],
  },
];
