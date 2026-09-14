import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Eventi | PoeSong',
  description: 'Poesong in scena al Cine-Teatro Universal di Cosenza: sabato 3 e domenica 4 ottobre 2026. Testi, musiche e voci di sintesi di Pino Sassano.',
  alternates: {
    canonical: 'https://poesong.it/eventi',
  },
  openGraph: {
    title: 'Eventi | PoeSong',
    description: 'Poesong in scena al Cine-Teatro Universal di Cosenza: sabato 3 e domenica 4 ottobre 2026.',
    url: 'https://poesong.it/eventi',
  },
};

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1C3mSuJgpE/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/poesong_?stkn=Z3BuMWcxcTZreWFz',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2c-2.72 0-3.06.01-4.12.06-1.06.05-1.79.22-2.43.47a4.9 4.9 0 0 0-1.77 1.15 4.9 4.9 0 0 0-1.15 1.77c-.25.64-.42 1.37-.47 2.43C2.01 8.94 2 9.28 2 12s.01 3.06.06 4.12c.05 1.06.22 1.79.47 2.43a4.9 4.9 0 0 0 1.15 1.77 4.9 4.9 0 0 0 1.77 1.15c.64.25 1.37.42 2.43.47C8.94 21.99 9.28 22 12 22s3.06-.01 4.12-.06c1.06-.05 1.79-.22 2.43-.47a4.9 4.9 0 0 0 1.77-1.15 4.9 4.9 0 0 0 1.15-1.77c.25-.64.42-1.37.47-2.43.05-1.06.06-1.4.06-4.12s-.01-3.06-.06-4.12c-.05-1.06-.22-1.79-.47-2.43a4.9 4.9 0 0 0-1.15-1.77 4.9 4.9 0 0 0-1.77-1.15c-.64-.25-1.37-.42-2.43-.47C15.06 2.01 14.72 2 12 2Zm0 1.8c2.67 0 2.99.01 4.04.06.98.04 1.5.21 1.86.35.47.18.8.4 1.15.75.35.35.57.68.75 1.15.14.36.31.88.35 1.86.05 1.05.06 1.37.06 4.04s-.01 2.99-.06 4.04c-.04.98-.21 1.5-.35 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.14-.88.31-1.86.35-1.05.05-1.37.06-4.04.06s-2.99-.01-4.04-.06c-.98-.04-1.5-.21-1.86-.35a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.14-.36-.31-.88-.35-1.86-.05-1.05-.06-1.37-.06-4.04s.01-2.99.06-4.04c.04-.98.21-1.5.35-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.14.88-.31 1.86-.35C9.01 3.81 9.33 3.8 12 3.8Zm0 3.05a5.15 5.15 0 1 0 0 10.3 5.15 5.15 0 0 0 0-10.3Zm0 8.5a3.35 3.35 0 1 1 0-6.7 3.35 3.35 0 0 1 0 6.7Zm5.35-8.7a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@poesonging?si=lyvAiKJj6nZzexxf',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21.58 7.2a2.75 2.75 0 0 0-1.94-1.95C17.9 4.75 12 4.75 12 4.75s-5.9 0-7.64.5A2.75 2.75 0 0 0 2.42 7.2 28.7 28.7 0 0 0 1.93 12a28.7 28.7 0 0 0 .49 4.8 2.75 2.75 0 0 0 1.94 1.95c1.74.5 7.64.5 7.64.5s5.9 0 7.64-.5a2.75 2.75 0 0 0 1.94-1.95c.33-1.58.49-3.2.49-4.8a28.7 28.7 0 0 0-.49-4.8ZM9.9 15.02V8.98L15.5 12l-5.6 3.02Z" />
      </svg>
    ),
  },
];

export default function Eventi() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[42vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]" />

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-24 pb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            <span className="text-blue-300">Eventi</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg sm:text-xl">
            Poesong in scena al Cine-Teatro Universal
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#1e3a5f]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* Locandina + info evento */}
      <section className="relative overflow-hidden bg-[#1e3a5f]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-sm font-semibold uppercase tracking-widest">
              Prossimo appuntamento
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            {/* Locandina */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/eventi-cine-teatro-universal.jpg"
                alt="Locandina Poesong - Cine-Teatro Universal, Cosenza, 3 e 4 ottobre 2026"
                width={1131}
                height={1600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Info */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 space-y-7">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
                  Cine-Teatro <span className="text-[#5b9bd5]">Universal</span>
                </h2>
                <p className="text-white/70">Via San Francesco d&apos;Assisi, 35 — Cosenza Vecchia</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Sabato</p>
                  <p className="text-white font-bold text-xl">3 ottobre 2026</p>
                  <p className="text-white/70">ore 20:30</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Domenica</p>
                  <p className="text-white font-bold text-xl">4 ottobre 2026</p>
                  <p className="text-white/70">ore 18:30</p>
                </div>
              </div>

              <div className="space-y-4 text-white/80">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Testi originali, musiche e voci di sintesi</p>
                  <p className="text-white font-semibold">Pino Sassano</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Voce e presenza narrante</p>
                  <p className="text-white font-semibold">Marisa Casciaro</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Elaborazioni grafiche e proiezioni</p>
                  <p className="text-white font-semibold">Laura De Vita</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Disposizione scenica</p>
                  <p className="text-white font-semibold">Nando Pace</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Interviene</p>
                  <p className="text-white font-semibold">Leon Pantarei</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Info e prenotazioni</p>
                <p className="text-white/80">Cine-Teatro Universal — 347 17 973 45</p>
                <p className="text-white/80">Libreria Mondadori, Cosenza — 0984 795814</p>
              </div>

              {/* Social */}
              <div className="pt-2 border-t border-white/10">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Seguici</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#5b9bd5] text-white transition-colors duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#152d4a]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Video */}
      <section className="relative overflow-hidden bg-[#152d4a]">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Guarda <span className="text-[#5b9bd5]">l&apos;anteprima</span>
          </h2>
          <div className="w-16 h-1 bg-[#5b9bd5] rounded-full mb-12 mx-auto" />

          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            <video
              controls
              preload="metadata"
              playsInline
              className="w-full h-auto"
            >
              <source src="/videos/eventi-cine-teatro-universal.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#0f1f35]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Pendrive-vinyl card */}
      <section className="relative overflow-hidden bg-[#0f1f35]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            {/* Testo */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Il viaggio continua <span className="text-[#5b9bd5]">anche fuori dal teatro</span>
              </h2>
              <div className="w-16 h-1 bg-[#5b9bd5] rounded-full mb-8" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                Al termine dello spettacolo saranno disponibili le <strong className="text-white">pendrive-vinyl card</strong> con le musiche di PoeSong e il <strong className="text-white">booklet</strong> con i testi: parole e suoni da portare con sé, per ritrovare le atmosfere e le emozioni del viaggio anche dopo la chiusura del sipario.
              </p>

              <div className="space-y-3 text-white/80">
                <p>📅 <strong className="text-white">Sabato 3 ottobre 2026</strong> — 🕣 ore 20:30</p>
                <p>📅 <strong className="text-white">Domenica 4 ottobre 2026</strong> — 🕡 ore 18:30</p>
                <p>📍 Cine-Teatro Universal, Cosenza</p>
              </div>
            </div>

            {/* Immagine merch */}
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/eventi-pendrive-vinyl-card.jpg"
                alt="Pendrive-vinyl card e booklet PoeSong"
                width={1080}
                height={1336}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-gray-50"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      <div className="h-0 bg-gray-50" />
    </div>
  );
}
