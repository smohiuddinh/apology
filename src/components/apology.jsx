import { useState, useMemo } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');`;

const css = `
  .em-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .em-root { font-family: 'Jost', sans-serif; font-weight: 300; background: #faf8f5; min-height: 100vh; color: #47AAB3; }
  .em-root h1, .em-root h2, .em-root h3, .em-root h4 { font-family: 'Cormorant Garamond', serif; font-weight: 400; }

  /* Layout */
  .em-shell { display: flex; min-height: 100vh; }
  .em-sidebar { width: 220px; flex-shrink: 0; background: #47AAB3; padding: 2rem 0; display: flex; flex-direction: column; }
  .em-logo { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #f0ebe3; padding: 0 1.5rem 2rem; letter-spacing: 0.04em; border-bottom: 0.5px solid rgba(240,235,227,0.15); margin-bottom: 1.5rem; }
  .em-logo span { font-style: italic; color: #c9b89a; }
  .em-nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 1.5rem; font-size: 13px; font-weight: 400; color: rgba(240,235,227,0.55); cursor: pointer; letter-spacing: 0.06em; text-transform: uppercase; transition: all 0.2s; border-left: 2px solid transparent; }
  .em-nav-item:hover { color: #f0ebe3; background: rgba(240,235,227,0.05); }
  .em-nav-item.active { color: #f0ebe3; border-left-color: #c9b89a; background: rgba(201,184,154,0.1); }
  .em-nav-icon { font-size: 15px; }
  .em-main { flex: 1; padding: 2.5rem 3rem; overflow-y: auto; }
  .em-page-title { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 300; color: #47AAB3; margin-bottom: 0.25rem; letter-spacing: -0.01em; }
  .em-page-sub { font-size: 13px; color: #9a8f82; margin-bottom: 2rem; letter-spacing: 0.02em; }

  /* Metrics */
  .em-metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 2.5rem; }
  .em-metric { background: #fff; border: 0.5px solid #e8e0d5; border-radius: 12px; padding: 1.25rem 1.5rem; position: relative; overflow: hidden; }
  .em-metric::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .em-metric.gold::before { background: linear-gradient(90deg, #c9b89a, #e8d5b7); }
  .em-metric.sage::before { background: linear-gradient(90deg, #8fa888, #b5c9b0); }
  .em-metric.rose::before { background: linear-gradient(90deg, #c9909a, #e8b5bc); }
  .em-metric.stone::before { background: linear-gradient(90deg, #9a8f82, #bdb3a8); }
  .em-metric-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #9a8f82; margin-bottom: 8px; }
  .em-metric-value { font-family: 'Cormorant Garamond', serif; font-size: 38px; font-weight: 300; color: #47AAB3; line-height: 1; }
  .em-metric-sub { font-size: 11px; color: #bdb3a8; margin-top: 4px; }

  /* Cards */
  .em-section-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem; }
  .em-section-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; letter-spacing: 0.01em; }
  .em-event-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .em-event-card { background: #fff; border: 0.5px solid #e8e0d5; border-radius: 14px; overflow: hidden; transition: transform 0.2s, box-shadow 0.2s; cursor: default; }
  .em-event-card:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(44,40,37,0.08); }
  .em-card-banner { height: 6px; }
  .em-card-banner.live { background: linear-gradient(90deg, #8fa888, #b5c9b0); }
  .em-card-banner.upcoming { background: linear-gradient(90deg, #c9b89a, #e8d5b7); }
  .em-card-banner.closed { background: linear-gradient(90deg, #bdb3a8, #d5cfc8); }
  .em-card-body { padding: 1.25rem 1.5rem; }
  .em-card-status { font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8px; font-weight: 500; }
  .em-card-status.live { color: #6a9462; }
  .em-card-status.upcoming { color: #a08060; }
  .em-card-status.closed { color: #9a8f82; }
  .em-card-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; margin-bottom: 10px; line-height: 1.2; }
  .em-card-meta { font-size: 12px; color: #9a8f82; display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; }
  .em-card-meta span { display: flex; align-items: center; gap: 6px; }
  .em-progress { height: 3px; background: #f0ebe3; border-radius: 9999px; margin-bottom: 6px; overflow: hidden; }
  .em-progress-fill { height: 100%; border-radius: 9999px; background: linear-gradient(90deg, #c9b89a, #a08060); transition: width 0.4s; }
  .em-capacity-label { font-size: 11px; color: #bdb3a8; margin-bottom: 14px; }
  .em-card-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* Buttons */
  .em-btn { padding: 7px 16px; border-radius: 8px; font-size: 12px; font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; border: 0.5px solid #e8e0d5; background: #fff; color: #5a5048; font-family: 'Jost', sans-serif; }
  .em-btn:hover { background: #faf8f5; border-color: #c9b89a; color: #47AAB3; }
  .em-btn.primary { background: #47AAB3; color: #f0ebe3; border-color: #47AAB3; }
  .em-btn.primary:hover { background: #3d3530; }
  .em-btn.ghost { background: transparent; border-color: rgba(44,40,37,0.2); }
  .em-btn.danger { border-color: #e8c0c5; color: #c9909a; }
  .em-btn.danger:hover { background: #fdf5f6; }
  .em-btn.sm { padding: 5px 12px; font-size: 11px; }

  /* Table */
  .em-table-wrap { background: #fff; border: 0.5px solid #e8e0d5; border-radius: 14px; overflow: hidden; }
  .em-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .em-table th { padding: 12px 18px; text-align: left; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #9a8f82; font-weight: 500; background: #faf8f5; border-bottom: 0.5px solid #e8e0d5; font-family: 'Jost', sans-serif; }
  .em-table td { padding: 14px 18px; border-bottom: 0.5px solid #f0ebe3; vertical-align: middle; }
  .em-table tr:last-child td { border-bottom: none; }
  .em-table tr:hover td { background: #fefcfa; }
  .em-avatar { width: 32px; height: 32px; border-radius: 50%; background: #f0ebe3; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: #7a6e62; flex-shrink: 0; font-family: 'Cormorant Garamond', serif; font-size: 14px; }
  .em-td-name { display: flex; align-items: center; gap: 10px; }
  .em-name-text { font-weight: 400; font-size: 13px; }
  .em-email-text { font-size: 11px; color: #9a8f82; }

  /* RSVP badges */
  .em-badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 9999px; font-size: 11px; letter-spacing: 0.04em; }
  .em-badge.yes { background: #eef4ec; color: #5a8053; }
  .em-badge.no { background: #fdf0f1; color: #c9909a; }
  .em-badge.maybe { background: #fdf5ec; color: #a07040; }
  .em-badge.pending { background: #f5f3f0; color: #9a8f82; }

  /* Form */
  .em-form-card { background: #fff; border: 0.5px solid #e8e0d5; border-radius: 14px; padding: 2rem; max-width: 640px; }
  .em-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 1.25rem; }
  .em-form-group { display: flex; flex-direction: column; gap: 6px; }
  .em-form-group.full { grid-column: 1 / -1; }
  .em-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #9a8f82; font-weight: 500; }
  .em-input, .em-select, .em-textarea { font-family: 'Jost', sans-serif; font-size: 13px; font-weight: 300; padding: 10px 14px; border: 0.5px solid #e8e0d5; border-radius: 8px; background: #faf8f5; color: #47AAB3; transition: border-color 0.2s, background 0.2s; outline: none; width: 100%; }
  .em-input:focus, .em-select:focus, .em-textarea:focus { border-color: #c9b89a; background: #fff; box-shadow: 0 0 0 3px rgba(201,184,154,0.15); }
  .em-textarea { resize: vertical; min-height: 80px; }
  .em-form-footer { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; border-top: 0.5px solid #f0ebe3; }

  /* Filter bar */
  .em-filter-bar { display: flex; gap: 10px; margin-bottom: 1.25rem; flex-wrap: wrap; align-items: center; }
  .em-filter-bar .em-input { flex: 1; min-width: 180px; }
  .em-filter-bar .em-select { min-width: 150px; }

  /* Modal */
  .em-overlay { position: fixed; inset: 0; background: rgba(44,40,37,0.4); display: flex; align-items: center; justify-content: center; z-index: 100; backdrop-filter: blur(2px); }
  .em-modal { background: #fff; border-radius: 16px; border: 0.5px solid #e8e0d5; padding: 2rem; width: 520px; max-width: 95vw; box-shadow: 0 20px 60px rgba(44,40,37,0.15); }
  .em-modal-title { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 400; margin-bottom: 1.5rem; }

  /* Toast */
  .em-toast { position: fixed; bottom: 2rem; right: 2rem; background: #47AAB3; color: #f0ebe3; padding: 12px 20px; border-radius: 10px; font-size: 13px; letter-spacing: 0.02em; z-index: 200; pointer-events: none; transition: all 0.25s; transform: translateY(10px); opacity: 0; }
  .em-toast.show { opacity: 1; transform: translateY(0); }

  /* Empty state */
  .em-empty { text-align: center; padding: 3rem; color: #bdb3a8; font-size: 14px; font-style: italic; font-family: 'Cormorant Garamond', serif; }

  /* RSVP inline select */
  .em-rsvp-select { font-family: 'Jost', sans-serif; font-size: 11px; padding: 4px 8px; border: 0.5px solid #e8e0d5; border-radius: 6px; background: #faf8f5; color: #47AAB3; cursor: pointer; outline: none; }
  .em-rsvp-select:focus { border-color: #c9b89a; }

  /* Link box */
  .em-link-box { background: #faf8f5; border: 0.5px solid #e8e0d5; border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; margin: 8px 0 16px; }
  .em-link-box code { font-size: 11px; color: #9a8f82; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  /* Tab divider line */
  .em-divider { height: 0.5px; background: #e8e0d5; margin: 2rem 0; }
`;

