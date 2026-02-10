import Link from 'next/link';

export default function CookiePolicy() {
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
            Cookie <span className="text-blue-300">Policy</span>
          </h1>
          <p className="text-lg text-white/70">
            Informativa sull&apos;utilizzo dei cookie ai sensi del GDPR
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

          <h2>1. Cosa sono i Cookie</h2>
          <p>
            I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell&apos;utente, dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie permettono di memorizzare le preferenze dell&apos;utente e migliorare l&apos;esperienza di navigazione.
          </p>

          <h2>2. Titolare del Trattamento</h2>
          <div className="bg-gray-50 p-6 rounded-lg not-prose mb-6">
            <p className="mb-1"><strong>Giuseppe Sassano</strong></p>
            <p className="mb-1">Via Mario Dodaro 8 - 87040 Castrolibero (CS), Italia</p>
            <p className="mb-1">Codice Fiscale: SSSGPP58H11H703G</p>
            <p className="mb-1">Telefono: +39 392 961 9631</p>
            <p>Email: <a href="mailto:pinosassano@hotmail.com" className="text-blue-600 hover:underline">pinosassano@hotmail.com</a></p>
          </div>

          <h2>3. Tipologie di Cookie Utilizzati</h2>

          <h3>3.1 Cookie Tecnici (Necessari)</h3>
          <p>
            Questi cookie sono essenziali per il corretto funzionamento del sito web e non possono essere disattivati. Includono:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalità</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">poesong_cookie_consent</td>
                  <td className="border border-gray-300 px-4 py-2">Memorizza le preferenze sui cookie</td>
                  <td className="border border-gray-300 px-4 py-2">1 anno</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">session</td>
                  <td className="border border-gray-300 px-4 py-2">Gestione della sessione utente</td>
                  <td className="border border-gray-300 px-4 py-2">Sessione</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>3.2 Cookie Analitici</h3>
          <p>
            Questi cookie ci permettono di raccogliere informazioni su come i visitatori utilizzano il sito web, ad esempio quali pagine vengono visitate più spesso. Tutte le informazioni raccolte sono aggregate e quindi anonime.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Nome</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Fornitore</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Finalità</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Durata</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_ga</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">Distingue gli utenti</td>
                  <td className="border border-gray-300 px-4 py-2">2 anni</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">_gid</td>
                  <td className="border border-gray-300 px-4 py-2">Google Analytics</td>
                  <td className="border border-gray-300 px-4 py-2">Distingue gli utenti</td>
                  <td className="border border-gray-300 px-4 py-2">24 ore</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500">
            Nota: I cookie analitici sono attivati solo con il tuo consenso esplicito.
          </p>

          <h3>3.3 Cookie di Marketing</h3>
          <p>
            Questi cookie vengono utilizzati per tracciare i visitatori attraverso i siti web. L&apos;intenzione è quella di visualizzare annunci pertinenti e coinvolgenti per il singolo utente.
          </p>
          <p className="text-sm text-gray-500">
            Nota: Attualmente non utilizziamo cookie di marketing, ma ci riserviamo la possibilità di implementarli in futuro, sempre con il tuo consenso esplicito.
          </p>

          <h2>4. Gestione dei Cookie</h2>
          <p>
            Al primo accesso al sito, ti viene mostrato un banner che ti permette di:
          </p>
          <ul>
            <li><strong>Accettare tutti i cookie:</strong> acconsenti all&apos;utilizzo di tutti i tipi di cookie</li>
            <li><strong>Accettare solo i necessari:</strong> vengono utilizzati solo i cookie essenziali per il funzionamento del sito</li>
            <li><strong>Personalizzare le preferenze:</strong> puoi scegliere quali categorie di cookie accettare</li>
          </ul>
          <p>
            Puoi modificare le tue preferenze in qualsiasi momento cliccando sul link &quot;Gestisci Cookie&quot; presente nel footer del sito.
          </p>

          <h2>5. Disabilitazione dei Cookie tramite Browser</h2>
          <p>
            Puoi anche gestire i cookie attraverso le impostazioni del tuo browser. Di seguito i link alle istruzioni per i browser più comuni:
          </p>
          <ul>
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
          </ul>
          <p>
            <strong>Attenzione:</strong> la disabilitazione dei cookie tecnici potrebbe compromettere il corretto funzionamento del sito.
          </p>

          <h2>6. Cookie di Terze Parti</h2>
          <p>
            Alcuni cookie potrebbero essere installati da servizi di terze parti che appaiono sulle nostre pagine. Non abbiamo il controllo diretto su questi cookie. Per informazioni su come queste terze parti utilizzano i cookie, consulta le rispettive policy:
          </p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          </ul>

          <h2>7. Trasferimento dei Dati</h2>
          <p>
            Alcuni cookie di terze parti potrebbero comportare il trasferimento di dati verso paesi al di fuori dell&apos;Unione Europea. In tal caso, il trasferimento avviene nel rispetto delle garanzie previste dal GDPR (es. clausole contrattuali standard, decisioni di adeguatezza).
          </p>

          <h2>8. I Tuoi Diritti</h2>
          <p>
            Ai sensi del GDPR, hai il diritto di accedere ai tuoi dati, rettificarli, cancellarli, limitarne il trattamento, opporti al trattamento e alla portabilità. Per esercitare questi diritti, contattaci all&apos;indirizzo <a href="mailto:pinosassano@hotmail.com">pinosassano@hotmail.com</a>.
          </p>
          <p>
            Per maggiori informazioni sui tuoi diritti, consulta la nostra <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>

          <h2>9. Modifiche alla Cookie Policy</h2>
          <p>
            Questa Cookie Policy può essere modificata in qualsiasi momento. Ti invitiamo a consultare periodicamente questa pagina per essere informato su eventuali aggiornamenti.
          </p>

          <h2>10. Contatti</h2>
          <p>
            Per qualsiasi domanda relativa a questa Cookie Policy, puoi contattarci a:
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
