import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element #root was not found.');
}

const escapeHtml = (value: string) =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

const renderStartupError = (title: string, error: unknown) => {
	const details = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
	const stack = error instanceof Error && error.stack ? error.stack : '';

	rootElement.innerHTML = `
		<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:#f8fafc;color:#0f172a;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
			<div style="width:min(900px,100%);background:#ffffff;border:1px solid #cbd5e1;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,.08);padding:24px;">
				<div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0369a1;margin-bottom:8px;">Startup error</div>
				<h1 style="font-size:28px;line-height:1.2;margin:0 0 12px;">${escapeHtml(title)}</h1>
				<p style="margin:0 0 16px;color:#334155;">The app failed before it could render. This usually means a runtime error or a hosting issue serving the wrong file for a script request.</p>
				<pre style="margin:0;white-space:pre-wrap;word-break:break-word;background:#0f172a;color:#e2e8f0;padding:16px;border-radius:12px;overflow:auto;">${escapeHtml(details)}${stack ? `\n\n${escapeHtml(stack)}` : ''}</pre>
			</div>
		</div>
	`;
};

window.addEventListener('error', (event) => {
	renderStartupError('Unhandled runtime error', event.error || event.message || 'Unknown error');
});

window.addEventListener('unhandledrejection', (event) => {
	renderStartupError('Unhandled promise rejection', event.reason || 'Unknown rejection');
});

try {
	createRoot(rootElement).render(<App />);
} catch (error) {
	renderStartupError('React failed to initialize', error);
}
