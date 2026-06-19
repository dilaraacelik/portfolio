// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const navEl = document.querySelector('nav');
if (navToggle) {
  navToggle.addEventListener('click', () => navEl.classList.toggle('nav-open'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navEl.classList.remove('nav-open'));
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach((s) => navObserver.observe(s));

// Scroll fade-in
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(
  '.project-card, .exp-item, .skill-group-label, .skills-intro, .section-header, .stat, .availability, .contact-intro, .contact-email, .social-link'
).forEach((el) => fadeObserver.observe(el));

// Hero name reveal
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.opacity = '1';
  heroName.classList.add('hero-reveal');
}

// Stat counter
function animateCount(el, target, suffix) {
  const duration = 1200;
  const start = performance.now();
  const update = (now) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (t < 1) requestAnimationFrame(update);
    else el.textContent = target + suffix;
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      const match = text.match(/^(\d+)(\+|×|x)?$/);
      if (match) animateCount(el, parseInt(match[1]), match[2] || '');
      statObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.stat-num').forEach((el) => {
  if (/^\d/.test(el.textContent.trim())) statObserver.observe(el);
});

// Language toggle
const translations = {
  en: {
    'nav-projects': 'Projects',
    'nav-experience': 'Experience',
    'nav-skills': 'Skills',
    'nav-contact': 'Contact',
    'hero-eyebrow': '— AVAILABLE FOR OPPORTUNITIES',
    'btn-primary': 'See My Work',
    'btn-ghost': 'Get in touch →',
    'title-projects': 'Projects',
    'title-experience': 'Experience',
    'title-skills': 'Skills & Stack',
    'title-contact': "Let's Talk",
    'skills-intro': 'I work across the full stack with a preference for the backend. I enjoy designing systems before writing code.',
    'grp-spoken': '// Spoken Languages',
    'grp-lang': '// Languages',
    'grp-frontend': '// Frontend',
    'grp-backend': '// Backend & Infra',
    'grp-ai': '// AI & ML',
    'grp-data': '// Data & Analytics',
    'grp-tools': '// Tools & Practices',
    'desc-freelancekit': 'AI-powered proposal generator and client tracker for freelancers. Cuts proposal writing time by 80%.',
    'desc-shoto': 'Desktop tool for AI-generated YouTube Shorts content. Built with Tauri + FastAPI sidecar architecture.',
    'desc-moodtracker': 'Full-stack mood tracking web application that allows users to log daily emotions, view analytics, and track emotional patterns over time. Built with Next.js, TypeScript, and Supabase.',
    'desc-recommendation': 'Content-based recommendation system for books, series, and movies. Users get personalized suggestions based on item similarity.',
    'desc-moodfit': 'AI-powered outfit assistant that recommends outfits based on mood, weather, activity, and social context. Integrates Google Gemini AI and real-time weather data to suggest personalized combinations.',
    'desc-gokizci': 'Anomaly detection system for moving drone footage. Predicts future frames via a CNN Encoder–Transformer–Decoder pipeline and scores anomalies through a GAN Discriminator. Trained on VisDrone, UAV Benchmark, and ERA datasets — achieving 0.974 precision and 0.900 PR AUC across 4,762 video sequences.',
    'exp-insider': '<li>Conducted requirements analysis with 500+ external partners, translating business needs into technical specifications and driving 20+ campaign integrations end-to-end using HTML, CSS, and JavaScript.</li><li>Built a task grooming automation using TypeScript to streamline sprint planning workflows, reducing manual overhead for the team.</li><li>Identified and resolved production-level UI and behavioral issues, reducing critical user flow errors by 30% and improving overall product stability.</li><li>Implemented personalized content experiences using client-side data, cookie-based logic, and API integrations; supported 10+ A/B tests, contributing to a 10–15% increase in campaign CTR.</li><li>Acted as primary technical point of contact between internal teams and external stakeholders, ensuring alignment on scope, timelines, and delivery.</li>',
    'exp-blaq': '<li>Served as the primary developer on a UK-based web application used by 50+ organizations, managing requirements gathering, technical decisions, and delivery in direct collaboration with the client.</li><li>Built two full-stack projects end-to-end using React, Next.js, Django REST Framework, and PostgreSQL covering API design, data modeling, and frontend implementation.</li><li>Developed browser extensions focused on usability improvements, iterating on user feedback to enhance experience and performance.</li>',
    'exp-treomind': '<li>Built and automated ETL pipelines using PySpark and Apache Airflow, covering data cleaning, transformation, and workflow scheduling.</li><li>Conducted exploratory data analysis using SQL to support data integrity assessments across pipeline outputs.</li>',
    'exp-gazi': "<li>Grew the community to 500+ members; delivered technical training sessions on Convolutional Neural Networks (CNNs) as an instructor.</li><li>Secured sponsorships and organized the community's first large-scale event.</li>",
    'contact-intro': 'Available for opportunities. Also happy to talk about freelance projects, collaborations, or just geek out over system design.',
  },
  tr: {
    'nav-projects': 'Projeler',
    'nav-experience': 'Deneyim',
    'nav-skills': 'Yetenekler',
    'nav-contact': 'İletişim',
    'hero-eyebrow': '— FIRSATLARA AÇIĞIM',
    'btn-primary': 'Çalışmalarımı Gör',
    'btn-ghost': 'İletişime Geç →',
    'title-projects': 'Projeler',
    'title-experience': 'Deneyim',
    'title-skills': 'Yetenekler & Teknolojiler',
    'title-contact': 'İletişime Geçelim',
    'skills-intro': 'Backend ağırlıklı full-stack geliştirici olarak çalışıyorum. Kod yazmadan önce sistem tasarlamayı severim.',
    'grp-spoken': '// Konuşulan Diller',
    'grp-lang': '// Programlama Dilleri',
    'grp-frontend': '// Frontend',
    'grp-backend': '// Backend & Altyapı',
    'grp-ai': '// Yapay Zeka & ML',
    'grp-data': '// Veri & Analitik',
    'grp-tools': '// Araçlar & Pratikler',
    'desc-freelancekit': 'Serbest çalışanlar için AI destekli teklif oluşturucu ve müşteri takip aracı. Teklif yazma süresini %80 azaltır.',
    'desc-shoto': 'AI ile YouTube Shorts içeriği üretmek için masaüstü aracı. Tauri + FastAPI sidecar mimarisiyle geliştirildi.',
    'desc-moodtracker': 'Kullanıcıların günlük duygularını kaydedebildiği, analizleri görüntüleyebildiği ve zaman içindeki duygusal örüntüleri takip edebildiği tam yığın ruh hali takip uygulaması.',
    'desc-recommendation': 'Kitap, dizi ve filmler için içerik tabanlı öneri sistemi. Kullanıcılar öğe benzerliğine dayalı kişiselleştirilmiş öneriler alır.',
    'desc-moodfit': 'Ruh hali, hava durumu, etkinlik ve sosyal bağlama göre kıyafet öneren AI destekli stil asistanı. Google Gemini AI ve gerçek zamanlı hava durumu verileriyle kişiselleştirilmiş kombinler önerir.',
    'desc-gokizci': 'Hareketli drone görüntülerinden anomali tespit sistemi. CNN Encoder–Transformer–Decoder hattıyla gelecek kareyi tahmin eder, GAN Discriminator ile anomali skoru üretir. VisDrone, UAV Benchmark ve ERA veri setleriyle eğitildi — 4.762 video sekansında 0.974 precision ve 0.900 PR AUC elde etti.',
    'exp-insider': '<li>500\'den fazla iş ortağıyla gereksinim analizi yaparak iş ihtiyaçlarını teknik spesifikasyonlara dönüştürdüm ve HTML, CSS ve JavaScript ile 20\'den fazla kampanya entegrasyonunu uçtan uca teslim ettim.</li><li>Sprint planlama süreçlerini hızlandırmak için TypeScript ile görev grooming otomasyonu geliştirdim.</li><li>Üretim ortamındaki UI ve davranışsal hataları tespit edip çözdüm, kritik kullanıcı akışı hatalarını %30 azaltarak ürün kararlılığını iyileştirdim.</li><li>Cookie tabanlı mantık, istemci tarafı veri ve API entegrasyonlarıyla kişiselleştirilmiş içerik deneyimleri kurguladım ve 10\'dan fazla A/B testine destek vererek kampanya CTR\'ını %10–15 artırdım.</li><li>İç ekipler ile dış paydaşlar arasında teknik köprü rolünü üstlendim, kapsam, zaman çizelgesi ve teslimat konularında iki taraf arasında uyumu sağladım.</li>',
    'exp-blaq': '<li>50\'den fazla kuruluşun kullandığı İngiltere merkezli bir web uygulamasında baş geliştirici olarak çalıştım, müşteriyle doğrudan iş birliği içinde gereksinim toplama, teknik karar alma ve teslimattan sorumlu oldum.</li><li>React, Next.js, Django REST Framework ve PostgreSQL ile API tasarımı, veri modelleme ve frontend geliştirmeyi kapsayan iki full-stack projeyi baştan sona hayata geçirdim.</li><li>Kullanıcı geri bildirimlerini iteratif şekilde ürüne yansıtarak kullanılabilirlik odaklı tarayıcı eklentileri geliştirdim.</li>',
    'exp-treomind': '<li>PySpark ve Apache Airflow ile veri temizleme, dönüştürme ve iş akışı planlamasını kapsayan ETL pipeline\'ları kurdum ve otomatikleştirdim.</li><li>Pipeline çıktılarında veri bütünlüğünü doğrulamak için SQL ile keşifsel veri analizi yaptım.</li>',
    'exp-gazi': '<li>Topluluğu 500\'den fazla üyeye taşıdım, eğitmen olarak Evrişimli Sinir Ağları (CNN) üzerine teknik eğitimler verdim.</li><li>Sponsorluk görüşmeleri yürüterek topluluğun ilk büyük çaplı etkinliğini organize ettim.</li>',
    'contact-intro': 'Yeni fırsatlara açığım. Freelance projeler, iş birlikleri ya da sistem tasarımı üzerine sohbet etmekten de memnuniyet duyarım.',
  }
};

let currentLang = localStorage.getItem('lang') || 'en';

function applyLang(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang][key] !== undefined) el.textContent = translations[lang][key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });
  const btn = document.getElementById('lang-btn');
  if (btn) btn.textContent = lang === 'en' ? 'TR' : 'EN';
  currentLang = lang;
  localStorage.setItem('lang', lang);
}

function toggleLang() {
  applyLang(currentLang === 'en' ? 'tr' : 'en');
}

if (currentLang === 'tr') applyLang('tr');
