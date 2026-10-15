const copy = {
  en: {
    navAbout: 'About / CV', navProjects: 'Projects', navNotes: 'Blog / Notes', navContact: 'Contact',
    heroEyebrow: 'PORTFOLIO · 2026', heroLine1: 'Thoughtful software,', heroLine2: 'built to be useful.',
    heroLead: 'I’m Nguyen Trong Phat. I build learning tools, practical automations, and interactive systems at the meeting point of software and the physical world.',
    seeProjects: 'Explore projects', moreAbout: 'More about me', heroFootnote: 'Curious about useful, well-crafted technology',
    aboutKicker: 'INTRODUCTION & CV', aboutTitle: 'A little about me.',
    aboutIntro: 'My interests move between a clear interface, a dependable backend, and the real-world process behind them.',
    aboutMain: 'I come from a <strong>Physics & Informatics</strong> background, with a habit of learning by building.',
    aboutBody: 'My projects explore language learning, business workflow automation, data dashboards, and simulation. I care about understandable architecture, careful interaction design, and tools people can actually use.',
    printCV: 'Print this CV snapshot', cvSnapshot: 'CV SNAPSHOT', cvBackgroundLabel: 'BACKGROUND', cvBackground: 'Physics & Informatics',
    cvBackgroundSub: 'Interdisciplinary technical foundation', cvFocusLabel: 'CURRENT FOCUS', cvFocus: 'Product-minded software',
    cvFocusSub: 'Learning tools · automation · interactive systems', cvToolboxLabel: 'TOOLBOX',
    projectsKicker: 'SELECTED WORK', projectsTitle: 'Projects with a purpose.',
    projectsIntro: 'A focused selection from my GitHub: different problems, one approach — make the complex feel clear.',
    allProjects: 'See all repositories on GitHub', notesKicker: 'TECHNICAL BLOG / NOTES', notesTitle: 'What I’m learning.',
    notesIntro: 'Short field notes on decisions behind the projects: product thinking, system boundaries, and responsible automation.',
    contactKicker: 'LET’S CONNECT', contactLine1: 'Have an idea?', contactLine2: 'Let’s talk.',
    contactBody: 'I’m always glad to hear about a thoughtful project, a technical challenge, or a chance to learn together.',
    emailLabel: 'EMAIL', linkedinLabel: 'Connect on LinkedIn', footerBuilt: 'Built with care, curiosity, and a little restraint.', backTop: 'Back to top ↑',
    artLabel: '01 — CURIOSITY INTO SYSTEMS', artLine1: 'Ideas', artLine2: 'made tangible.', artChip: 'INTERACTION', artObserve: 'observe', artProblem: 'the problem', artShape: 'shape', artSolution: 'the solution',
    viewCode: 'View project on GitHub', readNote: 'Read note', closeNote: 'Close note'
  },
  vi: {
    navAbout: 'Giới thiệu / CV', navProjects: 'Dự án', navNotes: 'Blog / Ghi chú', navContact: 'Liên hệ',
    heroEyebrow: 'PORTFOLIO · 2026', heroLine1: 'Phần mềm chỉn chu,', heroLine2: 'tạo ra giá trị thật.',
    heroLead: 'Mình là Nguyen Trong Phat. Mình xây dựng công cụ học tập, quy trình tự động hóa và hệ thống tương tác ở giao điểm giữa phần mềm và thế giới thực.',
    seeProjects: 'Xem dự án', moreAbout: 'Tìm hiểu về mình', heroFootnote: 'Luôn tò mò về công nghệ hữu ích và được làm cẩn thận',
    aboutKicker: 'GIỚI THIỆU & CV', aboutTitle: 'Đôi nét về mình.',
    aboutIntro: 'Mình quan tâm đến giao diện rõ ràng, backend đáng tin cậy và quy trình thực tế phía sau sản phẩm.',
    aboutMain: 'Mình có nền tảng <strong>Vật lý & Tin học</strong> và thích học bằng cách tự xây dựng sản phẩm.',
    aboutBody: 'Các dự án của mình trải từ học ngôn ngữ, tự động hóa quy trình, bảng dữ liệu đến mô phỏng. Mình chú trọng kiến trúc dễ hiểu, tương tác cẩn thận và công cụ thật sự dùng được.',
    printCV: 'In bản tóm tắt CV', cvSnapshot: 'TÓM TẮT CV', cvBackgroundLabel: 'NỀN TẢNG', cvBackground: 'Vật lý & Tin học',
    cvBackgroundSub: 'Nền tảng kỹ thuật liên ngành', cvFocusLabel: 'TRỌNG TÂM', cvFocus: 'Phần mềm hướng sản phẩm',
    cvFocusSub: 'Công cụ học tập · tự động hóa · hệ thống tương tác', cvToolboxLabel: 'CÔNG CỤ',
    projectsKicker: 'DỰ ÁN TIÊU BIỂU', projectsTitle: 'Dự án có mục đích.',
    projectsIntro: 'Một số repo tiêu biểu trên GitHub: giải quyết các bài toán khác nhau theo cách rõ ràng và dễ dùng.',
    allProjects: 'Xem tất cả repo trên GitHub', notesKicker: 'BLOG KỸ THUẬT / GHI CHÚ', notesTitle: 'Điều mình đang học.',
    notesIntro: 'Những ghi chú ngắn về các quyết định đằng sau dự án: tư duy sản phẩm, ranh giới hệ thống và tự động hóa có kiểm soát.',
    contactKicker: 'KẾT NỐI', contactLine1: 'Bạn có ý tưởng?', contactLine2: 'Hãy trò chuyện.',
    contactBody: 'Mình luôn sẵn sàng trao đổi về một dự án thú vị, bài toán kỹ thuật hoặc cơ hội cùng học hỏi.',
    emailLabel: 'EMAIL', linkedinLabel: 'Kết nối trên LinkedIn', footerBuilt: 'Làm bằng sự cẩn thận, tò mò và vừa đủ.', backTop: 'Lên đầu trang ↑',
    artLabel: '01 — TÒ MÒ THÀNH HỆ THỐNG', artLine1: 'Ý tưởng', artLine2: 'thành hiện thực.', artChip: 'TƯƠNG TÁC', artObserve: 'quan sát', artProblem: 'vấn đề', artShape: 'tạo nên', artSolution: 'giải pháp',
    viewCode: 'Xem dự án trên GitHub', readNote: 'Đọc ghi chú', closeNote: 'Thu gọn'
  }
};

