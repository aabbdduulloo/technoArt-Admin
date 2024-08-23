import { auth } from "@service";
import { useState } from "react";
import { saveToken } from "@token-service";

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
