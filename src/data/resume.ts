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
  techStack: string;
  bullets: string[];
};

export type ResumeProject = {
  description: string;
  name: string;
  role?: string;
  url?: string;
  urlLabel?: string;
  bullets: string[];
};

export type ResumeSkill = {
  category: string;
  detail: string;
};

export const resumeProfile = {
  name: "Tonkic",
  handle: "Tonkic",
  phone: "",
  location: "广州",
  target: "后端开发 / AI 基础设施",
  summary: "聚焦 AI API 网关与后端工程，具备从协议适配、模型路由到 Linux 生产部署的真实项目实践。",
  email: "tonkic@qq.com",
  github: "https://github.com/Tonkic",
  website: "https://tonkic.github.io/",
  photoAlt: "证件照占位符",
};

export const resumeEducation: ResumeEducation[] = [
  {
    school: "华南农业大学",
    degree: "本科",
    detail: "数据科学与大数据技术 / 数学与信息学院、软件学院 / 全日制",
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

export const resumeProjects: ResumeProject[] = [
  {
    name: "多模型 API 聚合与中转平台",
    description: "Go · API Gateway · Protocol Relay",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "基于 New API 与 CLIProxyAPI 进行二次开发，构建多模型 API 聚合与中转平台，打通模型接入、统一调用和服务运维链路；近一个月处理 136,034 次请求、118.2 亿 Token。",
      "参与 OpenAI Responses、Codex 与 GitHub Copilot 调用链路的兼容性改造，围绕模型路由、SSE/WebSocket 流式响应和工具调用结果完成协议适配。",
      "参与用量统计与 Keeper 服务集成，维护 Linux 更新脚本、GitHub Actions 发布流程、阿里云 OSS 制品分发和 Nginx HTTPS 反向代理部署。",
    ],
  },
  {
    name: "个人网站与知识库",
    description: "Next.js · TypeScript · GitHub Pages",
    url: "https://tonkic.github.io/",
    urlLabel: "tonkic.github.io",
    bullets: [
      "基于 Next.js App Router 与 TypeScript 构建个人网站，统一承载知识库、项目展示、在线简历与模型 API 中转状态页，并通过静态导出适配 GitHub Pages。",
      "设计 Obsidian 笔记同步与目录树生成链路，完成 Markdown、KaTeX 数学公式、内部链接和图片资源渲染；针对 300+ 静态页面优化数据载荷与移动端长公式展示。",
      "建立 GitHub Actions 自动同步、类型检查、生产构建和 Pages 发布流程，并编写随机用户访问脚本覆盖路由、链接、公式渲染与页面体积回归。",
    ],
  },
];

export const resumeSkills: ResumeSkill[] = [
  {
    category: "AI API 网关与后端开发",
    detail: "具备 Go、Java、Python 后端开发与 REST API 实践，参与多模型 API 网关建设；理解模型路由、OpenAI 兼容协议、Responses/Codex 调用链路、SSE/WebSocket 流式响应和工具调用适配。",
  },
  {
    category: "Linux 生产交付与运维",
    detail: "具备 Linux、Shell、Nginx、HTTPS 与 Docker 部署实践，参与 GitHub Actions 自动发布、OSS 制品分发和更新脚本维护；能够结合反向代理、应用日志与进程状态定位线上问题。",
  },
  {
    category: "编程与数据系统基础",
    detail: "以 Go、Java、Python、TypeScript 为主要开发语言，掌握面向对象设计、接口抽象、异步与并发编程；具备 Spring Boot、MyBatis、MySQL 索引与执行计划分析实践，了解缓存、消息队列和流式数据处理。",
  },
  {
    category: "大数据与数据工程基础",
    detail: "掌握 Spark、Hive、Flink、Kafka 等组件的基本使用，理解批流处理、数据分区、消息消费、ETL 与离线数仓基本范式；具备 PyTorch、计算机视觉与模型推理基础。",
  },
  {
    category: "前端与内容工程",
    detail: "能够使用 Next.js、React、TypeScript、CSS 构建响应式站点与数据界面，处理 Markdown、KaTeX、静态导出和复杂内容排版；具备 ECharts、Metabase 等可视化实践。",
  },
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: "中数通信息有限公司",
    projectName: "企业 OA 审批工作流后端",
    projectDescription: "Spring Boot · MyBatis · MySQL · jQuery",
    role: "Java 后端实习生",
    location: "广州",
    period: "2024年08月 - 2024年10月",
    techStack: "Spring Boot、MyBatis、MySQL、jQuery",
    bullets: [
      "参与申请、审核、流转和驳回等核心节点的后端接口开发，将审批规则拆分为流程状态、节点校验和可追踪的审批记录。",
      "使用 Spring Boot、MyBatis 和 MySQL 完成参数校验、数据持久化与审批记录查询，配合前端完成接口联调、异常提示和数据回显。",
      "参与需求分析、接口设计、联调测试和交付验证，积累企业级 Java Web 项目的后端开发与问题定位经验。",
    ],
  },
];
