import {
  Building,
  ShoppingBag,
  Factory,
  Users,
  Sun,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Building,
    id: "bureaux",
    title: "Nettoyage de bureaux",
    description:
      "Optimisez l'environnement de travail de vos collaborateurs. Nous assurons un entretien quotidien ou périodique de vos locaux administratifs pour une propreté irréprochable.",
  },
  {
    icon: ShoppingBag,
    id: "commerces",
    title: "Nettoyage de commerces",
    description:
      "Valorisez votre image de marque et offrez une expérience accueillante à vos clients. Nettoyage complet des surfaces de vente, vitrines et zones de stockage.",
  },
  {
    icon: Factory,
    id: "industriel",
    title: "Nettoyage industriel",
    description:
      "Des solutions techniques pour les environnements exigeants : usines, entrepôts et ateliers. Nettoyage des sols industriels et machines selon les normes de sécurité.",
  },
  {
    icon: Users,
    id: "espaces-communs",
    title: "Espaces communs",
    description:
      "Entretien complet des copropriétés, résidences et immeubles collectifs. Nettoyage méticuleux des halls d'entrée, cages d'escalier, ascenseurs et locaux poubelles.",
  },
  {
    icon: Sun,
    id: "vitres",
    title: "Nettoyage de vitres",
    description:
      "Une clarté optimale pour vos fenêtres, verrières, verres de sécurité et vitrines de commerces, y compris pour les accès difficiles grâce à nos équipes qualifiées.",
  },
  {
    icon: ShieldCheck,
    id: "desinfection",
    title: "Désinfection & assainissement",
    description:
      "Protocoles d'intervention rapides pour l'éradication des virus et bactéries. Traitements certifiés pour garantir une sécurité sanitaire totale de vos espaces.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-gray-50">
      <Header active="services" variant="bordered" />

      {/* Section Titre */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
          AS PRO PRESTATIONS
        </span>
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">
          Nos Services de Nettoyage
        </h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Découvrez nos spécialités de nettoyage professionnel conçues pour
          garantir la propreté, la sécurité et le bien-être au sein de vos
          espaces de travail, commerces et copropriétés.
        </p>
      </section>

      {/* Grille de Services */}
      <section className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              id={service.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition scroll-mt-24"
            >
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                {service.description}
              </p>
              <a
                href="#"
                className="text-xs font-medium text-emerald-500 flex items-center gap-1 hover:gap-2 transition-all"
              >
                En savoir plus <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="bg-brand-dark text-white rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl lg:text-3xl font-bold mb-3">
            Prêt à transformer la propreté de vos espaces ?
          </h3>
          <p className="text-gray-300 text-sm max-w-xl mx-auto mb-8">
            Obtenez rapidement une offre sans engagement. Nos équipes se
            déplacent pour évaluer précisément vos besoins et vous proposer
            un plan d&apos;entretien sur mesure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full text-sm transition"
            >
              Demander un devis gratuit
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-medium rounded-full text-sm transition"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
