import { useState } from "react";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";

import { URL } from "./constants";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      {message && JSON.stringify(message)}
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6"> Welcome back. Sign in below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <br />
          <br />
          <Button
            size="large"
            variant="contained"
            onClick={async () => {
              const { data } = await axios.post(`${URL}/admin/login`, {
                username: email,
                password,
              });

              setMessage(data);
              localStorage.setItem("token", data?.token);
              window.location = "/";
            }}
          >
            Sign in
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
