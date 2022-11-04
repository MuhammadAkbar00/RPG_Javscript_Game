let user;
let AccountManager = {
    login: function () {
        const username = document.getElementById("login-username");
        const password = document.getElementById("login-password");
        if (!username.value || !password.value) {
            return alert("Enter username and password");
        }
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        let account = accounts.find(e => e.username === username.value);
        if (account) {
            if (account.password !== password.value) {
                return alert("Password is incorrect");
            }
            user = account;
            localStorage.setItem("loggedInUser", JSON.stringify(account))
            return location.href = '/';
        }
        return alert("account not registered");
    },
    register: function () {
        const username = document.getElementById("signup-username");
        const password = document.getElementById("signup-password");
        let accounts = JSON.parse(localStorage.getItem("accounts"));
        if (accounts.find(e => e.username === username.value)) {
            return alert("user already exists");
        }
        if (!username.value || !password.value) {
            return alert("Invalid username and password");
        }
        if (accounts === null) {
            let newAccountsList = [{ username: username.value, password: password.value }];
            return localStorage.setItem("accounts", JSON.stringify(newAccountsList));
        }
        let newAccountsList = [...accounts, { username: username.value, password: password.value }];
        return localStorage.setItem("accounts", JSON.stringify(newAccountsList));
    },
    logout: function () {
        localStorage.removeItem("loggedInUser")
        return location.href = '/login.html'
    }
}