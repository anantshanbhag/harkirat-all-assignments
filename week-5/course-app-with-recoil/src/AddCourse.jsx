import { useState } from "react";
import axios from "axios";
import { Button, TextField, Card } from "@mui/material";

import { URL } from "./constants";

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        flexDirection: "column",
      }}
    >
      {message && JSON.stringify(message)}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="outlined"
          style={{ width: 400, padding: 20, marginTop: 30, height: "100%" }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => setImageLink(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
          />
          <Button
            style={{ marginBottom: 10 }}
            size="large"
            variant="contained"
            onClick={async () => {
              const { data } = await axios.post(
                `${URL}/admin/courses`,
                {
                  title,
                  description,
                  price,
                  imageLink,
                  published: true,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              setMessage(data);
            }}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
