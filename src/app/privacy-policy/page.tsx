import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
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
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto pt-24 pb-16 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy <span className="text-blue-300">Policy</span>
          </h1>
          <p className="text-lg text-white/70">
            Informativa sul trattamento dei dati personali ai sensi del GDPR
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        />
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto prose prose-lg prose-blue">

          <p className="text-gray-500 text-sm mb-8">Ultimo aggiornamento: Febbraio 2026</p>

          <h2>1. Titolare del Trattamento</h2>
          <p>
            Il Titolare del trattamento dei dati personali è:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg not-prose mb-6">
            <p className="mb-1"><strong>Giuseppe Sassano</strong></p>
            <p className="mb-1">Via Mario Dodaro 8 - 87040 Castrolibero (CS), Italia</p>
            <p className="mb-1">Codice Fiscale: SSSGPP58H11H703G</p>
            <p className="mb-1">Telefono: +39 392 961 9631</p>
            <p>Email: <a href="mailto:pinosassano@hotmail.com" className="text-blue-600 hover:underline">pinosassano@hotmail.com</a></p>
          </div>

          <h2>2. Tipologie di Dati Raccolti</h2>
          <p>
            Fra i Dati Personali raccolti da questo sito web, in modo autonomo o tramite terze parti, ci sono:
          </p>
          <ul>
            <li><strong>Dati di navigazione:</strong> indirizzo IP, tipo di browser, sistema operativo, pagine visitate, orari di accesso</li>
            <li><strong>Dati forniti volontariamente:</strong> nome, cognome, indirizzo email e messaggio inseriti nel form di contatto</li>
            <li><strong>Cookie:</strong> come descritto nella <Link href="/cookie-policy">Cookie Policy</Link></li>
          </ul>

          <h2>3. Finalità del Trattamento</h2>
          <p>I dati personali sono trattati per le seguenti finalità:</p>
          <ul>
            <li><strong>Rispondere alle richieste:</strong> i dati inseriti nel form di contatto sono utilizzati esclusivamente per rispondere alle tue richieste</li>
            <li><strong>Miglioramento del servizio:</strong> i dati di navigazione sono utilizzati per analisi statistiche anonime e per migliorare l&apos;esperienza utente</li>
            <li><strong>Adempimenti di legge:</strong> per adempiere ad obblighi previsti dalla legge o da autorità competenti</li>
          </ul>

          <h2>4. Base Giuridica del Trattamento</h2>
          <p>Il trattamento dei tuoi dati personali si basa su:</p>
          <ul>
            <li><strong>Consenso:</strong> per l&apos;invio di comunicazioni e per i cookie non necessari (Art. 6, par. 1, lett. a GDPR)</li>
            <li><strong>Esecuzione di un contratto:</strong> per rispondere alle tue richieste tramite il form di contatto (Art. 6, par. 1, lett. b GDPR)</li>
            <li><strong>Legittimo interesse:</strong> per garantire la sicurezza del sito web (Art. 6, par. 1, lett. f GDPR)</li>
          </ul>

          <h2>5. Modalità di Trattamento</h2>
          <p>
            Il trattamento dei dati personali viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e logiche strettamente correlate alle finalità indicate. I dati sono protetti da misure di sicurezza adeguate per prevenire accessi non autorizzati, divulgazione, modifica o distruzione non autorizzata.
          </p>

          <h2>6. Comunicazione e Diffusione dei Dati</h2>
          <p>I tuoi dati personali non saranno diffusi e potranno essere comunicati a:</p>
          <ul>
            <li>Fornitori di servizi di hosting e gestione del sito web</li>
            <li>Fornitori di servizi email per l&apos;invio di comunicazioni</li>
            <li>Autorità competenti, ove richiesto dalla legge</li>
          </ul>
          <p>I dati non saranno trasferiti al di fuori dell&apos;Unione Europea senza adeguate garanzie.</p>

          <h2>7. Periodo di Conservazione</h2>
          <p>
            I dati personali saranno conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti e comunque per un periodo non superiore a 24 mesi dalla raccolta, salvo diversi obblighi di legge.
          </p>

          <h2>8. Diritti dell&apos;Interessato</h2>
          <p>Ai sensi degli articoli 15-22 del GDPR, hai il diritto di:</p>
          <ul>
            <li><strong>Accesso:</strong> ottenere conferma dell&apos;esistenza di un trattamento e accedere ai tuoi dati</li>
            <li><strong>Rettifica:</strong> ottenere la correzione di dati inesatti o l&apos;integrazione di dati incompleti</li>
            <li><strong>Cancellazione:</strong> ottenere la cancellazione dei dati (&quot;diritto all&apos;oblio&quot;)</li>
            <li><strong>Limitazione:</strong> ottenere la limitazione del trattamento</li>
            <li><strong>Portabilità:</strong> ricevere i dati in formato strutturato e trasferirli ad altro titolare</li>
            <li><strong>Opposizione:</strong> opporti al trattamento dei tuoi dati</li>
            <li><strong>Revoca del consenso:</strong> revocare in qualsiasi momento il consenso prestato</li>
          </ul>
          <p>
            Per esercitare i tuoi diritti, puoi contattare il Titolare all&apos;indirizzo email: <a href="mailto:pinosassano@hotmail.com">pinosassano@hotmail.com</a>
          </p>

          <h2>9. Diritto di Reclamo</h2>
          <p>
            Hai il diritto di proporre reclamo all&apos;Autorità Garante per la Protezione dei Dati Personali (www.garanteprivacy.it) qualora ritenessi che il trattamento dei tuoi dati violi il GDPR.
          </p>

          <h2>10. Cookie</h2>
          <p>
            Questo sito utilizza cookie per garantire il corretto funzionamento e migliorare l&apos;esperienza di navigazione. Per informazioni dettagliate sui cookie utilizzati, consulta la nostra <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>

          <h2>11. Modifiche alla Privacy Policy</h2>
          <p>
            Il Titolare si riserva il diritto di modificare questa Privacy Policy in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. Ti invitiamo a consultare periodicamente questa pagina.
          </p>

          <h2>12. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa a questa Privacy Policy o al trattamento dei tuoi dati personali, puoi contattarci a:
          </p>
          <ul>
            <li>Email: <a href="mailto:pinosassano@hotmail.com">pinosassano@hotmail.com</a></li>
            <li>Telefono: +39 392 961 9631</li>
            <li>Indirizzo: Via Mario Dodaro 8 - 87040 Castrolibero (CS), Italia</li>
          </ul>

        </div>
      </section>

      {/* Back link */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Torna alla Home
          </Link>
        </div>
      </section>
    </div>
  );
}
