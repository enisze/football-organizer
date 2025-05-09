import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { Button, buttonVariants } from '@/ui/button'
import {
	Bell,
	CalendarIcon,
	ChevronRight,
	Clock,
	LogIn,
	Mail,
	MapPin,
	Plus,
	Settings,
	Users,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '../shared/navigation'
import { Phone } from './Phone'

export const LandingPage = () => {
	return (
		<div className='min-h-screen bg-[#0c1021] text-gray-100'>
			{/* Hero Section */}
			<section className='relative overflow-hidden py-20 md:py-32'>
				<div className='absolute inset-0 bg-gradient-to-b from-[#5b68e3]/10 to-transparent opacity-30' />
				<div className='container relative z-10'>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
						<div className='flex flex-col justify-center space-y-6'>
							<h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
								Lokale Sportevents{' '}
								<span className='text-[#5b68e3]'>einfach finden</span> und
								teilnehmen
							</h1>
							<p className='text-lg text-gray-300'>
								Verbinde dich mit lokalen Spielern, nimm an Spielen teil, die zu
								deinem Zeitplan passen, und verpasse nie wieder ein Spiel mit
								Event Wizard - deinem persönlichen Sport-Community-Organizer.
							</p>
							<div className='flex flex-col sm:flex-row gap-4'>
								<Link
									className={buttonVariants({
										variant: 'purple',
										size: 'lg',
									})}
									href={routes.signIn()}
								>
									Heute noch mitspielen
								</Link>
								<Button
									size='lg'
									variant='outline'
									className='border-gray-700 text-gray-300 hover:bg-gray-800'
								>
									So funktioniert's <ChevronRight className='ml-2 h-4 w-4' />
								</Button>
							</div>
							<div className='flex items-center text-sm text-gray-400'>
								<Users className='mr-2 h-4 w-4 text-[#5b68e3]' />
								<span>
									Schließe dich über 5.000 aktiven Spielern in deiner Stadt an
								</span>
							</div>
						</div>
						<div className='flex justify-center'>
							<Phone />
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-20 bg-[#0a0e1c]'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Alles was du brauchst, um{' '}
						<span className='text-[#5b68e3]'>mehr zu spielen</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<CalendarIcon className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Events durchsuchen & teilnehmen
							</h3>
							<p className='text-gray-300'>
								Finde und nimm einfach an geplanten Events teil, mit
								detaillierten Informationen zu Ort, Zeit und Preis.
							</p>
						</div>

						{/* Feature 2 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<Users className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Teilnehmeranzahl</h3>
							<p className='text-gray-300'>
								Sieh, wie viele Spieler bereits an jedem Event teilnehmen und
								erscheine nie wieder auf einem leeren Spielfeld.
							</p>
						</div>

						{/* Feature 3 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<Clock className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Wöchentliche Verfügbarkeit
							</h3>
							<p className='text-gray-300'>
								Lege deine persönliche wöchentliche Verfügbarkeit fest und werde
								automatisch mit passenden Spielen gematcht.
							</p>
						</div>

						{/* Feature 4 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<Bell className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>
								Intelligente Benachrichtigungen
							</h3>
							<p className='text-gray-300'>
								Erhalte automatische Benachrichtigungen per E-Mail, wenn neue
								Spiele deinen Verfügbarkeitspräferenzen entsprechen.
							</p>
						</div>

						{/* Feature 5 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<LogIn className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Einfache Anmeldung</h3>
							<p className='text-gray-300'>
								Einfache und sichere Anmeldung über Google oder Discord - kein
								weiteres Passwort zum Merken.
							</p>
						</div>

						{/* Feature 6 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800 hover:border-[#5b68e3] transition-colors'>
							<div className='h-12 w-12 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mb-4'>
								<MapPin className='h-6 w-6 text-[#5b68e3]' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Standortbasiert</h3>
							<p className='text-gray-300'>
								Finde Events in deiner Nähe mit unserer standortbasierten Suche
								und reise nie zu weit für ein Spiel.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* App Interface Section */}
			<section id='overview' className='py-20'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Entdecke die <span className='text-[#5b68e3]'>Event Wizard</span>{' '}
						Funktionen
					</h2>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20'>
						<div className='order-2 lg:order-1 flex flex-col justify-center'>
							<h3 className='text-2xl font-bold mb-4'>
								Events durchsuchen und teilnehmen
							</h3>
							<p className='text-gray-300 mb-6'>
								Durchsuche alle verfügbaren Events mit wichtigen Details wie
								Datum, Uhrzeit, Ort und verfügbaren Plätzen. Sieh auf einen
								Blick, wie viele Spieler bereits teilnehmen und ob das Event
								noch Plätze frei hat.
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Users className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Teilnehmeranzahl in Echtzeit (z.B. 2/10)
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Clock className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Übersichtliche Zeitangaben für jedes Event
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<MapPin className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Genaue Standortinformationen für jedes Event
									</span>
								</li>
							</ul>
						</div>
						<div className='order-1 lg:order-2 flex justify-center'>
							<div className='relative'>
								<div className='absolute -top-10 -left-10 w-40 h-40 bg-[#5b68e3] rounded-full filter blur-[100px] opacity-30' />
								<Image
									src='/events.avif'
									alt='Event Wizard Events Übersicht'
									width={350}
									height={700}
									className='rounded-xl border-4 border-gray-800 shadow-2xl'
								/>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20'>
						<div className='flex justify-center'>
							<div className='relative'>
								<div className='absolute -top-10 -right-10 w-40 h-40 bg-[#5b68e3] rounded-full filter blur-[100px] opacity-30' />
								<Image
									src='/weekly.avif'
									alt='Wöchentliche Verfügbarkeit einstellen'
									width={350}
									height={700}
									className='rounded-xl border-4 border-gray-800 shadow-2xl'
								/>
							</div>
						</div>
						<div className='flex flex-col justify-center'>
							<h3 className='text-2xl font-bold mb-4'>
								Wöchentliche Verfügbarkeit festlegen
							</h3>
							<p className='text-gray-300 mb-6'>
								Verwalte deine regelmäßigen Verfügbarkeitszeiten für jede Woche.
								Markiere einfach die Zeiten, zu denen du normalerweise spielen
								kannst, und wir finden passende Events für dich.
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<CalendarIcon className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Einfache visuelle Zeitauswahl für jeden Wochentag
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Clock className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Flexible Zeitfenster von morgens bis abends
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Plus className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Erstelle neue Zeitfenster mit einem Klick
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20'>
						<div className='order-2 lg:order-1 flex flex-col justify-center'>
							<h3 className='text-2xl font-bold mb-4'>
								Datumsspezifische Verfügbarkeit
							</h3>
							<p className='text-gray-300 mb-6'>
								Lege deine Verfügbarkeit für bestimmte Tage individuell fest.
								Perfekt für Tage mit besonderen Zeitplänen oder wenn du nur zu
								bestimmten Uhrzeiten verfügbar bist.
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<CalendarIcon className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Wähle spezifische Tage im Kalender aus
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Clock className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Definiere genaue Start- und Endzeiten für deine
										Verfügbarkeit
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Settings className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Markiere Tage als komplett nicht verfügbar mit einem Klick
									</span>
								</li>
							</ul>
						</div>
						<div className='order-1 lg:order-2 flex justify-center'>
							<div className='relative'>
								<div className='absolute -top-10 -left-10 w-40 h-40 bg-[#5b68e3] rounded-full filter blur-[100px] opacity-30' />
								<Image
									src='/daily.avif'
									alt='Datumsspezifische Verfügbarkeit einstellen'
									width={350}
									height={700}
									className='rounded-xl border-4 border-gray-800 shadow-2xl'
								/>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20'>
						<div className='order-2 lg:order-1 flex flex-col justify-center'>
							<h3 className='text-2xl font-bold mb-4'>
								Ausnahmetage verwalten
							</h3>
							<p className='text-gray-300 mb-6'>
								Wähle Tage aus, an denen du nicht verfügbar bist. Perfekt für
								Urlaub, besondere Anlässe oder wenn du einfach eine Pause
								brauchst. So erhältst du keine Benachrichtigungen für Events an
								diesen Tagen.
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<CalendarIcon className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Übersichtlicher Monatskalender zur Auswahl
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Clock className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Markiere einzelne oder mehrere Tage als nicht verfügbar
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Settings className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Änderungen werden automatisch gespeichert
									</span>
								</li>
							</ul>
						</div>
						<div className='order-1 lg:order-2 flex justify-center'>
							<div className='relative'>
								<div className='absolute -top-10 -left-10 w-40 h-40 bg-[#5b68e3] rounded-full filter blur-[100px] opacity-30' />
								<Image
									src='/exception.avif'
									alt='Ausnahmetage verwalten'
									width={350}
									height={700}
									className='rounded-xl border-4 border-gray-800 shadow-2xl'
								/>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
						<div className='flex justify-center'>
							<div className='relative'>
								<div className='absolute -top-10 -right-10 w-40 h-40 bg-[#5b68e3] rounded-full filter blur-[100px] opacity-30' />
								<Image
									src='/group.avif'
									alt='Gruppenslots verwalten'
									width={350}
									height={700}
									className='rounded-xl border-4 border-gray-800 shadow-2xl'
								/>
							</div>
						</div>
						<div className='flex flex-col justify-center'>
							<h3 className='text-2xl font-bold mb-4'>
								Gruppenslots organisieren
							</h3>
							<p className='text-gray-300 mb-6'>
								Organisiere Spiele für deine Gruppe mit flexiblen Zeitslots.
								Lege die Mindest- und Maximalanzahl der Teilnehmer fest und
								verfolge, wer teilnimmt.
							</p>
							<ul className='space-y-3'>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Users className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Teilnehmerverwaltung mit Mindest- und Maximalanzahl
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<Clock className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Flexible Zeitslots mit verschiedenen Dauern (1h, 90m, 2h)
									</span>
								</li>
								<li className='flex items-start'>
									<div className='h-6 w-6 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3 mt-0.5'>
										<CalendarIcon className='h-3 w-3 text-[#5b68e3]' />
									</div>
									<span className='text-gray-300'>
										Einfache Übersicht über alle Teilnehmer pro Zeitslot
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id='testimonials' className='py-20 bg-[#0a0e1c]'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Was unsere <span className='text-[#5b68e3]'>Spieler sagen</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Testimonial 1 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3'>
									<span className='font-bold'>JD</span>
								</div>
								<div>
									<h4 className='font-bold'>Jan Decker</h4>
									<p className='text-sm text-gray-400'>Fußball-Enthusiast</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"Event Wizard hat komplett verändert, wie ich Spiele finde.
								Früher hatte ich Schwierigkeiten, regelmäßige Matches zu finden,
								aber jetzt spiele ich zweimal pro Woche mit einer tollen Gruppe
								von Leuten."
							</p>
						</div>

						{/* Testimonial 2 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3'>
									<span className='font-bold'>SL</span>
								</div>
								<div>
									<h4 className='font-bold'>Sarah Lehmann</h4>
									<p className='text-sm text-gray-400'>Basketball-Spielerin</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"Die Verfügbarkeitsfunktion ist ein Game-Changer. Ich stelle
								meine freien Zeiten einmal ein und erhalte jetzt
								Benachrichtigungen, wann immer es ein Spiel gibt, das zu meinem
								Zeitplan passt."
							</p>
						</div>

						{/* Testimonial 3 */}
						<div className='bg-[#131b31] rounded-lg p-6 border border-gray-800'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-[#5b68e3]/20 flex items-center justify-center mr-3'>
									<span className='font-bold'>MR</span>
								</div>
								<div>
									<h4 className='font-bold'>Michael Richter</h4>
									<p className='text-sm text-gray-400'>5-gegen-5 Organisator</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"Als jemand, der Spiele organisiert, hat Event Wizard mein Leben
								so viel einfacher gemacht. Ich kann schnell sehen, wer verfügbar
								ist, und Einladungen mit nur wenigen Klicks versenden."
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section id='faq' className='py-20'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Häufig gestellte <span className='text-[#5b68e3]'>Fragen</span>
					</h2>

					<div className='max-w-3xl mx-auto'>
						<Accordion type='single' collapsible className='w-full'>
							<AccordionItem value='item-1' className='border-gray-800'>
								<AccordionTrigger className='text-left'>
									Wie nehme ich an einem Event teil?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Durchsuche einfach die verfügbaren Events, klicke auf eines,
									das dich interessiert, und drücke den "Teilnehmen"-Button. Du
									erhältst eine Bestätigungs-E-Mail mit allen Details, die du
									benötigst.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-2' className='border-gray-800'>
								<AccordionTrigger className='text-left'>
									Ist Event Wizard kostenlos nutzbar?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Event Wizard ist kostenlos für die Anmeldung und das
									Durchsuchen von Events. Einige Events können Gebühren haben,
									die von den Organisatoren festgelegt werden, aber diese werden
									deutlich angezeigt, bevor du teilnimmst.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-3' className='border-gray-800'>
								<AccordionTrigger className='text-left'>
									Wie lege ich meine wöchentliche Verfügbarkeit fest?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Gehe zu deinen Profileinstellungen, wähle den Tab
									"Verfügbarkeit" und nutze unsere einfache Kalenderoberfläche,
									um die Zeiten zu markieren, zu denen du jede Woche spielen
									kannst.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-4' className='border-gray-800'>
								<AccordionTrigger className='text-left'>
									Kann ich meine eigenen Events organisieren?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Klicke auf "Event erstellen" in deinem Dashboard, fülle die
									Details aus und veröffentliche es. Du kannst Zusagen
									verwalten, Updates senden und vieles mehr.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-5' className='border-gray-800'>
								<AccordionTrigger className='text-left'>
									Welche Sportarten werden unterstützt?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Event Wizard unterstützt alle Arten von Sportarten und
									körperlichen Aktivitäten - von Fußball und Basketball bis hin
									zu Tennis, Laufgruppen, Yoga-Sessions und mehr.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-[#5b68e3]/10'>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
						Bereit für dein nächstes Spiel?
					</h2>
					<p className='max-w-2xl mx-auto text-lg mb-10'>
						Schließe dich Tausenden von Spielern an, die Event Wizard bereits
						nutzen, um lokale Sportevents zu entdecken und daran teilzunehmen.
					</p>
					<Link
						className={buttonVariants({ variant: 'purple', size: 'lg' })}
						href={routes.signIn()}
					>
						Jetzt kostenlos registrieren
					</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-[#0c1021] border-t border-gray-800 py-12'>
				<div className='container'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<span className='text-xl font-bold'>
									<span className='text-[#5b68e3]'>Event</span> Wizard
								</span>
							</div>
							<p className='text-gray-400 text-sm'>
								Verbindet Sportbegeisterte mit lokalen Spielen und Events.
							</p>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Produkt</h3>
							<ul className='space-y-2 text-sm text-gray-400'>
								<li>
									<Link
										href='#features'
										className='hover:text-[#5b68e3] transition-colors'
									>
										Funktionen
									</Link>
								</li>
								<li>
									<Link
										href='/pricing'
										className='hover:text-[#5b68e3] transition-colors'
									>
										Preise
									</Link>
								</li>
								<li>
									<Link
										href='#testimonials'
										className='hover:text-[#5b68e3] transition-colors'
									>
										Erfahrungen
									</Link>
								</li>
								<li>
									<Link
										href='#faq'
										className='hover:text-[#5b68e3] transition-colors'
									>
										FAQ
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Unternehmen</h3>
							<ul className='space-y-2 text-sm text-gray-400'>
								<li>
									<Link
										href='/datenschutz'
										className='hover:text-[#5b68e3] transition-colors'
									>
										Datenschutz
									</Link>
								</li>
								<li>
									<Link
										href='/agb'
										className='hover:text-[#5b68e3] transition-colors'
									>
										Nutzungsbedingungen
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Kontakt</h3>
							<div className='flex space-x-4 mb-4'>
								<Link
									href='mailto:enis@zejnilovic.de'
									className='text-gray-400 hover:text-[#5b68e3] transition-colors'
								>
									<Mail className='h-5 w-5' />
									<span className='sr-only'>Email</span>
								</Link>
							</div>
							<p className='text-sm text-gray-400'>
								Kontaktiere uns:{' '}
								<Link
									href='mailto:enis@zejnilovic.de'
									className='text-[#5b68e3]'
								>
									enis@zejnilovic.de
								</Link>
							</p>
						</div>
					</div>

					<div className='mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400'>
						<p>© 2025 Event Wizard. Alle Rechte vorbehalten.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
