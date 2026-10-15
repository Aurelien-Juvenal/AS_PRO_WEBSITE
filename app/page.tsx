import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <>
      <Header active="accueil" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Colonne Gauche - Texte */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            AS PRO
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mt-3 mb-6 uppercase">
            Bienvenue sur <br />
            notre site web
          </h2>
          <p className="text-gray-500 text-lg mb-8 max-w-md">
            Un nettoyage professionnel pour des locaux impeccables
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition shadow-sm"
            >
              Demander un devis
            </a>
            <Link
              href="/services"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-full transition"
            >
              Voir nos services
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <Check className="w-4 h-4 text-emerald-500" /> Équipe qualifiée
            <span className="text-gray-300">•</span>
            Équipement professionnel
            <span className="text-gray-300">•</span>
            Réactivité rapide
          </div>
        </div>

        {/* Colonne Droite - Image avec carte flottante */}
        <div className="relative">
          <div className="bg-gray-100 rounded-3xl p-4 overflow-hidden relative shadow-lg">
            <Image
              src="/image.png"
              alt="Équipe AS PRO"
              width={1200}
              height={860}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />

            {/* Tag flottant bas */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-4 py-2.5 rounded-full shadow-md flex items-center gap-2 text-xs font-semibold text-gray-800 whitespace-nowrap">
              <span className="text-emerald-500">✨</span>
              Nettoyage de qualité pour bureaux, commerces et espaces publics
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
