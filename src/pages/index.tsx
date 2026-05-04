import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { tryAutoScroll } from '@/lib/scroll';
import Hero from '../components/Hero';
import StayDivePackages from '../components/StayDivePackages';
import DiveSites from '../components/DiveSites';
import Courses from '../components/Courses';
import Gallery from '../components/Gallery';
import About from '../components/About';
// import Contact from '../components/Contact';
import FunDiving from './FunDiving';

const Index = () => {
	const location = useLocation();

	useEffect(() => {
		// Scroll to anchor if hash is present
		if (location.hash) {
			const el = document.getElementById(location.hash.replace('#', ''));
			if (el) {
				el.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			window.scrollTo(0, 0);
		}
	}, [location]);

	return (
		<div className="min-h-screen bg-background">
			<Hero />
			<StayDivePackages />
			<About />
			<Courses />
			<FunDiving />
			<DiveSites />
			<Gallery />
		// <Contact />
		</div>
	);
};

export default Index;
