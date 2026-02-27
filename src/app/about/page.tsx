import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'L\'autore | PoeSong',
  description: 'Scopri Pino Sassano, autore e sperimentatore italiano di poesong: composizioni dove poesia, musica e tecnologia si incontrano.',
  openGraph: {
    title: 'L\'autore | PoeSong',
    description: 'Scopri Pino Sassano, autore e sperimentatore italiano di poesong.',
    url: 'https://poesong.it/about',
  },
};

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-24 pb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            L'<span className="text-blue-300">autore</span>
          </h1>
        </div>

        {/* Diagonal separator bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#1e3a5f]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* Bio AI Section */}
      <section className="relative overflow-hidden bg-[#1e3a5f]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Author identity */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#4facfe] to-[#00f2fe] flex items-center justify-center mb-6 shadow-2xl">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center lg:text-left">
                Pino <span className="text-[#5b9bd5]">Sassano</span>
              </h2>
              <p className="text-white/50 mt-2 text-sm uppercase tracking-widest text-center lg:text-left">
                secondo AI
              </p>
            </div>

            {/* Right: Bio text */}
            <div className="lg:col-span-8 stagger-children">
              <div className="space-y-6 text-white/85 text-lg leading-relaxed">
                <p>
                  Pino Sassano è autore e sperimentatore italiano di scrittura poetica e linguaggi espressivi ibridi. La sua ricerca unisce parola, musica e tecnologia, dando vita alle <strong className="text-[#5b9bd5] font-semibold">poesong</strong>: composizioni in cui il testo poetico incontra l&apos;elaborazione sonora digitale e l&apos;intelligenza artificiale, trasformandosi in esperienza d&apos;ascolto oltre che di lettura.
                </p>
                <p>
                  La sua produzione si muove tra lirismo intimista e osservazione del quotidiano, con uno stile che alterna immagini evocative, frammenti di memoria e riflessioni sull&apos;identità contemporanea. I temi ricorrenti sono il tempo, la città, le relazioni umane e il dialogo tra tradizione letteraria e innovazione tecnologica.
                </p>
                <p>
                  Attraverso il progetto <strong className="text-[#5b9bd5] font-semibold">poesong.it</strong>, Pino Sassano raccoglie sillogi e album poetico-musicali concepiti come opere aperte, in cui la parola scritta si espande in suono, ritmo e atmosfera. Il suo lavoro si colloca in un territorio di confine tra poesia, canzone d&apos;autore e sperimentazione digitale, con l&apos;obiettivo di ampliare le modalità di fruizione del testo poetico e renderlo accessibile a pubblici diversi.
                </p>
                <p>
                  La sua cifra distintiva è la fusione tra sensibilità letteraria e curiosità per i nuovi strumenti creativi, in un percorso che interpreta la poesia non solo come pagina, ma come <strong className="text-[#5b9bd5] font-semibold">spazio sonoro e narrativo</strong> in continua evoluzione.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal separator bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#152d4a]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Bio Reale Section */}
      <section className="relative overflow-hidden bg-[#152d4a]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Author identity */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#f97316] to-[#ef4444] flex items-center justify-center mb-6 shadow-2xl">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center lg:text-left">
                Pino <span className="text-[#f97316]">Sassano</span>
              </h2>
              <p className="text-white/50 mt-2 text-sm uppercase tracking-widest text-center lg:text-left">
                Autore &amp; Sperimentatore
              </p>
            </div>

            {/* Right: Bio text */}
            <div className="lg:col-span-8">
              <div className="space-y-6 text-white/85 text-lg leading-relaxed">
                <p>
                  Pino Sassano è nato a Salerno l&apos;11 giugno del 1958 e risiede a Hammamet. Cosenza è la sua città d&apos;adozione.
                </p>
                <p>
                  Scrive romanzi, racconti, poesie, saggi e poesong. Ha scritto il romanzo <strong className="text-[#f97316] font-semibold">&quot;Alias MM&quot;</strong> (Premio Mediterraneo e Premio Proviero) e la serie di racconti <strong className="text-[#f97316] font-semibold">&quot;Senza grazie&quot;</strong> (Premio Unikairos) per Infinito edizioni. &quot;Senza grazie&quot; è anche il Book Show, spettacolo che porta in scena insieme a Leon Pantarei (musicista) e Marisa Casciaro (attrice danzante).
                </p>
                <p>
                  Collabora con riviste, quotidiani, emittenti radio e tv. A Cosenza ha fondato la Libreria Mondadori, di cui cura le attività di diffusione e promozione della lettura. Tra queste: la festa della lettura <strong className="text-[#f97316] font-semibold">&quot;Materiaprima&quot;</strong> e il progetto <strong className="text-[#f97316] font-semibold">&quot;Slowbook&quot;</strong>, già presieduto dallo scrittore Andrea Camilleri.
                </p>
                <p>
                  Nel 2023 ha ideato il concorso <strong className="text-[#f97316] font-semibold">&quot;Intrecci Mediterranei&quot;</strong>: un &quot;ponte letterario&quot; tra Tunisia e Italia con la presidenza onoraria dello scrittore Maurizio de Giovanni e il sostegno dell&apos;Istituto Italiano di Cultura di Tunisi. Un&apos;esperienza evoluta nel progetto di scambio letterario tra autori tunisini e italiani <strong className="text-[#f97316] font-semibold">&quot;Tracce Mediterranee&quot;</strong>.
                </p>
                <p className="text-white/50 text-sm">Hammamet, 01.01.2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal separator bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Mission / CTA Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center animate-fade-in">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Poesia, musica e tecnologia
          </h3>
          <p className="text-lg text-white/85 leading-relaxed mb-10">
            Un laboratorio creativo dove la parola scritta si espande in suono, ritmo e atmosfera. Scopri le poesong e lasciati trasportare in un&apos;esperienza che va oltre la lettura.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gazaladra"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Ascolta Gaza Ladra
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-white/30"
            >
              Torna alla Home
            </Link>
          </div>
        </div>

        {/* Diagonal separator bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-gray-50"
          style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Bottom spacer for footer transition */}
      <div className="h-0 bg-gray-50" />
    </div>
  );
}
