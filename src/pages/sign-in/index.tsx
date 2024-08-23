import { auth } from "@service";
import { useState } from "react";
import { saveToken } from "@token-service";
import Logo from "../../assets/login-bg-CeJ_7tXc.svg";

const Index = () => {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const save = async () => {
    const payload = { phone_number, password };
    const response: any = await auth.sign_in(payload);
    if (response?.status === 201) {
      saveToken("access_token", response?.data?.data?.tokens.access_token);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageContainer}>
        <img src={Logo} alt="Login Illustration" style={styles.image} />
      </div>

      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>* Phone number</label>
          <input
            type="text"
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone number"
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>* Password</label>
          <input
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            style={styles.input}
          />
        </div>
        <button onClick={save} style={styles.button}>
          Login
        </button>
        <p style={styles.registerText}>
          Don’t you have an account? <a href="#">Register</a>
        </p>
      </div>
    </div>
  );
};

// CSS styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    backgroundColor: "#f5f7fa",
  },
  imageContainer: {
    flex: 0.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9eef7",
    padding: "10px",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  formContainer: {
    flex: 0.5,
    padding: "40px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "auto",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#666666",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #cccccc",
    borderRadius: "4px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#d35400",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "20px",
  },
  registerText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#333333",
  },
};

export default Index;
