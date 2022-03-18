import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiAddCourse } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/routerProtect";
import { Radio } from "antd";

const addCourse = () => {
  const Router = useRouter();
  const [name, setName]: any = useState("");
  const [field, setField]: any = useState("");
  const [status, setStatus]: any = useState("");
  // this array to save the answers that the user will send it
  //   console.log("here", courseValueId);
  const handelClick = (e: any) => {
    e.preventDefault();
    ApiAddCourse({ name, field, status }, (data: any, error: any) => {
      if (error) return alert(error);
      message.success("تم الخزن");
      Router.push(`/courses`);
    });
  };

  // OnChange the value of Combobox
  const onChange = (e: any) => {
    setStatus(e.target.value);
  };
  // console.log("Heeeeeeeeeeeee", courseId);

  return (
    <RouteProtect>
      <MainLayout title="Add Question">
        <div className="container">
          <h1 className="big-o">Add New Course : </h1>
          <div className="content-container">
            <div
              className="question-title"
              style={{ display: "flex", alignItems: "center" }}
            >
              <h3>Enter your Course Title</h3>
              {""}
              <input
                value={name}
                onChange={(e: any) => setName(e.target.value)}
                placeholder="Enter your Course Title"
                type="text"
                className="question-input"
              />
            </div>
            <div className="answers-block">
              <div className="block-Q">
                <p className="answers-p">Enter field Course</p>
                <input
                  value={field}
                  placeholder="Networking, Programming, etc"
                  onChange={(e: any) => setField(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Enter Status Course</p>
                <input
                  value={status}
                  placeholder="New , Close , Expired ,etc"
                  onChange={(e: any) => setStatus(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="button">
                <Button className="submit" type="primary" onClick={handelClick}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </RouteProtect>
  );
};

export default addCourse;
