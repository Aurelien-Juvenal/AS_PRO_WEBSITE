"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowUpRight, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sendContactMessage } from "./actions";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="bg-gray-50">
      <Header active="contact" variant="bordered" />

      {/* En-tête de section */}
      <section className="max-w-4xl mx-auto text-center px-6 pt-16 pb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
          AS PRO PRESTATIONS
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-2 mb-4">
          Contactez-nous
        </h2>
        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          Une question ou besoin d&apos;un devis personnalisé ? Contactez
          directement notre responsable d&apos;agence pour obtenir un
          accompagnement sur-mesure et une réponse en moins de 24 heures.
        </p>
      </section>

      {/* Contenu Contact */}
      <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Coordonnées */}
        <div id="coordonnees" className="scroll-mt-24 lg:col-span-5 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Nos Coordonnées
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Retrouvez l&apos;ensemble de nos canaux de communication
              directs pour un échange fluide avec nos équipes
              professionnelles.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Téléphone direct
                </span>
                <p className="text-sm font-bold text-gray-900">
                  03 46 05 57 26
                </p>
                <p className="text-xs text-gray-500">
                  Du lundi au vendredi, de 8h à 18h
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  E-mail professionnel
                </span>
                <p className="text-sm font-bold text-gray-900">
                  aurelienjuvenal@gmail.com
                </p>
                <p className="text-xs text-gray-500">
                  Pour toutes vos demandes de devis et d&apos;assistance
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Siège social
                </span>
                <p className="text-sm font-bold text-gray-900">
                  AS PRO Propreté
                </p>
                <p className="text-xs text-gray-500">
                  12 Rue du Progrès, 75001 Paris
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Horaires d&apos;agence
                </span>
                <p className="text-sm font-bold text-gray-900">
                  Lun. - Ven. : 08:00 - 18:00
                </p>
                <p className="text-xs text-gray-500">
                  Fermé le week-end et jours fériés
                </p>
              </div>
            </div>
          </div>

          {/* Carte */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm mt-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999238321043!2d2.292292615674395!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647872322384!5m2!1sfr!2sfr"
              className="w-full h-48 border-0"
              loading="lazy"
              title="Localisation AS PRO"
            />
          </div>
        </div>

        {/* Formulaire */}
        <div id="formulaire" className="scroll-mt-24 lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            Envoyer un message
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Remplissez le formulaire ci-dessous et notre manager vous
            recontactera très rapidement.
          </p>

          {status === "sent" ? (
            <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-xl p-6 text-center">
              Merci ! Votre message a bien été envoyé. Nous vous répondrons
              sous 24 heures.
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setStatus("sending");
                setError(null);
                const formData = new FormData(e.currentTarget);
                const result = await sendContactMessage(formData);
                if (result.success) {
                  setStatus("sent");
                } else {
                  setStatus("error");
                  setError(result.error ?? "Une erreur est survenue.");
                }
              }}
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom Complet
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Ex: Jean Dupont"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Adresse E-mail
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Ex: jean.dupont@entreprise.fr"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Sujet
                </label>
                <input
                  name="subject"
                  type="text"
                  required
                  placeholder="Ex: Demande de devis pour nettoyage de bureaux"
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition bg-gray-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Votre message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Décrivez brièvement vos besoins (superficie, fréquence, spécificités)..."
                  className="w-full px-4 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 transition bg-gray-50/30 resize-none"
                />
              </div>

              {error && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === "sending" ? "Envoi en cours..." : "Envoyer le message"}
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 mt-2">
                <Shield className="w-3 h-3" /> Vos données restent
                strictement confidentielles et ne sont pas partagées.
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
