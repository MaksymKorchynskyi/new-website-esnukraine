# Images and files

How to prepare photos and documents for the website: formats, size limits, compression, cropping, alternative text and slugs.

**Audience:** content editors.

## Formats

- **Photos:** JPEG, PNG, WebP or AVIF. Other formats, such as HEIC from iPhones, TIFF or PSD, are not accepted. Export or convert them first.
- **Documents:** PDF, Word (DOC, DOCX), Excel (XLS, XLSX) or PowerPoint (PPT, PPTX). Prefer PDF: visitors on a computer can preview it directly on the page.

## Size limits

The Studio checks every upload. If a file is too large, it shows a red message, and you cannot publish until you replace the file.

| Where | Maximum file size | Maximum resolution |
|---|---|---|
| Card image and banner of news and events | 12 MB | 10,000 × 10,000 px |
| Photos in the article text and in photo rows | 2 MB | 10,000 × 10,000 px |
| Photo gallery of news and events | 2 MB per photo | 10,000 × 10,000 px |
| Attached files | 10 MB per file | — |
| Board member photo | 2 MB | 3,000 × 3,500 px |
| Former board member photo | 2.5 MB | 3,000 × 3,500 px |
| Section logo | 2 MB | 3,000 × 3,000 px |
| "Our Network" photo | 2 MB | 3,500 × 3,500 px |

Some field descriptions in the Studio mention other numbers. The limits in this table are the ones the Studio enforces.

## Recommended photo shapes

| Use | Recommendation |
|---|---|
| Card image of news and events | Landscape, at least 1600 px wide. Keep the main subject in the centre; cards crop the edges |
| Banner | A wide landscape photo, at least 1920 px wide. On the homepage slider the text covers the left side (or the lower part on phones), so calm areas there work best |
| Board member photo | Portrait 4:5, for example 1200 × 1500 px. Keep the face in the upper half |
| Section logo | PNG with a transparent background. Shown whole, not cropped |
| "Our Network" photos | Landscape for slots A and B; portrait or square for slot C |
| Gallery and article photos | Any orientation, about 2000 px on the longer side |

## Compress photos before uploading

Photos straight from a phone or camera are often 5–15 MB. Compressing them makes the website faster and keeps the project within its storage limits.

**With Squoosh** (free, in the browser):

1. Open [squoosh.app](https://squoosh.app/) and drop your photo onto the page.
2. On the right, choose **WebP** or **MozJPEG** and set the quality to about **75–80**.
3. Turn on **Resize** and set the width to about **2000** px (1600 px for card images).
4. Check the file size at the bottom and download the result.

**With TinyPNG** ([tinypng.com](https://tinypng.com/)): drop up to 20 images at once and download the compressed versions.

## Cropping and the hotspot

When you upload an image, you can click it and use the crop tool to set:

- the **crop**: the part of the image to use;
- the **hotspot**: the most important point, for example a face.

The website uses the hotspot when it crops the card image for the article header and for social media previews. Cards on listing pages crop around the **centre** of the photo, so keep the subject there.

## Alternative text

Alternative text (**Alt текст**) describes an image for people who cannot see it, for example blind visitors who use screen readers. Search engines also use it.

- Describe **what the image shows and why it matters**, in one short sentence (up to about 125 characters).
- Name people and places when they are relevant: "Board members of ESN Ukraine at the National Platform in Odesa".
- Do not start with "Image of…" or "Photo of…".
- Do not repeat the caption word for word.
- Write it in the language of the page (English).

Where alt text is required or available: photos in the article text and photo rows, board member photos (required), former board member photos, and the "Our Network" photos (the title field). For card images, banners and gallery photos there is no alt field; the website uses the title or the caption instead.

## Attached files

- Upload documents under **Прикріплені файли** in a news item or event (at most 10 MB each).
- Give every file a clear **Назва файлу**, for example "Programme of the National Platform", not "final_v3.pdf".
- Add a short description if the content is not obvious from the title.
- Remove personal data, such as phone numbers or signatures, before uploading. Attached files are public.

## Slugs

The slug is the last part of the web address, for example `spring-national-assembly-esn-ukraine` in `esnukraine.org/events/spring-national-assembly-esn-ukraine`.

1. Write the title first, then click **Generate** next to **Посилання (Slug)**. The Studio creates a lowercase slug from the title: it transliterates Ukrainian letters ("Зимова школа" → `zimova-shkola`) and replaces symbols and apostrophes ("Let’s" → `let-s`, "&" → `and`).
2. Check the result. Shorten it if the title is long; three to six words are enough.
3. If you type or edit a slug by hand, use only **lowercase Latin letters, numbers and hyphens**. Do not use apostrophes (`'` or `’`), quotation marks, spaces or Cyrillic letters. They lead to broken or unreadable addresses.
4. **Do not change the slug after publishing.** Shared links and search results would point to a page that no longer exists.

## Related

- [News and events](news-and-events.md)
- [Homepage, people and sections](homepage-people-and-sections.md)
- [Content editing guide](README.md)
