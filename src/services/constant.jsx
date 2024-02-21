export const imageBasePath = "/okouio/admin-portal/assets/";

export const REACT_APP_API_END_POINT = "https://mshaadinfotech.in/okouio/api/";

export const USER_TYPE = {
  admin: "1",
  student: "2",
  teacher: "3",
  subAdmin: "4",
  schoolAdmin: "5",
};

export const BOOK_FILE_TYPE = {
  image: "1",
  audio: "2",
  document: "3",
};

export const FILE_TYPE = {
  text: "1",
  image: "2",
  audio: "3",
  video: "4",
};

export const QuizType = [
  {
    label: "Text",
    value: "1",
  },
  {
    label: "Image",
    value: "2",
  },
  {
    label: "Audio",
    value: "3",
  },
  {
    label: "Video",
    value: "4",
  },
];

export const CONTENT_TYPE = {
  videoTutorial: 1,
  downloadadble: 2,
  socialContent: 3,
  creatingPage: 4,
};

export const DOC_TYPE = {
  image: 1,
  video: 2,
  pdf: 3,
  word: 4,
  csv: 5,
};

export const GUIDELINE_TYPE = {
  terms: 1,
  privacy: 2,
  faq: 3,
};

export const categoryName = [
  { title: "Sınıf Düzeyi Ekle/Çıkar", categoryId: 1, key: "grade" },
  { title: "PYP Temaları Ekle/Çıkar", categoryId: 2, key: "pypthemes" },
  { title: "Genel Temalar Ekle/Çıkar", categoryId: 3, key: "generalthemes" },
  { title: "Kazanımlar Ekle/Çıkar", categoryId: 4, key: "objectives" },
  { title: "Seriler Ekle/Çıkar", categoryId: 5, key: "series" },
];

export const gradeList = [
  { title: "001", id: 1 },
  { title: "002", id: 2 },
  { title: "YIL1", id: 3 },
  { title: "YIL2", id: 4 },
  { title: "YIL3", id: 5 },
  { title: "YIL4", id: 6 },
];

export const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
];
