import { useState } from "react";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleEmail(evt) {
        setEmail(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin({ password, email });
    }

    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="auth__input"
                    placeholder="Email"
                    name="name"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handleEmail}
                    value={email || ''}
                />

                <input
                    type="password"
                    className="auth__input"
                    placeholder="Пароль"
                    name="password"
                    minLength="2"
                    maxLength="40"
                    required
                    onChange={handlePassword}
                    value={password || ''}
                />
                <button type="submit" className="auth__save-button">Войти</button>
            </form>
        </section>
    );
}

export default Login;