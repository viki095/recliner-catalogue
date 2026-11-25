# Recliner Catalogue

One web page where clients browse Little Nap, Seatlab, Moovia and Cineak recliners, pick seating size, upholstery and accessories, see a tentative price, and send their shortlist on WhatsApp.

## Updating models and prices

Edit **`catalogue-data.js`**. It is the only file you need to touch.

- **Add a model:** copy one `{ ... }` block in `models`, change the id, name, prices and accessory list.
- **Change a price:** edit the number (rupees, no commas).
- **Add an accessory:** add it to `accessories`, then list its id on the models that support it.
- **Photos:** put the image in `images/` and set `image: "images/your-file.jpg"`.
- **Your WhatsApp number:** set `whatsappNumber` (country code + number, digits only).
- When the real data is in, set `sampleData: false` to hide the "sample data" notice.

## Publishing on catalogue.awicontech.com (GitHub Pages)

1. In the repo on GitHub: **Settings → Pages → Source: Deploy from a branch → `main` / root → Save.**
2. Live now (sample data) at https://viki095.github.io/recliner-catalogue/ . The CNAME file was removed so that link works before DNS exists.
2. At your domain's DNS provider, add a record:
   `CNAME   catalogue   <your-github-username>.github.io`
3. Back in **Settings → Pages**, confirm the custom domain is `catalogue.awicontech.com` and tick **Enforce HTTPS** once it is offered.

To use a different subdomain, change the name in the `CNAME` file and in the DNS record.

## Preview on your computer

```
python3 -m http.server 8000
```
then open http://localhost:8000

## Home theatre planner (index.html)

The home page is now a 6-step planner; the full catalogue moved to `models.html`.

1. Room width × depth × height (feet or metres)
2. Number of rows (suggests how many fit)
3. Seats per row, straight or wedged (curved) arms
4. Collection per row (home theatre models only) with quantity; warns if a row leaves less than 2 ft on either side
5. Materials and upholstery with colour swatches (plus trim for Seatlab)
6. Other options and accessories

Then a summary with a scale room plan, fit checks, price, WhatsApp / copy / print, and a shareable plan link.

What to edit in `catalogue-data.js`:
- `settings.planner`: clearances, riser height, headroom, wedged-arm surcharge (inches / rupees)
- each home theatre model's `size`: seat width, arm width, upright and reclined depth, back height (inches)
- each brand's `materials`: note and colour swatches per upholstery/trim choice (`["Name", "#hex"]`)
- `image`: photos go in `images/models/` (Rome, Marbella and Milano already have one)
