export type ResumeEducation = {
  degree: string;
  detail: string;
  period: string;
  school: string;
  tags: string[];
};

export type ResumeExperience = {
  company: string;
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
  target: "人工智能 / 大数据 / 后端开发方向",
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
    description: "Go / API Gateway / Protocol Relay",
    url: "https://tonkicapi.xyz/",
    urlLabel: "tonkicapi.xyz",
    bullets: [
      "基于 New API 与 CLIProxyAPI 进行二次开发，构建多模型 API 聚合与中转平台，围绕模型接入、协议转换和统一调用提供服务；累计处理 105,911 次请求、94 亿 Token。",
      "参与 OpenAI Responses、Codex 与 GitHub Copilot 等调用链路的兼容性改造，处理 SSE/WebSocket 流式响应、工具调用结果和模型路由问题。",
      "集成用量统计与 Keeper 服务，完善 Linux 更新脚本、GitHub Actions 发布流程、阿里云 OSS 分发和 Nginx HTTPS 反向代理部署。",
    ],
  },
  {
    name: "个人网站与知识库",
    description: "Next.js / TypeScript / GitHub Pages",
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
    category: "编程与软件工程",
    detail: "以 Python、Java、Go、TypeScript 为主要开发语言，具备面向对象设计、接口抽象、异步与并发编程、异常处理及可测试代码组织能力；使用 Git 进行分支协作与版本管理。",
  },
  {
    category: "后端与数据系统",
    detail: "具备 Spring Boot、MyBatis、REST API 与模型网关开发实践；掌握 MySQL 索引设计、执行计划分析和慢查询定位，理解缓存、消息队列、流式响应与协议适配。",
  },
  {
    category: "大数据与机器学习",
    detail: "掌握 Spark、Hive、Flink、Kafka 等批流处理组件及离线数仓基本范式；具备 PyTorch、深度学习训练评估、计算机视觉与异常检测基础，理解 CUDA 加速与模型推理流程。",
  },
  {
    category: "前端与可视化",
    detail: "能够使用 Next.js、React、TypeScript、CSS 构建响应式静态站点与数据界面，处理 Markdown、KaTeX 和复杂内容排版；具备 ECharts、Metabase 等数据可视化实践。",
  },
  {
    category: "云原生与交付",
    detail: "熟悉 Linux、Shell、Docker、Nginx 与 HTTPS 部署，能够配置 GitHub Actions 持续集成、静态发布和自动化脚本，并基于日志、网络与进程状态定位部署问题。",
  },
];

export const resumeExperiences: ResumeExperience[] = [
  {
    company: "中数通信信息有限公司",
    role: "Java 后端实习生",
    location: "广州",
    period: "2024年08月 - 2024年10月",
    techStack: "Spring Boot、MyBatis、MySQL、jQuery",
    bullets: [
      "参与企业 OA 工作流模块开发，围绕申请、审核、流转和驳回等节点实现后端接口与页面交互。",
      "根据审批规则梳理流程状态、字段校验和审批记录查询逻辑，配合前端完成接口联调、异常提示与数据回显。",
      "参与需求理解、接口开发、联调测试和交付验证，积累企业级 Java Web 系统开发与团队协作经验。",
    ],
  },
];
