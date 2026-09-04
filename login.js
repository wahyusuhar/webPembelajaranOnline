// ==========================================
// SISTEM LOGIN & REGISTRASI (CLIENT-SIDE)
// Web Pembelajaran Online
// ==========================================

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

// Mode Switch Animation
if (sign_up_btn && container) {
  sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
  });
}

if (sign_in_btn && container) {
  sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const loginForm = document.querySelector("#login-form") || document.querySelector(".sign-in-form");
  const registerForm = document.querySelector("#register-form") || document.querySelector(".sign-up-form");

  const loginUsernameInput = document.querySelector("#login-username") || loginForm?.querySelector("input[type='text']");
  const loginPasswordInput = document.querySelector("#login-password") || loginForm?.querySelector("input[type='password']");

  const registerUsernameInput = document.querySelector("#register-username") || registerForm?.querySelector("input[type='text']");
  const registerEmailInput = document.querySelector("#register-email") || registerForm?.querySelector("input[type='email']");
  const registerPasswordInput = document.querySelector("#register-password") || registerForm?.querySelector("input[type='password']");

  const loginBtn = document.querySelector("#login-submit-btn") || loginForm?.querySelector(".btn.solid");
  const registerBtn = document.querySelector("#register-submit-btn") || registerForm?.querySelector(".btn");

  const googleLoginBtn = document.querySelector("#google-login-btn");
  const googleSignupBtn = document.querySelector("#google-signup-btn");

  const loginInputs = [loginUsernameInput, loginPasswordInput].filter(Boolean);
  const registerInputs = [registerUsernameInput, registerEmailInput, registerPasswordInput].filter(Boolean);

  // Storage Helper Functions (Tanpa Database)
  const STORAGE_KEY = "learning_app_users";

  function getAllUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Gagal membaca storage user:", e);
      return [];
    }
  }

  function saveNewUser(user) {
    const users = getAllUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  function findUserByUsernameOrEmail(identifier) {
    const users = getAllUsers();
    const cleanId = identifier.trim().toLowerCase();
    return users.find(
      u => (u.username && u.username.toLowerCase() === cleanId) || 
           (u.email && u.email.toLowerCase() === cleanId)
    );
  }

  // Fungsi cek apakah input terisi
  function updateButtonState(inputs, button) {
    if (!button) return;
    const isAnyEmpty = inputs.some(input => !input || input.value.trim() === "");
    button.disabled = isAnyEmpty;
    if (isAnyEmpty) {
      button.style.opacity = "0.6";
      button.style.cursor = "not-allowed";
    } else {
      button.style.opacity = "1";
      button.style.cursor = "pointer";
    }
  }

  // Inisialisasi status tombol
  updateButtonState(loginInputs, loginBtn);
  updateButtonState(registerInputs, registerBtn);

  // Event listener input perubahan
  registerInputs.forEach(input => {
    input.addEventListener("input", () => {
      updateButtonState(registerInputs, registerBtn);
    });
  });

  loginInputs.forEach(input => {
    input.addEventListener("input", () => {
      updateButtonState(loginInputs, loginBtn);
    });
  });

  // ===================================================
  // 1. PROSES REGISTRASI
  // ===================================================
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = registerUsernameInput ? registerUsernameInput.value.trim() : "";
      const email = registerEmailInput ? registerEmailInput.value.trim() : "";
      const password = registerPasswordInput ? registerPasswordInput.value : "";

      if (!username || !email || !password) {
        Swal.fire({
          icon: "warning",
          title: "Form Belum Lengkap",
          text: "Silakan isi semua data registrasi dengan benar.",
          confirmButtonColor: "#f39c12"
        });
        return;
      }

      // Validasi sederhana email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Swal.fire({
          icon: "warning",
          title: "Email Tidak Valid",
          text: "Format email yang Anda masukkan belum sesuai.",
          confirmButtonColor: "#f39c12"
        });
        return;
      }

      // Cek apakah username / email sudah terdaftar
      const existingUser = findUserByUsernameOrEmail(username) || findUserByUsernameOrEmail(email);
      if (existingUser) {
        Swal.fire({
          icon: "info",
          title: "Akun Sudah Terdaftar!",
          text: "Username atau email tersebut sudah terdaftar. Silakan langsung login.",
          confirmButtonText: "Masuk Sekarang",
          confirmButtonColor: "#3498db"
        }).then(() => {
          // Isi username di login
          if (loginUsernameInput) loginUsernameInput.value = username;
          if (loginPasswordInput) loginPasswordInput.value = "";
          updateButtonState(loginInputs, loginBtn);
          container.classList.remove("sign-up-mode");
          if (loginPasswordInput) loginPasswordInput.focus();
        });
        return;
      }

      // Simpan user baru ke localStorage
      const newUser = {
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
      };
      saveNewUser(newUser);

      // ===================================================
      // KEBUTUHAN UTAMA:
      // Username & password yang diisi di register otomatis
      // langsung mengisi form login agar user tinggal klik button login
      // ===================================================
      if (loginUsernameInput) loginUsernameInput.value = username;
      if (loginPasswordInput) loginPasswordInput.value = password;

      // Aktifkan tombol login secara langsung
      updateButtonState(loginInputs, loginBtn);

      // Pindah tampilan ke form Login
      container.classList.remove("sign-up-mode");

      // Beri notifikasi jelas
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil!",
        html: `Akun <b>${username}</b> telah berhasil didaftarkan.<br><br>Username dan password Anda <b>sudah otomatis terisi</b> di form login. Silakan langsung klik tombol <b>Login</b>!`,
        confirmButtonText: "Siap, Login Sekarang!",
        confirmButtonColor: "#2ecc71"
      }).then(() => {
        if (loginBtn) {
          loginBtn.focus();
        }
      });
    });
  }

  // ===================================================
  // 2. PROSES LOGIN & VALIDASI KETAT
  // ===================================================
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = loginUsernameInput ? loginUsernameInput.value.trim() : "";
      const password = loginPasswordInput ? loginPasswordInput.value : "";

      if (!username || !password) {
        Swal.fire({
          icon: "warning",
          title: "Data Belum Lengkap",
          text: "Silakan masukkan username dan password Anda.",
          confirmButtonColor: "#f39c12"
        });
        return;
      }

      const allUsers = getAllUsers();

      // Kasus A: Jika belum ada akun yang pernah terdaftar sama sekali
      if (allUsers.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "Belum Memiliki Akun!",
          text: "Anda belum memiliki akun terdaftar. Silakan daftar (register) akun terlebih dahulu!",
          confirmButtonText: "Daftar Sekarang",
          confirmButtonColor: "#f39c12",
          showCancelButton: true,
          cancelButtonText: "Tutup"
        }).then((result) => {
          if (result.isConfirmed) {
            container.classList.add("sign-up-mode");
            if (registerUsernameInput) registerUsernameInput.focus();
          }
        });
        return; // PASTI GAGAL, TIDAK MASUK!
      }

      // Kasus B: Cek user berdasarkan username atau email
      const matchedUser = findUserByUsernameOrEmail(username);

      if (!matchedUser) {
        // User belum terdaftar
        Swal.fire({
          icon: "error",
          title: "Akun Tidak Ditemukan!",
          text: "Akun tersebut belum terdaftar di sistem. Silakan registrasi terlebih dahulu.",
          confirmButtonText: "Daftar Sekarang",
          confirmButtonColor: "#e74c3c",
          showCancelButton: true,
          cancelButtonText: "Coba Lagi"
        }).then((result) => {
          if (result.isConfirmed) {
            container.classList.add("sign-up-mode");
            if (registerUsernameInput) {
              registerUsernameInput.value = username;
              updateButtonState(registerInputs, registerBtn);
            }
          }
        });
        return; // PASTI GAGAL!
      }

      // Kasus C: Password salah
      if (matchedUser.password !== password) {
        Swal.fire({
          icon: "error",
          title: "Password Salah!",
          text: "Password yang Anda masukkan tidak sesuai. Silakan periksa kembali.",
          confirmButtonText: "Coba Lagi",
          confirmButtonColor: "#e74c3c"
        }).then(() => {
          if (loginPasswordInput) {
            loginPasswordInput.value = "";
            loginPasswordInput.focus();
            updateButtonState(loginInputs, loginBtn);
          }
        });
        return; // PASTI GAGAL!
      }

      // Kasus D: Kredensial Cocok -> LOGIN BERHASIL!
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({
        username: matchedUser.username,
        email: matchedUser.email,
        loginType: "standard",
        loginAt: new Date().toISOString()
      }));

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        text: `Selamat datang kembali, ${matchedUser.username}!`,
        confirmButtonText: "Masuk ke Pembelajaran",
        confirmButtonColor: "#2ecc71",
        timer: 1800,
        timerProgressBar: true
      }).then(() => {
        window.location.href = "home.html";
      });
    });
  }

  // ===================================================
  // 3. LOGIN DENGAN GOOGLE (CLIENT-SIDE)
  // ===================================================
  function triggerGoogleAuth() {
    Swal.fire({
      title: "Masuk dengan Google",
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <p style="margin-bottom: 12px; color: #555; font-size: 0.95rem;">
            Pilih opsi akun Google untuk masuk ke <b>Web Pembelajaran Online</b>:
          </p>
          <div id="google-quick-account" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1.5px solid #4285F4; border-radius: 10px; cursor: pointer; margin-bottom: 10px; background: #f8fbff; transition: 0.2s;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #4285F4; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.1rem;">
              <i class="fab fa-google"></i>
            </div>
            <div>
              <div style="font-weight: 600; color: #1a73e8; font-size: 1rem;">Akun Google Cepat</div>
              <div style="font-size: 0.85rem; color: #555;">siswa.belajar@gmail.com</div>
            </div>
          </div>
          <div id="google-custom-account" style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1.5px dashed #bbb; border-radius: 10px; cursor: pointer; background: #fff; transition: 0.2s;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: #ea4335; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold;">
              <i class="fas fa-user-plus"></i>
            </div>
            <div>
              <div style="font-weight: 600; color: #333; font-size: 0.95rem;">Gunakan Email Google Lain</div>
              <div style="font-size: 0.82rem; color: #777;">Ketik nama & email Google Anda</div>
            </div>
          </div>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Batal",
      didOpen: () => {
        const quickBtn = document.getElementById("google-quick-account");
        const customBtn = document.getElementById("google-custom-account");

        if (quickBtn) {
          quickBtn.addEventListener("click", () => {
            finishGoogleLogin("Siswa Belajar", "siswa.belajar@gmail.com");
          });
        }

        if (customBtn) {
          customBtn.addEventListener("click", () => {
            promptCustomGoogleAccount();
          });
        }
      }
    });
  }

  function promptCustomGoogleAccount() {
    Swal.fire({
      title: "Masukkan Akun Google",
      html: `
        <div style="text-align: left; padding: 5px 0;">
          <label style="font-size: 0.85rem; font-weight: 600; color: #444;">Nama Lengkap:</label>
          <input id="swal-google-name" class="swal2-input" placeholder="Contoh: Budi Pratama" style="width: 90%; margin: 6px auto 14px auto;" />
          <label style="font-size: 0.85rem; font-weight: 600; color: #444;">Email Google (@gmail.com):</label>
          <input id="swal-google-email" type="email" class="swal2-input" placeholder="contoh@gmail.com" style="width: 90%; margin: 6px auto;" />
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Lanjutkan Masuk",
      confirmButtonColor: "#4285F4",
      cancelButtonText: "Kembali",
      preConfirm: () => {
        const nameInput = document.getElementById("swal-google-name");
        const emailInput = document.getElementById("swal-google-email");
        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";

        if (!name || !email) {
          Swal.showValidationMessage("Harap isi nama dan email Google!");
          return false;
        }
        if (!email.includes("@")) {
          Swal.showValidationMessage("Format email tidak valid!");
          return false;
        }
        return { name, email };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        finishGoogleLogin(result.value.name, result.value.email);
      }
    });
  }

  function finishGoogleLogin(name, email) {
    // Daftarkan/update user ke localStorage jika belum ada
    let existingUser = findUserByUsernameOrEmail(email);
    if (!existingUser) {
      existingUser = {
        username: name,
        email: email,
        password: "google_authenticated",
        authProvider: "google",
        createdAt: new Date().toISOString()
      };
      saveNewUser(existingUser);
    }

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify({
      username: name,
      email: email,
      loginType: "google",
      loginAt: new Date().toISOString()
    }));

    Swal.fire({
      icon: "success",
      title: "Login Google Berhasil!",
      html: `Selamat datang, <b>${name}</b>!<br><span style="color: #666; font-size: 0.85rem;">(${email})</span>`,
      confirmButtonText: "Lanjutkan ke Pembelajaran",
      confirmButtonColor: "#2ecc71",
      timer: 1800,
      timerProgressBar: true
    }).then(() => {
      window.location.href = "home.html";
    });
  }

  // Event listener tombol Google
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", triggerGoogleAuth);
  }
  if (googleSignupBtn) {
    googleSignupBtn.addEventListener("click", triggerGoogleAuth);
  }
});
