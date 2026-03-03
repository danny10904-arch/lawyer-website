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
    description: "協助處理遺產清冊陳報、繼承權益維護及家事紛爭調解。",
    icon: <Users className="w-6 h-6" />,
    cases: "112年度司繼字第1967號"
  },
  {
    title: "民事訴訟與契約",
    description: "專業處理承攬報酬請求、契約履行爭議及各類民事損害賠償。",
    icon: <Scale className="w-6 h-6" />,
    cases: "112年度訴字第1654號"
  },
  {
    title: "勞資爭議處理",
    description: "保障勞工權益，處理資遣費請求、確認僱傭關係及勞動契約爭議。",
    icon: <Briefcase className="w-6 h-6" />,
    cases: "111年度勞補字第713號"
  },
  {
    title: "金融與刑事附帶民事",
    description: "針對洗錢防制、詐欺等金融犯罪之受害者提供損害賠償訴訟服務。",
    icon: <ShieldCheck className="w-6 h-6" />,
    cases: "113年度附民字第2682號"
  }
];

const JUDGMENTS = [
  {
    id: "TPDV-112-1967",
    court: "臺灣臺北地方法院",
    year: "112年度",
    type: "司繼字第1967號",
    subject: "陳報遺產清冊",
    date: "2023-07-21",
    link: "https://lawplayer.com/kyc/judgment/TPDV,112,%E5%8F%B8%E7%B9%BC,1967,20230721,1_6e45a00a8c8959d8f37e2be55dfe0d50d1bd3435"
  },
  {
    id: "PCDV-112-1654",
    court: "臺灣新北地方法院",
    year: "112年度",
    type: "訴字第1654號",
    subject: "給付承攬報酬",
    date: "2023-07-21",
    link: "https://lawplayer.com/kyc/judgment/PCDV,112,%E8%A8%B4,1654,20230721,1_4a795a39db3c4d3d4d68397a6998e871ed04c412"
  },
  {
    id: "TCDV-111-713",
    court: "臺灣臺中地方法院",
    year: "111年度",
    type: "勞補字第713號",
    subject: "給付資遣費等",
    date: "2022-11-23",
    link: "https://lawplayer.com/kyc/judgment/TCDV,111,%E5%8B%9E%E8%A3%9C,713,20221123,1_8619704f212257775841065ab100579fb03e36f1"
  },
  {
    id: "TCDM-113-2682",
    court: "臺灣臺中地方法院",
    year: "113年度",
    type: "附民字第2682號",
    subject: "請求損害賠償 (洗錢防制法相關)",
    date: "2024-11-20",
    link: "https://lawplayer.com/kyc/judgment/TCDM,113,%E9%99%84%E6%B0%91,2682,20241120,1_c6115743bf54a867d0438748bd8d0fef8f8c4f14"
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
              深耕民事、家事及勞資爭議領域。我們不只提供法律建議，更致力於為每一位當事人尋求最溫暖且專業的解決方案。
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
                  <p className="text-legal-navy font-bold text-sm md:text-base">專業認證律師</p>
                  <p className="text-legal-navy/60 text-[10px] md:text-xs">專注民事與家事訴訟</p>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {EXPERTISE.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-transparent hover:border-legal-gold/20"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-legal-sand rounded-xl flex items-center justify-center mb-6 group-hover:bg-legal-gold group-hover:text-white transition-colors duration-500">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-legal-navy/60 text-xs md:text-sm leading-relaxed mb-6">{item.description}</p>
                <div className="pt-4 md:pt-6 border-t border-legal-sand flex items-center justify-between">
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">經手案例</h2>
            <div className="w-16 md:w-24 h-1 bg-legal-gold mx-auto" />
          </div>

          <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
            {JUDGMENTS.map((item, index) => (
              <motion.a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-8 p-6 md:p-8 rounded-2xl border border-legal-sand hover:bg-legal-sand transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 md:w-20 md:h-20 bg-legal-navy text-white rounded-full flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] md:text-[10px] uppercase opacity-60">Year</span>
                  <span className="text-sm md:text-lg font-serif">{item.year.replace('年度', '')}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                    <span className="px-2 md:px-3 py-0.5 md:py-1 bg-legal-gold/10 text-legal-gold text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-wider">
                      {item.court}
                    </span>
                    <span className="text-legal-navy/40 text-[10px] md:text-xs">{item.date}</span>
                  </div>
                  <h3 className="text-lg md:text-2xl font-bold group-hover:text-legal-gold transition-colors">{item.subject}</h3>
                  <p className="text-legal-navy/60 text-xs md:text-sm mt-1">{item.type}</p>
                </div>
                <div className="flex-shrink-0 self-end sm:self-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-legal-gold/30 flex items-center justify-center group-hover:bg-legal-gold group-hover:text-white transition-all">
                    <FileText className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          
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
