import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface CoursePrice {
	id: string;
	course: string;
	price_thb: string;
	price_usd: string;
	price_eur: string;
}

const PricingManager: React.FC = () => {
	const [prices, setPrices] = useState<CoursePrice[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		const fetchPrices = async () => {
			setIsLoading(true);
			const { data, error } = await supabase.from('course_prices').select('*');
			if (!error && data) setPrices(data);
			setIsLoading(false);
		};
		fetchPrices();
	}, []);

	const handleChange = (id: string, field: keyof CoursePrice, value: string) => {
		setPrices(prices => prices.map(p => p.id === id ? { ...p, [field]: value } : p));
	};

	const handleSave = async (id: string) => {
		setIsSaving(true);
		const price = prices.find(p => p.id === id);
		if (!price) return;
		await supabase.from('course_prices').update({
			price_thb: price.price_thb,
			price_usd: price.price_usd,
			price_eur: price.price_eur,
		}).eq('id', id);
		setIsSaving(false);
	};

	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Course Pricing</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Course</TableHead>
								<TableHead>IDR</TableHead>
								<TableHead>USD</TableHead>
								<TableHead>EUR</TableHead>
								<TableHead>Action</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{prices.map(price => (
								<TableRow key={price.id}>
									<TableCell>{price.course}</TableCell>
									<TableCell>
										<Input value={price.price_thb} onChange={e => handleChange(price.id, 'price_thb', e.target.value)} />
									</TableCell>
									<TableCell>
										<Input value={price.price_usd} onChange={e => handleChange(price.id, 'price_usd', e.target.value)} />
									</TableCell>
									<TableCell>
										<Input value={price.price_eur} onChange={e => handleChange(price.id, 'price_eur', e.target.value)} />
									</TableCell>
									<TableCell>
										<Button size="sm" onClick={() => handleSave(price.id)} disabled={isSaving}>Save</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
};

export default PricingManager;
