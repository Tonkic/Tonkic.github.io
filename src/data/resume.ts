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
  name: "张庭毓",
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
    name: "基于 BERT 的中文情感分类系统",
    description: "NLP / 深度学习项目",
    bullets: [
      "基于 Google BERT 完成中文情感分类任务，覆盖数据清洗、样本编码、模型训练、验证评估和结果记录流程。",
      "在 ChnSentiCorp 数据集上进行实验，跟踪 accuracy、loss 等指标变化，积累文本分类任务调参和误差分析经验。",
      "项目体现 PyTorch/Transformers 模型使用、NLP 数据处理和机器学习实验复现能力。",
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
    role: "大数据开发工程师",
    location: "广州",
    period: "2024年08月 - 2024年10月",
    techStack: "Hive、Flink、Spark / Spark Streaming、Spark MLlib、Metabase、Avue-data、ECharts",
    bullets: [
      "参与企业大数据平台的离线与实时数仓开发，围绕业务报表和数据交付编写 Hive SQL、Flink 及 Spark Streaming 任务，完成数据清洗、加工与实时处理。",
      "根据业务需求梳理指标口径、字段逻辑和数据模型，参与数仓建模、SQL 开发、结果校验与问题排查，并配合完成分析组件联调和交付验证。",
      "使用 Spark MLlib 构建并训练小型机器学习模型，使用 Metabase、Avue-data、ECharts 完成数据可视化，同时参与平台运维与技术支持。",
    ],
  },
];
