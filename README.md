# wsu-handbook-scraper

Scrape data from Western Sydney University's subject handbook.

Specifically, this script will pull down all the subjects currently listed in their handbook. To see the shape of this output, check `src/types.ts`.

## Running
WORKING AS OF 3/7/2022 (DD/MM/YYYY). Their website may change & break this.

1. Clone or download this repository.
2. `npm i -D` to download relevant modules (including dev dependencies).
3. Compile the code with `npm run build`.
4. Run with `npm start`. (`npm run dev` will compile and run)

`DATA_subjects.json` should appear in the root folder with your data. Enjoy!