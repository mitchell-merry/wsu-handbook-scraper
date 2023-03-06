import fs from 'fs';
import path from 'path';

export const runFormatter = (dataset: Dataset<SubjectDescription[]>) => {
	const newData = dataset.data.map(desc => (desc.subjects ?? []).map(subject => ({
			...subject,
			description: desc.tag,
		})
	)).flat();

	fs.writeFileSync(
		path.join(process.cwd(), "output", "DATA_subjects_f.json"),
		JSON.stringify(newData, null, 2)
	);
}