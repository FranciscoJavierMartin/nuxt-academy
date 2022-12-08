export type Lesson = {
  title: string;
  slug: string;
  number: number;
  downloadUrl: string;
  videoId: number;
  text: string;
  sourceUrl?: string;
  path?: string;
};

export type Chapter = {
  title: string;
  slug: string;
  number: number;
  lessons: Lesson[];
};

export type Course = {
  title: string;
  chapters: Chapter[];
};
