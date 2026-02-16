import type { Formation } from "../types/formation";

export const formations: Formation[] = [
  {
    id: 1,
    title: "Développement Fullstack PHP",
    modules: [
      {
        id: 1,
        title: "Module 1: Fondamentaux du Web",
        resources: [
          {
            id: 1,
            title: "Cours 1 - Introduction.pdf",
            type: "PDF",
            size: "2.4 MB",
            date: "10 Jan 2026",
          },
          {
            id: 2,
            title: "TP 1 - Installation Env.pdf",
            type: "PDF",
            size: "1.1 MB",
            date: "12 Jan 2026",
          },
          {
            id: 3,
            title: "Tuto Installation.mp4",
            type: "Video",
            size: "45 MB",
            date: "12 Jan 2026",
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: Syntaxe PHP",
        resources: [
          {
            id: 4,
            title: "Cours 2 - Syntaxe PHP.pdf",
            type: "PDF",
            size: "3.2 MB",
            date: "20 Jan 2026",
          },
          {
            id: 5,
            title: "Exercices PHP Base.zip",
            type: "Archive",
            size: "0.5 MB",
            date: "22 Jan 2026",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Marketing Digital",
    modules: [
      {
        id: 3,
        title: "Module 1: Introduction",
        resources: [],
      },
    ],
  },
];