const projects = [
  {
    type: '01 / LEARNING TOOLS', typeVi: '01 / CÔNG CỤ HỌC TẬP', title: 'LexiBloom',
    description: {
      en: 'An IELTS vocabulary workspace that connects words with meanings, examples, collocations, review, and progress.',
      vi: 'Không gian học từ vựng IELTS kết nối nghĩa, ví dụ, collocation, ôn tập và tiến độ học.'
    },
    tags: ['Next.js', 'TypeScript', 'Learning UX'], url: 'https://github.com/phatnguyen196-solverboiz/lexibloom-ielts', visual: 'lexi',
    visualHtml: '<div class="visual-shell"><div class="visual-top"><b>LEXIBLOOM</b><span>WORD PROFILE</span></div><div class="visual-body"><small>ACADEMIC WORDS / 01</small><div class="lexi-word">resilient <span style="color:#94aa97;font-size:15px">↗</span></div><div class="lexi-ipa">/rɪˈzɪliənt/ · adjective</div><div class="lexi-sentence">Able to recover quickly after difficulty.</div></div></div>'
  },
  {
    type: '02 / AUTOMATION', typeVi: '02 / TỰ ĐỘNG HÓA', title: 'FreightMind',
    description: {
      en: 'A shipping document workflow that extracts PDF fields, validates them, requires human review, then automates a demo ERP entry.',
      vi: 'Quy trình xử lý chứng từ vận tải: trích xuất PDF, kiểm tra dữ liệu, yêu cầu người duyệt rồi tự động nhập vào ERP mẫu.'
    },
    tags: ['Django', 'React', 'Pydantic'], url: 'https://github.com/phatnguyen196-solverboiz/ai-document-automation', visual: 'freight',
    visualHtml: '<div class="visual-shell"><div class="visual-top"><b>FREIGHTMIND</b><span>WORKFLOW</span></div><div class="visual-body"><small>FROM DOCUMENT TO VERIFIED ACTION</small><div class="flow-line"><div class="flow-step"><span>▤</span><strong>PDF</strong></div><span class="flow-arrow">→</span><div class="flow-step"><span>✓</span><strong>REVIEW</strong></div><span class="flow-arrow">→</span><div class="flow-step"><span>▦</span><strong>ERP</strong></div></div><span class="review-pill">Human approval required</span></div></div>'
  },
  {
    type: '03 / DATA & OPERATIONS', typeVi: '03 / DỮ LIỆU & VẬN HÀNH', title: 'RoutePulse',
    description: {
      en: 'A logistics dashboard that brings shipments, automated tracking, retries, and event history into one view.',
      vi: 'Bảng điều khiển logistics gom lô hàng, theo dõi tự động, lượt thử lại và lịch sử sự kiện vào cùng một nơi.'
    },
    tags: ['Next.js', 'Django', 'Selenium'], url: 'https://github.com/phatnguyen196-solverboiz/logistics-tracking-dashboard', visual: 'route',
    visualHtml: '<div class="visual-shell"><div class="visual-top"><b>ROUTEPULSE</b><span>TRACKING</span></div><div class="visual-body"><small>SHIPMENT OVERVIEW</small><div class="route-map"><div class="route-path"></div><div class="route-pin start"></div><div class="route-pin end"></div><div class="route-status">● &nbsp; Tracking event recorded</div></div></div></div>'
  },
  {
    type: '04 / INTERACTIVE SYSTEMS', typeVi: '04 / HỆ THỐNG TƯƠNG TÁC', title: 'PLC 3D Lab',
    description: {
      en: 'A learning simulation with a 3D conveyor, editable Ladder logic, timers, counters, and JSON program saving.',
      vi: 'Mô phỏng học tập với băng tải 3D, Ladder logic có thể chỉnh sửa, timer, counter và lưu chương trình JSON.'
    },
    tags: ['JavaScript', '3D', 'Simulation'], url: 'https://github.com/phatnguyen196-solverboiz/PLC-3D-Lab', visual: 'plc',
    visualHtml: '<div class="visual-shell"><div class="visual-top"><b>PLC 3D LAB</b><span>SIMULATOR</span></div><div class="visual-body"><small>CONVEYOR / LADDER CONTROL</small><div class="plc-scene"><div class="plc-belt"></div><div class="plc-box"></div><div class="plc-sensor"></div></div><div class="plc-ladder"><span></span><span></span><span></span><span></span><span></span></div></div></div>'
  }
];