const INITIAL_EVENTS = [
  { id: 1, name: "Autumn Gala Evening", date: "2026-05-15", time: "19:00", location: "Pearl Continental Hotel, Karachi", capacity: 200, status: "live" },
  { id: 2, name: "Brand Strategy Workshop", date: "2026-06-02", time: "14:00", location: "The Creative Hub", capacity: 40, status: "upcoming" },
  { id: 3, name: "Tech Leadership Summit", date: "2026-04-28", time: "09:00", location: "Karachi Expo Centre", capacity: 150, status: "live" },
];

const INITIAL_GUESTS = [
  { id: 1, first: "Ayesha", last: "Khan", email: "ayesha@example.com", eventId: 1, rsvp: "yes", date: "Apr 10", message: "" },
  { id: 2, first: "Omar", last: "Sheikh", email: "omar@example.com", eventId: 1, rsvp: "yes", date: "Apr 11", message: "Vegetarian please" },
  { id: 3, first: "Sara", last: "Malik", email: "sara@example.com", eventId: 1, rsvp: "maybe", date: "Apr 12", message: "" },
  { id: 4, first: "Bilal", last: "Ahmed", email: "bilal@example.com", eventId: 2, rsvp: "yes", date: "Apr 14", message: "" },
  { id: 5, first: "Nadia", last: "Hussain", email: "nadia@example.com", eventId: 3, rsvp: "no", date: "Apr 15", message: "Conflict with travel" },
  { id: 6, first: "Zain", last: "Ali", email: "zain@example.com", eventId: 3, rsvp: "yes", date: "Apr 16", message: "" },
  { id: 7, first: "Hira", last: "Qureshi", email: "hira@example.com", eventId: 1, rsvp: "pending", date: "Apr 17", message: "" },
];

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "◈" },
  { id: "events", label: "Events", icon: "◇" },
  { id: "guests", label: "Guest List", icon: "◻" },
  { id: "register", label: "Register", icon: "✦" },
];

