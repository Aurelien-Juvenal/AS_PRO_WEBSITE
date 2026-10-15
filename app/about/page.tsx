import { Sparkles, Lock, Zap, Leaf } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
  {
    icon: Sparkles,
    title: "Qualité d'Exception",
    description:
      "Nous ne laissons rien au hasard. Chaque recoin est inspecté et nettoyé selon un cahier des charges rigoureux.",
  },
  {
    icon: Lock,
    title: "Fiabilité Totale",
    description:
      "Nos équipes sont ponctuelles, discrètes et de confiance. Vous pouvez vous concentrer sur votre activité en toute sérénité.",
  },
  {
    icon: Zap,
    title: "Réactivité Maximale",
    description:
      "Un imprévu ? Un besoin urgent de désinfection ? Nos équipes mobiles interviennent rapidement pour résoudre vos urgences.",
  },
  {
    icon: Leaf,
    title: "Éco-Responsabilité",
    description:
      "Nous utilisons exclusivement des produits certifiés écolabel et adoptons des processus stricts de réduction des déchets.",
  },
];

const stats = [
  { value: "10+", label: "Années d'expérience" },
  { value: "500+", label: "Clients professionnels réguliers" },
  { value: "98%", label: "Taux de satisfaction client" },
  { value: "150+", label: "Agents qualifiés sur le terrain" },
];

export default function AboutPage() {
  return (
    <>
      <Header active="about" variant="bordered" />

      {/* Hero Histoire & Mission */}
      <section id="mission" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
            NOTRE HISTOIRE & MISSION
          </span>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-3 mb-6 uppercase leading-tight">
            Des espaces sains pour des esprits sereins
          </h2>

          <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
            <p>
              Depuis notre création, AS PRO s&apos;impose comme le partenaire
              de confiance des entreprises, commerces et copropriétés pour un
              entretien d&apos;excellence. Nous pensons que la propreté est le
              premier vecteur de bien-être au travail.
            </p>
            <p>
              Fondée sur des valeurs de rigueur, d&apos;écoute et
              d&apos;engagement environnemental, notre entreprise intervient
              quotidiennement pour transformer vos locaux en cadres de vie
              accueillants, hygiéniques et productifs. Nous formons
              continuellement nos agents aux techniques les plus exigeantes de
              l&apos;entretien moderne.
            </p>
            <p>
              Qu&apos;il s&apos;agisse de bureaux de haut standing, de
              surfaces commerciales à fort trafic ou de résidences communes,
              nous apportons une réponse sur-mesure, rapide et rigoureuse à
              chaque besoin spécifique de désinfection et de propreté.
            </p>
          </div>
        </div>

        <div>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Bureaux modernes"
            className="rounded-3xl shadow-xl w-full h-[400px] object-cover"
          />
        </div>
      </section>

      {/* Charte d'engagement */}
      <section id="valeurs" className="scroll-mt-24 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
              NOTRE CHARTE D&apos;ENGAGEMENT
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2 mb-3">
              Les Valeurs Qui Nous Animent
            </h3>
            <p className="text-xs text-gray-500">
              Chez AS PRO, notre réputation s&apos;est bâtie sur quatre
              principes fondamentaux partagés par l&apos;ensemble de nos
              collaborateurs sur le terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-2">
                  {title}
                </h4>
                <p className="text-xs text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques Chiffrées */}
      <section id="chiffres" className="scroll-mt-24 bg-emerald-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <span className="text-4xl lg:text-5xl font-black text-emerald-400">
                {value}
              </span>
              <p className="text-xs text-gray-300 mt-2">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