const notes = [
  {
    number: 'NOTE 01',
    title: {en: 'A review gate makes automation safer', vi: 'Bước duyệt giúp tự động hóa an toàn hơn'},
    excerpt: {en: 'How to keep a person responsible when a document pipeline uses AI extraction.', vi: 'Giữ trách nhiệm ở con người khi quy trình chứng từ dùng AI trích xuất.'},
    body: {
      en: [
        'Extracting structured fields from a PDF is only the first step. The output can be incomplete, inconsistent, or confidently wrong. In FreightMind, extraction is followed by typed validation and a visible review state.',
        'The automation step accepts only approved data. That boundary keeps a model suggestion separate from an action in another system. The lesson is simple: make uncertainty visible, allow corrections, and require a deliberate decision before a consequential write.'
      ],
      vi: [
        'Trích xuất các trường dữ liệu từ PDF mới là bước đầu. Kết quả có thể thiếu, không nhất quán hoặc sai nhưng trông rất tự tin. Trong FreightMind, kết quả được kiểm tra kiểu dữ liệu và đưa vào trạng thái chờ duyệt rõ ràng.',
        'Bước tự động hóa chỉ nhận dữ liệu đã được phê duyệt. Ranh giới đó tách gợi ý của mô hình khỏi hành động ghi vào hệ thống khác. Bài học: làm rõ chỗ chưa chắc chắn, cho phép sửa và yêu cầu quyết định có chủ đích trước thao tác quan trọng.'
      ]
    }
  },
  {
    number: 'NOTE 02',
    title: {en: 'A word is more than a translation', vi: 'Một từ không chỉ là một bản dịch'},
    excerpt: {en: 'A small product idea behind vocabulary profiles and useful review loops.', vi: 'Ý tưởng sản phẩm phía sau hồ sơ từ vựng và vòng ôn tập hiệu quả.'},
    body: {
      en: [
        'A bare word–meaning pair is easy to collect and easy to forget. LexiBloom treats each entry as a profile: meaning, pronunciation, example, word family, and collocations belong together.',
        'A useful learning loop also remembers what happened. Local review intervals, mistake tracking, and typed answers turn a static list into practice. The interface should make the next action obvious without hiding the structure of the language.'
      ],
      vi: [
        'Một cặp từ–nghĩa rất dễ lưu nhưng cũng rất dễ quên. LexiBloom xem mỗi mục là một hồ sơ: nghĩa, phát âm, ví dụ, họ từ và collocation nằm cạnh nhau.',
        'Vòng học hữu ích còn ghi nhớ điều đã diễn ra. Lịch ôn trên thiết bị, theo dõi lỗi sai và câu trả lời tự nhập biến danh sách tĩnh thành việc luyện tập. Giao diện nên làm rõ bước tiếp theo mà vẫn giữ được cấu trúc của ngôn ngữ.'
      ]
    }
  },
  {
    number: 'NOTE 03',
    title: {en: 'Keep tracking logic in one place', vi: 'Đặt logic theo dõi ở đúng một nơi'},
    excerpt: {en: 'Why an operations dashboard benefits from clear service and adapter boundaries.', vi: 'Vì sao dashboard vận hành cần ranh giới rõ giữa service và adapter.'},
    body: {
      en: [
        'A tracking interface looks simple until retries, carrier pages, job state, and event history meet. RoutePulse puts that orchestration in a service instead of spreading it across HTTP views.',
        'A carrier adapter isolates Selenium details. The dashboard can then present a consistent shipment history even when an external page changes. Clear boundaries also make the system easier to extend and to explain.'
      ],
      vi: [
        'Giao diện theo dõi trông đơn giản cho đến khi gặp lượt thử lại, trang hãng vận chuyển, trạng thái công việc và lịch sử sự kiện. RoutePulse đặt phần điều phối này trong service thay vì rải khắp HTTP view.',
        'Adapter cho hãng vận chuyển cô lập chi tiết Selenium. Dashboard vì thế có thể trình bày lịch sử lô hàng nhất quán ngay cả khi trang bên ngoài đổi. Ranh giới rõ ràng cũng giúp hệ thống dễ mở rộng và dễ giải thích.'
      ]
    }
  }
];

