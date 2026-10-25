# Homepage, people and sections

How to manage the homepage, the National Board, former boards and the ESN sections in Sanity Studio.

**Audience:** content editors. News and events are covered in [News and events](news-and-events.md).

## The homepage

The homepage is built from these blocks, from top to bottom:

| Block | Comes from | Who changes it |
|---|---|---|
| Large slider at the top | News items and events with **Spotlight** switched on | Editors, see [below](#spotlight) |
| "This is ESN Ukraine" | Text in the website code | A developer |
| "Our Network" collage and text | Photos from **Фото "Our Network" (Головна)**; the text is in the code | Editors (photos), a developer (text) |
| "Latest Updates" | The 3 newest news articles | Automatic |
| "Moments We Shared" | The 4 events with the latest dates | Automatic |
| "Stay Connected" with the newsletter form | Text in the code | A developer |
| Scrolling hashtags | Text in the code | A developer |

## Spotlight

The slider shows up to five news items or events with **Показувати в Spotlight на головній** switched on, the newest first. Each slide shows the item's **Банер (задній фон)** as its background, together with the title, the date and the summary. The slides change every six seconds.

> [!IMPORTANT]
> Keep **at least one** published item with Spotlight switched on. Without any, the homepage cannot be displayed.

Step-by-step instructions: [Put an item in the homepage Spotlight](news-and-events.md#put-an-item-in-the-homepage-spotlight).

## "Our Network" photos

The collage next to "One Family, Growing Across Ukraine" has three photo positions (slots). Each slot can hold several photos, which change automatically.

| Slot | Position | Best photo shape |
|---|---|---|
| **Слот A** | Top left | Landscape |
| **Слот B** | Bottom left | Landscape |
| **Слот C** | Right, tall | Portrait or square |

To add a photo:

1. Open **Фото "Our Network" (Головна)** and create a document.
2. **Назва / Опис фотографії (Alt текст)**: describe what the photo shows, for example "Volunteers of ESN Kyiv at Welcome Week". This text is the photo's alternative text.
3. Choose the slot and upload the photo (at most 2 MB).
4. Optionally, set **Порядок відображення** to control the order within the slot. Lower numbers come first.
5. Publish.

If a slot has no photos, the website shows built-in stock photos there.

## National Board

Each person is one document in **Члени Борду (Board Members)**.

| Field | What to enter |
|---|---|
| **Ім'я та прізвище** | Full name |
| **Посада / Позиція** | Position, for example "President" |
| **Категорія / Розділ борду** | The group: The Board, The Board Support, or The Audit Board & Advisory Council |
| **Порядковий номер** | Order within the group: 1, 2, 3… |
| **Фотографія** | A portrait photo in 4:5 format (for example 1200 × 1500 px), at most 2 MB, with the face in the upper part. The cards are cropped from the top. **Alt text is required**, for example "Name Surname, President" |
| **Опис**, **Секція ESN**, **Email**, **LinkedIn URL** | Optional |

How the page shows people:

- Cards show only the photo. Clicking a card enlarges the photo, and the name and position appear when you point at it.
- The optional fields **Опис**, **Секція ESN**, **Email** and **LinkedIn URL** are currently not displayed.

> [!WARNING]
> The optional fields are still included in the page data that browsers download, so anyone could read them. Only enter information the person agreed to make public.

The group headings, such as "The Board 2025-26", are part of the website code. At the start of a new term, ask a developer to update the year. See the [annual board changeover](../guides/maintenance-tasks.md#annual-board-changeover) for the full procedure.

## Former boards

When a board term ends, archive the board in **Колишні борди (Former Boards)**:

1. Create a document.
2. **Назва**: for example `Board 2024/25`.
3. **Порядковий номер**: the first year of the term, for example `2024`. Boards with higher numbers are shown first.
4. Under **Члени борду**, add each person with name, position and photo (at most 2.5 MB). Optionally, add alt text. You can select existing photos from the media library.
5. Publish.

The boards appear as expandable panels on **About Us → Former Boards**.

## Sections

Each local section is one document in **Секції ESN (Sections)**.

| Field | What to enter |
|---|---|
| **Порядковий номер (Order)** | Position on the page. Lower numbers come first |
| **Назва секції** | For example "ESN Kyiv" |
| **Місто секції** | For example "Kyiv" |
| **Логотип секції** | The section logo, at most 2 MB. A PNG with a transparent background works best. Logos are shown whole, not cropped |
| **Короткий опис (для карточки)** | 10–300 characters about the section |
| **Instagram сторінка (обов'язково)** | Required. The full link to the section's Instagram profile. The card's **Instagram** button opens it |

The map on the Our Sections page is a fixed image and does not update automatically. When a new section joins, ask a developer to update the map and the homepage text that lists the cities. See [Add a new ESN section](../guides/maintenance-tasks.md#add-a-new-esn-section).

## Related

- [News and events](news-and-events.md)
- [Images and files](images-and-files.md)
- [Content editing guide](README.md)
