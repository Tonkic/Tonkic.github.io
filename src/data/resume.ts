export type ResumeProfile = {
  name: string;
  location: string;
  target: string;
  email: string;
  github: string;
  website: string;
};

export type ResumeEducation = {
  degree: string;
  detail: string;
  period: string;
  school: string;
  tags: string[];
};

export type ResumeExperience = {
  company: string;
  projectName: string;
  projectDescription: string;
  location: string;
  period: string;
  role: string;
  bullets: string[];
};

export type ResumeProject = {
  description: string;
  name: string;
  url?: string;
  urlLabel?: string;
  bullets: string[];
};

export type ResumeSkill = {
  category: string;
  detail: string;
};

export const resumeProfile: ResumeProfile = {
  name: "Tonkic",
  location: "广州",
  target: "后端开发 / AI 基础设施",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  website: "https://tonkic.github.io/",
};

export const resumeEducation: ResumeEducation[] = [
  {
    school: "华南师范大学",
    degree: "硕士",
    detail: "人工智能 · 人工智能学院（全日制）",
    period: "2025.09 - 2028.06",
    tags: ["211", "双一流"],
  },
  {
    school: "华南农业大学",
    degree: "本科",
    detail: "数据科学与大数据技术 · 数学与信息学院 / 软件学院（全日制）",
    period: "2021.09 - 2025.06",
    tags: ["双一流"],
  },
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: "中数通信息有限公司",
    projectName: "企业研发效能与任务编排数据大屏",
    projectDescription: "Java · Spring Boot · MyBatis · MySQL · ECharts",
    role: "后端开发实习生",
    location: "广州",
    period: "2024.06 - 2024.10",
    bullets: [
      "对接公司内部代码仓、Case 工单系统与任务管理平台，使用 Java 编写定时抓取与增量同步任务，采集员工每日提交 Case 数、代码提交量及任务流转状态并落库清洗。",
      "基于 Spring Boot、MyBatis 与 MySQL 编写按人员、项目组及时间维度的统计查询接口，处理重复记录去重、跨天状态归口及任务完成进度编排等聚合逻辑。",
      "参与大屏页面与后端接口联调，结合 ECharts 完成每日研发产出趋势、Case 处理分布与任务编排进度看板展示，供团队日常进度跟踪使用。",
    ],
  },
];

export const resumeProjects: ResumeProject[] = [
  {
    name: "多模型 API 聚合与中转平台",
    description: "Go · API Gateway · SSE / WebSocket",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "基于 New API 与 CLIProxyAPI 二次开发，搭建并维护线上多模型 API 网关，统一处理上游鉴权、渠道分发与失败重试；近一个月稳定承载 13.6 万次调用、约 118.2 亿 Token。",
      "跟进 OpenAI Responses、Codex 及 GitHub Copilot 等调用链路的兼容改造，解决不同上游在模型名映射、SSE / WebSocket 流式分片及 Tool Call 返回格式上的差异。",
      "接入内部 Keeper 服务完成用量统计与状态巡检；日常维护 Linux 更新脚本、GitHub Actions 自动构建、阿里云 OSS 产物分发以及 Nginx HTTPS 反向代理。",
    ],
  },
  {
    name: "个人网站与知识库同步系统",
    description: "Next.js · TypeScript · GitHub Actions",
    url: "https://tonkic.github.io/",
    urlLabel: "tonkic.github.io",
    bullets: [
      "使用 Next.js（App Router）与 TypeScript 编写个人站点，通过静态导出部署在 GitHub Pages，集中维护日常技术笔记、项目归档、在线简历和中转站状态页。",
      "编写同步脚本定时拉取 Obsidian 仓库笔记并生成目录树，自研轻量 Markdown 与 KaTeX 渲染模块处理双链解析与长公式滚动；按需裁剪列表数据，控制 300+ 静态页面的 HTML 体积。",
      "配置 GitHub Actions 定时同步内容与服务健康快照，并编写静态产物巡检脚本，在发布前自动检查死链、公式渲染异常及页面体积回归。",
    ],
  },
];

export const resumeSkills: ResumeSkill[] = [
  {
    category: "后端与网关开发",
    detail: "主力语言为 Go、Java、Python；熟悉 HTTP / REST 接口设计、并发控制与 SSE / WebSocket 流式通信，有实际的多模型网关路由、OpenAI 兼容层改造与工具调用协议适配经验。",
  },
  {
    category: "Linux 部署与运维",
    detail: "熟悉 Linux 常用命令、Shell 脚本、Docker 与 Nginx HTTPS 反向代理；能独立配置 GitHub Actions 自动发布与 OSS 制品分发，习惯结合网关日志与进程状态定位线上问题。",
  },
  {
    category: "数据库与服务端基础",
    detail: "熟悉 MySQL 表结构设计、索引优化与 EXPLAIN 执行计划分析；使用过 Spring Boot、MyBatis 开发企业内部系统，了解 Redis 缓存与常见消息队列用法。",
  },
  {
    category: "数据工程与 AI 基础",
    detail: "使用过 Spark、Flink、Hive、Kafka 处理批流数据，了解分区策略与基本离线数仓建模；具备 PyTorch 训练与推理基础，持续关注大模型推理服务与 RAG 工程实践。",
  },
  {
    category: "前端与工具链",
    detail: "能使用 Next.js、React、TypeScript 独立搭建响应式管理界面与文档站点，处理静态导出优化、Markdown / KaTeX 排版及 ECharts、Metabase 数据可视化。",
  },
];
