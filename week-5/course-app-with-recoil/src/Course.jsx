/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Card, Typography } from "@mui/material";

import { URL } from "./constants";

export const CourseCard = ({ course }) => {
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

function UpdateCard({ course, setCourse }) {
  const { _id: courseId } = course;

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [price, setPrice] = useState(course.price);
  const [imageLink, setImageLink] = useState(course.imageLink);
  const [message, setMessage] = useState("");

  return (
    <div>
      {message && JSON.stringify(message)}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Typography>Update Course Details</Typography>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Image Link"
            variant="outlined"
          />
          <br />
          <br />
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
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );

              setMessage(data);

              setCourse(editedCourse);
            }}
          >
            Update Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

const Course = () => {
  let { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${URL}/admin/course/${courseId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <CourseCard course={course} />
      <UpdateCard course={course} setCourse={setCourse} />
    </div>
  );
};

export default Course;
