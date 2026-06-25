import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lo spettacolo | PoeSong',
  description: 'Poesong è una forma poetica contemporanea che orchestra i versi attraverso sonorità generate con l\'Intelligenza Artificiale. Scopri lo spettacolo di Pino Sassano.',
  alternates: {
    canonical: 'https://poesong.it/lo-spettacolo',
  },
  openGraph: {
    title: 'Lo spettacolo | PoeSong',
    description: 'Poesong è una forma poetica contemporanea che orchestra i versi attraverso sonorità generate con l\'Intelligenza Artificiale.',
    url: 'https://poesong.it/lo-spettacolo',
  },
};

export default function LoSpettacolo() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
            Lo <span className="text-blue-300">spettacolo</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg sm:text-xl">
            Un viaggio in parole, suoni e immagini
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#1e3a5f]"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* Evento prossimo */}
      <section className="relative overflow-hidden bg-[#1e3a5f]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <span className="text-orange-300 text-sm font-semibold uppercase tracking-widest">Prossimo appuntamento</span>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Date/place info */}
              <div className="md:col-span-1 space-y-6">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Data</p>
                  <p className="text-white font-bold text-2xl">29 giugno 2026</p>
                  <p className="text-white/70">Lunedì, ore 21:00</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Luogo</p>
                  <p className="text-white font-semibold">Libreria Mondadori</p>
                  <p className="text-white/70">Cosenza</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Evento</p>
                  <p className="text-white/70">Cosenza Vive – Notte d&apos;Estate</p>
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Durata</p>
                  <p className="text-white/70">circa 50 minuti</p>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-5 text-white/80 text-lg leading-relaxed">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  &ldquo;Prova aperta&rdquo; della <span className="text-[#5b9bd5]">Poesong</span>
                </h2>
                <p>
                  Lunedì 29 giugno, ore 21:00, alla Mondadori di Cosenza si svolgerà una <strong className="text-white">&ldquo;prova aperta&rdquo;</strong> dimostrativa dedicata alla Poesong.
                </p>
                <p>
                  La poesong è una forma espressiva che ha al centro un testo poetico da leggere ascoltando i versi svelati dalla musica. Il tema della prova aperta è la <strong className="text-[#5b9bd5]">narrazione del viaggio</strong>.
                </p>
                <p>
                  La serata prevede la proiezione dei testi e la diffusione sonora di <strong className="text-white">12 poesong</strong>.
                </p>
                <p className="text-white/60 text-base italic">
                  La &ldquo;prova aperta&rdquo; anticipa lo spettacolo previsto per il prossimo autunno.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#152d4a]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Note generali */}
      <section className="relative overflow-hidden bg-[#152d4a]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Note generali <span className="text-[#5b9bd5]">sullo spettacolo</span>
          </h2>
          <div className="w-16 h-1 bg-[#5b9bd5] rounded-full mb-12" />

          <div className="space-y-7 text-white/80 text-lg leading-relaxed">
            <p>
              Viviamo un tempo in cui le parole si moltiplicano, si accumulano, si rincorrono, si sovrappongono, ma sempre più raramente riescono davvero a dire. Allo stesso modo, le immagini scorrono senza tregua davanti ai nostri occhi, con una velocità che finisce per svuotare l&apos;immaginario, anziché nutrirlo.
            </p>
            <p>
              Si apre così una frattura: tra l&apos;eccesso di parole e il senso del discorso, tra l&apos;eccesso di immagini e la possibilità stessa di immaginare. Una frattura che non riguarda solo il linguaggio, ma la nostra esperienza del mondo.
            </p>
            <p>
              La <strong className="text-[#5b9bd5]">poesong</strong> nasce dentro questa tensione. È una forma poetica contemporanea che orchestra i versi attraverso sonorità generate con l&apos;Intelligenza Artificiale, seguendo ritmi già presenti nelle parole. È un esperimento, ma soprattutto un tentativo di attraversamento. Perché comunicare non significa soltanto trasmettere contenuti, ma raccontare un&apos;esperienza.
            </p>
            <p>
              E ogni esperienza, per esistere davvero, ha bisogno di un tempo, di uno spazio, di un passaggio. Ha bisogno, in una parola, di un <strong className="text-white">viaggio</strong>.
            </p>
            <p>
              Il viaggio come esperienza umana che, proprio perché umana, urge narrazione. Cosicché il vissuto si trasforma nel racconto di uno spostamento nella geografia, segnata da traiettorie su un territorio fuori e dentro di noi.
            </p>
            <p>
              Oggi le nostre narrazioni, quelle che ci rappresentano, passano attraverso contatti, profili e comunicazioni in cui è facile mostrarsi per come si vuole apparire. È invece più difficile esporsi nella verità delle proprie contraddizioni, entrare in relazione autentica, accettare il confronto e le incongruenze del nostro viaggio.
            </p>
            <p>
              Questo spettacolo prova a raccontarlo in un dialogo tra <strong className="text-[#5b9bd5]">umano e macchina</strong>, tra intenzione e possibilità, tra parola e suono, traiettoria e direzione. La poesia dà il verso, appunto, la rotta. Mentre la musica composta con l&apos;Intelligenza Artificiale, così come le voci, sono strumenti di navigazione nel mare di parole, suoni, immagini in burrasca.
            </p>
            <p>
              In una tempesta dove le poesong provano a riaprire uno spazio per sostare nelle parole, per ascoltare, per riconoscere e riconoscersi nell&apos;incontro.
            </p>
            <p>
              Un viaggio che l&apos;autore, in Tunisia, associa a quello dei pittori <strong className="text-white">Paul Klee, August Macke, Alexandre Roubtzoff</strong>, i cui dipinti rielaborati scorrono sullo schermo durante lo spettacolo. Un viaggio che trova in quella terra — passaggio d&apos;Africa — un luogo in cui l&apos;esperienza può ancora diventare racconto, può ancora avere senso.
            </p>
            <p className="text-white/90 italic text-xl font-light border-l-4 border-[#5b9bd5] pl-6">
              Poesong nasce qui: nel tentativo di ricucire, anche per frammenti, la distanza tra parola e significato, tra immagine e immaginario. È un invito. Un invito a rimettersi in viaggio.
            </p>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-[#0f1f35]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* Credits */}
      <section className="relative overflow-hidden bg-[#0f1f35]">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-10">
            Il <span className="text-[#5b9bd5]">team</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Testi e musiche', name: 'Pino Sassano' },
              { role: 'Voci di sintesi', name: 'Pino Sassano' },
              { role: 'Voce e presenza narrante', name: 'Marisa Casciaro' },
              { role: 'Elaborazioni grafiche e proiezioni', name: 'Laura De Vita' },
              { role: 'Disposizione scenica', name: 'Nando Pace' },
              { role: 'Interviene', name: 'Leon Pantarei' },
            ].map(({ role, name }) => (
              <div
                key={role}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-colors"
              >
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{role}</p>
                <p className="text-white font-semibold text-lg">{name}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-r from-[#2193b0] to-[#6dd5ed]"
          style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }}
        />
      </section>

      {/* CTA */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ascolta le poesong
          </h3>
          <p className="text-lg text-white/85 leading-relaxed mb-10">
            Immergiti nelle composizioni di Pino Sassano: poesia, musica generata dall&apos;intelligenza artificiale e immagini in un unico viaggio.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/gazaladra"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Ascolta l&apos;album
            </a>
            <a
              href="/singoli"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-white/30"
            >
              Scopri i singoli
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 w-full h-20 bg-gray-50"
          style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}
        />
      </section>

      <div className="h-0 bg-gray-50" />
    </div>
  );
}
