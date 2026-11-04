'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Calendar, CalendarX2, Check, ChevronDown, MapPin, RotateCcw, X } from 'lucide-react';
import { formatDate } from '@/sanity/lib/utils';
import { ESN_CAUSES, ESN_CAUSE_BY_VALUE } from '@/lib/esnCauses';
import NewsletterPopupButton from '@/components/sections/NewsletterPopup.client';

export interface UpcomingEvent {
  _id: string;
  title: string;
  date: string;
  location?: string | null;
  description?: string | null;
  link?: string | null;
  imageUrl: string | null;
  section: { _id: string; name: string } | null;
  causes: string[];
}

export interface SectionOption {
  _id: string;
  name: string;
}

/** Pseudo-section for events organised by ESN Ukraine itself (no section attached). */
const NATIONAL_ID = '__national__';
const NATIONAL_LABEL = 'ESN Ukraine';

function sectionIdOf(event: UpcomingEvent): string {
  return event.section?._id ?? NATIONAL_ID;
}

// Within a group any selected option matches (OR); across groups all must match (AND).
const matchesSections = (e: UpcomingEvent, ids: string[]) =>
  ids.length === 0 || ids.includes(sectionIdOf(e));
const matchesCauses = (e: UpcomingEvent, values: string[]) =>
  values.length === 0 || e.causes.some((c) => values.includes(c));

