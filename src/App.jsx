import { useRef, useState } from 'react'
import './App.css'
import togetherPhoto from '../fotos/WhatsApp Image 2026-09-14 at 11.10.14 PM (2).jpeg'
import portraitPhoto from '../fotos/015a58b6-3b2a-4086-982b-761cca1edbc9.jpg'
import smilePhoto from '../fotos/WhatsApp Image 2026-09-14 at 11.10.15 PM (2).jpeg'
import greenPhoto from '../fotos/WhatsApp Image 2026-09-14 at 11.16.53 PM.jpeg'

const photos = {
  together: togetherPhoto,
  portrait: portraitPhoto,
  smile: smilePhoto,
  green: greenPhoto,
}

const pages = [
  { short: 'Inicio', title: 'Un mes contigo' },
  { short: 'Historia', title: 'Así empezó todo' },
  { short: 'Recuerdos', title: 'Pequeños grandes momentos' },
  { short: 'Una carta', title: 'Para ti, con cariño' },
  { short: 'Juego', title: 'Palabras de amor' },
]

const loveWords = [
  { word: 'AMOR', scrambled: 'ROMA', hint: 'Lo que siento por ti en cuatro letras.' },
  { word: 'BESO', scrambled: 'OSEB', hint: 'Un gesto dulce que siempre quiero repetir.' },
  { word: 'ABRAZO', scrambled: 'ZOABRA', hint: 'Ese lugar calentito donde todo está bien.' },
  { word: 'SONRISA', scrambled: 'RASIONS', hint: 'Lo que me regalas cada vez que te veo.' },
]

