import Cookies from "js-cookie";
import { Button, message, Select } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiAddLectures, URL } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/routerProtect";
const addIstractor = () => {
  const { Option } = Select;
  const Router = useRouter();
  const [courseId, setCourseId]: any = useState([]);
  const [name, setName]: any = useState("");
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  // this array to save the answers that the user will send it
  //   console.log("here", courseValueId);

  const [field, setField]: any = useState();
  useEffect(() => {
    const token: any = Cookies.get("LectureToken");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/course/courses/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setField(result.data);
      })
      .catch((error) => console.log("error", error));
  }, [Router]);

  const handelClick = (e: any) => {
    e.preventDefault();
    ApiAddLectures(
      { name, email, password, courseId },
      (data: any, error: any) => {
        if (error) return alert(error);
        message.success("تم الخزن");
        Router.push(`/lectures`);
      }
    );
  };
  const handleChange = (value: any) => {
    console.log(value);
    setCourseId(value);
  };
  return (
    <RouteProtect>
      <MainLayout title="Add Lecutres">
        <div className="container">
          <h1 className="big-o">Add New Lectures : </h1>
          <div className="content-container">
            <div className="answers-block">
              <div className="block-Q">
                <p className="answers-p">Enter Email</p>
                <input
                  value={email}
                  placeholder="example@mk.com"
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Enter name</p>
                <input
                  value={name}
                  placeholder="example@mk.com"
                  onChange={(e: any) => setName(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Enter Password</p>
                <input
                  value={password}
                  placeholder="*************"
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Choose the field</p>

                <Select
                  mode="multiple"
                  // defaultValue="s"
                  style={{
                    width: 250,
                    height: 40,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                  onChange={handleChange}
                >
                  {field
                    ? field.map((e: any) => (
                        <Option value={e.Cid}>{e.name}</Option>
                      ))
                    : null}
                </Select>
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

export default addIstractor;
