import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { stegaClean } from "next-sanity";
import SanityImage from "@/components/ui/SanityImage";
import { hasAsset, urlFor, type ProjectedImage } from "@/sanity/lib/image";
import type { PortableTextBody } from "@/sanity/lib/types";

// ==========================================
// Custom block types (as projected in sanity/lib/queries.ts)
// ==========================================
interface DividerValue {
  style?: string;
}

interface InlineImageValue extends ProjectedImage {
  _type: "image";
  width?: string;
  alignment?: string;
  rounded?: boolean;
}

interface GalleryValue {
  images?: (ProjectedImage & { _key?: string })[];
  columns?: number;
  gap?: string;
  rounded?: boolean;
}

/** Only http(s), mailto, tel, same-site paths and fragments may be rendered as links. */
export function safeHref(href: unknown): string | null {
  if (typeof href !== "string") return null;
  const value = href.trim();
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;
  return null;
}

const TEXT_WRAP = "break-words [word-break:break-word] [overflow-wrap:anywhere]";

const components: PortableTextComponents = {
  types: {
    divider: ({ value }: { value: DividerValue }) => {
      const isDashed = stegaClean(value?.style) === "dashed";
      return <hr className={`my-16 border-t-2 ${isDashed ? "border-dashed" : "border-solid"} border-gray-200`} />;
    },
    image: ({ value }: { value: InlineImageValue }) => {
      if (!hasAsset(value)) return null;
      const width = stegaClean(value.width) || "100";
      const alignment = stegaClean(value.alignment) || "center";
      const isRounded = value.rounded !== false;
      const dims = value.asset.dimensions;
      // Real intrinsic size, so portrait photos keep their shape (no layout shift)
      const intrinsicWidth = dims?.width ?? 1200;
      const intrinsicHeight = dims?.height ?? 675;
      const renderWidth = Math.min(intrinsicWidth, 1600);
      const renderHeight = Math.round((intrinsicHeight * renderWidth) / intrinsicWidth);

      const floatStyles: Record<string, string> = {
        left: "float-left mr-8 mb-4",
        right: "float-right ml-8 mb-4",
        center: "mx-auto",
      };

      const isFullWidth = width === "100";
      const containerClass = isFullWidth ? "my-10 -mx-4 sm:mx-0 w-full" : `my-6 ${floatStyles[alignment] ?? floatStyles.center}`;

      return (
        <figure className={containerClass} style={!isFullWidth ? { maxWidth: `${width}%` } : undefined}>
          <div className={`relative w-full overflow-hidden ${isRounded ? "rounded-2xl" : ""}`}>
            <SanityImage
              src={value.asset.url ?? urlFor(value).width(1200).url()}
              alt={value.alt || value.caption || ""}
              width={renderWidth}
              height={renderHeight}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder={value.asset.lqip ? "blur" : "empty"}
              blurDataURL={value.asset.lqip ?? undefined}
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-400 italic">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    imageGallery: ({ value }: { value: GalleryValue }) => {
      if (!value?.images || value.images.length === 0) return null;
      const cols = Number(stegaClean(value.columns)) || 2;
      const isRounded = value.rounded === true;
      const gridClass = cols === 2 ? "grid-cols-2" : cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
      const gapClass: Record<string, string> = { none: "gap-0", small: "gap-2", medium: "gap-4", large: "gap-8" };
      const gap = gapClass[stegaClean(value.gap) || "medium"] || "gap-4";
      return (
        <div className={`my-10 grid ${gridClass} ${gap}`}>
          {value.images.map((img, idx) => {
            if (!hasAsset(img)) return null;
            return (
              <figure key={img._key || idx} className={`group relative overflow-hidden aspect-[4/3] ${isRounded ? "rounded-xl" : ""}`}>
                <SanityImage
                  src={img.asset.url ?? urlFor(img).width(800).url()}
                  alt={img.alt || img.caption || ""}
                  fill
                  className="object-cover"
                  sizes={`(max-width: 768px) 50vw, ${Math.round(100 / cols)}vw`}
                  placeholder={img.asset.lqip ? "blur" : "empty"}
                  blurDataURL={img.asset.lqip ?? undefined}
                />
                {img.caption && (
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-black/0 p-3 pt-8 opacity-100">
                    <p className="text-white text-xs font-medium">{img.caption}</p>
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-black text-esn-dark mt-16 mb-6 leading-tight tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-esn-dark mt-12 mb-4 leading-tight tracking-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold text-esn-dark mt-8 mb-3 tracking-tight">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className={`text-lg md:text-xl leading-[1.8] text-gray-800 mb-6 ${TEXT_WRAP}`}>{children}</p>
    ),
    lead: ({ children }) => (
      <p className={`text-xl md:text-2xl font-light leading-[1.7] text-gray-700 mb-8 ${TEXT_WRAP}`}>{children}</p>
    ),
    small: ({ children }) => (
      <p className={`text-sm leading-relaxed text-gray-500 mb-4 ${TEXT_WRAP}`}>{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-esn-cyan pl-8 py-2">
        <p className={`text-2xl md:text-3xl italic font-medium text-gray-600 leading-snug ${TEXT_WRAP}`}>{children}</p>
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-esn-dark">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through": ({ children }) => <del className="line-through text-gray-400">{children}</del>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-esn-magenta px-1.5 py-0.5 rounded text-sm font-mono break-words [word-break:break-word]">{children}</code>
    ),
    textColor: ({ children, value }) => <span style={{ color: stegaClean(value?.color) }}>{children}</span>,
    textSize: ({ children, value }) => <span style={{ fontSize: stegaClean(value?.size) }}>{children}</span>,
    link: ({ children, value }) => {
      const href = safeHref(value?.href);
      if (!href) return <>{children}</>;
      const isExternal = /^https?:/i.test(href);
      return (
        <a
          href={href}
          className={`text-esn-cyan font-medium underline decoration-esn-cyan/30 underline-offset-2 hover:decoration-esn-cyan transition-colors ${TEXT_WRAP}`}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="my-8 space-y-4 list-none pl-0">{children}</ul>,
    number: ({ children }) => <ol className="my-8 space-y-4 list-none pl-0">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className={`flex items-start gap-4 text-lg md:text-xl text-gray-800 leading-[1.8] ${TEXT_WRAP}`}>
        <span className="mt-2.5 w-2 h-2 rounded-sm bg-esn-cyan flex-shrink-0" aria-hidden="true" />
        <span className={`min-w-0 flex-1 ${TEXT_WRAP}`}>{children}</span>
      </li>
    ),
    number: ({ children, index }) => (
      <li className={`flex items-start gap-4 text-lg md:text-xl text-gray-800 leading-[1.8] ${TEXT_WRAP}`}>
        <span className="font-bold text-esn-cyan tabular-nums flex-shrink-0">{index + 1}.</span>
        <span className={`min-w-0 flex-1 ${TEXT_WRAP}`}>{children}</span>
      </li>
    ),
  },
};

export default function PortableTextContent({ value }: { value: PortableTextBody }) {
  return <PortableText value={value} components={components} />;
}