function App() {
  const [currentPage, setCurrentPage] = useState(0)

  const goToPage = (page) => {
    setCurrentPage(Math.max(0, Math.min(pages.length - 1, page)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#inicio" onClick={(event) => { event.preventDefault(); goToPage(0) }}>
          <span className="wordmark-heart">♥</span> tú &amp; yo
        </a>
        <span className="topbar-note">Nuestro primer mes · <span>hecho con amor</span></span>
      </header>

      <nav className="page-nav" aria-label="Páginas del aniversario">
        {pages.map((page, index) => (
          <button
            aria-current={currentPage === index ? 'page' : undefined}
            className={`nav-step ${currentPage === index ? 'is-active' : ''}`}
            key={page.short}
            onClick={() => goToPage(index)}
          >
            <span className="nav-number">0{index + 1}</span>
            <span className="nav-label">{page.short}</span>
          </button>
        ))}
      </nav>

      <section className="page-content" aria-live="polite" key={currentPage}>
        {currentPage === 0 && <WelcomePage onNext={() => goToPage(1)} />}
        {currentPage === 1 && <StoryPage onNext={() => goToPage(2)} />}
        {currentPage === 2 && <MemoriesPage onNext={() => goToPage(3)} />}
        {currentPage === 3 && <LetterPage onRestart={() => goToPage(0)} />}
        {currentPage === 4 && <LoveWordsGame />}
      </section>

      <footer className="site-footer">
        <span>Un mes, mil sonrisas y muchas historias por vivir.</span>
        <span className="footer-heart" aria-hidden="true">♥</span>
      </footer>
      <MusicPlayer />
    </main>
  )
}

function PageEyebrow({ children }) {
  return <p className="eyebrow"><span className="eyebrow-line" />{children}</p>
}

function NextButton({ children = 'Seguir leyendo', onClick }) {
  return <button className="next-button" onClick={onClick}>{children}<span aria-hidden="true">↗</span></button>
}

function WelcomePage({ onNext }) {
  return (
    <div className="welcome-page">
      <div className="welcome-copy">
        <PageEyebrow>Una pequeña celebración</PageEyebrow>
        <h1>Un mes<br />de <em>nosotros.</em></h1>
        <p className="intro-copy">Treinta días de risas, momentos bonitos y una historia que apenas comienza. Esto es para ti.</p>
        <NextButton onClick={onNext}>Abrir nuestra historia</NextButton>
        <div className="date-note"><span>✳</span> CAPÍTULO 01 <i /> 30 DÍAS JUNTOS</div>
      </div>
      <div className="welcome-art">
        <div className="photo-frame hero-frame">
          <img src={photos.together} alt="Una foto juntos para celebrar nuestro primer mes" />
        </div>
        <div className="round-stamp"><span>nuestro</span><strong>1</strong><span>mes ♡</span></div>
        <span className="scribble-heart" aria-hidden="true">♡</span>
        <span className="image-caption">un recuerdo para guardar</span>
      </div>
    </div>
  )
}

function StoryPage({ onNext }) {
  return (
    <div className="story-page">
      <div className="story-heading">
        <PageEyebrow>Capítulo uno · el comienzo</PageEyebrow>
        <h1>Todo empezó<br />por un <em>“error”.</em></h1>
        <p>No hace falta que haya pasado mucho tiempo para que alguien se vuelva especial. A veces, basta una conversación y esas ganas de seguir hablando.</p>
        <NextButton onClick={onNext}>Ver nuestros recuerdos</NextButton>
      </div>
      <div className="story-card">
        <span className="card-index">01 / 03</span>
        <div className="photo-frame story-frame">
          <img src={photos.portrait} alt="Un retrato que forma parte de nuestros recuerdos" />
        </div>
        <div className="handwritten-note">y qué lindo<br />que coincidimos <span>♡</span></div>
        <div className="story-card-bottom"><span>UNA HISTORIA QUE ES NUESTRA</span><span>✳</span></div>
      </div>
    </div>
  )
}

function MemoriesPage({ onNext }) {
  const memories = [
    { image: photos.together, alt: 'Un momento juntos', label: 'De esos momentos que se quedan' },
    { image: photos.smile, alt: 'Una sonrisa para recordar', label: 'Tu sonrisa, mi favorita' },
    { image: photos.green, alt: 'Un retrato especial', label: 'Y todas las cosas pequeñas' },
  ]

  return (
    <div className="memories-page">
      <div className="memories-heading">
        <div>
          <PageEyebrow>Capítulo dos · nuestros favoritos</PageEyebrow>
          <h1>Un álbum de<br /><em>cosas bonitas.</em></h1>
        </div>
        <p>Un mes se cuenta en días, pero se recuerda en momentos. Aquí van algunos de los nuestros.</p>
      </div>
      <div className="memory-grid">
        {memories.map((memory, index) => (
          <figure className={`memory-card memory-${index + 1}`} key={memory.label}>
            <div className="photo-frame"><img src={memory.image} alt={memory.alt} /></div>
            <figcaption><span>0{index + 1}</span>{memory.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="memories-bottom"><span>GUARDEMOS MUCHOS MÁS</span><NextButton onClick={onNext}>Una última página</NextButton></div>
    </div>
  )
}

function LetterPage({ onRestart }) {
  return (
    <div className="letter-page">
      <div className="letter-decoration" aria-hidden="true">♡</div>
      <div className="letter-paper">
        <PageEyebrow>Capítulo final · por ahora</PageEyebrow>
        <h1>Para ti, <em>siempre.</em></h1>
        <div className="letter-body">
          <p>Amor,</p>
          <p>Nos conocimos un 9 de enero por TikTok. En ese momento no me imaginaba que iba a conocerte, ni mucho menos todo lo que llegarías a significar para mí. Al principio no hablábamos demasiado, pero, poco a poco, fui descubriendo quién eras de verdad y la persona tan bonita que llevas dentro.</p>
          <p>Conocí tus virtudes, tus defectos —aunque yo siga pensando que eres perfecta— y también tus inseguridades. Cada vez te apreciaba más, te tomaba más cariño y, sin darme cuenta, te convertiste en mi amiga. Después, en mi mejor amiga y en alguien que ya no quería dejar fuera de mi vida.</p>
          <p>Yo estaba pasando por uno de los momentos más oscuros de mi vida. Me sentía hundido en el desánimo, no me soportaba y llegué a pensar que no quería seguir viviendo. Entonces llegaste tú. No como una luz al final del túnel, sino como una luz que iluminó el camino para que pudiera encontrar la salida. Gracias por acompañarme, escucharme y ayudarme a volver a mirar la vida con esperanza. Poco a poco, despertaba con más ganas de vivir, y empecé a enamorarme de todo lo que iba descubriendo: de ti y de la vida que también podía volver a disfrutar.</p>
          <p>Me enamoré de tu humildad, porque escuchas los consejos de los demás; de tu comprensión, porque sabes seguir escuchando incluso cuando alguien vuelve una y otra vez al mismo tema; y de ese deseo tan tuyo de ayudar. Admiro tu entrega a la predicación: no solo enseñas de la Biblia, también buscas distintas maneras de explicarla para que los demás puedan entender. Admiro tu amor por Jehová y que sigas dando lo mejor de ti incluso cuando estás cansada. También amo tus llantos de perrito, tu forma de decirme «te amo» y cada detalle que te hace ser tú.</p>
          <p>Cuando te sentías fea o dudabas de ti misma, yo solo quería abrazar cada una de esas inseguridades y recordarte todo el amor que mereces. Cuanto más te conocía, más me enamoraba. Llegó un momento en que supe que quería ser tu novio. Tenía miedo de arruinar nuestra amistad, pero lo que sentíamos era mutuo. Así que empecé a mostrarte cada vez más lo que había en mi corazón.</p>
          <p>Desde entonces he seguido descubriendo tus gustos y esas partes más profundas de ti, y he aprendido a quererlas también. El 15 de septiembre empezamos a ser novios, y ese día comenzó una etapa que guardo con muchísimo cariño. Hemos tenido peleas, claro, pero siempre hemos encontrado la manera de solucionarlas. Creamos esa palabra tan nuestra que describe nuestro amor: <em>tiejrbuc</em>. Te pedí matrimonio, hablamos cada vez más, elegimos nombres para nuestros futuros hijos y hasta soñamos con tener una manada. También nos convertimos en nuestros perritos y compartimos momentos tristes, como despedirnos de Kiwi, que siempre tendrá un lugar en nuestros recuerdos.</p>
          <p>Hemos sido unos cochinotes, nos hemos reído de nuestras cosas y eres la chica a la cual le dedico canciones, párrafos, pajas y lo que no tengo. Y todo eso me encanta, porque contigo puedo ser yo mismo y compartir tanto los momentos bonitos como los difíciles.</p>
          <p>Lo que más deseo es seguir siendo tu novio y que tú sigas siendo mi amiga, mi mejor amiga, mi compañera, mi amante y, algún día, mi esposa. Quiero seguir eligiéndote y acompañándote en cada etapa; celebrar tus alegrías, cuidar tu corazón y construir contigo todos esos sueños de los que hablamos.</p>
          <p>Te amo, vieja panzona, vieja mugrosa, vieja cochina; mi dueña, mi amada, mi mujer, el amor de mi vida, mi roncona, mi cagona favorita y mi chimuelita bella: <em>tiejrbuc</em>. Gracias por llegar a mi vida y llenarla de una luz que todavía me acompaña. Ojalá nos queden muchísimas páginas, canciones, abrazos y aventuras por compartir.</p>
          <p className="letter-signoff">Con todo mi amor, hoy y siempre,<br /><span>tu novio, tu amigo y tu persona favorita ♡</span></p>
        </div>
        <div className="letter-bottom"><span>DESDE EL 9 DE ENERO</span><span>Y TODO LO QUE VIENE</span></div>
      </div>
      <button className="restart-button" onClick={onRestart}>Volver a empezar <span aria-hidden="true">↺</span></button>
    </div>
  )
}

function LoveWordsGame() {
  const [round, setRound] = useState(0)
  const [answer, setAnswer] = useState('')
  const [solvedWords, setSolvedWords] = useState([])
  const [feedback, setFeedback] = useState(null)
  const isComplete = round >= loveWords.length
  const riddle = loveWords[round]

  const checkAnswer = (event) => {
    event.preventDefault()
    const normalizedAnswer = answer
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()

    if (normalizedAnswer === riddle.word) {
      setSolvedWords((words) => [...words, riddle.word])
      setFeedback({ type: 'success', text: '¡Muy bien! Esa palabra me recuerda a ti. ♥' })
      return
    }

    setFeedback({ type: 'try-again', text: 'Casi… prueba a cambiar el orden de las letras.' })
  }

  const goToNextRound = () => {
    setRound((currentRound) => currentRound + 1)
    setAnswer('')
    setFeedback(null)
  }

  const restartGame = () => {
    setRound(0)
    setAnswer('')
    setSolvedWords([])
    setFeedback(null)
  }

  return (
    <div className="game-page">
      <span className="floating-heart floating-heart-one" aria-hidden="true">♥</span>
      <span className="floating-heart floating-heart-two" aria-hidden="true">♡</span>
      <span className="floating-heart floating-heart-three" aria-hidden="true">♥</span>
      <div className="game-heading">
        <PageEyebrow>Un juego hecho con amor</PageEyebrow>
        <h1>Palabras con<br /><em>tiejrbuc.</em></h1>
        <p>Ordena las letras, adivina la palabra y descubre cuánto amor cabe en este pequeño juego.</p>
      </div>

      <section className="love-game-card" aria-live="polite">
        {isComplete ? (
          <div className="game-finish">
            <span className="finish-heart" aria-hidden="true">♥</span>
            <p className="game-progress">MISIÓN CUMPLIDA · {loveWords.length} DE {loveWords.length}</p>
            <h2>¡Ganaste mi<br /><em>corazón!</em></h2>
            <p>Resolviste todas las palabras. Mi premio favorito es tenerte en mi vida. ♡</p>
            <button className="game-button" onClick={restartGame}>Jugar otra vez <span aria-hidden="true">↻</span></button>
          </div>
        ) : (
          <>
            <div className="game-card-top">
              <span className="game-progress">RETO {String(round + 1).padStart(2, '0')} / {loveWords.length}</span>
              <span className="game-score" aria-label={`${solvedWords.length} palabras resueltas`}>
                {loveWords.map((item) => <span className={solvedWords.includes(item.word) ? 'score-heart is-filled' : 'score-heart'} key={item.word}>♥</span>)}
              </span>
            </div>
            <p className="game-instruction">¿Qué palabra se esconde aquí?</p>
            <div className="scrambled-letters" aria-label={`Letras desordenadas: ${riddle.scrambled.split('').join(', ')}`}>
              {riddle.scrambled.split('').map((letter, index) => <span className="letter-tile" key={`${letter}-${index}`}>{letter}</span>)}
            </div>
            <p className="game-hint"><span aria-hidden="true">♡</span> Pista: {riddle.hint}</p>
            <form className="answer-form" onSubmit={checkAnswer}>
              <label className="visually-hidden" htmlFor="love-word-answer">Escribe la palabra ordenada</label>
              <input
                autoComplete="off"
                disabled={feedback?.type === 'success'}
                id="love-word-answer"
                maxLength={riddle.word.length}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="Tu respuesta…"
                value={answer}
              />
              <button className="game-button" disabled={Boolean(feedback?.type === 'success')} type="submit">Comprobar <span aria-hidden="true">♡</span></button>
            </form>
            {feedback && <p className={`game-feedback ${feedback.type}`} role="status">{feedback.text}</p>}
            {feedback?.type === 'success' && (
              <button className="next-riddle-button" onClick={goToNextRound}>
                {round === loveWords.length - 1 ? 'Ver mi premio' : 'Siguiente palabra'} <span aria-hidden="true">→</span>
              </button>
            )}
          </>
        )}
      </section>
      <p className="game-footer-note"><span aria-hidden="true">♥</span> Cada respuesta correcta desbloquea otro corazoncito.</p>
    </div>
  )
}

function MusicPlayer() {
  const [audioMissing, setAudioMissing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
        setAudioMissing(false)
      } catch {
        setAudioMissing(true)
      }
      return
    }

    audio.pause()
  }

  return (
    <aside className={`music-player ${isPlaying ? 'is-playing' : ''}`} aria-label="Canción del aniversario">
      <audio
        ref={audioRef}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setAudioMissing(true)}
        preload="auto"
      >
        <source src={`${import.meta.env.BASE_URL}audio/publicaudiom-anil-emre-daldal.mp3.mp3`} type="audio/mpeg" />
        Tu navegador no puede reproducir este archivo de audio.
      </audio>
      <button
        aria-label={isPlaying ? 'Pausar M. de Anıl Emre Daldal' : 'Reproducir M. de Anıl Emre Daldal'}
        aria-pressed={isPlaying}
        className="music-toggle"
        onClick={togglePlayback}
        title={audioMissing ? 'No se pudo cargar la canción' : isPlaying ? 'Pausar canción' : 'Escuchar M.'}
        type="button"
      >
        <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '♫'}</span>
      </button>
      <span className="music-now-playing" role="status">
        {audioMissing ? 'No se pudo cargar M.' : isPlaying ? 'M. · Anıl Emre Daldal' : 'Escuchar M.'}
      </span>
    </aside>
  )
}

export default App
