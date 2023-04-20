function Login() {
  return (
    <div>
        <form action="/login" method="post">
          <input type="text" name="username" />
          <input type="password" name="password" />
          <input type="submit" value={`acceder`}/>
        </form>
    </div>
  );
}

export default Login;
