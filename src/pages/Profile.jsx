import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const { user, profile, fetchProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setBio(profile.bio || '');
    }
  }, [profile]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone, bio })
      .eq('id', user.id);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Profile updated!');
      fetchProfile(user.id);
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>

      {message && (
        <div className={`mb-4 rounded-lg border p-3 text-sm ${
          message.includes('updated')
            ? 'border-green-500/20 bg-green-500/10 text-green-400'
            : 'border-red-500/20 bg-red-500/10 text-red-400'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Email</label>
          <input
            type="email"
            disabled
            value={user?.email || ''}
            className="w-full rounded-lg border border-surface-border bg-surface px-4 py-2.5 text-sm text-slate-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-surface-light px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-surface-light px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-300">Bio</label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-lg border border-surface-border bg-surface-light px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
            placeholder="Tell us about yourself…"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
