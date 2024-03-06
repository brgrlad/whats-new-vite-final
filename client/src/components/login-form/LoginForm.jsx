import "../login-form/login-form.css";

export default function LoginForm() {
  return (
    <form className="loginForm">
      <h2> SIGN IN</h2>
      <p>
        Only registered users get unlimited access to quality journalism free of
        charge.
      </p>
      <p>
        By being a registered user you also get access to our bookmark feature
        that allows users to favorite news articles for future reading.
      </p>

      <input type="email" placeholder="E-mailsss" />
      <input type="text" placeholder="Password" />
      <button>SIGN IN</button>
    </form>
  );
}
