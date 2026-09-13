/**
* Template Name: Bootslander
* Template URL: https://bootstrapmade.com/bootslander-free-bootstrap-landing-page-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
  //  */
  // const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  // function mobileNavToogle() {
  //   document.querySelector('body').classList.toggle('mobile-nav-active');
  //   mobileNavToggleBtn.classList.toggle('bi-list');
  //   mobileNavToggleBtn.classList.toggle('bi-x');
  // }
  // mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Logout
   */
  const logoutBtn = document.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      const confirmed = window.confirm('Yakin ingin keluar dari akun Anda?');
      if (!confirmed) return;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('currentUser');
      window.location.href = 'index.html';
    });
  }

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const preloaderMinDisplay = 2200;
    const preloaderStart = performance.now();
    const removePreloader = () => preloader.remove();
    window.addEventListener('load', () => {
      const remaining = Math.max(0, preloaderMinDisplay - (performance.now() - preloaderStart));
      setTimeout(() => {
        preloader.classList.add('preloader-hide');
        preloader.addEventListener('transitionend', removePreloader, { once: true });
        // Fallback jika transitionend tidak terpicu (mis. halaman tanpa CSS fade)
        setTimeout(removePreloader, 700);
      }, remaining);
    });
    // Fallback jika event 'load' tidak pernah terpicu (mis. resource eksternal gagal/lambat)
    setTimeout(removePreloader, 8000);
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      disable: window.innerWidth < 992
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox:not([data-gallery="materi-seru"])'
  });

  /**
   * Materi Seru video gallery: adds a visible "Video Selanjutnya" button
   * inside the lightbox so viewers can advance without hunting for the
   * small default arrow (important on mobile where it sits at the screen edge).
   */
  const materiSeruLightbox = GLightbox({
    selector: '.glightbox[data-gallery="materi-seru"]',
    loop: true
  });
  materiSeruLightbox.on('slide_after_load', (data) => {
    const gdescInner = data.slide && data.slide.querySelector('.gdesc-inner');
    if (!gdescInner) return;
    let nextBtn = gdescInner.querySelector('.materi-seru-next-btn');
    if (!nextBtn) {
      nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.className = 'materi-seru-next-btn';
      nextBtn.addEventListener('click', () => materiSeruLightbox.nextSlide());
      gdescInner.appendChild(nextBtn);
    }
    const total = materiSeruLightbox.elements.length;
    nextBtn.innerHTML = data.index === total - 1
      ? 'Ulangi dari Awal <i class="bi bi-arrow-repeat"></i>'
      : 'Video Selanjutnya <i class="bi bi-skip-forward-fill"></i>';
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();



// soal

const questions = [

  // SOAL KENAMPAKAN ALAM SUMATERA UTARA
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Kenampakan alam terbesar yang menjadi ikon Provinsi Sumatera Utara adalah ....",
    options: ["Danau Maninjau", "Danau Singkarak", "Danau Toba", "Danau Tempe"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Danau Toba terbentuk akibat ....",
    options: ["gempa bumi", "letusan gunung api", "banjir", "angin kencang"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pulau yang berada di tengah Danau Toba adalah ....",
    options: ["Pulau Nias", "Pulau Samosir", "Pulau Weh", "Pulau Banyak"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Gunung berapi yang masih aktif di Sumatera Utara adalah ....",
    options: ["Gunung Kerinci", "Gunung Leuser", "Gunung Sinabung", "Gunung Ciremai"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Gunung Sibayak terletak di daerah ....",
    options: ["Berastagi", "Medan", "Binjai", "Kisaran"],
    correct: 0,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pantai yang terkenal dengan ombak besar di Sumatera Utara terdapat di Pulau ....",
    options: ["Samosir", "Nias", "Batam", "Belitung"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Sungai terpanjang di Sumatera Utara adalah Sungai ....",
    options: ["Musi", "Asahan", "Kapuas", "Mahakam"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Sungai Asahan mengalir dari ....",
    options: ["Gunung Sinabung", "Danau Toba", "Pantai Nias", "Bukit Lawang"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Bukit Barisan merupakan rangkaian ....",
    options: ["sungai", "danau", "pegunungan", "pantai"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Kawasan Bukit Lawang terkenal sebagai habitat ....",
    options: ["gajah", "harimau", "orangutan", "badak"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Taman Nasional Gunung Leuser berada di wilayah ....",
    options: ["Sumatera Utara dan Aceh", "Sumatera Utara dan Riau", "Sumatera Barat dan Riau", "Aceh dan Lampung"],
    correct: 0,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Wilayah dataran tinggi di Sumatera Utara memiliki udara yang ....",
    options: ["panas", "lembap", "sejuk", "kering"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Daerah yang terkenal sebagai penghasil sayuran karena berada di dataran tinggi adalah ....",
    options: ["Belawan", "Berastagi", "Tanjung Balai", "Sibolga"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pantai timur Sumatera Utara berbatasan dengan ....",
    options: ["Samudra Hindia", "Laut Jawa", "Selat Malaka", "Laut Natuna"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pantai barat Sumatera Utara berbatasan dengan ....",
    options: ["Laut Banda", "Selat Sunda", "Samudra Hindia", "Laut Flores"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Kenampakan alam berupa hamparan tanah yang luas dan relatif datar disebut ....",
    options: ["gunung", "pantai", "dataran", "lembah"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Air terjun Sipiso-piso berada di sekitar ....",
    options: ["Danau Toba", "Sungai Asahan", "Pantai Nias", "Kota Medan"],
    correct: 0,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Salah satu manfaat sungai bagi masyarakat adalah ....",
    options: ["tempat parkir", "jalur transportasi dan irigasi", "tempat pembuangan sampah", "tempat bermain kendaraan"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pegunungan di Sumatera Utara berfungsi sebagai daerah ....",
    options: ["pertambangan minyak", "resapan air", "pelabuhan", "kawasan industri"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Ombak besar di Pantai Sorake dimanfaatkan untuk ....",
    options: ["bertani", "berselancar", "menangkap burung", "menanam padi"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Salah satu cara menjaga kelestarian Danau Toba adalah ....",
    options: ["membuang sampah ke danau", "menangkap ikan dengan racun", "menjaga kebersihan lingkungan", "menebang pohon di sekitar danau"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Hutan di Sumatera Utara memiliki fungsi utama sebagai ....",
    options: ["tempat membangun gedung", "penghasil air dan habitat satwa", "tempat parkir kendaraan", "lokasi pembuangan limbah"],
    correct: 1,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Kota Medan berada di wilayah ....",
    options: ["dataran tinggi", "pegunungan", "dataran rendah", "lembah"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Pulau Nias berada di sebelah .... Pulau Sumatra.",
    options: ["utara", "timur", "barat", "selatan"],
    correct: 2,
  },
  {
    materi: "Kenampakan Alam Sumatera Utara",
    question: "Kenampakan alam yang dapat dimanfaatkan sebagai pembangkit listrik tenaga air di Sumatera Utara adalah ....",
    options: ["Gunung Sinabung", "Sungai Asahan", "Pantai Sorake", "Pulau Nias"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let correctCount = 0;
let userAnswers = questions.map(() => null);
let autoAdvanceTimer = null;

const PASSING_SCORE = 70;

function loadQuestion() {
  const quizDiv = document.getElementById("quiz");
  const question = questions[currentQuestionIndex];
  const savedAnswer = userAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  quizDiv.innerHTML = `
    <p class="question-number mb-2"><i class="bi bi-flag-fill"></i> Soal ${currentQuestionIndex + 1} dari ${questions.length}</p>
    <p class="question-text mb-4">${question.question}?</p>
    <div>
      ${question.options
        .map(
          (option, index) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answer" id="option${index}" value="${index}" ${savedAnswer === index ? "checked" : ""}>
          <label class="form-check-label" for="option${index}">
            ${option}
          </label>
        </div>
      `
        )
        .join("")}
    </div>
    <div class="quiz-nav mt-4 d-flex justify-content-between">
      <button type="button" class="quiz-nav-btn" id="quiz-prev-btn" onclick="goToPreviousQuestion()" ${currentQuestionIndex === 0 ? "disabled" : ""}>&laquo; Soal Sebelumnya</button>
      <button type="button" class="quiz-nav-btn" id="quiz-next-btn" onclick="goToNextQuestionManual()" ${savedAnswer === null ? "disabled" : ""}>${isLastQuestion ? "Selesai" : "Soal Berikutnya"} &raquo;</button>
    </div>
  `;
}


function selectAnswer() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (!selectedOption) return;

  const selectedIndex = parseInt(selectedOption.value, 10);
  const wasUnanswered = userAnswers[currentQuestionIndex] === null;
  userAnswers[currentQuestionIndex] = selectedIndex;

  const nextBtn = document.getElementById("quiz-next-btn");
  if (nextBtn) nextBtn.disabled = false;

  if (wasUnanswered) {
    // Jawaban tidak ditampilkan benar/salah - baru pertama kali dijawab
    // langsung lanjut otomatis ke soal berikutnya
    autoAdvanceTimer = setTimeout(() => {
      autoAdvanceTimer = null;
      goToNextQuestion();
    }, 300);
  }
  // Kalau sedang meninjau ulang soal yang sudah pernah dijawab, cukup
  // simpan perubahannya - biarkan siswa yang menekan tombol navigasi
}

function cancelAutoAdvance() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

function goToNextQuestionManual() {
  cancelAutoAdvance();
  if (userAnswers[currentQuestionIndex] === null) return;
  goToNextQuestion();
}

function goToPreviousQuestion() {
  cancelAutoAdvance();
  if (currentQuestionIndex === 0) return;
  currentQuestionIndex--;
  loadQuestion();
}

function getStarCount(score) {
  if (score < 50) return 1;
  if (score < 70) return 2;
  if (score < 90) return 3;
  return 4;
}

function showFinalResult() {
  const total = questions.length;
  correctCount = userAnswers.reduce((count, answer, index) => {
    return answer === questions[index].correct ? count + 1 : count;
  }, 0);
  const wrongCount = total - correctCount;
  const score = Math.round((correctCount / total) * 100);
  const passed = score >= PASSING_SCORE;
  const starCount = getStarCount(score);

  document.getElementById("finished-title").textContent = passed ? "Selamat, Kamu Lulus!" : "Yah, Belum Lulus";
  document.getElementById("reward-score").textContent = score;
  document.getElementById("reward-correct").textContent = correctCount;
  document.getElementById("reward-wrong").textContent = wrongCount;

  document.querySelectorAll("#finished-ribbon .ribbon-star").forEach((star, index) => {
    star.classList.toggle("empty", index >= starCount);
  });

  const certBtn = document.getElementById("finished-cert-btn");
  certBtn.style.display = score === 100 ? "inline-block" : "none";

  const messageEl = document.getElementById("finished-message");
  const okBtn = document.getElementById("finished-ok-btn");
  const retryBtn = document.getElementById("finished-retry-btn");

  if (passed) {
    messageEl.textContent = `Nilai kamu ${score}, sudah mencapai standar kelulusan (minimal ${PASSING_SCORE}). Kerja bagus!`;
    okBtn.style.display = "inline-block";
    retryBtn.style.display = "none";
  } else {
    messageEl.textContent = `Nilai kamu ${score}, masih di bawah ${PASSING_SCORE}. Yuk, ulangi lagi supaya lebih paham!`;
    okBtn.style.display = "none";
    retryBtn.style.display = "inline-block";
  }

  showPopup("finished");
  playFinishedSound();
}

function restartQuiz() {
  cancelAutoAdvance();
  currentQuestionIndex = 0;
  correctCount = 0;
  userAnswers = questions.map(() => null);
  closePopup();
  loadQuestion();
}

function getCertificateStudentName() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    if (currentUser && currentUser.username) return currentUser.username;
  } catch (e) {
    // biarkan fallback di bawah
  }
  return "Siswa Terala";
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Gagal memuat gambar: " + src));
    img.src = src;
  });
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0] || "";
  for (let i = 1; i < words.length; i++) {
    const testLine = currentLine + " " + words[i];
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Sertifikat digambar langsung dengan Canvas 2D API (bukan "screenshot" HTML
// lewat html2canvas). Setelah berkali-kali html2canvas gagal konsisten di
// berbagai HP (warna ketiban color-mix(), clip-path tidak akurat, posisi
// fixed/absolute meleset, sebagian teks tidak ter-render), pakai Canvas API
// asli jauh lebih andal karena didukung penuh & konsisten di semua browser.
async function generateCertificateDataUrl() {
  const templateImg = await loadImageElement("assets/Template%20Sertifikat/template.png");

  const canvas = document.createElement("canvas");
  canvas.width = templateImg.naturalWidth || 2000;
  canvas.height = templateImg.naturalHeight || 1414;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

  const centerX = canvas.width / 2;

  ctx.textAlign = "center";
  ctx.fillStyle = "#16225a";
  ctx.font = "800 92px 'Playfair Display', serif";
  ctx.fillText("SERTIFIKAT", centerX, 260);

  ctx.font = "700 38px 'Playfair Display', serif";
  ctx.fillText("PARTISIPASI", centerX, 320);

  ctx.fillStyle = "#a9781f";
  ctx.font = "700 28px Poppins, sans-serif";
  ctx.fillText("SERTIFIKAT INI DIBERIKAN KEPADA:", centerX, 410);

  ctx.fillStyle = "#16225a";
  ctx.font = "90px 'Great Vibes', cursive";
  ctx.fillText(getCertificateStudentName(), centerX, 510);

  ctx.strokeStyle = "#d8cba0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX - 250, 535);
  ctx.lineTo(centerX + 250, 535);
  ctx.stroke();

  ctx.fillStyle = "#7a7a7a";
  ctx.font = "28px Poppins, sans-serif";
  const descLines = wrapCanvasText(
    ctx,
    'Atas keberhasilannya menyelesaikan Latihan Soal Online di Terala dengan meraih nilai sempurna 100.',
    1300
  );
  descLines.forEach((line, i) => {
    ctx.fillText(line, centerX, 600 + i * 38);
  });

  let signatureBottomY = 600 + descLines.length * 38 + 60;
  try {
    const signatureImg = await loadImageElement("assets/ttd/TTD.png");
    const sigWidth = 300;
    const sigHeight = (signatureImg.naturalHeight / signatureImg.naturalWidth) * sigWidth;
    ctx.drawImage(signatureImg, centerX - sigWidth / 2, signatureBottomY, sigWidth, sigHeight);
    signatureBottomY += sigHeight;
  } catch (err) {
    console.warn("Tanda tangan tidak ditemukan, lewati:", err);
  }

  signatureBottomY += 20;
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(centerX - 150, signatureBottomY);
  ctx.lineTo(centerX + 150, signatureBottomY);
  ctx.stroke();

  ctx.fillStyle = "#16225a";
  ctx.font = "700 32px Poppins, sans-serif";
  ctx.fillText("Tim Terala", centerX, signatureBottomY + 40);

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  ctx.fillStyle = "#a0a0a0";
  ctx.font = "24px Poppins, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(today, canvas.width - 130, canvas.height - 60);

  return canvas.toDataURL("image/jpeg", 0.92);
}

function downloadCertificate() {
  const certBtn = document.getElementById("finished-cert-btn");
  const originalLabel = certBtn.textContent;

  if (!window.jspdf) {
    alert("Gagal memuat komponen pembuat sertifikat (jsPDF). Periksa koneksi internet, lalu coba lagi.");
    return;
  }

  certBtn.disabled = true;
  certBtn.textContent = "Menyiapkan sertifikat...";

  // Pastikan font kustom (Playfair Display, Great Vibes) sudah selesai
  // dimuat SEBELUM digambar ke canvas - kalau belum, teks bisa memakai
  // font pengganti bawaan sistem yang ukurannya beda.
  const fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();

  fontsReady.then(() => generateCertificateDataUrl()).then((imageData) => {
    const { jsPDF } = window.jspdf;
    // Ukuran halaman standar A4 - rasio template sertifikat kita (2000x1414)
    // sudah persis rasio A4 landscape, jadi dikenali baik oleh semua pembaca PDF.
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imageData, "JPEG", 0, 0, pageWidth, pageHeight);

    const studentName = getCertificateStudentName().replace(/[^a-z0-9]+/gi, "-");
    const fileName = `Sertifikat-Terala-${studentName}.pdf`;

    const isNativeApp = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());

    if (isNativeApp) {
      // Browser WebView di dalam APK tidak punya download manager seperti
      // browser biasa - pdf.save() tidak akan terjadi apa-apa. Simpan lewat
      // Capacitor Filesystem lalu buka Share sheet Android supaya siswa
      // bisa pilih simpan ke file/Drive/WhatsApp, dll.
      const base64Data = pdf.output("datauristring").split(",")[1];
      saveCertificateNative(base64Data, fileName)
        .then(() => {
          certBtn.disabled = false;
          certBtn.textContent = originalLabel;
        })
        .catch((err) => {
          console.error("Gagal menyimpan sertifikat (native):", err);
          alert("Gagal menyimpan sertifikat.\n\nDetail teknis: " + (err && err.message ? err.message : String(err)));
          certBtn.disabled = false;
          certBtn.textContent = originalLabel;
        });
      return;
    }

    pdf.save(fileName);

    certBtn.disabled = false;
    certBtn.textContent = originalLabel;
  }).catch((err) => {
    console.error("Gagal membuat sertifikat:", err);
    const detail = err && err.message ? err.message : String(err);
    alert("Gagal membuat sertifikat PDF.\n\nDetail teknis: " + detail);
    certBtn.disabled = false;
    certBtn.textContent = originalLabel;
  });
}

async function saveCertificateNative(base64Data, fileName) {
  const { Filesystem, Share } = window.Capacitor.Plugins;

  // Nilai directory dikirim sebagai string mentah ("DOCUMENTS", "CACHE", dst)
  // karena enum Directory dari @capacitor/filesystem hanya tersedia lewat
  // import ES module, sedangkan halaman ini tidak pakai bundler.
  try {
    if (Filesystem.requestPermissions) {
      await Filesystem.requestPermissions().catch(() => {});
    }

    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: "DOCUMENTS",
    });

    alert("Sertifikat berhasil disimpan di folder Documents HP kamu: " + fileName);
    return;
  } catch (err) {
    console.warn("Gagal simpan ke folder Documents, coba bagikan lewat Share:", err);
  }

  // Fallback: kalau simpan langsung ke folder Documents gagal (mis. izin
  // ditolak), tetap tawarkan lewat Share sheet supaya siswa tetap dapat filenya.
  const written = await Filesystem.writeFile({
    path: fileName,
    data: base64Data,
    directory: "CACHE",
  });

  await Share.share({
    title: "Sertifikat Terala",
    text: "Sertifikat Penghargaan dari Terala",
    url: written.uri,
    dialogTitle: "Simpan atau Bagikan Sertifikat",
  });
}


let quizAudioCtx;
let quizCompressor;
function getQuizAudioCtx() {
  if (!quizAudioCtx) {
    quizAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Compressor sebagai limiter supaya volume bisa dinaikkan tanpa pecah/distorsi
    quizCompressor = quizAudioCtx.createDynamicsCompressor();
    quizCompressor.threshold.setValueAtTime(-12, quizAudioCtx.currentTime);
    quizCompressor.knee.setValueAtTime(20, quizAudioCtx.currentTime);
    quizCompressor.ratio.setValueAtTime(8, quizAudioCtx.currentTime);
    quizCompressor.attack.setValueAtTime(0.002, quizAudioCtx.currentTime);
    quizCompressor.release.setValueAtTime(0.15, quizAudioCtx.currentTime);
    quizCompressor.connect(quizAudioCtx.destination);
  }
  if (quizAudioCtx.state === "suspended") {
    quizAudioCtx.resume();
  }
  return quizAudioCtx;
}

function playTone(freq, startTime, duration, type, gainValue) {
  const ctx = getQuizAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainValue, ctx.currentTime + startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
  osc.connect(gain);
  gain.connect(quizCompressor);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

function playFinishedSound() {
  playTone(523.25, 0, 0.15, "sine", 0.65);
  playTone(659.25, 0.12, 0.15, "sine", 0.65);
  playTone(783.99, 0.24, 0.15, "sine", 0.65);
  playTone(1046.5, 0.36, 0.4, "sine", 0.7);
  playTone(1318.51, 0.4, 0.45, "triangle", 0.35);
}

function showPopup(type) {
  const overlay = document.getElementById("overlay");
  const finishedPopup = document.getElementById("popup-finished");

  overlay.style.display = "block";

  if (type === "finished") {
    finishedPopup.style.display = "block";
  }
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup-finished").style.display = "none";
}

loadQuestion();
document.getElementById("quiz").addEventListener("change", selectAnswer);