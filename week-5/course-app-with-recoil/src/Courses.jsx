/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Card, Typography } from "@mui/material";

import { coursesState } from "./states";
import { URL } from "./constants";

const CourseCard = ({ courseId }) => {
  const navigate = useNavigate();

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
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              navigate("/course/" + course._id);
            }}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

function Courses() {
  const [courses, setCourses] = useRecoilState(coursesState);

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
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course, index) => (
        <CourseCard courseId={course._id} key={index} />
      ))}
    </div>
  );
}

export default Courses;
