"use client";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Camera,
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  Gift,
  LocateFixed,
  MapPin,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import type { LivePrice } from "./live-prices";

const trend = [
  { month: "Apr", basket: 96.4 },
  { month: "May", basket: 97.8 },
  { month: "Jun", basket: 99.1 },
  { month: "Jul", basket: 100.0 },
  { month: "Aug", basket: 102.4 },
  { month: "Sep", basket: 103.7 },
];
const shops = [
  {
    name: "Miles Market",
    area: "Pembroke",
    fresh: "17 Sep 2026",
    count: 24,
    x: 44,
    y: 25,
  },
];

const majorStores = [
  ["The MarketPlace", ["Hamilton — Church Street", "Shelly Bay", "Heron Bay", "Somerset", "Victoria Street", "Paget", "Smith's"]],
  ["Lindo's", ["Devonshire", "Warwick"]],
  ["Supermart", ["The Supermart — Hamilton", "Somer's Supermart — St George's"]],
  ["Independent", ["Miles Market — Pembroke", "The English Market — Hamilton"]],
] as const;

export default function PriceWatch({
  user,
  signInPath,
  prices,
  coverage,
  isAdmin,
}: {
  user: { name: string; email: string } | null;
  signInPath: string;
  prices: LivePrice[];
  coverage: { retailer: string; listings: string; status: string; detail: string }[];
  isAdmin: boolean;
}) {
  const [tab, setTab] = useState<"overview" | "prices" | "index" | "map" | "offers" | "agent" | "analytics" | "privacy">(
    "overview",
  );
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [menu, setMenu] = useState(false);
  const [submissionType, setSubmissionType] = useState<"tag" | "receipt">("tag");
  const [store, setStore] = useState("The MarketPlace — Hamilton — Church Street");
  const [geo, setGeo] = useState<{ latitude: number; longitude: number } | null>(null);
  const filtered = useMemo(
    () =>
      prices.filter((p) => p.item.toLowerCase().includes(query.toLowerCase()) && (category === "All categories" || p.category === category)),
    [prices, query, category],
  );
  const categories = ["All categories", ...Array.from(new Set(prices.map((p) => p.category)))];
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(submissionType === "receipt" ? "/api/receipts" : "/api/observations", {
      method: "POST",
      body: new FormData(e.currentTarget),
    });
    if (!response.ok) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 1500);
  };
  const locate = () => navigator.geolocation?.getCurrentPosition((position) => setGeo({ latitude: position.coords.latitude, longitude: position.coords.longitude }));
  return (
    <main className="min-h-screen bg-[#f4f7f6] text-[#142d2a]">
      <header className="sticky top-0 z-30 border-b border-[#d9e4e1] bg-[#f9fbfa]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-5 px-4 sm:px-7">
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMenu(!menu)}
          >
            <Menu />
          </button>
          <div className="flex shrink-0 items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#006b5c] text-white">
              <ShoppingBasket size={21} />
            </span>
            <div>
              <div className="font-black tracking-[-.03em]">
                BERMUDA SAVER
              </div>
              <div className="text-[11px] font-bold tracking-[.18em] text-[#66807b]">
                PRICE WATCH · PRICE INDEX
              </div>
            </div>
          </div>
          <nav
            className={`${menu ? "flex" : "hidden"} absolute left-4 right-4 top-[76px] flex-col rounded-xl border bg-white p-3 shadow-xl md:static md:ml-6 md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {(["overview", "prices", "index", "offers", "agent", "privacy", ...(isAdmin ? ["analytics" as const] : [])] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setMenu(false);
                }}
                className={`rounded-lg px-4 py-2 text-sm font-bold capitalize ${tab === t ? "bg-[#dceee9] text-[#006b5c]" : "text-[#617570] hover:bg-white"}`}
              >
                {t}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-[#f6b73c] px-4 py-2.5 text-sm font-black text-[#26342f] shadow-sm hover:bg-[#ffc958]"
            >
              <Camera size={18} />
              <span className="hidden sm:inline">Submit a price</span>
            </button>
            {user ? (
              <div
                title={user.name}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-white bg-[#006b5c] text-white shadow"
              >
                <UserRound size={18} />
              </div>
            ) : (
              <a
                href={signInPath}
                target="_top"
                className="rounded-xl border border-[#b9cbc6] px-3 py-2 text-sm font-bold"
              >
                Sign in
              </a>
            )}
          </div>
        </div>
      </header>
      <div className="border-b border-[#cfe1dc] bg-[#e8f4f1]"><div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-2.5 text-sm sm:px-7"><ShieldCheck size={18} className="shrink-0 text-[#087963]" /><span className="flex-1"><b>Privacy by design:</b> spending data stays linked to your account only for the purposes you approve.</span><button onClick={() => setTab("privacy")} className="font-black text-[#087963]">Privacy centre</button></div></div>
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 lg:py-8">
        <section className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#087d69]">
              <span className="h-2 w-2 rounded-full bg-[#12a98b]" /> Live retailer snapshot · 17 Sep 2026
            </div>
            <h1 className="text-3xl font-black tracking-[-.045em] sm:text-[42px]">
              What is Bermuda paying?
            </h1>
            <p className="mt-2 max-w-2xl text-[#60736f]">
              Watch prices, follow the Bermuda Price Index and build smarter shopping habits.
            </p>
          </div>
          <div className="flex w-full gap-2 lg:w-[520px]">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="h-12 max-w-[190px] rounded-xl border border-[#cbdad6] bg-white px-3 text-sm font-bold">{categories.map((c) => <option key={c}>{c}</option>)}</select>
            <div className="relative flex-1">
            <Search
              className="absolute left-4 top-3.5 text-[#7e928d]"
              size={19}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search milk, rice, detergent…"
              className="h-12 w-full rounded-xl border border-[#cbdad6] bg-white pl-11 pr-4 outline-none ring-[#79b9aa] focus:ring-2"
            />
            </div>
          </div>
        </section>
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat
            label="Verified live prices"
            value={String(prices.length)}
            note="Auditable first snapshot"
            change="Miles Market"
            positive
          />
          <Stat
            label="Source opportunity"
            value="744+"
            note="Public catalogue listings"
            change="2 retailers tested"
            positive
          />
          <Stat
            label="Collection status"
            value="Pilot"
            note="1 live · 3 in testing"
            change="Source-labelled"
            positive
          />
          <Stat
            label="Your rewards"
            value={user ? "280 pts" : "Join & earn"}
            note={
              user ? "220 pts to next voucher" : "Verified prices earn points"
            }
            change={user ? "$5 discount available" : "Free registration"}
            positive
          />
        </div>
        {tab === "offers" ? (
          <Rewards
            user={user}
            signInPath={signInPath}
            onSubmit={() => setOpen(true)}
          />
        ) : tab === "map" ? (
          <MapPanel />
        ) : tab === "agent" ? (
          <SaverAgent user={user} signInPath={signInPath} prices={prices} />
        ) : tab === "analytics" && isAdmin ? (
          <AnalyticsPortal prices={prices} coverage={coverage} />
        ) : tab === "privacy" ? (
          <PrivacyCentre />
        ) : (
          <div className="grid gap-5 xl:grid-cols-[1.55fr_.85fr]">
            <section className="rounded-2xl border border-[#d8e4e1] bg-white p-5 shadow-[0_5px_24px_rgba(17,65,58,.05)] sm:p-6">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-black">Island price trend</h2>
                  <p className="text-sm text-[#6b807b]">
                    Index: July 2026 = 100 · simulated demonstration data
                  </p>
                </div>
                <button className="flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-bold">
                  6 months <ChevronDown size={15} />
                </button>
              </div>
              <div className="h-[290px] w-full">
                <ResponsiveContainer>
                  <AreaChart
                    data={trend}
                    margin={{ left: -18, right: 6, top: 8, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="0"
                          stopColor="#0c8c75"
                          stopOpacity=".32"
                        />
                        <stop offset="1" stopColor="#0c8c75" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="#e6eeec" />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#70837f", fontSize: 12 }}
                    />
                    <YAxis
                      domain={[94, 106]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#70837f", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #d8e4e1",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="basket"
                      stroke="#087c68"
                      strokeWidth={3}
                      fill="url(#fill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t pt-5">
                <Mini label="Groceries" value="+4.6%" />
                <Mini label="Household" value="+2.1%" />
                <Mini label="Fresh food" value="+5.8%" />
              </div>
            </section>
            <MapPanel compact />
          </div>
        )}
        {(["overview", "prices", "index"] as string[]).includes(tab) && (
          <section className="mt-5 overflow-hidden rounded-2xl border border-[#d8e4e1] bg-white shadow-[0_5px_24px_rgba(17,65,58,.05)]">
            <div className="flex items-center justify-between p-5 sm:p-6">
              <div>
                <h2 className="text-xl font-black">Live retailer prices</h2>
                <p className="text-sm text-[#6b807b]">
                  Published online by Miles Market · prices may change
                </p>
              </div>
              <button className="text-sm font-black text-[#067763]">
                View all prices →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead className="bg-[#f4f8f7] text-xs uppercase tracking-wider text-[#6a7d79]">
                  <tr>
                    {[
                      "Product / category",
                      "Price",
                      "Observed",
                      "Evidence",
                      "Retailer",
                    ].map((h) => (
                      <th key={h} className="px-6 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr key={p.item} className="border-t border-[#e6eeec]">
                      <td className="px-6 py-4">
                        <b>{p.item}</b>
                        <div className="text-xs text-[#7a8d88]">{p.size} · {p.category}</div>
                      </td>
                      <td className="px-6 py-4 text-lg font-black text-[#05715f]">
                        ${p.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        17 Sep 2026
                      </td>
                      <td className="px-6 py-4"><a className="font-bold text-[#087963] underline decoration-[#9bc9be] underline-offset-4" href={p.sourceUrl} target="_blank" rel="noreferrer">Retailer page</a></td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-[#e7f2ef] px-3 py-1.5 text-sm font-bold">
                          {p.shop}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {tab === "overview" && (
          <section className="mt-5 rounded-2xl border border-[#d8e4e1] bg-[#eaf3f1] p-5 sm:p-6">
            <div className="mb-4"><h2 className="text-lg font-black">Price intelligence fleet</h2><p className="text-sm text-[#637873]">Four specialised agents collect, reconcile and publish each observation with its source and confidence score.</p></div>
            <div className="grid gap-3 md:grid-cols-4">{[["01","Retailer feed agent","Reads public online catalogues"],["02","Community intake agent","Structures photos and geolocation"],["03","Verification agent","Matches product, size and store"],["04","Index & alert agent","Calculates trends and flags jumps"]].map(a => <div key={a[0]} className="rounded-xl border border-[#ccdfda] bg-white p-4"><span className="text-xs font-black text-[#0b806b]">AGENT {a[0]}</span><div className="mt-2 font-black">{a[1]}</div><p className="mt-1 text-xs leading-5 text-[#6a7f7a]">{a[2]}</p></div>)}</div>
          </section>
        )}
        {tab === "overview" && (
          <section className="mt-5 rounded-2xl border border-[#d8e4e1] bg-white p-5 sm:p-6">
            <div className="mb-4"><h2 className="text-lg font-black">Source coverage audit</h2><p className="text-sm text-[#637873]">What we can collect now, and what still needs a retailer-specific adapter.</p></div>
            <div className="grid gap-3 lg:grid-cols-2">{coverage.map((s) => <div key={s.retailer} className="rounded-xl border border-[#dce7e4] p-4"><div className="flex items-start justify-between gap-3"><div><div className="font-black">{s.retailer}</div><div className="mt-1 text-sm text-[#6a7f7a]">{s.detail}</div></div><div className="text-right"><div className="text-lg font-black text-[#087963]">{s.listings}</div><div className="text-xs font-bold text-[#6a7f7a]">{s.status}</div></div></div></div>)}</div>
          </section>
        )}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[#102d28]/70 p-3 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.currentTarget === e.target) setOpen(false);
          }}
        >
          <div className="max-h-[94vh] w-full max-w-[610px] overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5 sm:px-7">
              <div>
                <h2 className="text-2xl font-black">Submit a shelf price</h2>
                <p className="text-sm text-[#687d78]">
                  A photo and location help us verify it quickly.
                </p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X />
              </button>
            </div>
            {submitted ? (
              <div className="grid min-h-[360px] place-items-center p-8 text-center">
                <div>
                  <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#dff2ed] text-[#087963]">
                    <Check size={34} />
                  </div>
                  <h3 className="text-2xl font-black">Price received</h3>
                  <p className="mt-2 text-[#687d78]">
                    It is queued for {submissionType === "receipt" ? "OCR and verification" : "verification"}. You earned {submissionType === "receipt" ? 50 : 20} pending points.
                  </p>
                </div>
              </div>
            ) : !user ? (
              <div className="p-8 text-center">
                <UserRound className="mx-auto mb-4 text-[#087963]" size={48} />
                <h3 className="text-xl font-black">Register to contribute</h3>
                <p className="mx-auto mt-2 max-w-sm text-[#687d78]">
                  Accounts protect the quality of the data and let us credit
                  your points and discounts.
                </p>
                <a
                  href={signInPath}
                  target="_top"
                  className="mt-6 inline-block rounded-xl bg-[#087963] px-6 py-3 font-black text-white"
                >
                  Register or sign in
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5 p-5 sm:p-7">
                <div className="grid grid-cols-2 rounded-xl bg-[#eef4f2] p-1"><button type="button" onClick={() => setSubmissionType("tag")} className={`rounded-lg px-3 py-2.5 text-sm font-black ${submissionType === "tag" ? "bg-white text-[#087963] shadow-sm" : "text-[#6b807b]"}`}>Shelf price · 20 pts</button><button type="button" onClick={() => setSubmissionType("receipt")} className={`rounded-lg px-3 py-2.5 text-sm font-black ${submissionType === "receipt" ? "bg-white text-[#087963] shadow-sm" : "text-[#6b807b]"}`}>Full receipt · 50 pts</button></div>
                <label className="block">
                  <span className="label">{submissionType === "receipt" ? "Receipt photograph" : "Price-tag photograph"}</span>
                  <span className="mt-2 grid min-h-[142px] cursor-pointer place-items-center rounded-xl border-2 border-dashed border-[#a8c6be] bg-[#f5faf8] text-center">
                    <span>
                      <Upload className="mx-auto mb-2 text-[#087963]" />
                      <b>Choose a photo</b>
                      <small className="block text-[#718681]">
                        JPG, PNG or HEIC · max {submissionType === "receipt" ? 12 : 10} MB
                      </small>
                    </span>
                    <input
                      name="photo"
                      required
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="sr-only"
                    />
                  </span>
                </label>
                {submissionType === "tag" && <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Product" placeholder="e.g. Whole milk 1 L" />
                  <Field label="Price (BMD)" placeholder="4.65" type="number" />
                </div>}
                {submissionType === "receipt" && <div className="rounded-xl border border-[#cfe1dc] bg-[#f5faf8] p-4 text-sm text-[#54706a]"><b className="text-[#173a34]">The scanner will extract:</b> retailer, purchase date, item names, quantities, unit prices, discounts and total. The original photo is retained for verification and duplicate detection.</div>}
                <label className="block">
                  <span className="label">Store location</span>
                  <div className="mt-2 flex gap-2">
                    <select name="store" required className="field" value={store} onChange={(e) => setStore(e.target.value)}>
                      {majorStores.map(([group, locations]) => <optgroup key={group} label={group}>{locations.map((location) => <option key={location} value={`${group} — ${location}`}>{location}</option>)}</optgroup>)}
                      <option value="Other store">Other store / add later</option>
                    </select>
                    <button
                      type="button"
                      title="Use current location"
                      onClick={locate}
                      className="rounded-xl border px-4 text-[#087963]"
                    >
                      <LocateFixed />
                    </button>
                  </div>
                  <input type="hidden" name="latitude" value={geo?.latitude ?? ""} />
                  <input type="hidden" name="longitude" value={geo?.longitude ?? ""} />
                  <small className="mt-2 block text-[#718681]">{geo ? "GPS location attached." : "GPS is optional, but helps verify the supermarket."}</small>
                </label>
                <label className="block"><span className="label">what3words address <span className="font-normal text-[#718681]">(optional)</span></span><input name="what3words" placeholder="e.g. ///word.word.word" pattern="^///[A-Za-zÀ-ÿ-]+\.[A-Za-zÀ-ÿ-]+\.[A-Za-zÀ-ÿ-]+$" className="field mt-2" /><small className="mt-2 block text-[#718681]">Useful when the phone's map pin is imprecise. Enter the three words shown in the what3words app.</small></label>
                <label className="flex gap-3 rounded-xl bg-[#f3f7f6] p-4 text-sm">
                  <input required type="checkbox" />
                  <span>
                    I confirm this {submissionType === "receipt" ? "is my recent shopping receipt" : "price was visible in-store today"} and agree that the photograph and approximate store location may be used to verify the submission.
                  </span>
                </label>
                <button className="w-full rounded-xl bg-[#f6b73c] py-3.5 font-black">
                  {submissionType === "receipt" ? "Scan receipt · earn 50 points" : "Send for verification · earn 20 points"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

function Stat({
  label,
  value,
  note,
  change,
  positive = false,
}: {
  label: string;
  value: string;
  note: string;
  change: string;
  positive?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#d8e4e1] bg-white p-5 shadow-[0_5px_24px_rgba(17,65,58,.04)]">
      <div className="text-sm font-bold text-[#6b807b]">{label}</div>
      <div className="my-1 text-[29px] font-black tracking-tight">{value}</div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#748783]">{note}</span>
        <span
          className={
            positive ? "font-bold text-[#087963]" : "font-bold text-[#b65b34]"
          }
        >
          {change}
        </span>
      </div>
    </div>
  );
}
function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-bold text-[#71837f]">{label}</div>
      <div className="text-lg font-black">{value}</div>
    </div>
  );
}
function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <input
        name={type === "number" ? "price" : "product"}
        required
        type={type}
        step={type === "number" ? "0.01" : undefined}
        placeholder={placeholder}
        className="field mt-2"
      />
    </label>
  );
}
function SaverAgent({ user, signInPath, prices }: { user: { name: string; email: string } | null; signInPath: string; prices: LivePrice[] }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("Ask about a product, a cheaper alternative, or where your basket may be rising.");
  const ask = () => {
    const q = question.toLowerCase();
    const matches = prices.filter((p) => q.split(/\s+/).some((word) => word.length > 3 && p.item.toLowerCase().includes(word))).slice(0, 3);
    setAnswer(matches.length ? `I found ${matches.map((p) => `${p.item} at $${p.price.toFixed(2)} (${p.shop})`).join("; ")}. These are retailer-published prices from 17 September 2026.` : "I don't have a reliable match yet. Try a product name or category; I will not invent a price when the data is missing.");
  };
  return <div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><section className="rounded-2xl bg-[#073f36] p-7 text-white"><div className="flex items-center gap-2 text-[#91e2cf]"><Bot /><b>Saver Agent</b></div><h2 className="mt-5 text-3xl font-black">Your island shopping copilot</h2><p className="mt-2 text-[#bad7d0]">Ask grounded questions about captured prices. The agent cites what it knows and says when the dataset is incomplete.</p><div className="mt-6 flex gap-2"><input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ask()} placeholder="What is the latest banana price?" className="min-w-0 flex-1 rounded-xl bg-white px-4 text-[#173a34]" /><button onClick={ask} className="rounded-xl bg-[#f6b73c] px-5 py-3 font-black text-[#17342f]">Ask</button></div><div className="mt-4 rounded-xl bg-white/10 p-4 leading-6">{answer}</div></section><section className="rounded-2xl border bg-white p-6"><h3 className="text-xl font-black">Alerts & habits</h3><div className="mt-4 space-y-3">{["Tell me when staples fall in price", "Flag unusual basket increases", "Weekly savings summary", "Remind me to scan my receipt"].map((x) => <button key={x} className="flex w-full items-center gap-3 rounded-xl border p-4 text-left font-bold"><Bell size={18} className="text-[#087963]" />{x}</button>)}</div>{!user && <a href={signInPath} target="_top" className="mt-5 block rounded-xl bg-[#087963] py-3 text-center font-black text-white">Sign in to save alerts</a>}</section></div>;
}

function PrivacyCentre() {
  return <section className="rounded-2xl border border-[#cfe1dc] bg-white p-6 sm:p-8"><div className="flex items-center gap-3"><ShieldCheck size={30} className="text-[#087963]" /><div><h2 className="text-2xl font-black">PIPA privacy centre</h2><p className="text-[#637873]">Designed around purpose limitation, proportionality and user control.</p></div></div><div className="mt-7 grid gap-4 md:grid-cols-2">{[["What we collect","Account identity, submitted photos, store, prices, receipt contents and optional location."],["Why we use it","To verify prices, calculate rewards, personalise alerts and produce de-identified price statistics."],["Your controls","Access, correct, export or request deletion of your personal information; withdraw optional permissions."],["Receipt protection","Cover card numbers and unrelated details. Originals are private and separated from public price observations."],["Sharing & analytics","Retailers receive aggregated trends, never identifiable shopper histories without separate explicit permission."],["Retention & security","Raw receipt images use restricted storage and a defined deletion schedule; access and exports are logged."]].map(([title,body]) => <div key={title} className="rounded-xl bg-[#f2f8f6] p-5"><h3 className="font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#637873]">{body}</p></div>)}</div><div className="mt-6 rounded-xl border border-[#f0d391] bg-[#fff8e8] p-4 text-sm"><b>Governance required before public launch:</b> appoint a Privacy Officer, approve the retention schedule, complete privacy and overseas-transfer impact assessments, test breach procedures, and publish the final legal privacy notice.</div></section>;
}

function AnalyticsPortal({ prices, coverage }: { prices: LivePrice[]; coverage: { retailer: string; listings: string; status: string; detail: string }[] }) {
  const average = prices.reduce((sum, p) => sum + p.price, 0) / Math.max(1, prices.length);
  return <section className="space-y-5"><div className="rounded-2xl bg-[#112f2b] p-7 text-white"><div className="flex items-center gap-2 text-[#8de0cc]"><BarChart3 /><b>Protected analytics portal</b></div><h2 className="mt-4 text-3xl font-black">Commercial price intelligence</h2><p className="mt-2 text-[#bad7d0]">Aggregate market signals for authorised analysts and registered retailers. No individual shopping histories are exposed.</p></div><div className="grid gap-4 sm:grid-cols-3"><Stat label="Verified observations" value={String(prices.length)} note="First live snapshot" change="Source-linked" positive /><Stat label="Average listed price" value={`$${average.toFixed(2)}`} note="All current categories" change="Not a basket index" /><Stat label="Collection pipeline" value={String(coverage.length)} note="Retailer sources assessed" change="1 live" positive /></div><div className="rounded-2xl border bg-white p-6"><h3 className="text-xl font-black">Monetisable datasets</h3><div className="mt-4 grid gap-3 md:grid-cols-3">{[["Price Index API","Category and basket movements by period"],["Retail benchmark","Anonymous position versus island ranges"],["Promotion intelligence","Offer performance using aggregated redemption data"]].map(([a,b]) => <div key={a} className="rounded-xl border p-4"><b>{a}</b><p className="mt-1 text-sm text-[#637873]">{b}</p></div>)}</div></div></section>;
}
function MapPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section className="rounded-2xl border border-[#d8e4e1] bg-white p-5 shadow-[0_5px_24px_rgba(17,65,58,.05)] sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-black">Store coverage</h2>
          <p className="text-sm text-[#6b807b]">
            Latest confirmed observations
          </p>
        </div>
        <span className="rounded-full bg-[#e2f2ed] px-3 py-1 text-xs font-black text-[#087963]">
          1 verified retailer
        </span>
      </div>
      <div
        className={`relative overflow-hidden rounded-xl bg-[#d8ebe6] ${compact ? "h-[205px]" : "h-[320px]"}`}
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(28deg, transparent 44%, #a9d2c7 45%, #a9d2c7 48%, transparent 49%), linear-gradient(155deg, transparent 36%, #badbd3 37%, #badbd3 41%, transparent 42%)",
          }}
        />
        <div className="absolute left-[8%] top-[42%] h-[32%] w-[84%] -rotate-[8deg] rounded-[50%] bg-[#f1d18c] shadow-inner" />
        {shops.map((s) => (
          <div
            key={s.name}
            className="group absolute"
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
          >
            <span className="grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#087963] text-white shadow">
              <MapPin size={14} />
            </span>
            <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden w-44 -translate-x-1/2 rounded-lg bg-[#173c35] p-2 text-xs text-white shadow-xl group-hover:block">
              <b>{s.name}</b>
              <br />
              {s.count} prices · {s.fresh}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {shops.slice(0, compact ? 3 : 4).map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#14a488]" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold">{s.name}</div>
              <div className="text-xs text-[#7a8c88]">
                {s.area} · {s.count} prices
              </div>
            </div>
            <span className="text-xs font-bold text-[#617670]">{s.fresh}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
function Rewards({
  user,
  signInPath,
  onSubmit,
}: {
  user: { name: string; email: string } | null;
  signInPath: string;
  onSubmit: () => void;
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <section className="overflow-hidden rounded-2xl bg-[#073f36] p-7 text-white shadow-xl sm:p-9">
        <div className="flex items-center gap-2 text-[#8de0cc]">
          <Sparkles size={18} />
          <b className="text-sm uppercase tracking-widest">Bermuda Saver Offers</b>
        </div>
        <h2 className="mt-5 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">
          Turn reliable price checks into everyday savings.
        </h2>
        <p className="mt-3 max-w-xl text-[#b9d5ce]">
          Earn points when a photo is verified. Redeem discounts from
          participating shops, with no effect on how prices are ranked.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          <Mini label="Submit photo" value="+20 pts" />
          <Mini label="Verify update" value="+10 pts" />
          <Mini label="500 points" value="$5 reward" />
        </div>
        <button
          onClick={onSubmit}
          className="mt-8 rounded-xl bg-[#f6b73c] px-6 py-3 font-black text-[#17342f]"
        >
          Submit a price
        </button>
      </section>
      <section className="rounded-2xl border border-[#d8e4e1] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black">Offer marketplace preview</h2>
          <Gift className="text-[#087963]" />
        </div>
        <div className="mt-5 space-y-3">
          {[
            ["$5 off your basket", "Illustrative retailer offer", "500 pts"],
            ["10% off fresh produce", "Illustrative retailer offer", "650 pts"],
            ["Reusable shopping bag", "Illustrative community offer", "300 pts"],
          ].map((o) => (
            <div
              key={o[0]}
              className="flex items-center gap-4 rounded-xl border border-[#dce7e4] p-4"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#e5f2ef] font-black text-[#087963]">
                %
              </div>
              <div className="flex-1">
                <b>{o[0]}</b>
                <div className="text-xs text-[#758883]">{o[1]}</div>
              </div>
              <span className="text-sm font-black text-[#087963]">{o[2]}</span>
            </div>
          ))}
        </div>
        {!user && (
          <a
            href={signInPath}
            target="_top"
            className="mt-5 block rounded-xl bg-[#0a7462] py-3 text-center font-black text-white"
          >
            Register to earn rewards
          </a>
        )}
        <div className="mt-5 border-t pt-5"><b>For retailers</b><p className="mt-1 text-sm text-[#637873]">Verified retail accounts will be able to publish targeted offers with dates, point costs, audience rules and redemption reporting.</p><button className="mt-3 rounded-xl border border-[#087963] px-4 py-2 text-sm font-black text-[#087963]">Register retailer interest</button></div>
      </section>
    </div>
  );
}
