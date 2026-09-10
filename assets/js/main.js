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
let currentQuestionSolved = false;

function loadQuestion() {
  currentQuestionSolved = false;
  const quizDiv = document.getElementById("quiz");
  const question = questions[currentQuestionIndex];
  quizDiv.innerHTML = `
    <p class="question-number mb-2">Soal ${currentQuestionIndex + 1} dari ${questions.length}</p>
    <h5 class="question-title mb-3">${question.materi}</h5>
    <p class="question-text mb-4">${question.question}</p>
    <div>
      ${question.options
        .map(
          (option, index) => `
        <div class="form-check">
          <input class="form-check-input" type="radio" name="answer" id="option${index}" value="${index}">
          <label class="form-check-label" for="option${index}">
            ${option}
          </label>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}


function selectAnswer() {
  const selectedOption = document.querySelector("input[name='answer']:checked");
  if (!selectedOption) {
    showPopup("wrong");
    return;
  }

  const selectedIndex = parseInt(selectedOption.value, 10);
  const isCorrect = selectedIndex === questions[currentQuestionIndex].correct;

  if (isCorrect) {
    if (!currentQuestionSolved) {
      correctCount++;
      currentQuestionSolved = true;
    }
    showPopup("correct");
  } else {
    showPopup("wrong");
  }
}

function goToNextQuestion() {
  closePopup();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    updateFinishedRewards();
    showPopup("finished");
  }
}

function updateFinishedRewards() {
  document.getElementById("reward-points").textContent = correctCount * 10;
  document.getElementById("reward-correct").textContent = correctCount;
  document.getElementById("reward-total").textContent = questions.length;
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

function playCorrectSound() {
  playTone(523.25, 0, 0.15, "sine", 0.7);
  playTone(659.25, 0.15, 0.2, "sine", 0.7);
  playTone(783.99, 0.3, 0.28, "sine", 0.7);
}

function playWrongSound() {
  playTone(220, 0, 0.2, "sawtooth", 0.55);
  playTone(174.61, 0.15, 0.3, "sawtooth", 0.55);
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
  const correctPopup = document.getElementById("popup-correct");
  const wrongPopup = document.getElementById("popup-wrong");
  const finishedPopup = document.getElementById("popup-finished");

  overlay.style.display = "block";

  correctPopup.style.display = "none";
  wrongPopup.style.display = "none";
  finishedPopup.style.display = "none";

  if (type === "correct") {
    correctPopup.style.display = "block";
    playCorrectSound();
  } else if (type === "wrong") {
    wrongPopup.style.display = "block";
    playWrongSound();
  } else if (type === "finished") {
    finishedPopup.style.display = "block";
    playFinishedSound();
  }
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("popup-correct").style.display = "none";
  document.getElementById("popup-wrong").style.display = "none";
  document.getElementById("popup-finished").style.display = "none";
}

loadQuestion();
document.getElementById("quiz").addEventListener("change", selectAnswer);