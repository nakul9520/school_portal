const headingConfig = [
  {
    id: 1,
    title: "Kullanıcı Adı ve Gruplar",
    path: "/dashboard/username-and-groups",
    type: "collapse",
    children: [
      {
        id: 1.1,
        title: "Okul",
        path: "/dashboard/username-and-groups/school",
      },
      {
        id: 1.2,
        title: "Okul Ekle",
        path: "/dashboard/username-and-groups/add-school",
      },
      {
        id: 1.3,
        title: "Okul Yöneticisi",
        path: "/dashboard/username-and-groups/school-admin",
      },
      {
        id: 1.4,
        title: "Okul Yöneticisi Ekle",
        path: "/dashboard/username-and-groups/add-school-admin",
      },
      {
        id: 1.3,
        title: "Sınıf",
        path: "/dashboard/username-and-groups/class",
      },
      {
        id: 1.4,
        title: "Sınıf Ekle",
        path: "/dashboard/username-and-groups/add-class",
      },
      {
        id: 1.5,
        title: "Öğretmen",
        path: "/dashboard/username-and-groups/teacher",
      },
      {
        id: 1.6,
        title: "Öğretmen Ekle",
        path: "/dashboard/username-and-groups/add-teacher",
      },
      {
        id: 1.7,
        title: "Öğrenci",
        path: "/dashboard/username-and-groups/student",
      },
      {
        id: 1.8,
        title: "Öğrenci Ekle",
        path: "/dashboard/username-and-groups/add-student",
      },
    ],
  },
  {
    id: 2,
    title: "Raporlar",
    path: "/dashboard/reports",
    type: "collapse",
    children: [
      {
        id: 2.1,
        title: "Okul Raporları",
        path: "/dashboard/reports/school-reports",
      },
      {
        id: 2.2,
        title: "Kitap Raporları",
        path: "/dashboard/reports/book-reports",
      },
    ],
  },
  {
    id: 3,
    title: "Seviyelendirme",
    path: "/dashboard/leveling",
  },
  {
    id: 4,
    title: "Görevlendirme",
    path: "/dashboard/assignment",
  },
  {
    id: 5,
    title: "İçerik",
    path: "/dashboard/contents",
    type: "collapse",
    children: [
      {
        id: 5.1,
        title: "Platform Tasarımı",
        path: "/dashboard/contents/platform-design",
        type: "collapse",
        children: [
          {
            id: 5.2,
            title: "Sosyal İçerik",
            path: "/dashboard/contents/platform-design/social-content",
          },
          {
            id: 5.2,
            title: "Sosyal İçerik",
            path: "/dashboard/contents/platform-design/add-social-content",
          },
          {
            id: 5.2,
            title: "indirilebilir Ekle",
            path: "/dashboard/contents/platform-design/downloadable-content",
          },
          {
            id: 5.2,
            title: "indirilebilir Ekle",
            path: "/dashboard/contents/platform-design/add-downloadable-content",
          },
          {
            id: 5.2,
            title: "Video Ekle",
            path: "/dashboard/contents/platform-design/video-content",
          },
          {
            id: 5.2,
            title: "Video Ekle",
            path: "/dashboard/contents/platform-design/add-video-content",
          },
          {
            id: 5.2,
            title: "FAQ İçerik",
            path: "/dashboard/contents/platform-design/faq",
          },
          {
            id: 5.2,
            title: "FAQ İçerik",
            path: "/dashboard/contents/platform-design/add-faq",
          },
          {
            id: 5.2,
            title: "yardım",
            path: "/dashboard/contents/platform-design/help",
          },
          {
            id: 5.2,
            title: "politika",
            path: "/dashboard/contents/platform-design/legal-documents",
          },
        ],
      },
      {
        id: 5.2,
        title: "Kitaplık Kategorileri",
        path: "/dashboard/contents/library-categories",
      },
      {
        id: 5.3,
        title: "Kitap Tasarımı",
        path: "/dashboard/contents/book-design",
      },
      {
        id: 5.4,
        title: "Kitap Ekle",
        path: "/dashboard/contents/add-book-topic",
      },
      {
        id: 5.4,
        title: "Kitap Etkinlikleri",
        path: "/dashboard/contents/create-book-event",
        type: "collapse",
        children: [
          {
            id: 5.2,
            title: "Kitap Etkinlikleri",
            path: "/dashboard/contents/create-book-event/voice-task",
          },
          {
            id: 5.2,
            title: "Kitap Etkinlikleri",
            path: "/dashboard/contents/create-book-event/mcq-task",
          },
          {
            id: 5.2,
            title: "Kitap Etkinlikleri",
            path: "/dashboard/contents/create-book-event/matching-task",
          },
          {
            id: 5.2,
            title: "Kitap Etkinlikleri",
            path: "/dashboard/contents/create-book-event/drag-drop-task",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Sistem Ayarları",
    path: "/dashboard/system-settings",
    type: "collapse",
    children: [
      {
        id: 5.2,
        title: "Sistem Ayarları",
        path: "/dashboard/system-settings/edit",
      },
      {
        id: 5.2,
        title: "Sistem Ayarları",
        path: "/dashboard/system-settings/sub-admin",
      },
    ],
  },
  {
    id: 7,
    title: "Oyunlaştırma",
    path: "/dashboard/badges",
  },
  {
    id: 5.2,
    title: "Oyunlaştırma",
    path: "/dashboard/add-badges",
  },
];

export default headingConfig;
