import { auth } from "@service";
import { useState } from "react";
const Index = () => {
  const [phone_number, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const payload = { phone_number, password };
  const save = () => {
    auth.sign_in(payload);
  };

  return (
    <div>
      <input
        type="text"
        onChange={e => setPhone(e.target.value)}
        placeholder="number"
      />
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="number"
      />
      <button onClick={save}>save</button>
    </div>
  );
};

export default Index;
