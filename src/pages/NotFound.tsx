import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="text-7xl mb-6">🤿</div>
      <h1 className="text-4xl font-extrabold text-[#023e8a] mb-4">Page Not Found</h1>
      <p className="text-gray-500 mb-8">Looks like you dived too deep! This page doesn't exist.</p>
      <Link to="/" className="btn-primary">← Back to Surface</Link>
    </div>
  )
}