let language = localStorage.getItem('portfolio-language') === 'vi' ? 'vi' : 'en';

function renderProjects() {
  const grid = document.querySelector('#project-grid');
  grid.innerHTML = projects.map(project => `
    <article class="project-card">
      <div class="project-visual ${project.visual}" aria-hidden="true">${project.visualHtml}</div>
      <div class="project-info">
        <div class="project-meta"><span>${language === 'vi' ? project.typeVi : project.type}</span><span class="meta-dot"></span><span>GITHUB</span></div>
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description[language]}</p>
        <div class="project-bottom"><div class="project-tags">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div><a class="project-link" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="${copy[language].viewCode}: ${project.title}" title="${copy[language].viewCode}">↗</a></div>
      </div>
    </article>`).join('');
}

function renderNotes() {
  const list = document.querySelector('#note-list');
  const openNotes = [...list.querySelectorAll('details')].map((item, index) => item.open ? index : -1);
  list.innerHTML = notes.map((note, index) => `
    <details class="note-card" ${openNotes.includes(index) ? 'open' : ''}>
      <summary><span class="note-number">${note.number}</span><h3 class="note-title">${note.title[language]}</h3><p class="note-excerpt">${note.excerpt[language]}</p><span class="note-read"><span>${copy[language].readNote}</span><span aria-hidden="true">＋</span></span></summary>
      <div class="note-body">${note.body[language].map(paragraph => `<p>${paragraph}</p>`).join('')}</div>
    </details>`).join('');
}

function setLanguage(next) {
  language = next;
  document.documentElement.lang = language;
  localStorage.setItem('portfolio-language', language);
  for (const node of document.querySelectorAll('[data-i18n]')) {
    const value = copy[language][node.dataset.i18n];
    if (value === undefined) continue;
    if (node.dataset.i18n === 'aboutMain') node.innerHTML = value;
    else node.textContent = value;
  }
  const toggle = document.querySelector('#language-toggle');
  toggle.querySelector('.language-current').textContent = language.toUpperCase();
  toggle.querySelector('.language-next').textContent = language === 'en' ? 'VI' : 'EN';
  toggle.setAttribute('aria-label', language === 'en' ? 'Switch to Vietnamese' : 'Chuyển sang tiếng Anh');
  renderProjects();
  renderNotes();
}

document.querySelector('#language-toggle').addEventListener('click', () => setLanguage(language === 'en' ? 'vi' : 'en'));
document.querySelector('#print-cv').addEventListener('click', () => window.print());
document.querySelector('#year').textContent = new Date().getFullYear();
setLanguage(language);

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.primary-nav a')];
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach(link => link.setAttribute('aria-current', link.hash === `#${visible.target.id}` ? 'true' : 'false'));
  }, {rootMargin: '-18% 0px -62% 0px', threshold: [0, .25, .5]});
  ['about', 'projects', 'notes', 'contact'].forEach(id => observer.observe(document.getElementById(id)));
}

