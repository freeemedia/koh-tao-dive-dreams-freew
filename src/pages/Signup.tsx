import { Link } from 'react-router-dom';

const Signup = () => (
  <div className="min-h-screen flex items-center justify-center bg-background px-6">
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Account</p>
      <h1 className="mt-3 text-3xl font-bold text-slate-900">Create account</h1>
      <p className="mt-3 text-sm text-slate-600">
        Sign-up is being updated. Please return to the home page for now.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Back to home
        </Link>
      </div>
    </div>
  </div>
);

export default Signup;
