import { useEffect } from "react";
import { useRecoilState } from "recoil";
import axios from "axios";

import { coursesState } from "./states";
import { URL } from "./constants";
import { CourseCard } from "./Course";

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
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {courses.map((course, index) => (
        <CourseCard courseId={course._id} key={index} />
      ))}
    </div>
  );
}

export default Courses;
