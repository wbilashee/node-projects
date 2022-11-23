const form = document.querySelector(".contact-form");
const formAlert = document.querySelector(".form-alert");
const usernameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const resultDOM = document.querySelector(".result");
const tokenDOM = document.querySelector(".token");
const dataBtn = document.querySelector("#data");

form.addEventListener("submit", async (e) => {
    formAlert.classList.remove("text-success");
    tokenDOM.classList.remove("text-success");

    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    try {
        const { data } = await axios.post("/api/v1/login", { username, password });

        formAlert.style.display = "block";
        formAlert.textContent = data.msg;
        formAlert.classList.add("text-success");
        usernameInput.value = "";
        passwordInput.value = "";

        localStorage.setItem("token", data.token);
        resultDOM.innerHTML = "";
        tokenDOM.textContent = "token present";
        tokenDOM.classList.add("text-success");
    } catch (error) {
        formAlert.style.display = "block";
        formAlert.textContent = error.response.data.msg;
        localStorage.removeItem("token");
        resultDOM.innerHTML = "";
        tokenDOM.textContent = "no token present";
        tokenDOM.classList.remove("text-success");
    }

    setTimeout(() => {
        formAlert.style.display = "none";
    }, 2000);
});

dataBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");

    try {
        const { data } = await axios.get("/api/v1/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
    } catch (error) {
        localStorage.removeItem("token");
        resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
    }
});

const checkToken = () => {
    tokenDOM.classList.remove("text-success");

    const token = localStorage.getItem("token");
    if (token) {
        tokenDOM.textContent = "token present";
        tokenDOM.classList.add("text-success");
    }
}

checkToken();