export type ResumeExperience = {
  company: string;
  department?: string;
  location: string;
  period: string;
  role: string;
  bullets: string[];
};

export type ResumeEducation = {
  degree: string;
  detail: string;
  period: string;
  school: string;
  tags: string[];
};

export const resumeProfile = {
  name: "Zhang Tingyu",
  handle: "Tonkic",
  target: "人工智能 / 大数据 / 后端开发方向",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  website: "https://tonkic.github.io/",
  summary:
    "人工智能方向硕士在读，具备大数据平台开发、Hive SQL、Spark MLlib、实时数仓与数据可视化实践经验；长期维护个人知识库、技术博客和模型 API 中转相关项目。",
};

export const resumeEducation: ResumeEducation[] = [
  {
    school: "华南农业大学",
    degree: "本科",
    detail: "数据科学与大数据技术 / 数学与信息学院 / 软件学院 / 全日制",
    period: "2021年09月 - 2025年06月",
    tags: ["双一流"],
  },
  {
    school: "华南师范大学",
    degree: "硕士",
    detail: "人工智能 / 人工智能学院 / 全日制",
    period: "2025年09月 - 2028年06月",
    tags: ["211", "双一流"],
  },
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: "中数通信信息有限公司",
    role: "大数据开发工程师",
    location: "广州",
    period: "2024-08 - 2024-10",
    bullets: [
      "负责大数据平台建设和运维，编写 Hive SQL 满足业务需求。",
      "提供分析组件技术支持，编写 Flink 代码。",
      "使用 Spark MLlib 构建和训练小型机器学习模型。",
      "参与离线数仓开发、数仓建模和数据清洗工作。",
      "参与实时数仓开发，使用 Spark Streaming、Flink 等技术。",
      "根据业务报表需求编写离线与实时 SQL，理解业务口径并完成数据交付。",
      "使用 Metabase、Avue-data、ECharts 等工具进行大数据可视化。",
    ],
  },
];

export const resumeSkills = [
  { label: "数据开发", items: ["Hive SQL", "Spark", "Spark Streaming", "Flink", "数仓建模"] },
  { label: "机器学习", items: ["Spark MLlib", "Python", "模型训练", "人工智能基础"] },
  { label: "Web / 工程", items: ["TypeScript", "Next.js", "React", "Git", "Linux"] },
  { label: "可视化", items: ["ECharts", "Metabase", "Avue-data"] },
];
