const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config({ path: path.join(__dirname, '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Redirect all requests from admin.divinginasia.com to https://secured.onemedia.asia
app.use((req, res, next) => {
	const host = req.get('host') || '';
	if (host.includes('admin.divinginasia.com')) {
		const pathname = req.path;
		const search = req.url.split('?')[1] ? `?${req.url.split('?')[1]}` : '';
		return res.redirect(301, `https://secured.onemedia.asia${pathname}${search}`);
	}
	next();
});

app.use(cors());
app.use(express.json());

app.options('/api/send-booking-notification', (_req, res) => res.status(200).end());
app.post('/api/send-booking-notification', async (req, res) => {
	try {
		const { default: sendBookingNotificationHandler } = await import('./api/send-booking-notification.js');
		return await sendBookingNotificationHandler(req, res);
	} catch (err) {
		console.error('Local booking notification route failed', err);
		return res.status(500).json({
			success: false,
			error: err instanceof Error ? err.message : 'Email delivery failed',
		});
	}
});

const candidateStaticDirs = [
	path.join(__dirname, '.builds'),
	path.join(__dirname, '.builds', 'dist'),
	path.join(__dirname, '.builds', 'public_html'),
	path.join(__dirname, 'dist'),
	path.join(__dirname, 'public_html'),
	path.join(__dirname, 'divinginasia.com', 'public_html'),
	path.join(__dirname, 'divinginasia.com', 'nodejs', 'dist'),
];

const staticDir = candidateStaticDirs.find((dir) => fs.existsSync(path.join(dir, 'index.html')));
if (staticDir) {
	app.use(express.static(staticDir));
	console.log('Static mode: serving', staticDir);
} else {
	console.warn('No static directory with index.html found; API routes only.');
}

const dbPath = path.join(__dirname, 'bookings.db');
const jsonStorePath = path.join(__dirname, 'bookings.json');
let db = null;
let useJsonStore = false;
let useMemoryStore = false;
let memoryBookings = [];

const readJsonBookings = () => {
	if (useMemoryStore) return [...memoryBookings];
	try {
		if (!fs.existsSync(jsonStorePath)) return [];
		const raw = fs.readFileSync(jsonStorePath, 'utf8');
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
};

const writeJsonBookings = (rows) => {
	if (useMemoryStore) {
		memoryBookings = [...rows];
		return;
	}
	try {
		fs.writeFileSync(jsonStorePath, JSON.stringify(rows, null, 2), 'utf8');
	} catch (err) {
		useMemoryStore = true;
		memoryBookings = [...rows];
		console.warn('JSON store not writable, switched to memory fallback:', err.message);
	}
};

try {
	const Database = require('better-sqlite3');
	db = new Database(dbPath);
	db.exec(`CREATE TABLE IF NOT EXISTS bookings (
		id TEXT PRIMARY KEY,
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		phone TEXT,
		course_title TEXT,
		preferred_date TEXT,
		experience_level TEXT,
		message TEXT,
		status TEXT DEFAULT 'pending',
		created_at TEXT
	)`);
	console.log('Storage mode: sqlite');
} catch (err) {
	useJsonStore = true;
	console.warn('better-sqlite3 unavailable, using JSON storage fallback:', err.message);
	if (!fs.existsSync(jsonStorePath)) {
		try {
			fs.writeFileSync(jsonStorePath, '[]', 'utf8');
		} catch (writeErr) {
			useMemoryStore = true;
			memoryBookings = [];
			console.warn('Unable to create bookings.json, using memory fallback:', writeErr.message);
		}
	}
	console.log(`Storage mode: ${useMemoryStore ? 'memory' : 'json'}`);
}

app.get('/api/health', (req, res) => {
	res.json({
		ok: true,
		storage: useJsonStore ? (useMemoryStore ? 'memory' : 'json') : 'sqlite',
		port: PORT,
		staticDir: staticDir || null,
	});
});

app.get('/api/bookings', (req, res) => {
	try {
		const rows = useJsonStore
			? readJsonBookings().sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
			: db.prepare('SELECT * FROM bookings ORDER BY created_at DESC').all();
		res.json(rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.post('/api/bookings', (req, res) => {
	const { id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at } = req.body;
	try {
		if (useJsonStore) {
			const rows = readJsonBookings();
			rows.push({
				id,
				name,
				email,
				phone,
				course_title,
				preferred_date,
				experience_level,
				message,
				status: status || 'pending',
				created_at,
			});
			writeJsonBookings(rows);
		} else {
			db.prepare('INSERT INTO bookings (id, name, email, phone, course_title, preferred_date, experience_level, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
				.run(id, name, email, phone, course_title, preferred_date, experience_level, message, status || 'pending', created_at);
		}
		res.json({ id, message: 'Booking created' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.put('/api/bookings/:id/status', (req, res) => {
	const { id } = req.params;
	const { status } = req.body;
	try {
		if (useJsonStore) {
			const rows = readJsonBookings();
			const index = rows.findIndex((row) => row.id === id);
			if (index === -1) return res.status(404).json({ error: 'Booking not found' });
			rows[index] = { ...rows[index], status };
			writeJsonBookings(rows);
			return res.json({ message: 'Status updated' });
		}

		const result = db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, id);
		if (result.changes > 0) {
			res.json({ message: 'Status updated' });
		} else {
			res.status(404).json({ error: 'Booking not found' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.delete('/api/bookings/:id', (req, res) => {
	const { id } = req.params;
	try {
		if (useJsonStore) {
			const rows = readJsonBookings();
			const nextRows = rows.filter((row) => row.id !== id);
			if (nextRows.length === rows.length) return res.status(404).json({ error: 'Booking not found' });
			writeJsonBookings(nextRows);
			return res.json({ message: 'Booking deleted' });
		}

		const result = db.prepare('DELETE FROM bookings WHERE id = ?').run(id);
		if (result.changes > 0) {
			res.json({ message: 'Booking deleted' });
		} else {
			res.status(404).json({ error: 'Booking not found' });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.use((req, res) => {
	if (staticDir) {
		return res.sendFile(path.join(staticDir, 'index.html'));
	}
	return res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
