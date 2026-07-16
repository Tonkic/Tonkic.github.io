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
  bullets: string[];
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
    name: "Tonkic API：多模型 API 聚合与中转平台",
    description: "Go / API Gateway / Protocol Relay",
    bullets: [
      "基于 New API 与 CLIProxyAPI 进行二次开发，构建多模型 API 聚合与中转平台，围绕模型接入、协议转换和统一调用提供服务。",
      "参与 OpenAI Responses、Codex 与 GitHub Copilot 等调用链路的兼容性改造，处理 SSE/WebSocket 流式响应、工具调用结果和模型路由问题。",
      "集成用量统计与 Keeper 服务，完善 Linux 更新脚本、GitHub Actions 发布流程、阿里云 OSS 分发和 Nginx HTTPS 反向代理部署。",
    ],
  },
  {
    name: "面向工业异常检测的轻量化 PatchCore 模型研究",
    description: "计算机视觉 / 毕业设计",
    bullets: [
      "围绕工业质检中的异常检测场景，研究 PatchCore 的特征提取、特征库构建和最近邻检索流程。",
      "尝试从特征压缩、采样策略和推理开销角度进行轻量化实验，关注精度、内存占用和推理效率之间的平衡。",
      "整理多场景工业缺陷检测实验结果并形成毕业设计文档，体现计算机视觉论文阅读、实验设计和结果分析能力。",
    ],
  },
];

export const resumeSkills = [
  "熟悉大数据组件 Spark、Hive、Flink、Kafka，具备离线数仓和实时数据处理实践经验。",
  "熟悉 Python、Java、C++，了解 Scala、R 语言。",
  "具备深度学习基础，了解 CUDA、神经网络和模型训练基本流程。",
  "熟悉 Git 版本控制，常用 GitHub / Gitee 协作开发。",
  "有前端基础，了解 CSS 和 JavaScript，能使用 ECharts、Metabase、Avue-data 做数据可视化。",
  "熟悉 Linux 常用命令和日志排查，能使用 Shell 搭建测试环境、编写简单自动化脚本。",
  "熟悉 MySQL 基本操作、慢查询排查、索引优化和 Explain 分析；能使用 Navicat 完成日常数据库操作。",
  "熟悉 Docker 容器化技术，能构建镜像、运行实例并完成基础部署。",
  "熟悉 Navicat、Xshell、PyCharm、Git、Docker 等常用开发工具。",
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
