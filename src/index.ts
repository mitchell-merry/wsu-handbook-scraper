import * as puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';

async function fetchSubjectDescriptions() {
	// as of 03/07/2022 DD/MM/YYYY
	const BASE = 'https://hbook.westernsydney.edu.au/';
	const URL = 'https://hbook.westernsydney.edu.au/subject-descriptions/';

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(URL);

	// Get base information on each Subject Description by scraping that page (URL)
	const descriptions = await page.evaluate(URL => Array.from(
		document.querySelectorAll('.az_sitemap > ul > li > a')
	).map(a => {
		// 'Computer Science (COMP)' => name = 'Computer Science', tag = 'COMP'
		const frags = a.textContent!.split(' ');

		let tag = frags.pop()!;
		tag = tag.slice(1, tag.length-1);
		const name = frags.join(' ');

		return { tag, name,
			link: `${URL}${tag.toLowerCase()}/` 
		} as SubjectDescription;
	}), URL);

	// Scrape each description's page to get all their respective units
	await Promise.all(descriptions.map(async description => {
		const descPage = await browser.newPage();
		await descPage.goto(description.link);

		description.subjects = await descPage.evaluate(BASE => Array.from(
			document.querySelectorAll('div.courseblock')
		).map(div => {
			const code = div.querySelector('.detail-code')!.textContent!;
			const name = div.querySelector('.detail-title')!.textContent!;

			const details_link = `${BASE}${div.querySelector('.detail-subjdetail > strong > span > a')!.getAttribute('href')}`;
			const legacy_code = div.querySelector('.detail-previous_code')?.textContent?.split(" ")[2];

			return {
				code, name, details_link, legacy_code
			} as Subject;
		}), BASE);
	}));

	// Save data
	fs.writeFileSync(`${path.resolve(__dirname, '..')}\\DATA_subjects.json`, JSON.stringify(descriptions, null, 2));

	await browser.close();
}

fetchSubjectDescriptions();