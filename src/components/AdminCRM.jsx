import { useState } from "react";
import {
  CheckCircle2,
  Eye,
  LayoutDashboard,
  MessageSquare,
  Pencil,
  PlusCircle,
  Trash2,
  Upload,
  X,
  UserRound,
  Users,
} from "lucide-react";

const sellers = [
  {
    id: "SEL-001",
    name: "মোঃ রফিকুল ইসলাম",
    phone: "+8801711000001",
    email: "rafiqul@example.com",
    nid: "ভেরিফাইড",
    listings: "২ active · ১ sold",
    type: "Individual Owner",
    joined: "০১ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "SEL-002",
    name: "রিভারভিউ বিল্ডার্স লিঃ",
    phone: "+8801811000002",
    email: "info@riverview.example",
    nid: "ভেরিফাইড",
    listings: "১ active",
    type: "Developer",
    joined: "০৫ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "SEL-003",
    name: "বরিশাল হোম বিল্ডার্স",
    phone: "+8801911000003",
    email: "hello@barishalhome.example",
    nid: "Pending",
    listings: "১ active",
    type: "Real Estate Agent",
    joined: "১১ সেপ্টেম্বর ২০২৬",
  },
];
const leads = [
  {
    id: "LEAD-001",
    name: "সাব্বির আহমেদ",
    phone: "+8801611000011",
    property: "LF-BRL-001",
    budget: "৳ ৪৫-৫৫ লাখ",
    area: "আমতলা",
    status: "New",
    note: "আজ কল করে বাজেট নিশ্চিত করতে হবে",
  },
  {
    id: "LEAD-002",
    name: "তানজিলা রহমান",
    phone: "+8801611000012",
    property: "LF-BRF-002",
    budget: "৳ ৬০-৭০ লাখ",
    area: "বগুড়া রোড",
    status: "Site Visit Scheduled",
    note: "আগামীকাল বিকেল ৪টায় site visit",
  },
  {
    id: "LEAD-003",
    name: "মোঃ নাঈম",
    phone: "+8801611000013",
    property: "LF-BRL-003",
    budget: "৳ ৮০-৯৫ লাখ",
    area: "সিএন্ডবি রোড",
    status: "Contacted",
    note: "ডকুমেন্টের ছবি পাঠানো হয়েছে",
  },
];
const statuses = ["Published", "Pending", "Sold"];
const transactions = [
  {
    id: "TXN-2026-001",
    property: "LF-BRL-001",
    type: "Income",
    category: "ব্রোকারেজ কমিশন",
    amount: 125000,
    method: "ব্যাংক ট্রান্সফার",
    status: "Paid",
    date: "১৪ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "TXN-2026-002",
    property: "LF-BRF-002",
    type: "Income",
    category: "ভেরিফিকেশন ফি",
    amount: 15000,
    method: "বিকাশ",
    status: "Paid",
    date: "১২ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "TXN-2026-003",
    property: "LF-BRL-003",
    type: "Income",
    category: "Featured listing ফি",
    amount: 10000,
    method: "ক্যাশ",
    status: "Pending",
    date: "১০ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "TXN-2026-004",
    property: "-",
    type: "Expense",
    category: "টিম ও স্টাফ খরচ",
    amount: 18000,
    method: "ক্যাশ",
    status: "Paid",
    date: "০৮ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "TXN-2026-005",
    property: "-",
    type: "Expense",
    category: "মার্কেটিং ও বিজ্ঞাপন",
    amount: 12000,
    method: "ব্যাংক ট্রান্সফার",
    status: "Paid",
    date: "০৫ সেপ্টেম্বর ২০২৬",
  },
  {
    id: "TXN-2026-006",
    property: "-",
    type: "Expense",
    category: "অফিস পরিচালনা",
    amount: 25000,
    method: "ব্যাংক ট্রান্সফার",
    status: "Due",
    date: "০১ সেপ্টেম্বর ২০২৬",
  },
];