// ==========================================
// CARD
// ==========================================
/** Same look as the event cards on "Past Events", but links out (registration, Instagram). */
function UpcomingEventCard({ event }: { event: UpcomingEvent }) {
  const causes = event.causes.map((c) => ESN_CAUSE_BY_VALUE[c]).filter(Boolean);

  const body = (
    <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-200 sm:border-gray-100 shadow-md sm:shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-esn-dark/10">
      <div className="relative h-52 sm:h-64 overflow-hidden">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-esn-cyan/5">
            <span className="text-esn-cyan font-bold text-xl">ESN</span>
          </div>
        )}
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3 text-xs font-bold uppercase tracking-wider text-esn-dark rounded-md shadow-sm z-10">
          {event.section?.name ?? NATIONAL_LABEL}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div className="flex-1 mb-4 sm:mb-6">
          <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
            <div className="flex items-center text-xs sm:text-sm font-medium text-gray-500">
              <Calendar className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
              <span>{formatDate(event.date)}</span>
            </div>
            {event.location && (
              <div className="flex items-center text-xs sm:text-sm font-medium text-gray-500">
                <MapPin className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                <span>{event.location}</span>
              </div>
            )}
          </div>

          <h3 className="mb-2 sm:mb-3 text-xl sm:text-2xl font-bold leading-tight text-esn-dark group-hover:text-esn-cyan transition-colors break-words">
            {event.title}
          </h3>

          {event.description && (
            <p className="text-sm sm:text-base text-gray-600 sm:text-gray-500 line-clamp-3 leading-relaxed break-words">
              {event.description}
            </p>
          )}

          {causes.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="ESN causes">
              {causes.map((c) => (
                <li key={c.value} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                  <span className={`h-2 w-2 rounded-full ${c.dot}`} aria-hidden />
                  {c.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="pt-4 sm:pt-6 border-t border-gray-100 shrink-0">
          {event.link ? (
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-esn-dark uppercase tracking-wide group-hover:text-esn-magenta transition-colors">
              Learn more
              <ArrowUpRight className="h-4 w-4" />
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wide">
              Details coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return event.link ? (
    <a href={event.link} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <div className="block">{body}</div>
  );
}

// ==========================================
// FILTER UI
// ==========================================
interface ChipOption {
  value: string;
  label: string;
  count: number;
  dot?: string;
}

/**
 * Multi-select dropdown with a checkbox list.
 * On phones the list spans the whole toolbar (the wrapper is only `relative` from `sm`),
 * on larger screens it opens under its own button.
 */
function FilterDropdown({
  id,
  label,
  options,
  selected,
  open,
  onOpenChange,
  onToggle,
  onClear,
}: {
  id: string;
  label: string;
  options: ChipOption[];
  selected: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: (value: string) => void;
  onClear: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // On small screens the list can open below the fold: bring it into view
  useEffect(() => {
    if (open) panelRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [open]);

  const summary =
    selected.length === 0
      ? 'All'
      : selected.length === 1
        ? options.find((o) => o.value === selected[0])?.label ?? '1 selected'
        : `${selected.length} selected`;

  return (
    <div className="sm:relative min-w-0">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className={`flex w-full sm:w-auto sm:min-w-[220px] items-center gap-3 rounded-xl border px-4 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-esn-cyan ${
          open || selected.length > 0 ? 'border-esn-dark bg-white' : 'border-gray-200 bg-white hover:border-gray-400'
        }`}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">{label}</span>
          <span className="block truncate text-sm font-bold text-esn-dark">{summary}</span>
        </span>
        {selected.length > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-esn-dark px-1.5 text-[11px] font-bold text-white tabular-nums">
            {selected.length}
          </span>
        )}
        <ChevronDown className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          ref={panelRef}
          id={`${id}-panel`}
          className="absolute left-0 right-0 sm:right-auto top-full z-30 mt-2 scroll-mb-6 sm:w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-esn-dark/10 animate-menu-slide-down"
        >
          <fieldset>
            <legend className="sr-only">{label}</legend>
            <ul className="max-h-[min(60vh,22rem)] overflow-y-auto py-1.5">
              {options.map((o) => {
                const checked = selected.includes(o.value);
                return (
                  <li key={o.value}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 px-4 py-3 sm:py-2.5 text-sm transition-colors hover:bg-gray-50 ${
                        o.count === 0 && !checked ? 'text-gray-400' : 'text-esn-dark'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={checked}
                        onChange={() => onToggle(o.value)}
                      />
                      <span
                        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-esn-cyan ${
                          checked ? 'border-esn-dark bg-esn-dark' : 'border-gray-300 bg-white'
                        }`}
                        aria-hidden
                      >
                        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                      </span>
                      {o.dot && <span className={`h-2 w-2 shrink-0 rounded-full ${o.dot}`} aria-hidden />}
                      <span className="flex-1 font-semibold">{o.label}</span>
                      <span className="text-xs font-semibold tabular-nums text-gray-400">{o.count}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
          <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/70 px-4 py-2.5">
            <button
              type="button"
              onClick={onClear}
              disabled={selected.length === 0}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-esn-magenta disabled:opacity-40 disabled:hover:text-gray-500 transition-colors"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="rounded-lg bg-esn-dark px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-esn-magenta transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MAIN
// ==========================================
export default function UpcomingEvents({
  events,
  sections,
}: {
  events: UpcomingEvent[];
  sections: SectionOption[];
}) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState<'section' | 'category' | null>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // Close the open dropdown on outside click or Escape
  useEffect(() => {
    if (!openFilter) return;
    const onPointer = (e: PointerEvent) => {
      if (!toolbarRef.current?.contains(e.target as Node)) setOpenFilter(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenFilter(null);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [openFilter]);

  const toggle = (setter: typeof setSelectedSections) => (value: string) =>
    setter((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));

  // Faceted counts: each chip shows how many events it would give,
  // taking the *other* filter group into account.
  const sectionOptions = useMemo<ChipOption[]>(() => {
    const pool = events.filter((e) => matchesCauses(e, selectedCauses));
    const count = (id: string) => pool.filter((e) => sectionIdOf(e) === id).length;
    return [
      { value: NATIONAL_ID, label: NATIONAL_LABEL, count: count(NATIONAL_ID) },
      ...sections.map((s) => ({ value: s._id, label: s.name, count: count(s._id) })),
    ];
  }, [events, sections, selectedCauses]);

  const causeOptions = useMemo<ChipOption[]>(() => {
    const pool = events.filter((e) => matchesSections(e, selectedSections));
    return ESN_CAUSES.map((c) => ({
      value: c.value,
      label: c.title,
      dot: c.dot,
      count: pool.filter((e) => e.causes.includes(c.value)).length,
    }));
  }, [events, selectedSections]);

  const visible = useMemo(
    () => events.filter((e) => matchesSections(e, selectedSections) && matchesCauses(e, selectedCauses)),
    [events, selectedSections, selectedCauses],
  );

  const hasFilters = selectedSections.length > 0 || selectedCauses.length > 0;
  const clearAll = () => {
    setSelectedSections([]);
    setSelectedCauses([]);
    setOpenFilter(null);
  };

  // Active filters as removable tags
  const activeTags: { key: string; label: string; dot?: string; remove: () => void }[] = [
    ...sectionOptions
      .filter((o) => selectedSections.includes(o.value))
      .map((o) => ({ key: `s-${o.value}`, label: o.label, remove: () => toggle(setSelectedSections)(o.value) })),
    ...causeOptions
      .filter((o) => selectedCauses.includes(o.value))
      .map((o) => ({ key: `c-${o.value}`, label: o.label, dot: o.dot, remove: () => toggle(setSelectedCauses)(o.value) })),
  ];

  return (
    <>
      {/* ═══════ FILTER TOOLBAR ═══════ */}
      <div className="mb-8 sm:mb-12">
        <div
          ref={toolbarRef}
          className="relative flex flex-col gap-3 rounded-2xl border border-gray-200 bg-gray-50/70 p-3 sm:flex-row sm:items-center sm:p-4"
        >
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <FilterDropdown
              id="filter-section"
              label="Section"
              options={sectionOptions}
              selected={selectedSections}
              open={openFilter === 'section'}
              onOpenChange={(o) => setOpenFilter(o ? 'section' : null)}
              onToggle={toggle(setSelectedSections)}
              onClear={() => setSelectedSections([])}
            />
            <FilterDropdown
              id="filter-category"
              label="Category"
              options={causeOptions}
              selected={selectedCauses}
              open={openFilter === 'category'}
              onOpenChange={(o) => setOpenFilter(o ? 'category' : null)}
              onToggle={toggle(setSelectedCauses)}
              onClear={() => setSelectedCauses([])}
            />
          </div>

          <div className="flex items-center justify-between gap-4 px-1 sm:ml-auto sm:justify-end">
            <p className="text-sm font-bold text-esn-dark" aria-live="polite">
              {visible.length} {visible.length === 1 ? 'event' : 'events'}
              {hasFilters ? (visible.length === 1 ? ' matches' : ' match') : ' coming up'}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-esn-magenta transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Active filters as removable tags */}
        {activeTags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeTags.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={t.remove}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-2 text-xs font-semibold text-esn-dark hover:border-esn-dark transition-colors"
                aria-label={`Remove filter ${t.label}`}
              >
                {t.dot && <span className={`h-2 w-2 rounded-full ${t.dot}`} aria-hidden />}
                {t.label}
                <X className="h-3 w-3 text-gray-400" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══════ RESULTS ═══════ */}
      {visible.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <UpcomingEventCard key={event._id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center text-center rounded-3xl bg-gray-50 px-6 py-16 sm:py-20">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <CalendarX2 className="h-6 w-6 text-esn-dark" />
          </div>
          <h2 className="mb-3 text-xl sm:text-2xl font-black text-esn-dark">
            {events.length === 0 ? 'No upcoming events announced yet' : 'No events match these filters'}
          </h2>
          <p className="mb-8 max-w-md text-gray-600">
            {events.length === 0
              ? 'New dates are on the way. Subscribe to our newsletter to hear about them first.'
              : 'Try removing a filter or pick another section or category to see what is coming up.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {events.length > 0 ? (
              <button
                type="button"
                onClick={clearAll}
                className="inline-flex items-center gap-2 rounded-full bg-esn-dark px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-esn-magenta transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            ) : (
              <NewsletterPopupButton />
            )}
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-esn-dark hover:border-esn-dark transition-colors"
            >
              See past events
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
