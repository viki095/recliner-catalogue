# Recliner Catalogue

One web page where clients browse Little Nap, Seatlab and Moovia recliners, pick seating size, upholstery and accessories, see a tentative price, and send their shortlist on WhatsApp.

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
2. At your domain's DNS provider, add a record:
   `CNAME   catalogue   <your-github-username>.github.io`
3. Back in **Settings → Pages**, confirm the custom domain is `catalogue.awicontech.com` and tick **Enforce HTTPS** once it is offered.

To use a different subdomain, change the name in the `CNAME` file and in the DNS record.

## Preview on your computer

```
python3 -m http.server 8000
```
then open http://localhost:8000