export default function AdminCRM({
  properties,
  setProperties,
  isLoggedIn,
  setIsLoggedIn,
  pin,
  setPin,
}) {
  const [tab, setTab] = useState("inventory");
  const [leadRecords, setLeadRecords] = useState(leads);
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  if (!isLoggedIn)
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white border rounded-xl text-center">
        <h2 className="font-bold text-lg mb-4">এডমিন প্যানেল প্রবেশ করুন</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (pin === "1234") setIsLoggedIn(true);
            else alert("ভুল পিন (পাসওয়ার্ড: 1234)");
          }}
        >
          <input
            type="password"
            placeholder="PIN দিন (ডিফোল্ট: 1234)"
            value={pin}
            onChange={(event) => setPin(event.target.value)}
            className="w-full text-xs p-2.5 border rounded-lg mb-3"
          />
          <button
            type="submit"
            className="w-full bg-[#00875A] text-white py-2.5 rounded-lg text-xs font-bold"
          >
            লগইন
          </button>
        </form>
      </div>
    );
  const activeCount = properties.filter(
    (property) => property.status === "Published",
  ).length;
  const soldCount = properties.filter(
    (property) => property.status === "Sold",
  ).length;
  const changeStatus = (id) =>
    setProperties((current) =>
      current.map((property) =>
        property.id === id
          ? {
              ...property,
              status:
                statuses[
                  (statuses.indexOf(property.status) + 1) % statuses.length
                ],
              published:
                statuses[
                  (statuses.indexOf(property.status) + 1) % statuses.length
                ] === "Published",
            }
          : property,
      ),
    );
  const deleteProperty = (id) =>
    setProperties((current) =>
      current.filter((property) => property.id !== id),
    );
  const handleLeadAction = (lead) => {
    setProperties((current) => current.map((property) => property.propertyId === lead.property ? { ...property, leadCount: (property.leadCount || 0) + 1 } : property));
    setLeadRecords((current) => current.map((item) => item.id === lead.id ? { ...item, status: "Contacted", lastFollowUpDate: formatFollowUpDate(new Date()) } : item));
  };
  if (selectedLocation) {
    return <LocationDetailsPage location={selectedLocation} properties={properties} leads={leadRecords} onBack={() => setSelectedLocation(null)} />;
  }
  const saveProperty = (property) => {
    setProperties((current) =>
      property.id
        ? current.map((item) => (item.id === property.id ? property : item))
        : [
            {
              ...property,
              id: `property-${Date.now()}`,
              propertyId: `LF-${property.type === "land" ? "BRL" : "BRF"}-${String(current.length + 1).padStart(3, "0")}`,
              createdAt: new Date().toISOString().slice(0, 10),
            },
            ...current,
          ],
    );
    setEditingProperty(null);
  };
  return (
    <div className="max-w-[1440px] mx-auto px-4 py-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#00875A]">
            Land&Flat CRM
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            বরিশাল অপারেশন ড্যাশবোর্ড
          </h1>
        </div>
        <button
          onClick={() => setIsLoggedIn(false)}
          className="self-start text-xs bg-red-100 text-red-600 px-3 py-2 rounded-lg font-bold"
        >
          লগআউট
        </button>
      </header>
      <div className="grid lg:grid-cols-[230px_minmax(0,1fr)] gap-6 items-start">
        <aside className="bg-white rounded-xl border border-gray-200 p-3 lg:sticky lg:top-24">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Admin options
          </p>
          <nav className="flex lg:flex-col gap-2 overflow-x-auto">
            <SideNavButton
              active={tab === "inventory" && editingProperty !== "new"}
              icon={LayoutDashboard}
              onClick={() => {
                setTab("inventory");
                setEditingProperty(null);
              }}
            >
              ইনভেন্টরি
            </SideNavButton>
            <SideNavButton
              active={editingProperty === "new"}
              icon={PlusCircle}
              onClick={() => {
                setTab("inventory");
                setEditingProperty("new");
              }}
            >
              নতুন listing
            </SideNavButton>
            <SideNavButton
              active={tab === "sellers"}
              icon={Users}
              onClick={() => {
                setTab("sellers");
                setEditingProperty(null);
              }}
            >
              সেলার মনিটরিং
            </SideNavButton>
            <SideNavButton
              active={tab === "leads"}
              icon={MessageSquare}
              onClick={() => {
                setTab("leads");
                setEditingProperty(null);
              }}
            >
              বায়ার ও লিড
            </SideNavButton>
            <SideNavButton
              active={tab === "finance"}
              icon={Eye}
              onClick={() => {
                setTab("finance");
                setEditingProperty(null);
              }}
            >
              অ্যাকাউন্টস / ফাইন্যান্স
            </SideNavButton>
          </nav>
        </aside>
        <section className="min-w-0">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <SummaryCard
              label="মোট প্রপার্টি"
              value={properties.length}
              icon={Users}
              color="text-blue-600"
            />
            <SummaryCard
              label="সক্রিয় লিস্টিং"
              value={activeCount}
              icon={CheckCircle2}
              color="text-[#00875A]"
            />
            <SummaryCard
              label="নতুন ইনকোয়ারি"
              value={leadRecords.filter((lead) => lead.status === "New").length}
              icon={MessageSquare}
              color="text-amber-600"
            />
            <SummaryCard
              label="বিক্রীত প্রপার্টি"
              value={soldCount}
              icon={CheckCircle2}
              color="text-violet-600"
            />
          </div>
          {tab === "inventory" && (
            <>
              {editingProperty && (
                <PropertyEditor
                  property={editingProperty === "new" ? null : editingProperty}
                  onSave={saveProperty}
                  onCancel={() => setEditingProperty(null)}
                />
              )}
              <InventoryTable
                inventory={properties}
                changeStatus={changeStatus}
                deleteProperty={deleteProperty}
                editProperty={setEditingProperty}
                onLocationSelect={setSelectedLocation}
              />
            </>
          )}
          {tab === "sellers" && <SellerTable />}
          {tab === "leads" && (
            <LeadTable leads={leadRecords} setLeads={setLeadRecords} onLeadAction={handleLeadAction} />
          )}
          {tab === "finance" && <FinanceTable />}
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{label}</span>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <strong className="block mt-2 text-2xl font-extrabold text-gray-900">
        {value}
      </strong>
    </div>
  );
}
function SideNavButton({ active, icon: Icon, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition lg:w-full ${active ? "bg-[#00875A] text-white shadow-sm" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );
}
function PropertyEditor({ property, onSave, onCancel }) {
  const [form, setForm] = useState(() => property ? { leadCount: 0, viewCount: 0, ...property } : {
    type: "land",
    title: "",
    location: "",
    area: "",
    description: "",
    price: "",
    formattedPrice: "",
    landSize: "",
    flatSize: "",
    image: "",
    video: "",
    leadCount: 0,
    viewCount: 0,
    status: "Published",
  });
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const readUpload = (field, file) => {
    if (!file) return;
    if (field === "video") {
      update(field, URL.createObjectURL(file));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update(field, reader.result);
    reader.readAsDataURL(file);
  };
  const submit = (event) => {
    event.preventDefault();
    const numericPrice = Number(form.price);
    onSave({
      ...form,
      price: numericPrice,
      formattedPrice: form.formattedPrice || `৳ ${numericPrice.toLocaleString("en-IN")}`,
      location: form.location.includes("বরিশাল") ? form.location : `${form.location}, বরিশাল`,
      area: form.area || form.location,
      description: form.description || form.title,
      verificationStatus: property?.verificationStatus || "Pending",
      published: form.status === "Published",
      images: form.image ? [form.image] : property?.images || ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"],
      video: form.video || property?.video || "",
      leadCount: Math.max(0, Number(form.leadCount) || 0),
      viewCount: Math.max(0, Number(form.viewCount) || 0),
    });
  };
  return (
    <form onSubmit={submit} className="mb-6 rounded-xl border border-[#00875A]/30 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-bold text-gray-900">{property ? "প্রপার্টি এডিট করুন" : "নতুন প্রপার্টি যোগ করুন"}</h2><p className="text-xs text-gray-500">Admin থেকে website listing আপডেট করুন</p></div><button type="button" onClick={onCancel} className="text-sm font-bold text-gray-500">বন্ধ করুন</button></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-gray-600">টাইপ<select value={form.type} onChange={(event) => update("type", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5"><option value="land">জমি</option><option value="flat">ফ্ল্যাট</option></select></label>
        <label className="text-xs font-bold text-gray-600">স্ট্যাটাস<select value={form.status} onChange={(event) => update("status", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5"><option value="Published">Published</option><option value="Pending">Pending</option><option value="Sold">Sold</option></select></label>
        <label className="text-xs font-bold text-gray-600 sm:col-span-2">শিরোনাম<input required value={form.title} onChange={(event) => update("title", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">এলাকা<input required value={form.location} onChange={(event) => update("location", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">আয়তন<input value={form.type === "land" ? form.landSize : form.flatSize} onChange={(event) => update(form.type === "land" ? "landSize" : "flatSize", event.target.value)} placeholder="১০ শতক / ১৪৫০ বর্গফুট" className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">মূল্য<input required type="number" value={form.price} onChange={(event) => update("price", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">লিড সংখ্যা<input min="0" type="number" value={form.leadCount} onChange={(event) => update("leadCount", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">ভিউ সংখ্যা<input min="0" type="number" value={form.viewCount} onChange={(event) => update("viewCount", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
        <label className="text-xs font-bold text-gray-600">প্রপার্টির ছবি<label className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 p-2.5 text-gray-500 hover:border-[#00875A] hover:text-[#00875A]"><Upload className="h-4 w-4" /><span className="truncate">{form.image ? "ছবি নির্বাচিত" : "ছবি আপলোড করুন"}</span><input type="file" accept="image/*" onChange={(event) => readUpload("image", event.target.files?.[0])} className="sr-only" /></label></label>
        <label className="text-xs font-bold text-gray-600">প্রপার্টি ভিডিও<label className="mt-1 flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 p-2.5 text-gray-500 hover:border-[#00875A] hover:text-[#00875A]"><Upload className="h-4 w-4" /><span className="truncate">{form.video ? "ভিডিও নির্বাচিত" : "ভিডিও আপলোড করুন"}</span><input type="file" accept="video/*" onChange={(event) => readUpload("video", event.target.files?.[0])} className="sr-only" /></label></label>
        <label className="text-xs font-bold text-gray-600 sm:col-span-2">বিবরণ<textarea value={form.description} onChange={(event) => update("description", event.target.value)} rows="3" className="mt-1 w-full rounded-lg border border-gray-300 p-2.5" /></label>
      </div>
      <div className="mt-4 flex gap-2"><button type="submit" className="rounded-lg bg-[#00875A] px-4 py-2 text-sm font-bold text-white">Save listing</button><button type="button" onClick={onCancel} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-bold text-gray-600">Cancel</button></div>
    </form>
  );
}

function InventoryTable({ inventory, changeStatus, deleteProperty, editProperty, onLocationSelect }) {
  const [locationFilter, setLocationFilter] = useState("all");
  const locations = [...new Set(inventory.map((property) => property.location))];
  const filteredInventory = inventory.filter((property) => locationFilter === "all" || property.location === locationFilter);

  return (
    <section>
      <div className="flex flex-col justify-between gap-3 mb-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            প্রপার্টি ইনভেন্টরি
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            সেলার, লিড এবং listing performance
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="text-xs font-bold text-gray-600">
          লোকেশন দিয়ে ফিল্টার
          <select value={locationFilter} onChange={(event) => setLocationFilter(event.target.value)} className="ml-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700">
            <option value="all">সব লোকেশন</option>
            {locations.map((location) => <option key={location} value={location}>{location}</option>)}
          </select>
        </label>
        <span className="text-xs text-gray-500">{filteredInventory.length} টি listing</span>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[720px] text-xs text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {[
                "লোকেশন",
                "লিড",
                "ভিউ",
                "স্ট্যাটাস",
                "অ্যাকশন",
              ].map((heading) => (
                <th key={heading} className="p-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((property) => (
              <tr
                key={property.id}
                onClick={() => onLocationSelect(property.location)}
                className="cursor-pointer border-t border-gray-100 align-top transition hover:bg-emerald-50/50"
              >
                <td className="p-4 text-gray-600">{property.location}</td>
                <td className="p-4 font-bold">{property.leadCount || 0}</td>
                <td className="p-4">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />{" "}
                    {property.viewCount || 0}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={(event) => { event.stopPropagation(); changeStatus(property.id); }}
                    className={`rounded-full px-2.5 py-1 font-bold ${property.status === "Sold" ? "bg-violet-100 text-violet-700" : property.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-[#00875A]"}`}
                  >
                    {property.status === "Published"
                      ? "Active"
                      : property.status}
                  </button>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={(event) => { event.stopPropagation(); onLocationSelect(property.location); }}
                      aria-label="বিস্তারিত দেখুন"
                      className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-[#00875A]"
                    >
                      বিস্তারিত দেখুন
                    </button>
                    <button
                      onClick={(event) => { event.stopPropagation(); editProperty(property); }}
                      aria-label="সম্পাদনা"
                      className="p-2 rounded-lg bg-blue-50 text-blue-600"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(event) => { event.stopPropagation(); deleteProperty(property.id); }}
                      aria-label="ডিলিট"
                      className="p-2 rounded-lg bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredInventory.length === 0 && <p className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">এই লোকেশনে কোনো listing পাওয়া যায়নি।</p>}
    </section>
  );
}

function LocationDetailsPage({ location, properties, leads, onBack }) {
  const landProperties = properties.filter((property) => property.location === location && property.type === "land");
  const locationLeads = leads.filter((lead) => location.includes(lead.area) || lead.area.includes(location));
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button onClick={onBack} className="mb-5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 hover:border-[#00875A] hover:text-[#00875A]">← ইনভেন্টরিতে ফিরে যান</button>
        <header className="mb-6 rounded-2xl bg-white p-6 shadow-sm"><p className="text-xs font-bold uppercase tracking-widest text-[#00875A]">Location details</p><h1 className="mt-2 text-2xl font-extrabold text-gray-900">{location}</h1><p className="mt-1 text-sm text-gray-500">এই লোকেশনের {landProperties.length} টি জমি এবং {locationLeads.length} টি lead</p></header>
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"><div className="border-b border-gray-200 bg-slate-50 px-5 py-4"><h2 className="font-bold text-gray-900">জমির তালিকা</h2></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-xs"><thead className="bg-white text-gray-500"><tr>{["SL", "প্রপার্টি হেডিং", "সেলারের নাম", "যোগাযোগ নম্বর", "স্ট্যাটাস", "জমির পরিমাণ", "জমির ধরন"].map((heading) => <th key={heading} className="border-b border-gray-200 px-5 py-4 font-bold">{heading}</th>)}</tr></thead><tbody>{landProperties.map((property, index) => { const seller = sellers[index % sellers.length]; return <tr key={property.id} className="border-b border-gray-100 hover:bg-emerald-50/40"><td className="px-5 py-4 font-bold text-[#00875A]">{index + 1}</td><td className="px-5 py-4"><strong className="block text-gray-900">{property.title}</strong><span className="text-[10px] text-gray-400">{property.propertyId} · {property.formattedPrice}</span></td><td className="px-5 py-4 font-semibold text-gray-800">{property.ownerName || seller.name}</td><td className="px-5 py-4"><a href={`tel:${property.ownerPhone || seller.phone}`} className="text-[#00875A]">{property.ownerPhone || seller.phone}</a></td><td className="px-5 py-4"><StatusBadge status={property.status} /></td><td className="px-5 py-4 font-semibold">{property.landSize || "তথ্য নেই"}</td><td className="px-5 py-4 text-gray-600">{property.landCategory === "Commercial" ? "বাণিজ্যিক" : "আবাসিক"}</td></tr>; })}</tbody></table>{landProperties.length === 0 && <p className="p-10 text-center text-sm text-gray-500">এই লোকেশনে কোনো জমির listing নেই।</p>}</div></section>
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="font-bold text-gray-900">এই লোকেশনের লিড</h2><span className="text-xs text-gray-500">{locationLeads.length} টি lead</span></div>{locationLeads.length > 0 ? <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{locationLeads.map((lead) => <article key={lead.id} className="rounded-xl border border-gray-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold text-gray-900">{lead.name}</h3><a href={`tel:${lead.phone}`} className="text-xs text-[#00875A]">{lead.phone}</a></div><span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">{lead.status}</span></div><p className="mt-3 text-xs text-gray-600">প্রপার্টি: {lead.property}</p><p className="mt-1 text-xs text-gray-600">বাজেট: {lead.budget}</p><p className="mt-2 text-xs text-gray-600">নোট: {lead.note}</p>{lead.lastFollowUpDate && <p className="mt-2 text-[11px] font-semibold text-[#00875A]">শেষ follow-up: {lead.lastFollowUpDate}</p>}</article>)}</div> : <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-gray-500">এই লোকেশনে কোনো lead পাওয়া যায়নি।</p>}</section>
      </div>
    </div>
  );
}

function StatusBadge({ status }) { return <span className={`rounded-full px-2 py-1 font-bold ${status === "Published" ? "bg-emerald-100 text-[#00875A]" : status === "Sold" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"}`}>{status === "Published" ? "Active" : status}</span>; }

export function LocationPropertiesPreview({ location, properties, leads, onClose }) {
  const landProperties = properties.filter((property) => property.type === "land");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="mb-5 flex items-start justify-between gap-4"><div><p className="text-xs font-bold text-[#00875A]">লোকেশন</p><h3 className="mt-1 text-xl font-bold text-gray-900">{location}</h3><p className="text-xs text-gray-500">এই লোকেশনের {landProperties.length} টি জমি</p></div><button onClick={onClose} aria-label="বন্ধ করুন" className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"><X className="h-5 w-5" /></button></div>
        <section className="overflow-hidden rounded-xl border border-gray-200"><div className="border-b border-gray-200 bg-slate-50 px-4 py-3"><h4 className="font-bold text-gray-900">এই লোকেশনের জমির তালিকা</h4><p className="mt-1 text-xs text-gray-500">{landProperties.length} টি জমি পাওয়া গেছে</p></div><div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-xs"><thead className="bg-white text-gray-500"><tr>{["SL", "প্রপার্টি হেডিং", "সেলারের নাম", "যোগাযোগ নম্বর", "স্ট্যাটাস", "জমির পরিমাণ", "জমির ধরন"].map((heading) => <th key={heading} className="border-b border-gray-200 px-4 py-3 font-bold">{heading}</th>)}</tr></thead><tbody>{landProperties.map((property, index) => { const seller = sellers[index % sellers.length]; return <tr key={property.id} className="border-b border-gray-100 align-top hover:bg-emerald-50/40"><td className="px-4 py-4 font-bold text-[#00875A]">{index + 1}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><img src={property.images?.[0]} alt="" className="h-12 w-16 rounded-lg object-cover" /><div><strong className="block text-gray-900">{property.title}</strong><span className="text-[10px] text-gray-400">{property.propertyId} · {property.formattedPrice}</span></div></div></td><td className="px-4 py-4 font-semibold text-gray-800">{property.ownerName || seller.name}</td><td className="px-4 py-4"><a href={`tel:${property.ownerPhone || seller.phone}`} className="text-[#00875A]">{property.ownerPhone || seller.phone}</a></td><td className="px-4 py-4"><span className={`rounded-full px-2 py-1 font-bold ${property.status === "Published" ? "bg-emerald-100 text-[#00875A]" : property.status === "Sold" ? "bg-violet-100 text-violet-700" : "bg-amber-100 text-amber-700"}`}>{property.status === "Published" ? "Active" : property.status}</span></td><td className="px-4 py-4 font-semibold text-gray-800">{property.landSize || "তথ্য নেই"}</td><td className="px-4 py-4 text-gray-600">{property.landCategory === "Commercial" ? "বাণিজ্যিক" : "আবাসিক"}</td></tr>; })}</tbody></table>{landProperties.length === 0 && <p className="p-8 text-center text-sm text-gray-500">এই লোকেশনে কোনো জমির listing নেই।</p>}</div></section>
        <section className="mt-6"><div className="mb-3 flex items-center justify-between"><h4 className="text-lg font-bold text-gray-900">এই লোকেশনের লিড</h4><span className="text-xs text-gray-500">{leads.length} টি lead</span></div>{leads.length > 0 ? <div className="grid gap-3 sm:grid-cols-2">{leads.map((lead) => <article key={lead.id} className="rounded-xl border border-gray-200 bg-slate-50 p-4"><div className="flex items-start justify-between gap-3"><div><h5 className="font-bold text-gray-900">{lead.name}</h5><a href={`tel:${lead.phone}`} className="text-xs text-[#00875A]">{lead.phone}</a></div><span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-700">{lead.status}</span></div><p className="mt-3 text-xs text-gray-600">প্রপার্টি: {lead.property} · বাজেট: {lead.budget}</p><p className="mt-1 text-xs text-gray-600">নোট: {lead.note}</p>{lead.lastFollowUpDate && <p className="mt-2 text-[11px] font-semibold text-[#00875A]">শেষ follow-up: {lead.lastFollowUpDate}</p>}</article>)}</div> : <p className="rounded-xl bg-slate-50 p-5 text-center text-sm text-gray-500">এই লোকেশনে কোনো lead পাওয়া যায়নি।</p>}</section>
      </div>
    </div>
  );
}

function SellerTable() {
  return (
    <DataTable
      title="সেলার মনিটরিং"
      subtitle="বিক্রেতাদের পরিচয়, যোগাযোগ এবং listing performance"
      headers={[
        "সেলার ID ও নাম",
        "যোগাযোগ",
        "NID status",
        "লিস্টিং সংখ্যা",
        "সেলার টাইপ",
        "যোগদানের তারিখ",
      ]}
      rows={sellers.map((seller) => [
        <>
          <strong className="block">{seller.name}</strong>
          <small>{seller.id}</small>
        </>,
        <>
          <a href={`tel:${seller.phone}`} className="text-[#00875A]">
            {seller.phone}
          </a>
          <small className="block">{seller.email}</small>
        </>,
        seller.nid,
        seller.listings,
        seller.type,
        seller.joined,
      ])}
    />
  );
}
function leadAction(lead) {
  return lead.status === "New"
    ? "যোগাযোগ করুন"
    : lead.status === "Site Visit Scheduled"
      ? "ফলো-আপ"
      : "পুনরায় যোগাযোগ";
}
function formatFollowUpDate(date) {
  return new Intl.DateTimeFormat("bn-BD", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}
function LeadTable({ leads: leadRecords, setLeads, onLeadAction }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [draftNote, setDraftNote] = useState("");
  const statusOptions = [...new Set(leadRecords.map((lead) => lead.status))];
  const actionOptions = [...new Set(leadRecords.map(leadAction))];
  const filteredLeads = leadRecords.filter(
    (lead) =>
      (statusFilter === "all" || lead.status === statusFilter) &&
      (actionFilter === "all" || leadAction(lead) === actionFilter),
  );
  const startEditing = (lead) => {
    setEditingId(lead.id);
    setDraftNote(lead.note);
  };
  const saveNote = (leadId) => {
    const trimmedNote = draftNote.trim();
    if (!trimmedNote) return;
    setLeads((current) =>
      current.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              previousNote: lead.note,
              note: trimmedNote,
              lastFollowUpDate: formatFollowUpDate(new Date()),
            }
          : lead,
      ),
    );
    setEditingId(null);
  };

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          বায়ার ও লিড ম্যানেজমেন্ট
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          নতুন buyer inquiry, budget এবং follow-up status
        </p>
      </div>
      <div className="mb-4 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2">
        <label className="text-xs font-bold text-gray-600">
          লিড স্ট্যাটাস
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700"
          >
            <option value="all">সব স্ট্যাটাস</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-bold text-gray-600">
          অ্যাকশন
          <select
            value={actionFilter}
            onChange={(event) => setActionFilter(event.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-normal text-gray-700"
          >
            <option value="all">সব অ্যাকশন</option>
            {actionOptions.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1120px] text-xs text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {[
                "বায়ার / লিড",
                "প্রপার্টি ID",
                "বাজেট ও এলাকা",
                "লিড স্ট্যাটাস",
                "ফলো-আপ নোট",
                "অ্যাকশন",
              ].map((heading) => (
                <th key={heading} className="p-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t border-gray-100 align-top">
                <td className="p-4">
                  <strong className="block">{lead.name}</strong>
                  <a href={`tel:${lead.phone}`} className="text-[#00875A]">
                    {lead.phone}
                  </a>
                </td>
                <td className="p-4">{lead.property}</td>
                <td className="p-4">
                  <strong className="block">{lead.budget}</strong>
                  {lead.area}
                </td>
                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-2 py-1 font-bold text-blue-700">
                    {lead.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="min-w-[270px]">
                    {editingId === lead.id ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={draftNote}
                          onChange={(event) => setDraftNote(event.target.value)}
                          rows="2"
                          className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveNote(lead.id)}
                            className="rounded-lg bg-[#00875A] px-3 py-1.5 font-bold text-white"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 font-bold text-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="font-semibold text-gray-800">
                          Current: {lead.note}
                        </p>
                        {lead.lastFollowUpDate && (
                          <p className="mt-1 text-[#00875A]">
                            শেষ follow-up: {lead.lastFollowUpDate}
                          </p>
                        )}
                        {lead.previousNote && (
                          <p className="mt-2 border-t border-gray-100 pt-2 text-gray-500">
                            Previous: {lead.previousNote}
                          </p>
                        )}
                        <button
                          onClick={() => startEditing(lead)}
                          className="mt-2 flex items-center gap-1 font-bold text-[#00875A]"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit note
                        </button>
                      </>
                    )}
                  </div>
                </td>
                <td className="p-4">
                    <button
                      onClick={() => onLeadAction(lead)}
                    className="flex items-center gap-1 rounded-lg bg-[#00875A] px-3 py-2 text-white"
                  >
                    <UserRound className="w-3.5 h-3.5" /> {leadAction(lead)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            এই filter-এ কোনো lead পাওয়া যায়নি।
          </p>
        )}
      </div>
    </section>
  );
}
function DataTable({ title, subtitle, headers, rows }) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1050px] text-xs text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-gray-100 align-top">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="p-4 text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FinanceTable() {
  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const monthlyIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "Income" && transaction.status === "Paid",
    )
    .reduce((total, transaction) => total + transaction.amount, 0);
  const money = (amount) => `৳ ${amount.toLocaleString("en-IN")}`;
  const statusStyle = (status) =>
    status === "Paid"
      ? "bg-emerald-100 text-[#00875A]"
      : status === "Pending"
        ? "bg-amber-100 text-amber-700"
        : "bg-red-100 text-red-700";

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          অ্যাকাউন্টস ও ফাইন্যান্স
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          আয়, ব্যয় এবং প্রতিটি transaction-এর বর্তমান অবস্থা
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <SummaryCard
          label="মোট আয়"
          value={money(income)}
          icon={MessageSquare}
          color="text-[#00875A]"
        />
        <SummaryCard
          label="চলতি মাসের আয়"
          value={money(monthlyIncome)}
          icon={CheckCircle2}
          color="text-blue-600"
        />
        <SummaryCard
          label="মোট খরচ"
          value={money(expenses)}
          icon={Eye}
          color="text-red-600"
        />
        <SummaryCard
          label="খাঁটি লাভ"
          value={money(income - expenses)}
          icon={Users}
          color="text-violet-600"
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full min-w-[1050px] text-xs text-left">
          <thead className="bg-slate-50 text-gray-500">
            <tr>
              {[
                "Transaction ID",
                "Property ID",
                "ক্যাটাগরি",
                "ধরণ",
                "পরিমাণ",
                "Payment method",
                "স্ট্যাটাস",
                "তারিখ",
              ].map((heading) => (
                <th key={heading} className="p-4">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-t border-gray-100">
                <td className="p-4 font-semibold text-gray-900">
                  {transaction.id}
                </td>
                <td className="p-4 text-gray-600">{transaction.property}</td>
                <td className="p-4 text-gray-700">{transaction.category}</td>
                <td className="p-4">
                  <span
                    className={
                      transaction.type === "Income"
                        ? "text-[#00875A] font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {transaction.type === "Income" ? "ইনকাম" : "খরচ"}
                  </span>
                </td>
                <td className="p-4 font-bold text-gray-900">
                  {money(transaction.amount)}
                </td>
                <td className="p-4 text-gray-600">{transaction.method}</td>
                <td className="p-4">
                  <span
                    className={`rounded-full px-2 py-1 font-bold ${statusStyle(transaction.status)}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="p-4 text-gray-500">{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
