import { useEffect } from "react";

function CheckEmailPage() {
  useEffect(() => {
    // You could also add a timer or animation here if you like
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Verify Your Account</h2>
      <p>
        We’ve sent a verification link to your email. Please check your inbox
        (and spam folder) and click the link to activate your account.
      </p>
      <p>
        Once verified, you’ll be able to log in successfully.
      </p>
    </div>
  );
}

export default CheckEmailPage;