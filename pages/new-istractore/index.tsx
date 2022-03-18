import { Button, message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { ApiAddIstractore } from "../../api";
import MainLayout from "../../components/MainLayout";
import RouteProtect from "../../HOC/routerProtect";

const addIstractor = () => {
  const Router = useRouter();
  const [name, setName]: any = useState("");
  const [email, setEmail]: any = useState("");
  const [password, setPassword]: any = useState("");
  // this array to save the answers that the user will send it
  //   console.log("here", courseValueId);
  const handelClick = (e: any) => {
    e.preventDefault();
    ApiAddIstractore({ name, email, password }, (data: any, error: any) => {
      if (error) return alert(error);
      message.success("تم الخزن");
      Router.push(`/istroctores`);
    });
  };

  return (
    <RouteProtect>
      <MainLayout title="Add Question">
        <div className="container">
          <h1 className="big-o">Add New Students : </h1>
          <div className="content-container">
            <div className="answers-block">
              <div className="block-Q">
                <p className="answers-p">Enter Email Istractore</p>
                <input
                  value={email}
                  placeholder="example@mk.com"
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Enter name of Istractore</p>
                <input
                  value={name}
                  placeholder="example@mk.com"
                  onChange={(e: any) => setName(e.target.value)}
                  type="text"
                  className="answers-input"
                />
              </div>
              <div className="block-Q">
                <p className="answers-p">Enter Status Course</p>
                <input
                  value={password}
                  placeholder="*************"
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
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

export default addIstractor;
