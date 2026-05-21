"use client";

import { useState, useEffect, useCallback } from "react";

type Exp = { id: string; role: string; org: string; period: string; desc: string };
type FormData = { role: string; org: string; period: string; desc: string };

const EMPTY: FormData = { role: "", org: "", period: "", desc: "" };

// ─── Form ─────────────────────────────────────────────────────────────────────

function ExpForm({
  form,
  setForm,
  onSave,
  onCancel,
  saving,
  title,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
  title: string;
}) {
  const input =
    "w-full bg-transparent border border-[#2a2a2a] rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-accent placeholder:text-[#4a4a4a]";

  function field(key: keyof FormData) {
    return {
      value: form[key],
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm({ ...form, [key]: e.target.value }),
    };
  }

  return (
    <div className="border border-accent/25 rounded-xl bg-[#0f0f0f] p-5 mb-5">
      <p className="text-xs text-accent uppercase tracking-widest font-heading font-bold mb-4">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
        <input placeholder="Role / Title" className={input} {...field("role")} />
        <input placeholder="Organization" className={input} {...field("org")} />
        <input
          placeholder="Period  (e.g. Jan 2026 – Present)"
          className={`${input} sm:col-span-2`}
          {...field("period")}
        />
      </div>
      <textarea
        placeholder="Description"
        rows={3}
        className={`${input} resize-none mb-3`}
        {...field("desc")}
      />
      <div className="flex gap-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-accent text-[#0a0a0a] text-sm font-bold px-5 py-1.5 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={onCancel}
          className="text-sm border border-[#2a2a2a] px-5 py-1.5 rounded hover:border-white/40 text-white/60 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [authErr, setAuthErr] = useState("");

  const [experiences, setExperiences] = useState<Exp[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FormData>(EMPTY);
  const [addForm, setAddForm] = useState<FormData>(EMPTY);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const headers = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }),
    [token]
  );

  const load = useCallback(
    async (t: string) => {
      const res = await fetch("/api/experiences", {
        headers: { Authorization: `Bearer ${t}` },
      });
      setExperiences(await res.json());
    },
    []
  );

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) {
      setToken(saved);
      setAuthed(true);
      load(saved);
    }
  }, [load]);

  async function login() {
    setAuthErr("");
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      sessionStorage.setItem("admin_token", pw);
      setToken(pw);
      setAuthed(true);
      load(pw);
    } else {
      setAuthErr("Wrong password.");
    }
  }

  async function handleAdd() {
    setSaving(true);
    const res = await fetch("/api/experiences", {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(addForm),
    });
    if (res.ok) {
      setAddForm(EMPTY);
      setShowAdd(false);
      load(token);
      flash("Experience added.");
    }
    setSaving(false);
  }

  async function handleUpdate() {
    if (!editId) return;
    setSaving(true);
    const res = await fetch(`/api/experiences/${editId}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      setEditId(null);
      load(token);
      flash("Experience updated.");
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this experience?")) return;
    setSaving(true);
    await fetch(`/api/experiences/${id}`, { method: "DELETE", headers: headers() });
    load(token);
    flash("Experience deleted.");
    setSaving(false);
  }

  function startEdit(exp: Exp) {
    setEditId(exp.id);
    setEditForm({ role: exp.role, org: exp.org, period: exp.period, desc: exp.desc });
    setShowAdd(false);
  }

  // ── Login screen ──────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm border border-border rounded-2xl bg-surface p-8">
          <h1 className="font-heading font-bold text-foreground text-lg mb-1">Admin</h1>
          <p className="text-xs text-muted mb-6">Experience Manager</p>
          <input
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-transparent border border-border rounded px-3 py-2.5 text-foreground text-sm mb-3 focus:outline-none focus:border-accent placeholder:text-muted"
          />
          {authErr && <p className="text-red-400 text-xs mb-3">{authErr}</p>}
          <button
            onClick={login}
            className="w-full bg-accent text-accent-fg font-heading font-bold text-sm py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading font-bold text-foreground text-xl">Experience Manager</h1>
            <p className="text-xs text-muted mt-0.5">{experiences.length} entries</p>
          </div>
          <div className="flex items-center gap-4">
            {toast && <span className="text-accent text-sm">{toast}</span>}
            <button
              onClick={() => { setShowAdd(true); setEditId(null); }}
              className="bg-accent text-accent-fg text-sm font-heading font-bold px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              + Add
            </button>
            <button
              onClick={() => { sessionStorage.removeItem("admin_token"); setAuthed(false); setPw(""); }}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add form */}
        {showAdd && (
          <ExpForm
            form={addForm}
            setForm={setAddForm}
            onSave={handleAdd}
            onCancel={() => setShowAdd(false)}
            saving={saving}
            title="New Experience"
          />
        )}

        {/* List */}
        <div className="space-y-3">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="border border-border rounded-xl bg-surface">
              {editId === exp.id ? (
                <div className="p-5">
                  <ExpForm
                    form={editForm}
                    setForm={setEditForm}
                    onSave={handleUpdate}
                    onCancel={() => setEditId(null)}
                    saving={saving}
                    title={`Edit — ${exp.role}`}
                  />
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4 p-5">
                  <div className="flex gap-4 items-start">
                    <span className="text-xs text-muted font-heading font-bold mt-0.5 w-4 text-right shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-heading font-bold text-sm text-foreground leading-snug">
                        {exp.role}
                      </p>
                      <p className="text-xs text-accent mt-1">{exp.org}</p>
                      <p className="text-xs text-muted">{exp.period}</p>
                      <p className="text-xs text-foreground/50 mt-2 leading-relaxed max-w-xl">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(exp)}
                      className="text-xs border border-border px-3 py-1.5 rounded hover:border-accent hover:text-accent transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-xs border border-border px-3 py-1.5 rounded hover:border-red-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
