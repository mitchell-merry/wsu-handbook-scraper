/** A subject description is the general descriptor in a subject's code, e.g. COMP 1005's description is COMP or Computer Science. */
interface SubjectDescription {
	/** The short-hand abbreviation of the description, e.g. 'COMP' for Computer Science. */
	tag: string;
	/** The full name of the description, e.g. 'Computer Science' */
	name: string;
	/** A link pointing to the page in the handbook with all the subjects under this description. */
	link: string;
	/** Subjects under this description, if scraped. */
	subjects?: Subject[];
}

/** Represents a Subject at WSU, scraped by this script. */
interface Subject {
	/** A subject's new code, e.g. 'COMP 1005' */
	code: string;
	/** A subject's old code (if it has one), e.g. '300580'. Not every subject has a legacy code. */
	legacy_code?: string;
	/** A subject's name, e.g. 'Programming Fundamentals' */
	name: string;
	/** A link to the subject details page for this subject. */
	details_link: string;
}

interface Dataset<T> {
	/** Object containing metadata relevant to the dataset. */
	metadata: Metadata;
	/** Actual data. */
	data: T;
}

/** Metadata relevant to a certain dataset. */
interface Metadata {
	/** Time in ISO 8601 format when this dataset was generated. */
	timestamp: string;
	/** Brief description about the contents of the dataset */
	contains: string;
}

// DATA_subjects.json will be a Dataset<SubjectDescription[]>.