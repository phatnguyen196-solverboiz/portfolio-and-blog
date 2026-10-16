"use client";

import { useState, useMemo } from "react";
import { Bi } from "./language-switch";
import {
  Trophy,
  Award,
  ShieldCheck,
  Flame,
  GraduationCap,
  Users,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export type AchievementCategory = "all" | "awards" | "certifications" | "milestones" | "academic";

export interface AchievementItem {
  id: string;
  category: AchievementCategory;
  categoryLabelEn: string;
  categoryLabelVi: string;
  titleEn: string;
  titleVi: string;
  organization: string;
  year: string;
  badgeEn: string;
  badgeVi: string;
  highlightMetric?: string;
  descriptionEn: string;
  descriptionVi: string;
  keyPointsEn: string[];
  keyPointsVi: string[];
  technologies: string[];
  credentialUrl?: string;
}

export const curatedAchievements: AchievementItem[] = [
  {
    id: "hackathon-national-gold",
    category: "awards",
    categoryLabelEn: "Contests & Hackathons",
    categoryLabelVi: "Giải thưởng & Thi đấu",
    titleEn: "National Distributed Systems Hackathon — 1st Place Champion",
    titleVi: "Quán Quân Cuộc Thi Phát Triển Hệ Thống Phân Tán Toàn Quốc",
    organization: "National Tech Innovation Association",
    year: "2025",
    badgeEn: "1st Place · Gold Medal",
    badgeVi: "Giải Nhất · Huy Chương Vàng",
    highlightMetric: "50,000 req/s with 0% dropped messages",
    descriptionEn: "Led an elite team of 3 software engineers to design and construct a high-throughput, low-latency distributed event broker running across edge nodes under simulated chaos-engineering load testing.",
    descriptionVi: "Trưởng nhóm 3 kỹ sư thiết kế và xây dựng giải pháp hàng đợi phân tán (event-broker) hiệu năng cao trên các edge nodes, xuất sắc vượt qua các kịch bản kiểm thử tải cực hạn và ngắt node đột ngột.",
    keyPointsEn: [
      "Engineered consensus-backed leader election and automated failover in Go and Redis Streams.",
      "Achieved sub-15ms P99 latency while processing 50,000 concurrent streaming events.",
      "Awarded highest score from the engineering committee for system resilience and clean architecture.",
    ],
    keyPointsVi: [
      "Thiết kế thuật toán bầu chọn leader đồng thuận và cơ chế failover tự động bằng Go và Redis Streams.",
      "Đạt độ trễ P99 dưới 15ms khi xử lý 50.000 sự kiện đồng thời trong điều kiện mô phỏng nghẽn mạng.",
      "Nhận điểm số cao nhất từ hội đồng chuyên gia về độ bền bỉ kiến trúc và tính hoàn thiện của mã nguồn.",
    ],
    technologies: ["Go", "Redis", "Docker", "Distributed Systems", "Chaos Engineering"],
  },
  {
    id: "cloud-edge-innovation",
    category: "awards",
    categoryLabelEn: "Contests & Hackathons",
    categoryLabelVi: "Giải thưởng & Thi đấu",
    titleEn: "Cloud & Edge Computing Innovation Challenge — 1st Runner-Up",
    titleVi: "Á Quân Thử Thách Sáng Tạo Điện Toán Đám Mây & Edge",
    organization: "Cloudflare & Dev Ecosystem",
    year: "2024",
    badgeEn: "2nd Place · Silver Medal",
    badgeVi: "Giải Nhì · Huy Chương Bạc",
    highlightMetric: "42% cloud egress cost reduction",
    descriptionEn: "Created an intelligent request-routing and edge-caching proxy leveraging WebAssembly and Cloudflare Workers to aggressively compress media and eliminate egress charges for serverless web applications.",
    descriptionVi: "Sáng tạo giải pháp định tuyến thông minh và bộ nhớ đệm edge kết hợp WebAssembly và Cloudflare Workers, nén ảnh/dữ liệu động và cắt giảm 42% chi phí truyền tải cho các hệ thống serverless.",
    keyPointsEn: [
      "Built native WebAssembly image transcoding modules that run within 10ms CPU limits on Workers.",
      "Cut origin server compute loads by 76% using edge stale-while-revalidate caching strategies.",
      "Praised for innovative use of serverless edge runtime without external VM dependencies.",
    ],
    keyPointsVi: [
      "Xây dựng module nén ảnh bằng WebAssembly chạy mượt mà trong giới hạn 10ms CPU của Cloudflare Workers.",
      "Giảm 76% tải tính toán tại máy chủ gốc nhờ chiến lược stale-while-revalidate tại edge nodes.",
      "Được đánh giá cao về tính đột phá khi khai thác edge runtime mà không cần duy trì máy chủ ảo tốn kém.",
    ],
    technologies: ["Cloudflare Workers", "WebAssembly", "TypeScript", "Edge Caching"],
  },
  {
    id: "aws-solutions-architect",
    category: "certifications",
    categoryLabelEn: "Professional Certifications",
    categoryLabelVi: "Chứng chỉ Chuyên môn",
    titleEn: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    titleVi: "Chứng Chỉ Kiến Trúc Sư Giải Pháp AWS (SAA-C03)",
    organization: "Amazon Web Services (AWS)",
    year: "2024",
    badgeEn: "Industry Standard · Cloud Architecture",
    badgeVi: "Chuẩn Quốc Tế · Kiến Trúc Đám Mây",
    highlightMetric: "Scored 890 / 1000",
    descriptionEn: "Comprehensive validation of technical expertise in designing resilient, highly available, secure, and cost-optimized distributed systems across AWS infrastructure.",
    descriptionVi: "Chứng nhận chuyên môn quốc tế toàn diện về thiết kế hệ thống phân tán chịu lỗi cao, bảo mật nhiều lớp và tối ưu hóa chi phí vận hành trên hạ tầng Amazon Web Services.",
    keyPointsEn: [
      "In-depth design of multi-region VPC topologies, IAM security perimeters, and zero-trust policies.",
      "Architected decoupling architectures using Amazon SQS, SNS, EventBridge, and serverless Lambda.",
      "Optimized storage and database tiering across RDS Multi-AZ, DynamoDB, S3, and ElastiCache.",
    ],
    keyPointsVi: [
      "Thiết kế cấu trúc mạng VPC đa vùng (multi-region), ranh giới bảo mật IAM và chính sách zero-trust.",
      "Xây dựng kiến trúc phân tách dịch vụ bằng Amazon SQS, SNS, EventBridge và serverless Lambda.",
      "Tối ưu hóa tầng lưu trữ và cơ sở dữ liệu trên RDS Multi-AZ, DynamoDB, S3 và ElastiCache.",
    ],
    technologies: ["AWS", "VPC", "ECS/EKS", "DynamoDB", "SQS", "CloudFormation"],
    credentialUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "gcp-cloud-developer",
    category: "certifications",
    categoryLabelEn: "Professional Certifications",
    categoryLabelVi: "Chứng chỉ Chuyên môn",
    titleEn: "Google Cloud Certified — Professional Cloud Developer",
    titleVi: "Kỹ Sư Phát Triển Đám Mây Chuyên Nghiệp Google Cloud",
    organization: "Google Cloud Platform (GCP)",
    year: "2024",
    badgeEn: "Professional Level · Google Cloud",
    badgeVi: "Cấp Độ Chuyên Nghiệp · Google Cloud",
    highlightMetric: "Production Scale Verified",
    descriptionEn: "Demonstrated technical proficiency in developing scalable, secure containerized microservices and deploying cloud-native backends utilizing GCP managed platforms and database services.",
    descriptionVi: "Chứng nhận năng lực chuyên sâu trong việc xây dựng và triển khai các ứng dụng microservices containerized, tích hợp hàng đợi thông điệp và cơ sở dữ liệu quy mô lớn trên nền tảng Google Cloud.",
    keyPointsEn: [
      "Engineered automated CI/CD pipelines deploying containerized workloads to Google Cloud Run and GKE.",
      "Integrated Pub/Sub event-driven asynchronous architectures with Cloud Functions and Cloud Tasks.",
      "Implemented observability, distributed tracing with Cloud Trace, and zero-downtime blue/green rollouts.",
    ],
    keyPointsVi: [
      "Thiết lập quy trình tự động hóa CI/CD triển khai container lên Google Cloud Run và GKE.",
      "Tích hợp kiến trúc bất đồng bộ theo hướng sự kiện với Pub/Sub, Cloud Functions và Cloud Tasks.",
      "Áp dụng giám sát hiệu năng, truy vết phân tán (Cloud Trace) và chiến lược triển khai không gián đoạn.",
    ],
    technologies: ["Google Cloud", "Cloud Run", "Kubernetes (GKE)", "Pub/Sub", "BigQuery"],
    credentialUrl: "https://cloud.google.com/certification",
  },
  {
    id: "zero-downtime-migration",
    category: "milestones",
    categoryLabelEn: "Engineering Milestones",
    categoryLabelVi: "Cột mốc Kỹ thuật",
    titleEn: "Zero-Downtime Edge Migration (100M+ Monthly API Requests)",
    titleVi: "Chuyển Đổi Hệ Thống Sang Edge Không Downtime (100M+ Requests/tháng)",
    organization: "Production Infrastructure Project",
    year: "2024",
    badgeEn: "P99 Latency: 480ms → 32ms",
    badgeVi: "Độ trễ P99: 480ms → 32ms",
    highlightMetric: "93.3% Latency Drop",
    descriptionEn: "Spearheaded the complete architectural migration of a legacy monolithic backend onto modern edge micro-workers, eliminating expensive cloud virtual machine instances and dramatically improving user experience globally.",
    descriptionVi: "Chủ trì toàn bộ quá trình tái kiến trúc chuyển đổi hệ thống monolithic truyền thống sang mạng lưới edge workers phân tán, loại bỏ hoàn toàn chi phí duy trì máy chủ ảo và cải thiện độ trễ vượt bậc.",
    keyPointsEn: [
      "Maintained 100% service uptime throughout a 4-month staged database synchronization and DNS rollout.",
      "Reduced compute and bandwidth expenditure by 60% via edge query caching and response compression.",
      "Eliminated cold start latency spikes through lightweight isolates and global CDN placement.",
    ],
    keyPointsVi: [
      "Đảm bảo hệ thống hoạt động 100% liên tục (zero-downtime) trong suốt 4 tháng di chuyển dữ liệu và phân luồng DNS.",
      "Cắt giảm 60% chi phí máy chủ và băng thông nhờ bộ nhớ đệm truy vấn thông minh tại edge.",
      "Triệt tiêu hoàn toàn độ trễ khởi động nguội nhờ kiến trúc isolate nhẹ và mạng lưới CDN toàn cầu.",
    ],
    technologies: ["Edge Computing", "PostgreSQL", "Next.js", "Redis", "Cloudflare"],
  },
  {
    id: "open-source-impact",
    category: "milestones",
    categoryLabelEn: "Engineering Milestones",
    categoryLabelVi: "Cột mốc Kỹ thuật",
    titleEn: "500+ GitHub Stars & 10,000+ Downloads for Open-Source Tooling",
    titleVi: "500+ Stars GitHub & 10.000+ Lượt Tải Cho Thư Viện Mã Nguồn Mở",
    organization: "Open Source Community",
    year: "2023 – Present",
    badgeEn: "Developer Ecosystem Impact",
    badgeVi: "Đóng Góp Cộng Đồng Lập Trình",
    highlightMetric: "10,000+ Downloads",
    descriptionEn: "Authored and actively maintained open-source TypeScript and Go utility libraries focused on concurrency patterns, type-safe RPC generation, and lightweight reactive UI primitives.",
    descriptionVi: "Tác giả và duy trì các thư viện mã nguồn mở hữu ích bằng TypeScript và Go, tập trung vào mô hình xử lý đa luồng, sinh mã RPC an toàn kiểu dữ liệu và các thành phần giao diện nhẹ.",
    keyPointsEn: [
      "Implemented clean, zero-dependency APIs with thorough unit test coverage and automated benchmarking.",
      "Reviewed and merged 40+ community pull requests, maintaining active GitHub discussion forums.",
      "Adopted by several developer teams for building rapid, type-safe internal microservices.",
    ],
    keyPointsVi: [
      "Xây dựng API sạch, không phụ thuộc thư viện ngoài (zero-dependency) với độ bao phủ kiểm thử cao.",
      "Tiếp nhận và xử lý hơn 40 đóng góp (pull requests) từ các lập trình viên trên thế giới.",
      "Được nhiều đội ngũ kỹ thuật tin tưởng ứng dụng để xây dựng các microservice nội bộ tin cậy.",
    ],
    technologies: ["Open Source", "TypeScript", "Go", "CI/CD GitHub Actions", "NPM Registry"],
    credentialUrl: "https://github.com/phatnguyen196-solverboiz",
  },
  {
    id: "academic-valedictorian",
    category: "academic",
    categoryLabelEn: "Academic Honors & Leadership",
    categoryLabelVi: "Học thuật & Lãnh đạo",
    titleEn: "Top 1% Outstanding Academic Excellence Scholarship",
    titleVi: "Học Bổng Khuyến Khích Học Tập Xuất Sắc Top 1%",
    organization: "University Academic Board",
    year: "2023 – 2025",
    badgeEn: "Top 1% Academic Honors",
    badgeVi: "Danh Hiệu Sinh Viên Xuất Sắc",
    highlightMetric: "GPA 3.85 / 4.0",
    descriptionEn: "Awarded full-ride merit scholarships across consecutive academic terms for achieving top 1% academic performance in Software Engineering, Computer Science, and Discrete Mathematics.",
    descriptionVi: "Được trao học bổng khuyến khích tài năng toàn phần trong nhiều kỳ học liên tiếp nhờ thành tích học tập và nghiên cứu nằm trong Top 1% chuyên ngành Kỹ thuật Phần mềm và Khoa học Máy tính.",
    keyPointsEn: [
      "Maintained top-tier GPA with exceptional evaluations in Algorithms, Database Systems, and Network Architecture.",
      "Conducted undergraduate research in high-performance computing and distributed consensus algorithms.",
      "Selected as representative to welcome international visiting professors and tech company delegates.",
    ],
    keyPointsVi: [
      "Duy trì điểm số xuất sắc ở các môn cốt lõi: Thuật toán & Cấu trúc dữ liệu, Hệ cơ sở dữ liệu và Mạng máy tính.",
      "Tham gia nghiên cứu chuyên đề về tính toán hiệu năng cao và thuật toán đồng thuận trong mạng phân tán.",
      "Đại diện sinh viên tiêu biểu tham gia giao lưu học thuật với các đoàn giáo sư và doanh nghiệp công nghệ.",
    ],
    technologies: ["Computer Science", "Algorithms", "Research", "Operating Systems"],
  },
  {
    id: "tech-lead-mentorship",
    category: "academic",
    categoryLabelEn: "Academic Honors & Leadership",
    categoryLabelVi: "Học thuật & Lãnh đạo",
    titleEn: "Technical Lead & Engineering Mentor — SolverBoiz Developer Guild",
    titleVi: "Trưởng Nhóm Kỹ Thuật & Cố Vấn — Cộng Đồng Lập Trình Viên SolverBoiz",
    organization: "SolverBoiz Engineering Club",
    year: "2023 – Present",
    badgeEn: "50+ Engineers Mentored",
    badgeVi: "Cố Vấn 50+ Kỹ Sư Trẻ",
    highlightMetric: "50+ Mentees",
    descriptionEn: "Founded and led a collaborative technical guild supporting junior engineers in leveling up their backend architectures, system design principles, and competitive coding problem-solving abilities.",
    descriptionVi: "Đồng sáng lập và dẫn dắt câu lạc bộ kỹ thuật hỗ trợ các bạn lập trình viên trẻ nâng cao năng lực thiết kế hệ thống backend, tư duy kiến trúc và kỹ năng giải thuật toán.",
    keyPointsEn: [
      "Organized 20+ technical workshops on Go concurrency, Redis data structures, and edge deployments.",
      "Coached junior engineers who successfully landed competitive internships at top tech enterprises.",
      "Fostered a culture of rigorous code reviews, automated testing, and comprehensive documentation.",
    ],
    keyPointsVi: [
      "Tổ chức hơn 20 buổi workshop chuyên sâu về đa luồng trong Go, cấu trúc dữ liệu Redis và triển khai edge.",
      "Kèm cặp và định hướng giúp nhiều thành viên đạt vị trí thực tập sinh tại các công ty công nghệ lớn.",
      "Xây dựng văn hóa review code nghiêm túc, viết kiểm thử tự động và tài liệu hóa chuẩn chỉ.",
    ],
    technologies: ["Leadership", "Mentorship", "System Design Workshops", "Community Building"],
  },
];

export function AchievementsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return curatedAchievements.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = item.titleEn.toLowerCase().includes(q) || item.titleVi.toLowerCase().includes(q);
      const matchOrg = item.organization.toLowerCase().includes(q);
      const matchTech = item.technologies.some((t) => t.toLowerCase().includes(q));
      const matchDesc = item.descriptionEn.toLowerCase().includes(q) || item.descriptionVi.toLowerCase().includes(q);

      return matchTitle || matchOrg || matchTech || matchDesc;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="achievements-explorer">
      {/* Overview Stat Counters */}
      <div
        className="stats-grid animate-fade-in-up"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 36,
        }}
      >
        <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
              <Bi en="Contests & Hackathons" vi="Cuộc thi & Hackathon" />
            </span>
            <Trophy size={18} style={{ color: "#f59e0b" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>3+ Awards</div>
          <div style={{ fontSize: 12, color: "var(--quiet)", marginTop: 4 }}>
            <Bi en="National Gold & Silver medals" vi="Giải Nhất & Nhì toàn quốc" />
          </div>
        </div>

        <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
              <Bi en="Certifications" vi="Chứng chỉ quốc tế" />
            </span>
            <ShieldCheck size={18} style={{ color: "#818cf8" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>4+ Credentials</div>
          <div style={{ fontSize: 12, color: "var(--quiet)", marginTop: 4 }}>
            <Bi en="AWS & Google Cloud Certified" vi="AWS & Google Cloud chuẩn hóa" />
          </div>
        </div>

        <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
              <Bi en="Production Scale" vi="Quy mô thực tế" />
            </span>
            <TrendingUp size={18} style={{ color: "#10b981" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>100M+ Req</div>
          <div style={{ fontSize: 12, color: "var(--quiet)", marginTop: 4 }}>
            <Bi en="Zero-downtime edge migration" vi="Chuyển đổi edge không downtime" />
          </div>
        </div>

        <div className="stat-card" style={{ padding: "20px 22px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--quiet)" }}>
              <Bi en="Academic Excellence" vi="Học thuật xuất sắc" />
            </span>
            <GraduationCap size={18} style={{ color: "#a78bfa" }} />
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>Top 1%</div>
          <div style={{ fontSize: 12, color: "var(--quiet)", marginTop: 4 }}>
            <Bi en="GPA 3.85 / Full-ride honors" vi="GPA 3.85 / Học bổng toàn phần" />
          </div>
        </div>
      </div>

      {/* Control Bar: Category Filters & Search */}
      <div
        className="control-bar"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button
            type="button"
            className={selectedCategory === "all" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("all")}
          >
            <Bi en="All Achievements" vi="Tất cả thành tựu" />
          </button>
          <button
            type="button"
            className={selectedCategory === "awards" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("awards")}
          >
            <Trophy size={13} style={{ marginRight: 5 }} />
            <Bi en="Awards & Contests" vi="Giải thưởng & Thi đấu" />
          </button>
          <button
            type="button"
            className={selectedCategory === "certifications" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("certifications")}
          >
            <ShieldCheck size={13} style={{ marginRight: 5 }} />
            <Bi en="Certifications" vi="Chứng chỉ chuyên môn" />
          </button>
          <button
            type="button"
            className={selectedCategory === "milestones" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("milestones")}
          >
            <Flame size={13} style={{ marginRight: 5 }} />
            <Bi en="Engineering Milestones" vi="Cột mốc kỹ thuật" />
          </button>
          <button
            type="button"
            className={selectedCategory === "academic" ? "button-primary button-sm" : "button-secondary button-sm"}
            onClick={() => setSelectedCategory("academic")}
          >
            <GraduationCap size={13} style={{ marginRight: 5 }} />
            <Bi en="Honors & Leadership" vi="Học thuật & Lãnh đạo" />
          </button>
        </div>

        {/* Search input */}
        <div style={{ position: "relative", minWidth: 240, flex: "1 1 200px", maxWidth: 360 }}>
          <Search
            size={15}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--quiet)", pointerEvents: "none" }}
          />
          <input
            type="text"
            className="input"
            style={{ paddingLeft: 36, height: 38, fontSize: 13 }}
            placeholder="Search keywords / Tìm theo từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: 0,
                color: "var(--quiet)",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Achievement Cards Grid */}
      <div style={{ display: "grid", gap: 24 }}>
        {filteredItems.length === 0 ? (
          <div
            style={{
              padding: "48px 20px",
              textAlign: "center",
              background: "var(--card)",
              border: "1px dashed var(--line)",
              borderRadius: 14,
              color: "var(--quiet)",
            }}
          >
            <p style={{ fontSize: 15, marginBottom: 8 }}>
              <Bi en="No achievements match your search filter." vi="Không tìm thấy thành tựu nào khớp với từ khóa." />
            </p>
            <button
              type="button"
              className="button-secondary button-sm"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              <Bi en="Reset all filters" vi="Xóa tất cả bộ lọc" />
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <article
              key={item.id}
              className="achievement-card animate-fade-in-up"
              style={{
                animationDelay: `${0.05 * (idx + 1)}s`,
                background: "var(--card)",
                border: "1px solid var(--line)",
                borderRadius: 16,
                padding: "28px 28px",
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            >
              {/* Header: Organization, Year & Badge */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                      color: "#818cf8",
                    }}
                  >
                    {item.organization}
                  </span>
                  <span style={{ color: "var(--line)" }}>•</span>
                  <span style={{ fontSize: 12, color: "var(--quiet)", fontFamily: "monospace" }}>
                    {item.year}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.highlightMetric && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#10b981",
                        background: "rgba(16, 185, 129, 0.1)",
                        padding: "3px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                      }}
                    >
                      {item.highlightMetric}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink)",
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "3px 10px",
                      borderRadius: 999,
                      border: "1px solid var(--line)",
                    }}
                  >
                    <Bi en={item.badgeEn} vi={item.badgeVi} />
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.35,
                  marginBottom: 14,
                }}
              >
                <Bi en={item.titleEn} vi={item.titleVi} />
              </h2>

              {/* Description */}
              <p
                style={{
                  fontSize: 14,
                  color: "var(--quiet)",
                  lineHeight: 1.65,
                  marginBottom: 18,
                }}
              >
                <Bi en={item.descriptionEn} vi={item.descriptionVi} />
              </p>

              {/* Key Bullet Points */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 20px 0",
                  display: "grid",
                  gap: 8,
                }}
              >
                {item.keyPointsEn.map((pointEn, pIdx) => (
                  <li
                    key={pIdx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontSize: 13,
                      lineHeight: 1.55,
                      color: "var(--ink)",
                    }}
                  >
                    <CheckCircle2
                      size={15}
                      style={{ color: "#818cf8", flexShrink: 0, marginTop: 3 }}
                    />
                    <span>
                      <Bi en={pointEn} vi={item.keyPointsVi[pIdx]} />
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer: Tags & Verified Action */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  paddingTop: 16,
                  borderTop: "1px solid var(--line)",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: 11,
                        color: "var(--quiet)",
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        padding: "2px 9px",
                        borderRadius: 6,
                        fontFamily: "monospace",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {item.credentialUrl && (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-secondary button-sm"
                    style={{ fontSize: 11, padding: "5px 12px" }}
                  >
                    <Bi en="Verify Credential" vi="Xác minh chứng chỉ" />
                    <ExternalLink size={12} style={{ marginLeft: 4 }} />
                  </a>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
