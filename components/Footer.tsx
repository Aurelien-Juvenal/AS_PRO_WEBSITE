import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Linkedin, Instagram, Twitter } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 text-xs text-gray-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-emerald-500 text-white font-bold px-2 py-1 rounded text-xs">
              AS
            </div>
            <span className="font-bold text-gray-900">AS PRO</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Votre agence de propreté haut de gamme. Des solutions de nettoyage
            fiables et éco-responsables pour valoriser votre image de marque
            et prendre soin de vos équipes.
          </p>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-3">
            Raccourcis
          </h5>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-emerald-500">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-emerald-500">
                Services
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-500">
                À propos de nous
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-3">
            Contact & Support
          </h5>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-emerald-500" /> 03 46 05 57
              26
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-emerald-500" />{" "}
              aurelienjuvenal@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" /> 12 Rue de la
              Révolution, Paris
            </li>
          </ul>
        </div>

        <div>
          <h5 className="font-bold text-gray-900 uppercase tracking-wider mb-3">
            Réseaux Sociaux
          </h5>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <div>© 2026 AS PRO. Tous droits réservés.</div>
        <div>Mentions légales • CGU</div>
      </div>
    </footer>
  );
}
