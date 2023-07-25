/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Button, TextField, Card, Typography } from "@mui/material";

import { URL } from "./constants";

const GrayTopper = ({ title }) => (
  <div
    style={{
      height: 250,
      background: "#212121",
      top: 0,
      width: "100vw",
      zIndex: 0,
      marginBottom: -250,
    }}
  >
    <div
      style={{
        height: 250,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        style={{ color: "white", fontWeight: 600 }}
        variant="h3"
        textAlign={"center"}
      >
        {title}
      </Typography>
    </div>
  </div>
);

const CourseCard = ({ course }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ margin: 10, width: 300, minHeight: 80 }}>
        <Typography textAlign={"center"} variant="h5">
          {course?.title}
        </Typography>
        <Typography textAlign={"center"}>{course?.description}</Typography>
        <img src={course?.imageLink} />
      </Card>
    </div>
  );
};

const UpdateCard = ({ course, setCourse }) => {
  const { _id: courseId } = course;

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [imageLink, setImageLink] = useState(course.imageLink);
  const [message, setMessage] = useState("");

  return (
    <>
      {message && JSON.stringify(message)}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
          <div style={{ padding: 20 }}>
            <Typography style={{ marginBottom: 10 }}>
              Update Course Details
            </Typography>
            <TextField
              style={{ marginBottom: 10 }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: 10 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: 10 }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Price"
              variant="outlined"
            />
            <TextField
              style={{ marginBottom: 10 }}
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              fullWidth
              id="outlined-basic"
              label="Image Link"
              variant="outlined"
            />
            <Button
              size="large"
              variant="contained"
              onClick={async () => {
                const editedCourse = {
                  title,
                  description,
                  price,
                  imageLink,
                  published: true,
                };

                const { data } = await axios.put(
                  `${URL}/admin/courses/${courseId}`,
                  editedCourse,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                setMessage(data);

                setCourse(editedCourse);
              }}
            >
              Update Course
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};

const Course = () => {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${URL}/admin/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCourse(data?.course);
    };

    fetchData();
  }, []);

  if (!course) {
    return <>Loading...</>;
  }

  return (
    <>
      <GrayTopper title={course.title} />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard course={course} setCourse={setCourse} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard course={course} />
        </Grid>
      </Grid>
    </>
  );
};

export default Course;
