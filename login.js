const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// LOGIN FUNCTION



document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".sign-in-form");
  const registerForm = document.querySelector(".sign-up-form");

  const loginBtn = loginForm.querySelector(".btn.solid");
  const registerBtn = registerForm.querySelector(".btn");

  const loginInputs = loginForm.querySelectorAll("input[type='text'], input[type='password']");
  const registerInputs = registerForm.querySelectorAll("input[type='text'], input[type='email'], input[type='password']");

  // Cek apakah pengguna sudah register
  let isRegistered = localStorage.getItem("isRegistered") === "true";

  // Fungsi untuk mengecek apakah semua input terisi
  function checkInputsFilled(inputs, button) {
      button.disabled = [...inputs].some(input => input.value.trim() === "");
  }

  // Awal: Disable tombol login & register
  checkInputsFilled(loginInputs, loginBtn);
  checkInputsFilled(registerInputs, registerBtn);

  // Event listener untuk memeriksa input register
  registerInputs.forEach(input => {
      input.addEventListener("input", function () {
          checkInputsFilled(registerInputs, registerBtn);
      });
  });

  // Event listener untuk memeriksa input login
  loginInputs.forEach(input => {
      input.addEventListener("input", function () {
          checkInputsFilled(loginInputs, loginBtn);
      });
  });

  // Menangani login
  loginForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah form submit

      if (!isRegistered) {
          Swal.fire({
              icon: "warning",
              title: "Login Gagal!",
              text: "Anda harus register terlebih dahulu!",
              confirmButtonText: "Daftar Sekarang",
              confirmButtonColor: "#f39c12",
          }).then(() => {
              document.getElementById("sign-up-btn").click(); // Pindah ke halaman register
          });
      } else {
          Swal.fire({
              icon: "success",
              title: "Login Berhasil!",
              text: "Selamat datang di Website Pembelajaran Online.",
              confirmButtonText: "Lanjutkan",
              confirmButtonColor: "#2ecc71",
          }).then(() => {
              window.location.href = "home.html"; // Arahkan ke halaman home
          });
      }
  });

  // Menangani pendaftaran (register)
  registerForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah form submit

      Swal.fire({
          icon: "success",
          title: "Registrasi Berhasil!",
          text: "Silakan login untuk melanjutkan.",
          confirmButtonText: "Login Sekarang",
          confirmButtonColor: "#3498db",
      }).then(() => {
          localStorage.setItem("isRegistered", "true"); // Menandai bahwa user sudah register
          isRegistered = true;
          document.getElementById("sign-in-btn").click(); // Pindah otomatis ke halaman login
      });
  });
});