function initials(f, l) { return (f[0] + l[0]).toUpperCase(); }
function fmtDate(d) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function RsvpBadge({ rsvp }) {
  const map = { yes: "Attending", no: "Not Attending", maybe: "Maybe", pending: "Pending" };
  return <span className={`em-badge ${rsvp}`}>{map[rsvp] || "Pending"}</span>;
}

function StatusBadge({ status }) {
  return <span className={`em-card-status ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

function Avatar({ first, last }) {
  return <div className="em-avatar">{initials(first, last)}</div>;
}

// ── Dashboard ──────────────────────────────────────────────────────────────
function Dashboard({ events, guests, onViewGuests, onRsvpLink }) {
  const yes = guests.filter(g => g.rsvp === "yes").length;
  const no = guests.filter(g => g.rsvp === "no").length;
  const maybe = guests.filter(g => g.rsvp === "maybe").length;
  const upcoming = events.filter(e => e.status !== "closed");

  return (
    <div>
      <h1 className="em-page-title">Overview</h1>
      <p className="em-page-sub">Your events at a glance</p>

      <div className="em-metrics">
        <div className="em-metric gold">
          <div className="em-metric-label">Total RSVPs</div>
          <div className="em-metric-value">{guests.length}</div>
          <div className="em-metric-sub">across {events.length} events</div>
        </div>
        <div className="em-metric sage">
          <div className="em-metric-label">Attending</div>
          <div className="em-metric-value">{yes}</div>
          <div className="em-metric-sub">confirmed</div>
        </div>
        <div className="em-metric rose">
          <div className="em-metric-label">Declined</div>
          <div className="em-metric-value">{no}</div>
          <div className="em-metric-sub">not attending</div>
        </div>
        <div className="em-metric stone">
          <div className="em-metric-label">Uncertain</div>
          <div className="em-metric-value">{maybe}</div>
          <div className="em-metric-sub">maybe attending</div>
        </div>
      </div>

      <div className="em-section-head">
        <span className="em-section-title">Active Events</span>
      </div>
      <div className="em-event-grid">
        {upcoming.length === 0 && <p className="em-empty">No active events.</p>}
        {upcoming.map(e => (
          <EventCard key={e.id} event={e} guests={guests} onViewGuests={onViewGuests} onRsvpLink={onRsvpLink} compact />
        ))}
      </div>
    </div>
  );
}

// ── Event Card ─────────────────────────────────────────────────────────────
function EventCard({ event: e, guests, onViewGuests, onRsvpLink, onDelete, compact }) {
  const attending = guests.filter(g => g.eventId === e.id && g.rsvp === "yes").length;
  const total = guests.filter(g => g.eventId === e.id).length;
  const pct = Math.min(100, Math.round(attending / e.capacity * 100));

  return (
    <div className="em-event-card">
      <div className={`em-card-banner ${e.status}`} />
      <div className="em-card-body">
        <StatusBadge status={e.status} />
        <div className="em-card-name">{e.name}</div>
        <div className="em-card-meta">
          <span>📅 {fmtDate(e.date)} · {e.time}</span>
          <span>📍 {e.location}</span>
          <span>👥 Capacity: {e.capacity}</span>
        </div>
        <div className="em-progress">
          <div className="em-progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="em-capacity-label">{attending} attending · {total} RSVPs · {pct}% capacity</div>
        <div className="em-card-actions">
          <button className="em-btn sm" onClick={() => onRsvpLink(e)}>RSVP Link</button>
          <button className="em-btn sm" onClick={() => onViewGuests(e.id)}>Guests</button>
          {!compact && onDelete && (
            <button className="em-btn sm danger" onClick={() => onDelete(e.id)}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Events Panel ───────────────────────────────────────────────────────────
function EventsPanel({ events, guests, onAdd, onDelete, onViewGuests, onRsvpLink }) {
  return (
    <div>
      <h1 className="em-page-title">Events</h1>
      <p className="em-page-sub">Manage your event portfolio</p>
      <div className="em-section-head">
        <span className="em-section-title">All Events</span>
        <button className="em-btn primary" onClick={onAdd}>+ New Event</button>
      </div>
      {events.length === 0 && <p className="em-empty">No events yet. Create your first event.</p>}
      <div className="em-event-grid">
        {events.map(e => (
          <EventCard key={e.id} event={e} guests={guests} onViewGuests={onViewGuests} onRsvpLink={onRsvpLink} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

// ── Guest List Panel ───────────────────────────────────────────────────────
function GuestsPanel({ events, guests, onUpdateRsvp, onRemove, filterEventId, setFilterEventId }) {
  const [search, setSearch] = useState("");
  const [rsvpFilter, setRsvpFilter] = useState("");

  const filtered = useMemo(() => guests.filter(g => {
    const name = `${g.first} ${g.last}`.toLowerCase();
    const matchSearch = !search || name.includes(search.toLowerCase()) || g.email.includes(search.toLowerCase());
    const matchEvent = !filterEventId || g.eventId === parseInt(filterEventId);
    const matchRsvp = !rsvpFilter || g.rsvp === rsvpFilter;
    return matchSearch && matchEvent && matchRsvp;
  }), [guests, search, filterEventId, rsvpFilter]);

  const getEventName = (id) => events.find(e => e.id === id)?.name || "—";

  return (
    <div>
      <h1 className="em-page-title">Guest List</h1>
      <p className="em-page-sub">Track and manage all RSVPs</p>

      <div className="em-filter-bar">
        <input className="em-input" placeholder="Search guests…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="em-select" value={filterEventId} onChange={e => setFilterEventId(e.target.value)}>
          <option value="">All events</option>
          {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <select className="em-select" value={rsvpFilter} onChange={e => setRsvpFilter(e.target.value)}>
          <option value="">All responses</option>
          <option value="yes">Attending</option>
          <option value="no">Not Attending</option>
          <option value="maybe">Maybe</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="em-table-wrap">
        <table className="em-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Event</th>
              <th>RSVP</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: "center", padding: "2.5rem", color: "#bdb3a8", fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: 15 }}>No guests match your filters.</td></tr>
            )}
            {filtered.map(g => (
              <tr key={g.id}>
                <td>
                  <div className="em-td-name">
                    <Avatar first={g.first} last={g.last} />
                    <div>
                      <div className="em-name-text">{g.first} {g.last}</div>
                      <div className="em-email-text">{g.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 12, color: "#7a6e62" }}>{getEventName(g.eventId)}</td>
                <td><RsvpBadge rsvp={g.rsvp} /></td>
                <td style={{ fontSize: 12, color: "#bdb3a8" }}>{g.date}</td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <select className="em-rsvp-select" value={g.rsvp} onChange={e => onUpdateRsvp(g.id, e.target.value)}>
                      <option value="yes">Yes</option>
                      <option value="maybe">Maybe</option>
                      <option value="no">No</option>
                      <option value="pending">Pending</option>
                    </select>
                    <button className="em-btn sm danger" onClick={() => onRemove(g.id)}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Registration Form ──────────────────────────────────────────────────────
function RegisterPanel({ events, onSubmit }) {
  const [form, setForm] = useState({ first: "", last: "", email: "", eventId: "", rsvp: "yes", message: "" });

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = () => {
    if (!form.first || !form.last || !form.email || !form.eventId) return;
    onSubmit({ ...form, eventId: parseInt(form.eventId) });
    setForm({ first: "", last: "", email: "", eventId: "", rsvp: "yes", message: "" });
  };

  return (
    <div>
      <h1 className="em-page-title">Registration</h1>
      <p className="em-page-sub">Register a new guest for an event</p>

      <div className="em-form-card">
        <div className="em-form-grid">
          <div className="em-form-group">
            <label className="em-label">First Name</label>
            <input className="em-input" placeholder="Jane" value={form.first} onChange={set("first")} />
          </div>
          <div className="em-form-group">
            <label className="em-label">Last Name</label>
            <input className="em-input" placeholder="Smith" value={form.last} onChange={set("last")} />
          </div>
          <div className="em-form-group full">
            <label className="em-label">Email Address</label>
            <input className="em-input" type="email" placeholder="jane@example.com" value={form.email} onChange={set("email")} />
          </div>
          <div className="em-form-group full">
            <label className="em-label">Select Event</label>
            <select className="em-select" value={form.eventId} onChange={set("eventId")}>
              <option value="">Choose an event…</option>
              {events.map(e => <option key={e.id} value={e.id}>{e.name} — {fmtDate(e.date)}</option>)}
            </select>
          </div>
          <div className="em-form-group full">
            <label className="em-label">RSVP Status</label>
            <select className="em-select" value={form.rsvp} onChange={set("rsvp")}>
              <option value="yes">Yes, I'll attend</option>
              <option value="maybe">Maybe</option>
              <option value="no">Can't make it</option>
            </select>
          </div>
          <div className="em-form-group full">
            <label className="em-label">Message (optional)</label>
            <textarea className="em-textarea" placeholder="Dietary requirements, questions…" value={form.message} onChange={set("message")} />
          </div>
        </div>
        <div className="em-form-footer">
          <button className="em-btn ghost" onClick={() => setForm({ first: "", last: "", email: "", eventId: "", rsvp: "yes", message: "" })}>Clear</button>
          <button className="em-btn primary" onClick={handleSubmit}>Submit Registration</button>
        </div>
      </div>
    </div>
  );
}

// ── Add Event Modal ────────────────────────────────────────────────────────
function AddEventModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", date: "", time: "18:00", location: "", capacity: "", status: "upcoming" });
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = () => {
    if (!form.name || !form.date || !form.location || !form.capacity) return;
    onAdd({ ...form, capacity: parseInt(form.capacity) });
    onClose();
  };

  return (
    <div className="em-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="em-modal">
        <div className="em-modal-title">New Event</div>
        <div className="em-form-grid">
          <div className="em-form-group full">
            <label className="em-label">Event Name</label>
            <input className="em-input" placeholder="Annual Gala 2026" value={form.name} onChange={set("name")} />
          </div>
          <div className="em-form-group">
            <label className="em-label">Date</label>
            <input className="em-input" type="date" value={form.date} onChange={set("date")} />
          </div>
          <div className="em-form-group">
            <label className="em-label">Time</label>
            <input className="em-input" type="time" value={form.time} onChange={set("time")} />
          </div>
          <div className="em-form-group full">
            <label className="em-label">Location</label>
            <input className="em-input" placeholder="The Grand Hall, Karachi" value={form.location} onChange={set("location")} />
          </div>
          <div className="em-form-group">
            <label className="em-label">Capacity</label>
            <input className="em-input" type="number" placeholder="100" value={form.capacity} onChange={set("capacity")} />
          </div>
          <div className="em-form-group">
            <label className="em-label">Status</label>
            <select className="em-select" value={form.status} onChange={set("status")}>
              <option value="upcoming">Upcoming</option>
              <option value="live">Live (Open)</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="em-form-footer">
          <button className="em-btn ghost" onClick={onClose}>Cancel</button>
          <button className="em-btn primary" onClick={handleAdd}>Create Event</button>
        </div>
      </div>
    </div>
  );
}

// ── RSVP Link Modal ────────────────────────────────────────────────────────
function RsvpLinkModal({ event: e, onClose }) {
  const link = `https://events.example.com/rsvp/${e.id}/${e.name.toLowerCase().replace(/\s+/g, "-")}`;
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="em-overlay" onClick={ev => ev.target === ev.currentTarget && onClose()}>
      <div className="em-modal">
        <div className="em-modal-title">RSVP Link</div>
        <p style={{ fontSize: 13, color: "#9a8f82", marginBottom: 8 }}>Share this link so guests can register for <em style={{ fontFamily: "'Cormorant Garamond', serif" }}>{e.name}</em>.</p>
        <div className="em-link-box">
          <code>{link}</code>
          <button className="em-btn sm" onClick={copy}>{copied ? "Copied!" : "Copy"}</button>
        </div>
        <div className="em-form-footer">
          <button className="em-btn primary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────
function Toast({ message }) {
  return <div className={`em-toast ${message ? "show" : ""}`}>{message}</div>;
}

// ── Root App ───────────────────────────────────────────────────────────────
export default function EventManagement() {
  const [tab, setTab] = useState("dashboard");
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [guests, setGuests] = useState(INITIAL_GUESTS);
  const [nextEventId, setNextEventId] = useState(4);
  const [nextGuestId, setNextGuestId] = useState(8);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [rsvpLinkEvent, setRsvpLinkEvent] = useState(null);
  const [filterEventId, setFilterEventId] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2400);
  };

  const addEvent = (ev) => {
    setEvents(es => [...es, { ...ev, id: nextEventId }]);
    setNextEventId(n => n + 1);
    showToast("Event created");
  };

  const deleteEvent = (id) => {
    setEvents(es => es.filter(e => e.id !== id));
    setGuests(gs => gs.filter(g => g.eventId !== id));
    showToast("Event removed");
  };

  const addGuest = ({ first, last, email, eventId, rsvp, message }) => {
    const dup = guests.find(g => g.email === email && g.eventId === eventId);
    if (dup) { showToast("Guest already registered for this event"); return; }
    setGuests(gs => [...gs, { id: nextGuestId, first, last, email, eventId, rsvp, date: "Today", message }]);
    setNextGuestId(n => n + 1);
    showToast("Registration submitted");
  };

  const updateRsvp = (id, val) => {
    setGuests(gs => gs.map(g => g.id === id ? { ...g, rsvp: val } : g));
    showToast("RSVP updated");
  };

  const removeGuest = (id) => {
    setGuests(gs => gs.filter(g => g.id !== id));
    showToast("Guest removed");
  };

  const viewGuests = (eventId) => {
    setFilterEventId(String(eventId));
    setTab("guests");
  };

  return (
    <div className="em-root">
      <style>{FONTS}{css}</style>
      <div className="em-shell">
        {/* Sidebar */}
        <aside className="em-sidebar">
          <div className="em-logo">ICCD Event Management<span>.</span></div>
          {NAV_ITEMS.map(n => (
            <div key={n.id} className={`em-nav-item ${tab === n.id ? "active" : ""}`} onClick={() => setTab(n.id)}>
              <span className="em-nav-icon">{n.icon}</span>
              {n.label}
            </div>
          ))}
        </aside>

        {/* Main */}
        <main className="em-main">
          {tab === "dashboard" && (
            <Dashboard events={events} guests={guests} onViewGuests={viewGuests} onRsvpLink={setRsvpLinkEvent} />
          )}
          {tab === "events" && (
            <EventsPanel events={events} guests={guests} onAdd={() => setShowAddEvent(true)} onDelete={deleteEvent} onViewGuests={viewGuests} onRsvpLink={setRsvpLinkEvent} />
          )}
          {tab === "guests" && (
            <GuestsPanel events={events} guests={guests} onUpdateRsvp={updateRsvp} onRemove={removeGuest} filterEventId={filterEventId} setFilterEventId={setFilterEventId} />
          )}
          {tab === "register" && (
            <RegisterPanel events={events} onSubmit={addGuest} />
          )}
        </main>
      </div>

      {showAddEvent && <AddEventModal onClose={() => setShowAddEvent(false)} onAdd={addEvent} />}
      {rsvpLinkEvent && <RsvpLinkModal event={rsvpLinkEvent} onClose={() => setRsvpLinkEvent(null)} />}
      <Toast message={toast} />
    </div>
  );
}