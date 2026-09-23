const API_URL = "http://localhost:5000";


// =========================
// ELEMENTS
// =========================

const loginSection =
    document.getElementById("loginSection");

const registerSection =
    document.getElementById("registerSection");

const showRegister =
    document.getElementById("showRegister");

const showLogin =
    document.getElementById("showLogin");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const message =
    document.getElementById("message");

const registerMessage =
    document.getElementById("registerMessage");


// =========================
// SHOW REGISTER
// =========================

showRegister.addEventListener("click", (event) => {

    event.preventDefault();

    loginSection.classList.add("hidden");

    registerSection.classList.remove("hidden");

    message.textContent = "";
});


// =========================
// SHOW LOGIN
// =========================

showLogin.addEventListener("click", (event) => {

    event.preventDefault();

    registerSection.classList.add("hidden");

    loginSection.classList.remove("hidden");

    registerMessage.textContent = "";
});


// =========================
// REGISTER
// =========================

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("regEmail").value;

    const password =
        document.getElementById("regPassword").value;


    try {

        const response = await fetch(
            `${API_URL}/api/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );


        const data = await response.json();

        registerMessage.textContent =
            data.message;


        if (response.ok) {

            registerForm.reset();

            setTimeout(() => {

                registerSection.classList.add(
                    "hidden"
                );

                loginSection.classList.remove(
                    "hidden"
                );

            }, 1000);
        }

    } catch (error) {

        registerMessage.textContent =
            "Unable to connect to the server.";

        console.error(error);
    }
});


// =========================
// LOGIN
// =========================

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    try {

        const response = await fetch(
            `${API_URL}/api/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                data.message;

            return;
        }


        // Save JWT token

        localStorage.setItem(
            "token",
            data.token
        );


        // Go to dashboard

        window.location.href =
            "dashboard.html";


    } catch (error) {

        message.textContent =
            "Unable to connect to the server.";

        console.error(error);
    }
});