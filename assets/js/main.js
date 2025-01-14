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
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
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
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

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
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
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

  // SOAL BUDAYA INDONESIA
  {
    materi: "Budaya Indonesia",
    question: "Apa nama pakaian adat dari provinsi Bali?",
    options: ["Ulos", "Kebaya Bali", "Songket", "Beskap"],
    correct: 1,
  },
  {
    materi: "Budaya Indonesia",
    question: "Apa alat musik tradisional yang berasal dari Jawa Barat?",
    options: ["Gamelan", "Angklung", "Kolintang", "Sasando"],
    correct: 1,
  },
  {
    materi: "Budaya Indonesia",
    question: "Rumah adat Honai berasal dari provinsi?",
    options: ["Sumatera Barat", "Sulawesi Selatan", "Papua", "Bali"],
    correct: 2,
  },
  {
    materi: "Budaya Indonesia",
    question: "Tari Pendet berasal dari daerah?",
    options: ["Bali", "Jawa Tengah", "Sumatera Utara", "Aceh"],
    correct: 0,
  },
  {
    materi: "Budaya Indonesia",
    question: "Apa nama senjata tradisional dari Sumatera Barat?",
    options: ["Keris", "Kujang", "Rencong", "Karih"],
    correct: 3,
  },

  {
    materi: "Tata Surya",
    question: "Planet terbesar di tata surya adalah?",
    options: ["Mars", "Jupiter", "Saturnus", "Bumi"],
    correct: 1,
  },

  // SOAL TATA SURYA 
  {
    materi: "Tata Surya",
    question: "Planet terkecil di tata surya adalah?",
    options: ["Merkurius", "Mars", "Venus", "Pluto"],
    correct: 0,
  },
  {
    materi: "Tata Surya",
    question: "Planet manakah yang disebut sebagai planet merah?",
    options: ["Mars", "Saturnus", "Venus", "Jupiter"],
    correct: 0,
  },
  {
    materi: "Tata Surya",
    question: "Benda langit yang mengelilingi planet disebut?",
    options: ["Asteroid", "Bulan", "Kometa", "Meteorit"],
    correct: 1,
  },
  {
    materi: "Tata Surya",
    question: "Matahari termasuk dalam kategori bintang apa?",
    options: ["Bintang raksasa merah", "Bintang katai putih", "Bintang utama", "Bintang katai kuning"],
    correct: 3,
  },

// SOAL EKOSISTEM
  {
    materi: "Ekosistem",
    question: "Hewan pemakan daging disebut?",
    options: ["Herbivora", "Omnivora", "Karnivora", "Insektivora"],
    correct: 2,
  },
  {
    materi: "Ekosistem",
    question: "Tumbuhan hijau membuat makanan sendiri melalui proses?",
    options: ["Respirasi", "Fotosintesis", "Fermentasi", "Transpirasi"],
    correct: 1,
  },
  {
    materi: "Ekosistem",
    question: "Di ekosistem, hewan yang memakan tumbuhan disebut?",
    options: ["Karnivora", "Omnivora", "Herbivora", "Detritivora"],
    correct: 2,
  },
  {
    materi: "Ekosistem",
    question: "Tempat hidup alami suatu organisme disebut?",
    options: ["Habitat", "Ekosistem", "Komunitas", "Populasi"],
    correct: 0,
  },
  {
    materi: "Ekosistem",
    question: "Hubungan saling menguntungkan antara dua makhluk hidup disebut?",
    options: ["Parasitisme", "Komensalisme", "Mutualisme", "Predasi"],
    correct: 2,
  },

// SOAL KEWARGANEGARAAN
  {
    materi: "Kewarganegaraan",
    question: "Siapa yang membuat undang-undang di Indonesia?",
    options: ["Presiden", "DPR", "Hakim", "Polisi"],
    correct: 1,
  },

  {
    "materi": "Kewarganegaraan",
    "question": "Apa fungsi dari Dewan Perwakilan Rakyat (DPR) di Indonesia?",
    "options": ["Membuat undang-undang", "Menjaga keamanan negara", "Menegakkan keadilan", "Menyelesaikan sengketa antar negara"],
    "correct": 0
  },
  {
    "materi": "Kewarganegaraan",
    "question": "Siapa yang menyusun Undang-Undang Dasar 1945?",
    "options": ["DPR", "MPR", "Presiden", "Pemerintah"],
    "correct": 1
  },
  {
    "materi": "Kewarganegaraan",
    "question": "Apa yang dimaksud dengan kewarganegaraan?",
    "options": ["Hak untuk memilih", "Hak dan kewajiban sebagai warga negara", "Peran serta dalam pemerintahan", "Hak untuk bekerja di luar negeri"],
    "correct": 1
  },
  {
    "materi": "Kewarganegaraan",
    "question": "Siapa yang memiliki hak untuk memilih dalam pemilu di Indonesia?",
    "options": ["Warga negara asing", "Warga negara Indonesia yang sudah berusia 17 tahun", "Anak-anak", "Warga negara Indonesia yang bekerja di luar negeri"],
    "correct": 1
  },

  // SOAL AGAMA
  {
    materi: "Agama",
    question: "Hari besar umat Islam yang dirayakan setelah bulan Ramadhan adalah?",
    options: ["Idul Adha", "Maulid Nabi", "Idul Fitri", "Isra Mi'raj"],
    correct: 2,
  },

  {
    "materi": "Agama",
    "question": "Siapakah nabi terakhir dalam agama Islam?",
    "options": ["Nabi Ibrahim", "Nabi Musa", "Nabi Muhammad", "Nabi Isa"],
    "correct": 2
  },
  {
    "materi": "Agama",
    "question": "Apa kitab suci umat Islam?",
    "options": ["Injil", "Torat", "Al-Qur'an", "Veda"],
    "correct": 2
  },
  {
    "materi": "Agama",
    "question": "Apa yang dimaksud dengan zakat?",
    "options": ["Sedekah sukarela", "Wajib berpuasa", "Pajak yang dibayar ke negara", "Harta yang wajib diberikan untuk yang membutuhkan"],
    "correct": 3
  },
  {
    "materi": "Agama",
    "question": "Apa tujuan utama dari puasa di bulan Ramadhan?",
    "options": ["Menurunkan berat badan", "Mendekatkan diri kepada Tuhan", "Menjaga kebugaran tubuh", "Meningkatkan kekayaan"],
    "correct": 1
  }
];

let currentQuestionIndex = 0;

function loadQuestion() {
  const quizDiv = document.getElementById("quiz");
  const question = questions[currentQuestionIndex];
  quizDiv.innerHTML = `
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
    showPopup("correct");
    document.getElementById("next-btn").disabled = false;
  } else {
    showPopup("wrong");
  }
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
    document.getElementById("next-btn").disabled = true;
  } else {
    showPopup("finished");
    document.getElementById("next-btn").disabled = true;
  }
});

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
  } else if (type === "wrong") {
    wrongPopup.style.display = "block";
  } else if (type === "finished") {
    finishedPopup.style.display = "block";
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