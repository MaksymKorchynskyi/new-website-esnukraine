# News and events

How to write news articles and event pages in Sanity Studio, from creating the document to checking it on the website.

**Audience:** content editors. Read the [content editing guide](README.md) first if you are new to the Studio.

## Create a news article

1. In the sidebar, open **Новини (News)** and click the **+** (create) button.
2. Fill in the fields. Fields marked with a red error are required.

   | Field | What to enter | Where it appears |
   |---|---|---|
   | **Заголовок новини** (title) | 5–150 characters | Card, article page, browser tab, search results |
   | **Посилання (Slug)** | Click **Generate**, then check the result (see [Slugs](images-and-files.md#slugs)) | The web address: `esnukraine.org/news/<slug>` |
   | **Дата та час публікації** (publication date) | Filled in automatically; change it if needed | Card and article page. Newer articles are listed first |
   | **Категорія** (category) | Optional. Choose an existing category or create a new one | A label on the card on the News page |
   | **Прев'ю зображення (для карточки)** (card image) | Required. A landscape photo, at most 12 MB | Card, article header, preview when the link is shared on social media |
   | **Показувати в Spotlight на головній** | Switch on to add the article to the homepage slider | Homepage slider |
   | **Банер (задній фон)** (banner) | Optional. A wide photo, at most 12 MB | Faint background of the article header, and the background of the homepage slide. Without it, the card image is used in the header |
   | **Короткий опис (Summary)** | Required, 10–300 characters: one or two sentences that make people want to read more | Card, the intro under the title, search results |
   | **Текст статті** (body) | The article itself. See [Write the text](#write-the-text) | Article page |
   | **Прикріплені файли** (attachments) | Optional documents. See [Attach files](#attach-files) | Below the text |
   | **Photo Gallery** | Optional photos. See [Add a photo gallery](#add-a-photo-gallery) | Below the attachments |

3. Click **Publish**.
4. Open `esnukraine.org/news` and check the card and the article. If you do not see it yet, refresh once more after a few seconds.

## Create an event

Open **Події (Events)** and create a document. Most fields work as for news. These fields are different:

| Field | What to enter | Notes |
|---|---|---|
| **Назва події** (title) | 5–150 characters | |
| **Дата та час створення** | Filled in automatically | The date the page was created, not the event date |
| **Дата проведення** (event date) | Required. Date and time of the event | Determines the order on the Events page and the homepage, and is shown on cards |
| **Місце проведення** (location) | Optional, for example "Lviv, Ivan Franko University" | Shown on event cards and the event page |
| **Посилання на реєстрацію (Google Form)** | Optional link to the registration form | Shows a box with **"Зареєструватися"** (Register) on the event page |
| **Категорія** | Optional | Not shown on the website at the moment |

> [!IMPORTANT]
> The registration box says that registration is open whenever a registration link is filled in, even after the event. **Remove the link when registration closes.**

On the Events page, the summary is shortened to three sentences. The homepage section "Moments We Shared" shows the four events with the latest dates.

## Write the text

The body editor works like a simple word processor.

**Text styles.** Choose them from the style menu:

| Style | Use for |
|---|---|
| **Звичайний** | Normal paragraphs |
| **Великий вступ (Lead)** | A larger introduction at the start |
| **Малий текст (Small)** | Notes and fine print |
| **Заголовок H2 / H3 / H4** | Section headings. Use H2 for main sections and H3 inside them. Do not skip levels, and do not use headings just to make text bigger |
| **Цитата** | Quotations |

**Formatting:** bold, italic, underline, strike-through and inline code, as well as bulleted and numbered lists.

**Links.** Select the text, click the link button and enter the address:

- for other websites, the full address starting with `https://`. The link opens in a new tab;
- for pages on this website, the path, for example `/events`;
- for email, `mailto:name@example.org`.

**Text colour and size** (**Колір тексту**, **Розмір тексту**). Use them rarely. Never choose white: the page background is white, so the text would become invisible. Large sizes make articles hard to read on phones.

**Blocks you can insert:**

| Block | What it does |
|---|---|
| **Фото у тексті** | One photo between paragraphs, at most 2 MB. Set a caption, the alt text, the width (25–100 %), the alignment (left or right lets the text flow around the photo) and rounded corners |
| **Кілька фото в ряд** | 2–6 photos side by side, each at most 2 MB, in 2–4 columns, with an adjustable gap and corners. Add alt text to each photo |
| **Розділювач (Лінія)** | A solid or dashed line between parts of the text |

## Attach files

Use **Прикріплені файли** for documents such as rules, programmes or reports.

1. Add an item and upload the file: PDF, Word, Excel or PowerPoint, at most 10 MB.
2. Fill in **Назва файлу** (the title visitors see, for example "Competition rules") and, optionally, a short description.

On a computer, PDFs open in a preview window on the page. Other files, and all files on phones, open in a new browser tab. PDF is the most convenient format for visitors.

## Add a photo gallery

Use **Photo Gallery** for event photos.

1. Add the photos, at most 2 MB each. You can select several at once.
2. Optionally, add a caption (**Підпис**) to each photo.

The photos appear in a grid below the article. Visitors can open them full screen and swipe or use the arrow keys.

## Put an item in the homepage Spotlight

1. Open the news item or event.
2. Switch on **Показувати в Spotlight на головній**.
3. Add a **Банер (задній фон)**. Without a banner, the slide shows a generic stock photo.
4. Publish.

The slider shows up to **five** Spotlight items, the newest first: by event date for events and by publication date for news. To remove an item from the slider, switch the option off and publish. **Always keep at least one item switched on.**

## Categories

Create categories under **Категорії новин** and **Категорії подій**, or directly from the category field. A category has a name (2–50 characters) and a slug. At the moment, only news categories are shown, as a label on the News page.

## Edit, unpublish or delete

- **Edit:** change the fields and click **Publish** again.
- **Unpublish:** in the document menu (**⋯**), choose **Unpublish** to take it offline but keep it in the Studio.
- **Delete:** removes the document. Its web address then shows "Page Not Found".
- **Do not change the slug** of a published article or event. If you must, ask the webmaster to add a redirect from the old address.

## Where your content appears

| Place | Content |
|---|---|
| Homepage slider | Up to 5 news items and events with Spotlight switched on |
| Homepage "Latest Updates" | The 3 newest news articles |
| Homepage "Moments We Shared" | The 4 events with the latest dates |
| `/news` | All news articles, newest first |
| `/events` | All events, latest date first |
| `/news/<slug>`, `/events/<slug>` | The full article or event |
| Search engines and social media | Title, summary and card image |

## Related

- [Images and files](images-and-files.md)
- [Homepage, people and sections](homepage-people-and-sections.md)
- [Content editing guide](README.md)
