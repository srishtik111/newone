const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => inp.classList.add("active"));
  inp.addEventListener("blur", () => {
    if (inp.value !== "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => main.classList.toggle("sign-up-mode"));
});

function moveSlider() {
  let index = this.dataset.value;
  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => bullet.addEventListener("click", moveSlider));


document.addEventListener("DOMContentLoaded", () => {
  // Sign Up Form Submission
  document.querySelector(".sign-up-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const userType = document.getElementById("signup-user-type").value; // ✅ Get selected value

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, userType }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        localStorage.setItem("username-ppl", username);
        window.location.href = "/profile";
      }
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Server error. Please try again.");
    }
  });

  // Sign In Form Submission (❌ No userType)
  document.getElementById("sign-in-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents default form submission

    const username = document.getElementById("signin-username").value;
    const password = document.getElementById("signin-password").value;

    // ❌ Remove fetching user type (if present)
    // const userType = document.getElementById("signin-user-type").value; 

    if (!username || !password) {
        alert("Please enter username and password.");
        return;
    }

    // Simulate a login request (Replace with actual API call)
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === "Login successful!") {  // ✅ Check success message
          localStorage.setItem("username-ppl", username);  // ✅ Store username
          window.location.href = "/profile"; // ✅ Redirect only on success
      } else {
          alert("Invalid credentials!");
      }
  })
  .catch(error => console.error("Error:", error));
  
  });
});