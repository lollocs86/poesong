import Link from 'next/link';
import Image from 'next/image';
import { albums } from '@/data/albums';

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image - Poetry & Music theme */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=2070"
            alt="Piano keys and music"
            fill
            className="object-cover blur-[2px] scale-105"
            priority
          />
        </div>

        {/* Dark overlay with blue tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/85 via-[#2563eb]/80 to-[#3b82f6]/75" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6">
            Poe<span className="text-blue-300">Song</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
            Ci sono storie che vibrano appena sotto la superficie del quotidiano, parole non dette che pesano nell&apos;aria e ritmi che battono al passo con le nostre.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/gazaladra"
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Ascolta Gaza Ladra
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full backdrop-blur-sm transition-all border border-white/30"
            >
              Scopri di più
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white/60 animate-bounce z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>

        {/* Diagonal separator bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
      </section>

      {/* Cos'è PoeSong Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-white">
        {/* Diagonal top - dark blue entering */}
        <div className="absolute top-0 right-0 w-full h-48 bg-[#1e3a5f]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />

        {/* Main background */}
        <div className="absolute inset-0 top-24 bg-[#1e3a5f]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Logo/Icon Side */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="relative w-72 h-80">
                <svg viewBox="0 0 200 250" className="w-full h-full">
                  <ellipse cx="85" cy="95" rx="55" ry="75" fill="none" stroke="#5b9bd5" strokeWidth="10"/>
                  <line x1="55" y1="55" x2="85" y2="85" stroke="#5b9bd5" strokeWidth="8" strokeLinecap="round"/>
                  <line x1="85" y1="85" x2="65" y2="105" stroke="#5b9bd5" strokeWidth="8" strokeLinecap="round"/>
                  <circle cx="105" cy="175" r="55" fill="#5b9bd5"/>
                  <circle cx="105" cy="175" r="18" fill="#1e3a5f"/>
                  <circle cx="105" cy="175" r="6" fill="#5b9bd5"/>
                  <circle cx="105" cy="175" r="35" fill="none" stroke="#1e3a5f" strokeWidth="1" opacity="0.3"/>
                  <circle cx="105" cy="175" r="45" fill="none" stroke="#1e3a5f" strokeWidth="1" opacity="0.3"/>
                  <path d="M55 195 Q30 220 55 245" fill="none" stroke="#5b9bd5" strokeWidth="5" opacity="0.7"/>
                  <path d="M42 188 Q10 220 42 252" fill="none" stroke="#5b9bd5" strokeWidth="4" opacity="0.5"/>
                </svg>
              </div>
            </div>

            {/* Text Side */}
            <div className="text-white order-1 lg:order-2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8">
                Cos&apos;è <span className="text-[#5b9bd5]">PoeSong</span>
              </h2>
              <p className="text-lg lg:text-xl leading-relaxed text-white/85">
                Ci sono storie che vibrano appena sotto la superficie del quotidiano, parole non dette che pesano nell&apos;aria e ritmi che battono al passo con le nostre inquietudini. In un&apos;epoca assordata dal rumore di fondo, noi scegliamo di tender l&apos;orecchio. Nasce così PoeSong, un laboratorio creativo dove la poesia si fa megafono e la musica diventa la cassa di risonanza delle questioni che definiscono il nostro tempo. Un invito a trasformare l&apos;urgenza del presente nella colonna sonora del futuro.
              </p>
            </div>
          </div>
        </div>

        {/* Diagonal separator bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[#2193b0]" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      </section>

      {/* Gaza Ladra Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background with subtle geometric pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2193b0] to-[#6dd5ed]" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Dove le parole della cronaca si fermano,
          </h2>
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-12">
            assordate dal frastuono e accecate dalla polvere, inizia il nostro canto. Queste non sono solo poesie; sono i sussurri raccolti tra le macerie, le ninne nanne mai finite, le preghiere laiche levate al cielo di Gaza. Le abbiamo vestite di musica non per coprire il dolore, ma per permettergli di viaggiare oltre i confini del filo spinato e dell&apos;indifferenza. Ogni nota è un passo tra le rovine, ogni verso un tentativo di restituire un nome e una storia ai silenzi. Questo è un requiem per ciò che è stato perso e un inno alla vita che, ostinatamente, resiste.
          </p>
          <Link
            href="/gazaladra"
            className="inline-block px-10 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold rounded-full transition-all hover:scale-105 border border-white/40 uppercase tracking-wider text-sm"
          >
            Vai all&apos;album
          </Link>
        </div>

        {/* Diagonal separator bottom */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[#4facfe]" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />
      </section>

      {/* Author Section */}
      <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4facfe] to-[#00f2fe]" />

        <div className="relative max-w-3xl mx-auto">
          <div className="space-y-5 text-white/90 italic text-lg lg:text-xl leading-relaxed">
            <p>
              Da un po&apos; di tempo mi diverto a scrivere &quot;poesong&quot;.
            </p>
            <p>
              Sono dei versi dove il suono e il ritmo delle parole e delle frasi si trasformano naturalmente in stili musicali che sono già dentro il testo. Non sono vere e proprie canzoni, perché non hanno una struttura fissa, ma sono, appunto, &quot;poesong&quot;.
            </p>
            <p>
              Per la musica, al momento, interagisco con l&apos;AI di <a href="https://suno.ai" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 underline decoration-white/50">Suno</a>, che uso anche per scegliere le voci degli interpreti.
            </p>
            <p>
              L&apos;ideale sarebbe ascoltare i brani leggendo i testi. Entrambi si possono scaricare gratuitamente.
            </p>
            <p>
              Consiglio delle cuffie o una cassa esterna per un audio migliore.
            </p>
            <p>
              Esplorando il sito si può scoprire come funziona e perché faccio tutto questo.
            </p>
            <p>
              Il tutto è ancora un &quot;cantiere aperto&quot;, quindi opinioni e consigli saranno più che preziosi per migliorarlo.
            </p>
            <div className="pt-10 not-italic">
              <p className="text-white/70">Hammamet, 15 dicembre 2025</p>
              <p className="font-semibold text-white mt-2 text-xl">Pino Sassano</p>
            </div>
          </div>
        </div>

        {/* Diagonal separator bottom */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gray-50" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 100%)' }} />
      </section>

      {/* Albums Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">I Nostri Album</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Esplora la nostra collezione musicale e scopri i suoni che raccontano storie uniche.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {albums.map((album) => (
              <Link
                key={album.id}
                href={`/${album.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden">
                  {album.coverUrl ? (
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-violet-600 to-orange-500 flex items-center justify-center">
                      <svg className="w-24 h-24 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{album.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{album.artist}</p>
                  <p className="text-gray-400 text-sm">{album.tracks.length} brani • {album.releaseYear}</p>
                </div>
              </Link>
            ))}

            {/* Placeholder for more albums */}
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg flex items-center justify-center aspect-square">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Nuovi album in arrivo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
