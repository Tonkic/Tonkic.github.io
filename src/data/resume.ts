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

export const resumeProjects: ResumeProject[] = [
  {
    name: "基于 BERT 的文本轻相分类",
    description: "机器学习项目",
    bullets: [
      "使用 Google AI 的 BERT 模型进行中文文本分类与情感分析，在 ChnSentiCorp 数据集上完成训练与评估。",
      "完成数据预处理、训练流程配置和结果记录，关注准确率、loss 等指标变化。",
    ],
  },
  {
    name: "面向工业异常检测的轻量化 PatchCore 模型研究",
    description: "毕业设计",
    bullets: [
      "围绕工业场景异常检测，对 PatchCore 思路进行轻量化改进与实验验证。",
      "分析模型内存占用、特征分布和推理开销，尝试在精度与效率之间取得更好的平衡。",
      "针对工业缺陷检测的多场景需求，整理实验结果并形成毕业设计文档。",
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
