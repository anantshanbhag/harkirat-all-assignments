/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { Button, TextField, Card, Typography } from "@mui/material";
import axios from "axios";

import { coursesState } from "./states";
import { URL } from "./constants";

export const CourseCard = ({ courseId }) => {
  const courses = useRecoilValue(coursesState);
  const course = courses.find((course) => course._id === courseId);
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

function UpdateCard({ courseId }) {
  const [courses, setCourses] = useRecoilState(coursesState);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      {message && JSON.stringify(message)}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <Typography>Update Course Details</Typography>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
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

              const updatedCourses = courses.map((prevCourse) => {
                if (prevCourse._id === courseId) {
                  return { ...prevCourse, ...editedCourse };
                }

                return prevCourse;
              });

              setCourses(updatedCourses);
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
  const setCourses = useSetRecoilState(coursesState);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${URL}/admin/courses`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setCourses(data?.courses);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <CourseCard courseId={courseId} />
      <UpdateCard courseId={courseId} />
    </div>
  );
};

export default Course;
