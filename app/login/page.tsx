"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { signInWithGoogle, signInWithCredentials } from "./actions";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Panneau Gauche avec Image de fond */}
      <div
        className="relative lg:w-1/2 bg-cover bg-center min-h-[400px] lg:min-h-screen flex flex-col justify-between p-8 text-white"
        style={{ backgroundImage: "url('/image.png')" }}
      >
        {/* Overlay sombre vert */}
        <div className="absolute inset-0 bg-emerald-950/80" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-emerald-500 text-white font-bold px-3 py-2 rounded-lg text-sm">
            AS
          </div>
          <div>
            <h1 className="font-bold leading-none">AS PRO</h1>
            <p className="text-xs text-gray-300">Nettoyage professionnel</p>
          </div>
        </div>

        <div className="relative z-10 my-auto max-w-lg">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Des espaces de travail sains, inspirants et toujours impeccables.
          </h2>
          <blockquote className="text-sm text-gray-300 border-l-2 border-emerald-500 pl-4 py-1 italic mb-3">
            &ldquo;Grâce à AS PRO, nos bureaux sont d&apos;une propreté
            irréprochable chaque matin. Un véritable gage de sérénité pour
            nos collaborateurs.&rdquo;
          </blockquote>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Directeur des Services Généraux — Antananarivo Madagascar
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-xs text-gray-400">
          <p>© 2026 AS PRO. Tous droits réservés.</p>
          <div className="flex items-center gap-1 text-gray-300">
            <Lock className="w-3.5 h-3.5" /> Portail Sécurisé
          </div>
        </div>
      </div>

      {/* Panneau Droit - Formulaire */}
      <div className="lg:w-1/2 flex flex-col justify-between p-8 lg:p-12 bg-white">
        {/* Navigation haut */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-emerald-500 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
          <a href="#" className="hover:underline">
            Besoin d&apos;aide ?
          </a>
        </div>

        {/* Formulaire principal */}
        <div className="max-w-md w-full mx-auto my-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-500 text-white font-bold px-2 py-1 rounded text-xs">
              AS
            </div>
            <span className="font-bold text-gray-900 text-sm">
              AS PRO Portal
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Se connecter
          </h2>
          <p className="text-xs text-gray-500 mb-8">
            Accédez à votre espace client AS PRO pour gérer vos prestations,
            factures et plannings.
          </p>

          {/* Connexion Google */}
          <form action={signInWithGoogle} className="mb-5">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg text-xs transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.2v3.09C3.16 21.3 7.26 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27 14.31A7.2 7.2 0 0 1 4.9 12c0-.8.14-1.58.37-2.31V6.6H1.2A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.2 5.4l4.07-3.09z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.26 0 3.16 2.7 1.2 6.6l4.07 3.09C6.22 6.86 8.87 4.75 12 4.75z"
                />
              </svg>
              Continuer avec Google
            </button>
          </form>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-4">
              {error}
            </p>
          )}

          <form
            className="space-y-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              const formData = new FormData(e.currentTarget);
              const result = await signInWithCredentials(formData);
              if (result?.error) setError(result.error);
            }}
          >
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Adresse e-mail professionnelle
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="exemple@entreprise.com"
                  className="w-full pl-9 pr-4 py-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-medium text-gray-700">
                  Mot de passe
                </label>
                <a href="#" className="text-xs text-emerald-500 hover:underline">
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                defaultChecked
                className="rounded border-gray-300 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="remember" className="text-xs text-gray-600">
                Se souvenir de moi
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 rounded-lg text-xs transition"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">
            Vous n&apos;avez pas encore de compte client ?{" "}
            <a href="#" className="text-emerald-500 font-medium hover:underline">
              Demandez l&apos;accès
            </a>
          </p>
        </div>

        {/* Pied de page */}
        <div className="text-center text-xs text-gray-400 flex justify-center items-center gap-3">
          <span>
            Assistance technique : <strong>0346055726</strong>
          </span>
          <span>•</span>
          <span>
            <strong>aurelienjuvenal@gmail.com</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
