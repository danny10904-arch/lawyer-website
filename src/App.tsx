import { motion, useScroll, useTransform } from "motion/react";
import { 
  Scale, 
  Briefcase, 
  Users, 
  Gavel, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook,
  Award,
  BookOpen,
  FileText,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwhgZUw-scn2fmI54qKEDexAgsdy6eDBZInth4EMcYKLWfeEXFc4FxZKEEVim89h4U/exec";

const EXPERTISE = [
  {
    title: "家事與遺產繼承",
    description: "協助處理遺產清冊陳報、繼承權益維護、遺囑撰擬及家事紛爭調解。",
    icon: <Users className="w-6 h-6" />,
    cases: "112年度司繼字第1967號"
  },
  {
    title: "民事訴訟與契約",
    description: "專業處理承攬報酬請求、契約履行爭議、各類民事損害賠償及侵權行為訴訟。",
    icon: <Scale className="w-6 h-6" />,
    cases: "112年度補字第886號"
  },
  {
    title: "勞資爭議處理",
    description: "保障勞工權益，處理資遣費請求、確認僱傭關係存在及勞動契約爭議。",
    icon: <Briefcase className="w-6 h-6" />,
    cases: "110年度勞訴字第248號"
  },
  {
    title: "金融與刑事辯護",
    description: "針對洗錢防制、詐欺等金融犯罪提供專業辯護，及刑事附帶民事損害賠償訴訟。",
    icon: <ShieldCheck className="w-6 h-6" />,
    cases: "113年度金訴字第2108號"
  },
  {
    title: "智慧財產與行政訴訟",
    description: "處理公平交易法、智慧財產權爭議及行政處分之救濟與訴訟。",
    icon: <Gavel className="w-6 h-6" />,
    cases: "110年度民公訴字第10號"
  }
];

const JUDGMENTS = [
  {
    id: "PCDM-114-1078",
    court: "臺灣新北地方法院",
    year: "114年度",
    type: "審交易字第1078號",
    subject: "過失傷害 (交通刑事)",
    date: "2025-11-24",
    category: "刑事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDM%2c114%2c%e5%af%a9%e4%ba%a4%e6%98%93%2c1078%2c20251124%2c1&ot=in"
  },
  {
    id: "PCDV-114-136",
    court: "臺灣新北地方法院",
    year: "114年度",
    type: "審補字第136號",
    subject: "損害賠償 (民事訴訟)",
    date: "2025-11-10",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%2c114%2c%e5%af%a9%e8%a3%9c%2c136%2c20251110%2c1&ot=in"
  },
  {
    id: "PCDV-114-1340",
    court: "臺灣新北地方法院",
    year: "114年度",
    type: "訴字第1340號",
    subject: "給付承攬報酬",
    date: "2025-06-25",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%2c114%2c%e8%a8%b4%2c1340%2c20250625%2c1&ot=in"
  },
  {
    id: "TPHM-114-1446",
    court: "臺灣高等法院",
    year: "114年度",
    type: "上訴字第1446號",
    subject: "毒品危害防制條例 (刑事二審)",
    date: "2025-05-21",
    category: "刑事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPHM%2c114%2c%e4%b8%8a%e8%a8%b4%2c1446%2c20250521%2c1&ot=in"
  },
  {
    id: "TCDV-114-5",
    court: "臺灣臺中地方法院",
    year: "114年度",
    type: "金字第5號",
    subject: "損害賠償 (金融爭議)",
    date: "2025-02-21",
    category: "金融犯罪/賠償",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TCDV%2c114%2c%e9%87%91%2c5%2c20250221%2c1&ot=in"
  },
  {
    id: "TPEV-114-3399",
    court: "臺灣臺北地方法院",
    year: "114年度",
    type: "北簡字第3399號",
    subject: "給付簽帳卡消費款",
    date: "2025-08-01",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPEV%2c114%2c%e5%8c%97%e7%b0%a1%2c3399%2c20250801%2c2&ot=in"
  },
  {
    id: "TPEV-114-3399-2",
    court: "臺灣臺北地方法院",
    year: "114年度",
    type: "北簡字第3399號",
    subject: "給付簽帳卡消費款 (程序)",
    date: "2025-07-10",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPEV%2c114%2c%e5%8c%97%e7%b0%a1%2c3399%2c20250710%2c1&ot=in"
  },
  {
    id: "TPEV-114-853",
    court: "臺灣臺北地方法院",
    year: "114年度",
    type: "北補字第853號",
    subject: "損害賠償 (民事補正)",
    date: "2025-03-31",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPEV%2c114%2c%e5%8c%97%e8%a3%9c%2c853%2c20250331%2c1&ot=in"
  },
  {
    id: "PCEV-112-2602",
    court: "臺灣新北地方法院",
    year: "112年度",
    type: "板簡字第2602號",
    subject: "返還不當得利 (二審)",
    date: "2024-01-03",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCEV%2c112%2c%e6%9d%bf%e7%b0%a1%2c2602%2c20240103%2c2&ot=in"
  },
  {
    id: "PCEV-112-2602-1",
    court: "臺灣新北地方法院",
    year: "112年度",
    type: "板簡字第2602號",
    subject: "返還不當得利 (一審)",
    date: "2023-10-25",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCEV%2c112%2c%e6%9d%bf%e7%b0%a1%2c2602%2c20231025%2c1&ot=in"
  },
  {
    id: "PCDM-113-2663",
    court: "臺灣新北地方法院",
    year: "113年度",
    type: "審附民字第2663號",
    subject: "刑事附帶民事訴訟 (損害賠償)",
    date: "2025-01-10",
    category: "刑事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDM%2c113%2c%e5%af%a9%e9%99%84%e6%b0%91%2c2663%2c20250110%2c1&ot=in"
  },
  {
    id: "PCDM-113-2108",
    court: "臺灣新北地方法院",
    year: "113年度",
    type: "金訴字第2108號",
    subject: "洗錢防制法 (刑事金融)",
    date: "2024-12-31",
    category: "金融犯罪/賠償",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDM%2c113%2c%e9%87%91%e8%a8%b4%2c2108%2c20241231%2c1&ot=in"
  },
  {
    id: "TCDM-113-2682",
    court: "臺灣臺中地方法院",
    year: "113年度",
    type: "附民字第2682號",
    subject: "損害賠償 (刑事附帶民事)",
    date: "2024-11-20",
    category: "刑事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TCDM%2c113%2c%e9%99%84%e6%b0%91%2c2682%2c20241120%2c1&ot=in"
  },
  {
    id: "SLDV-112-1479",
    court: "臺灣士林地方法院",
    year: "112年度",
    type: "訴字第1479號",
    subject: "確認抵押權不存在等",
    date: "2024-10-04",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=SLDV%2c112%2c%e8%a8%b4%2c1479%2c20241004%2c1&ot=in"
  },
  {
    id: "PCDV-112-1654",
    court: "臺灣新北地方法院",
    year: "112年度",
    type: "訴字第1654號",
    subject: "給付承攬報酬 (民事訴訟)",
    date: "2023-07-21",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%2c112%2c%e8%a8%b4%2c1654%2c20230721%2c1&ot=in"
  },
  {
    id: "TPDV-112-1967",
    court: "臺灣臺北地方法院",
    year: "112年度",
    type: "司繼字第1967號",
    subject: "陳報遺產清冊 (家事繼承)",
    date: "2023-07-21",
    category: "家事與遺產繼承",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPDV%2c112%2c%e5%8f%b8%e7%b9%bc%2c1967%2c20230721%2c1&ot=in"
  },
  {
    id: "PCDV-112-886",
    court: "臺灣新北地方法院",
    year: "112年度",
    type: "補字第886號",
    subject: "損害賠償 (民事訴訟)",
    date: "2023-05-30",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%2c112%2c%e8%a3%9c%2c886%2c20230530%2c1&ot=in"
  },
  {
    id: "TCDV-111-713",
    court: "臺灣臺中地方法院",
    year: "111年度",
    type: "勞補字第713號",
    subject: "給付資遣費等 (勞資爭議)",
    date: "2022-11-23",
    category: "勞資爭議",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TCDV%2c111%2c%e5%8b%9e%e8%a3%9c%2c713%2c20221123%2c1&ot=in"
  },
  {
    id: "PCDV-111-1976",
    court: "臺灣新北地方法院",
    year: "111年度",
    type: "訴字第1976號",
    subject: "返還借款 (民事訴訟)",
    date: "2022-09-29",
    category: "民事訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%2c111%2c%e8%a8%b4%2c1976%2c20220929%2c1&ot=in"
  },
  {
    id: "TPDV-110-248",
    court: "臺灣臺北地方法院",
    year: "110年度",
    type: "勞訴字第248號",
    subject: "確認僱傭關係存在等 (勞資爭議)",
    date: "2022-05-06",
    category: "勞資爭議",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPDV%2c110%2c%e5%8b%9e%e8%a8%b4%2c248%2c20220506%2c1&ot=in"
  },
  {
    id: "IPCV-110-10",
    court: "智慧財產及商業法院",
    year: "110年度",
    type: "民公訴字第10號",
    subject: "公平交易法 (智慧財產)",
    date: "2021-11-30",
    category: "智慧財產權",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=IPCV%2c110%2c%e6%b0%91%e5%85%ac%e8%a8%b4%2c10%2c20211130%2c1&ot=in"
  },
  {
    id: "PCDV-109-529",
    court: "臺灣新北地方法院",
    year: "109年度",
    type: "婚字第529號",
    subject: "離婚 (家事婚姻)",
    date: "2021-09-15",
    category: "家事與遺產繼承",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=PCDV%20109%20%e5%a9%9a%20529%2020210915%201"
  },
  {
    id: "TPDV-110-25",
    court: "臺灣臺北地方法院",
    year: "110年度",
    type: "勞補字第25號",
    subject: "給付薪資等 (勞資爭議)",
    date: "2021-02-17",
    category: "勞資爭議",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPDV%2c110%2c%e5%8b%9e%e8%a3%9c%2c25%2c20210217%2c1&ot=in"
  },
  {
    id: "TPHV-109-5",
    court: "臺灣高等法院",
    year: "109年度",
    type: "重勞上更一字第5號",
    subject: "確認僱傭關係存在 (勞資二審)",
    date: "2020-12-29",
    category: "勞資爭議",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPHV%2c109%2c%e9%87%8d%e5%8b%9e%e4%b8%8a%e6%9b%b4%e4%b8%80%2c5%2c20201229%2c1&ot=in"
  },
  {
    id: "TPBA-109-2",
    court: "臺北高等行政法院",
    year: "109年度",
    type: "收抗字第2號",
    subject: "收容聲請 (行政訴訟)",
    date: "2020-04-17",
    category: "行政訴訟",
    link: "https://judgment.judicial.gov.tw/FJUD/data.aspx?ty=JD&id=TPBA%2c109%2c%e6%94%b6%e6%8a%97%2c2%2c20200417%2c1&ot=in"
  }
];



export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    category: "家事與遺產繼承",
    message: ""
  });
  const [activeCategory, setActiveCategory] = useState("全部");
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = ["全部", "民事訴訟", "刑事訴訟", "勞資爭議", "家事與遺產繼承", "金融犯罪/賠償", "智慧財產權", "行政訴訟"];

  const filteredJudgments = activeCategory === "全部" 
    ? JUDGMENTS 
    : JUDGMENTS.filter(j => j.category === activeCategory);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Google Apps Script requires no-cors or a specific response structure for CORS
      // Using fetch with the provided URL
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Essential for Google Apps Script redirects
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      setFormData({ name: "", phone: "", category: "家事與遺產繼承", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("傳送失敗，請稍後再試，或直接撥打電話聯繫我們。");
    } finally {
      setIsSubmitting(false);
    }
  };
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-legal-gold selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Gavel className="text-legal-gold w-5 h-5 md:w-6 md:h-6" />
          <span className="font-serif text-lg md:text-xl font-bold tracking-tight">陳品潔律師事務所</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#about" className="hover:text-legal-gold transition-colors">關於我</a>
          <a href="#expertise" className="hover:text-legal-gold transition-colors">專業領域</a>
          <a href="#cases" className="hover:text-legal-gold transition-colors">經典案例</a>
          <a href="#contact" className="hover:text-legal-gold transition-colors">聯繫諮詢</a>
        </div>
        <a href="#contact" className="bg-legal-navy text-white px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium hover:bg-legal-gold transition-all duration-300">
          預約諮詢
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden bg-legal-navy text-white pt-24 md:pt-20 pb-12 md:pb-0">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
            alt="Law Office"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-legal-navy/50 via-transparent to-legal-navy" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <span className="text-legal-gold font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 block text-xs md:text-base">陳品潔律師事務所 | JAMIE CHEN</span>
            <h1 className="text-4xl md:text-8xl font-bold leading-tight mb-6">
              以專業守護<br />
              <span className="italic font-normal text-legal-gold">您的權益</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
              橫跨民事、家事與勞資領域，於多地方法院累積豐富勝訴經驗；以嚴謹法律思維與人本關懷，為當事人打造穩健而有力的解決方案
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6 md:gap-4">
              <a href="#expertise" className="w-full sm:w-auto bg-legal-gold text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                查看專業領域 <ChevronRight className="w-4 h-4" />
              </a>
              <div className="flex items-center gap-6 px-4">
                <a href="https://www.instagram.com/jmpchen/" target="_blank" rel="noreferrer" className="hover:text-legal-gold transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61579873591287" target="_blank" rel="noreferrer" className="hover:text-legal-gold transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative max-w-sm mx-auto md:max-w-none"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border-4 md:border-8 border-white/10 shadow-2xl relative group">
              <img 
                src="https://images.weserv.nl/?url=duk.tw/v8dWec.jpg" 
                alt="陳品潔律師"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // If proxy also fails, try the direct link as a last resort before showing the placeholder
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('weserv.nl')) {
                    target.src = "https://duk.tw/v8dWec.jpg";
                  } else {
                    target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800";
                  }
                }}
              />
              <div className="absolute inset-0 bg-legal-gold/5 mix-blend-multiply" />
            </div>
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 glass p-4 md:p-6 rounded-xl shadow-xl"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="bg-legal-gold/20 p-2 md:p-3 rounded-full">
                  <Award className="text-legal-gold w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-legal-navy font-bold text-sm md:text-base">專業法律顧問</p>
                  <p className="text-legal-navy/60 text-[10px] md:text-xs">多地法院實務勝訴經驗</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">法律不只是條文，更是守護生活的溫度</h2>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
                <div className="space-y-4">
                  <div className="text-legal-gold text-3xl md:text-4xl font-serif">01</div>
                  <h3 className="text-lg md:text-xl font-bold">細膩傾聽</h3>
                  <p className="text-legal-navy/60 text-sm md:text-base leading-relaxed">每一件案件背後都是一個人生故事。我們重視與當事人的溝通，深入了解您的真實需求。</p>
                </div>
                <div className="space-y-4">
                  <div className="text-legal-gold text-3xl md:text-4xl font-serif">02</div>
                  <h3 className="text-lg md:text-xl font-bold">精準策略</h3>
                  <p className="text-legal-navy/60 text-sm md:text-base leading-relaxed">憑藉豐富的實務經驗，為複雜的法律爭議制定最有利的訴訟或協商策略。</p>
                </div>
                <div className="space-y-4">
                  <div className="text-legal-gold text-3xl md:text-4xl font-serif">03</div>
                  <h3 className="text-lg md:text-xl font-bold">全程陪伴</h3>
                  <p className="text-legal-navy/60 text-sm md:text-base leading-relaxed">從法律諮詢到判決執行，我們全程與您並肩作戰，讓法律程序不再令人徬徨。</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-16 md:py-24 bg-legal-sand relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 md:gap-8 text-center md:text-left">
            <div>
              <span className="text-legal-gold font-medium tracking-widest uppercase mb-2 block text-xs md:text-base">Our Services</span>
              <h2 className="text-3xl md:text-5xl font-bold">專業領域</h2>
            </div>
            <p className="text-legal-navy/60 max-w-md text-sm md:text-base">
              我們在多個法律領域擁有豐富的實務經驗，致力於提供全方位的法律支援。
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {EXPERTISE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-legal-gold/20 w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-sm flex flex-col"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-legal-sand rounded-xl flex items-center justify-center mb-6 group-hover:bg-legal-gold group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-legal-navy/60 text-xs md:text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                <div className="pt-4 md:pt-6 border-t border-legal-sand flex items-center justify-between mt-auto">
                  <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-tighter text-legal-navy/40">代表案號</span>
                  <span className="text-[10px] md:text-xs font-medium text-legal-gold">{item.cases}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Section */}
      <section id="cases" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">實務經歷</h2>
            <div className="w-16 md:w-24 h-1 bg-legal-gold mx-auto mb-8" />
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto lg:px-20">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border whitespace-nowrap ${
                    activeCategory === cat 
                    ? "bg-legal-navy text-white border-legal-navy shadow-lg" 
                    : "bg-white text-legal-navy border-legal-sand hover:border-legal-gold"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
            {filteredJudgments.slice(0, visibleCount).map((item, index) => (
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 2) * 0.1 }}
                className="group flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl border border-legal-sand hover:bg-legal-sand transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 bg-legal-navy text-white rounded-xl flex flex-col items-center justify-center text-center">
                  <span className="text-[7px] md:text-[8px] uppercase opacity-60">Year</span>
                  <span className="text-xs md:text-base font-serif">{item.year.replace('年度', '')}</span>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-legal-gold/10 text-legal-gold text-[8px] md:text-[10px] font-bold rounded uppercase tracking-wider">
                      {item.court}
                    </span>
                    <span className="text-legal-navy/40 text-[9px] md:text-[10px]">{item.date}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold group-hover:text-legal-gold transition-colors truncate">{item.subject}</h3>
                  <p className="text-legal-navy/60 text-[10px] md:text-xs mt-0.5">{item.type}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-legal-gold/30 flex items-center justify-center group-hover:bg-legal-gold group-hover:text-white transition-all">
                    <FileText className="w-3 h-3 md:w-4 md:h-4" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          
          {filteredJudgments.length > visibleCount && (
            <div className="mt-12 text-center">
              <button 
                onClick={() => setVisibleCount(prev => prev + 6)}
                className="px-8 py-3 rounded-full border border-legal-navy text-legal-navy font-bold text-sm hover:bg-legal-navy hover:text-white transition-all"
              >
                顯示更多案例
              </button>
            </div>
          )}

          <div className="mt-12 md:mt-16 text-center">
            <p className="text-legal-navy/40 text-[10px] md:text-sm italic">
              * 以上僅列出部分公開判決，更多實務經驗歡迎預約諮詢。
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-legal-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-legal-gold/5 -skew-x-12 translate-x-1/4" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8">聯繫我們</h2>
              <p className="text-white/60 mb-8 md:mb-12 text-sm md:text-lg leading-relaxed">
                法律問題不應成為您的負擔。請留下您的聯繫資訊，我們將在最短時間內由專人與您聯繫，為您提供初步的法律評估。
              </p>
              
              <div className="space-y-6 md:space-y-8 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-legal-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Email Address</p>
                    <a 
                      href="mailto:jamie.chen@attorney-jc.com" 
                      className="text-base md:text-lg font-medium hover:text-legal-gold transition-colors flex items-center gap-2"
                    >
                      jamie.chen@attorney-jc.com
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-50" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-legal-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Phone Number</p>
                    <a 
                      href="tel:0912931277" 
                      className="text-base md:text-lg font-medium hover:text-legal-gold transition-colors flex items-center gap-2"
                    >
                      0912 931 277
                      <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-50" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-legal-gold" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] md:text-xs text-white/40 uppercase tracking-widest">Office Location</p>
                    <p className="text-base md:text-lg font-medium text-balance">台北市大安區辛亥路一段84號8樓 (預約制)</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-legal-gold mb-4" />
                  <h3 className="text-2xl font-bold text-legal-navy mb-2">送出成功！</h3>
                  <p className="text-legal-navy/60">感謝您的諮詢，我們將盡快由專人與您聯繫。</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-legal-gold font-bold hover:underline"
                  >
                    再次填寫表單
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-legal-navy uppercase tracking-widest">姓名</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-legal-sand border-none rounded-xl p-3 md:p-4 text-sm text-legal-navy focus:ring-2 focus:ring-legal-gold outline-none" 
                        placeholder="您的稱呼" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] md:text-xs font-bold text-legal-navy uppercase tracking-widest">電話</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-legal-sand border-none rounded-xl p-3 md:p-4 text-sm text-legal-navy focus:ring-2 focus:ring-legal-gold outline-none" 
                        placeholder="聯繫電話" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-legal-navy uppercase tracking-widest">諮詢類別</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-legal-sand border-none rounded-xl p-3 md:p-4 text-sm text-legal-navy focus:ring-2 focus:ring-legal-gold outline-none appearance-none"
                    >
                      <option>家事與遺產繼承</option>
                      <option>民事訴訟</option>
                      <option>勞資爭議</option>
                      <option>刑事/金融犯罪</option>
                      <option>其他法律諮詢</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] md:text-xs font-bold text-legal-navy uppercase tracking-widest">簡述需求</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-legal-sand border-none rounded-xl p-3 md:p-4 text-sm text-legal-navy focus:ring-2 focus:ring-legal-gold outline-none resize-none" 
                      placeholder="請簡述您的法律問題..." 
                    />
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-legal-navy text-white py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-legal-gold transition-colors shadow-lg shadow-legal-navy/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        傳送中...
                      </>
                    ) : (
                      "送出諮詢請求"
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-legal-sand py-8 md:py-12 border-t border-legal-navy/5">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Gavel className="text-legal-gold w-5 h-5" />
            <span className="font-serif text-lg font-bold">陳品潔律師事務所</span>
          </div>
          <p className="text-legal-navy/40 text-[10px] md:text-sm">
            © {new Date().getFullYear()} 陳品潔律師事務所. All rights reserved. 法律顧問服務。
          </p>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="text-legal-navy/40 hover:text-legal-gold transition-colors text-[10px] uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-legal-navy/40 hover:text-legal-gold transition-colors text-[10px] uppercase tracking-widest">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
