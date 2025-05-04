import Link from 'next/link'
import type { FunctionComponent } from 'react'
import { Phone } from './Phone'

export const Heading: FunctionComponent<{
	size?: 'sm' | 'md' | 'lg'
}> = ({ size = 'lg' }) => {
	const fontSize =
		size === 'lg'
			? 'text-[80px]'
			: size === 'md'
				? 'text-[48px]'
				: 'text-[20px]'

	return (
		<Link href={'/home'}>
			<div className='text-center'>
				<span
					className={`cursor-pointer font-extrabold leading-normal ${fontSize} bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent dark:from-blue-800 dark:to-slate-800`}
				>
					Event
					<span className='text-slate-900 dark:text-slate-100'> Wizard</span>
				</span>
			</div>
		</Link>
	)
}

export const Hero: FunctionComponent = () => {
	return (
		<>
			<span className=' md:text-2xl font-bold mx-auto text-center py-3 px-5'>
				Erstelle eine Verknüpfung zur Website, um sie schneller zu nutzen:
			</span>
			<Phone />
		</>
	)
}

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/ui/accordion'
import { Button } from '@/ui/button'
import {
	Bell,
	Calendar,
	ChevronRight,
	Clock,
	Facebook,
	Instagram,
	LogIn,
	Mail,
	MapPin,
	Twitter,
	Users,
} from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
	return (
		<div className='min-h-screen bg-gray-950 text-gray-100'>
			{/* Header */}
			<header className='sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm'>
				<div className='container flex h-16 items-center justify-between'>
					<div className='flex items-center gap-2'>
						<Calendar className='h-6 w-6 text-emerald-500' />
						<span className='text-xl font-bold'>Event Wizard</span>
					</div>
					<nav className='hidden md:flex items-center gap-6'>
						<Link
							href='#features'
							className='text-sm hover:text-emerald-400 transition-colors'
						>
							Features
						</Link>
						<Link
							href='#screenshots'
							className='text-sm hover:text-emerald-400 transition-colors'
						>
							Screenshots
						</Link>
						<Link
							href='#testimonials'
							className='text-sm hover:text-emerald-400 transition-colors'
						>
							Testimonials
						</Link>
						<Link
							href='#faq'
							className='text-sm hover:text-emerald-400 transition-colors'
						>
							FAQ
						</Link>
					</nav>
					<div className='flex items-center gap-4'>
						<Link
							href='#'
							className='text-sm font-medium hover:text-emerald-400 transition-colors'
						>
							Sign In
						</Link>
						<Button className='bg-emerald-600 hover:bg-emerald-700'>
							Sign Up
						</Button>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className='relative overflow-hidden py-20 md:py-32'>
				<div className='absolute inset-0 bg-gradient-to-b from-emerald-900/20 to-transparent opacity-30'></div>
				<div className='container relative z-10 flex flex-col items-center text-center'>
					<h1 className='max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
						Find and Join Local Sport Events{' '}
						<span className='text-emerald-500'>Effortlessly</span>
					</h1>
					<p className='mt-6 max-w-2xl text-lg text-gray-300'>
						Connect with local players, join games that fit your schedule, and
						never miss a match with Event Wizard - your personal sports
						community organizer.
					</p>
					<div className='mt-10 flex flex-col sm:flex-row gap-4'>
						<Button
							size='lg'
							className='bg-emerald-600 hover:bg-emerald-700 text-white'
						>
							Join a Game Today
						</Button>
						<Button
							size='lg'
							variant='outline'
							className='border-gray-700 text-gray-300 hover:bg-gray-800'
						>
							How It Works <ChevronRight className='ml-2 h-4 w-4' />
						</Button>
					</div>
					<div className='mt-12 flex items-center justify-center text-sm text-gray-400'>
						<Users className='mr-2 h-4 w-4 text-emerald-500' />
						<span>Join over 5,000 active players in your city</span>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id='features' className='py-20 bg-gray-900'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Everything You Need to{' '}
						<span className='text-emerald-500'>Play More</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Feature 1 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<Calendar className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Browse & Join Events</h3>
							<p className='text-gray-300'>
								Easily find and join scheduled events with detailed information
								on location, time, and price.
							</p>
						</div>

						{/* Feature 2 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<Users className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Player Count</h3>
							<p className='text-gray-300'>
								See how many players have already joined each event and never
								show up to an empty field again.
							</p>
						</div>

						{/* Feature 3 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<Clock className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Weekly Availability</h3>
							<p className='text-gray-300'>
								Set your personal weekly availability and get automatically
								matched with games that fit your schedule.
							</p>
						</div>

						{/* Feature 4 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<Bell className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Smart Notifications</h3>
							<p className='text-gray-300'>
								Receive automatic notifications via email when new games match
								your availability preferences.
							</p>
						</div>

						{/* Feature 5 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<LogIn className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Easy Login</h3>
							<p className='text-gray-300'>
								Simple and secure login via Google or Discord - no need to
								remember another password.
							</p>
						</div>

						{/* Feature 6 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-emerald-500 transition-colors'>
							<div className='h-12 w-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4'>
								<MapPin className='h-6 w-6 text-emerald-500' />
							</div>
							<h3 className='text-xl font-bold mb-2'>Location Based</h3>
							<p className='text-gray-300'>
								Find events near you with our location-based search and never
								travel too far for a game.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Screenshots Section */}
			<section id='screenshots' className='py-20'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						See Event Wizard <span className='text-emerald-500'>in Action</span>
					</h2>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<div className='bg-gray-800 rounded-xl overflow-hidden border border-gray-700'>
							<div className='p-4 border-b border-gray-700'>
								<h3 className='font-medium'>Event Browser Interface</h3>
							</div>
							<div className='p-2'>
								<Image
									src='/placeholder.svg?height=400&width=600'
									alt='Event browser interface'
									width={600}
									height={400}
									className='rounded-lg'
								/>
							</div>
						</div>

						<div className='bg-gray-800 rounded-xl overflow-hidden border border-gray-700'>
							<div className='p-4 border-b border-gray-700'>
								<h3 className='font-medium'>Availability Settings</h3>
							</div>
							<div className='p-2'>
								<Image
									src='/placeholder.svg?height=400&width=600'
									alt='Availability settings interface'
									width={600}
									height={400}
									className='rounded-lg'
								/>
							</div>
						</div>
					</div>

					<div className='mt-12 text-center'>
						<Button
							variant='outline'
							className='border-gray-700 text-gray-300 hover:bg-gray-800'
						>
							View More Screenshots
						</Button>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section id='testimonials' className='py-20 bg-gray-900'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						What Our <span className='text-emerald-500'>Players Say</span>
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{/* Testimonial 1 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-emerald-900 flex items-center justify-center mr-3'>
									<span className='font-bold'>JD</span>
								</div>
								<div>
									<h4 className='font-bold'>James Davis</h4>
									<p className='text-sm text-gray-400'>Football Enthusiast</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"Event Wizard has completely changed how I find games. I used to
								struggle to find consistent matches, but now I play twice a week
								with a great group of people."
							</p>
						</div>

						{/* Testimonial 2 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-emerald-900 flex items-center justify-center mr-3'>
									<span className='font-bold'>SL</span>
								</div>
								<div>
									<h4 className='font-bold'>Sarah Lee</h4>
									<p className='text-sm text-gray-400'>Basketball Player</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"The availability feature is a game-changer. I set my free times
								once, and now I get notifications whenever there's a game that
								fits my schedule."
							</p>
						</div>

						{/* Testimonial 3 */}
						<div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
							<div className='flex items-center mb-4'>
								<div className='h-10 w-10 rounded-full bg-emerald-900 flex items-center justify-center mr-3'>
									<span className='font-bold'>MR</span>
								</div>
								<div>
									<h4 className='font-bold'>Mike Rodriguez</h4>
									<p className='text-sm text-gray-400'>5-a-side Organizer</p>
								</div>
							</div>
							<p className='text-gray-300'>
								"As someone who organizes games, Event Wizard has made my life
								so much easier. I can quickly see who's available and send out
								invites with just a few clicks."
							</p>
						</div>
					</div>
				</div>
			</section>
			<Hero />

			{/* FAQ Section */}
			<section id='faq' className='py-20'>
				<div className='container'>
					<h2 className='text-center text-3xl font-bold tracking-tight sm:text-4xl mb-16'>
						Frequently Asked <span className='text-emerald-500'>Questions</span>
					</h2>

					<div className='max-w-3xl mx-auto'>
						<Accordion type='single' collapsible className='w-full'>
							<AccordionItem value='item-1' className='border-gray-700'>
								<AccordionTrigger className='text-left'>
									How do I join an event?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Simply browse available events, click on one you're interested
									in, and hit the "Join" button. You'll receive a confirmation
									email with all the details you need.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-2' className='border-gray-700'>
								<AccordionTrigger className='text-left'>
									Is Event Wizard free to use?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Event Wizard is free to join and browse events. Some events
									may have fees set by organizers, but these are clearly
									displayed before you join.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-3' className='border-gray-700'>
								<AccordionTrigger className='text-left'>
									How do I set my weekly availability?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Go to your profile settings, select the "Availability" tab,
									and use our simple calendar interface to mark the times you're
									free to play each week.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-4' className='border-gray-700'>
								<AccordionTrigger className='text-left'>
									Can I organize my own events?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Click on "Create Event" from your dashboard, fill in the
									details, and publish. You can manage RSVPs, send updates, and
									more.
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value='item-5' className='border-gray-700'>
								<AccordionTrigger className='text-left'>
									What sports are supported?
								</AccordionTrigger>
								<AccordionContent className='text-gray-300'>
									Event Wizard supports all types of sports and physical
									activities - from football and basketball to tennis, running
									groups, yoga sessions, and more.
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 bg-emerald-900'>
				<div className='container text-center'>
					<h2 className='text-3xl font-bold tracking-tight sm:text-4xl mb-6'>
						Ready to Find Your Next Game?
					</h2>
					<p className='max-w-2xl mx-auto text-lg mb-10'>
						Join thousands of players who are already using Event Wizard to
						discover and participate in local sports events.
					</p>
					<Button
						size='lg'
						className='bg-white text-emerald-900 hover:bg-gray-100'
					>
						Sign Up Now — It's Free
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className='bg-gray-950 border-t border-gray-800 py-12'>
				<div className='container'>
					<div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
						<div>
							<div className='flex items-center gap-2 mb-4'>
								<Calendar className='h-6 w-6 text-emerald-500' />
								<span className='text-xl font-bold'>Event Wizard</span>
							</div>
							<p className='text-gray-400 text-sm'>
								Connecting sports enthusiasts with local games and events.
							</p>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Product</h3>
							<ul className='space-y-2 text-sm text-gray-400'>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Features
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Pricing
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Testimonials
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										FAQ
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Company</h3>
							<ul className='space-y-2 text-sm text-gray-400'>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Careers
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href='#'
										className='hover:text-emerald-400 transition-colors'
									>
										Terms of Service
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className='font-bold mb-4'>Connect</h3>
							<div className='flex space-x-4 mb-4'>
								<Link
									href='#'
									className='text-gray-400 hover:text-emerald-400 transition-colors'
								>
									<Facebook className='h-5 w-5' />
									<span className='sr-only'>Facebook</span>
								</Link>
								<Link
									href='#'
									className='text-gray-400 hover:text-emerald-400 transition-colors'
								>
									<Twitter className='h-5 w-5' />
									<span className='sr-only'>Twitter</span>
								</Link>
								<Link
									href='#'
									className='text-gray-400 hover:text-emerald-400 transition-colors'
								>
									<Instagram className='h-5 w-5' />
									<span className='sr-only'>Instagram</span>
								</Link>
								<Link
									href='#'
									className='text-gray-400 hover:text-emerald-400 transition-colors'
								>
									<Mail className='h-5 w-5' />
									<span className='sr-only'>Email</span>
								</Link>
							</div>
							<p className='text-sm text-gray-400'>
								Contact us:{' '}
								<Link
									href='mailto:hello@eventwizard.com'
									className='text-emerald-400'
								>
									hello@eventwizard.com
								</Link>
							</p>
						</div>
					</div>

					<div className='mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400'>
						<p>
							© {new Date().getFullYear()} Event Wizard. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
