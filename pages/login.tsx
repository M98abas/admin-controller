// import Cookies from "js-cookie";
// import { useState } from "react";
// // import { ApiLogin } from "../api";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import { Button, Form, Input, message } from "antd";
// import logoImage from "../public/index.png";
// import { ApiLogin } from "../api";

// const Login = () => {
//   const Router = useRouter();

//   const [email, setEmail]: any = useState("");
//   const [password, setPassword]: any = useState("");
//   const [loading, setLoading]: any = useState(false);

//   const onFinish = (e: any) => {
//     setLoading(true);
//     e.preventDefault();
//     ApiLogin({ email, password }, (data: any, error: any) => {
//       setLoading(false);
//       // console.log(data);
//       setLoading(false);
//       // console.log(data.token);
//       if (data.errMsg) return message.error("Invalid Credentials");
//       Cookies.set("token", data.token);
//       Cookies.set("client", JSON.stringify(data.email));
//       Router.push("/");
//     });
//   };
//   const onFinishFailed = (errorInfo: any) => {
//     console.log("Failed:", errorInfo);
//   };
//   return (
//     <>
//       <div className="login-container">
//         <img src="./images/h6.png" alt="Logo" className="logo" />
//         <Form
//           className="login-form"
//           name="basic"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//         >
//           <p>Email</p>
//           <Form.Item
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 type: "email",
//                 message: "Please input your email!",
//               },
//             ]}
//           >
//             <Input placeholder="name@MK.com" size="large" />
//           </Form.Item>
//           <p>Password</p>
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Please input your password!",
//               },
//             ]}
//           >
//             <Input.Password placeholder="***********" size="large" />
//           </Form.Item>

//           <Form.Item>
//             <Button
//               loading={loading}
//               disabled={loading}
//               size="large"
//               className="submit-btn"
//               type="primary"
//               htmlType="submit"
//             >
//               Login
//             </Button>
//           </Form.Item>
//           <div className="links-container">
//             <p>Don't have an account?</p>
//             <Link href="/signup">
//               <p className="sign-up-link">Sign Up</p>
//             </Link>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };
// export default Login;
import { Form, Input, Button, message } from "antd";
import Cookies from "js-cookie";
import { ApiLogin } from "../api";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const Router = useRouter();
  const [loading, setLoading]: any = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    ApiLogin(values, (data: any, error: any) => {
      setLoading(false);
      // console.log(data.token);
      if (data.errMsg) return message.error("Invalid Credentials");
      Cookies.set("LectureToken", data.token);
      Cookies.set("client", JSON.stringify(data.user));
      Router.push("/");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="login-container">
        <img src="./images/h6.png" alt="Logo" className="logo" />
        <Form
          className="login-form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p>Email</p>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input your email!",
              },
            ]}
          >
            <Input placeholder="name@MK.com" size="large" />
          </Form.Item>
          <p>Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="***********" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              disabled={loading}
              size="large"
              className="submit-btn"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
          <div className="links-container">
            <p>Don't have an account?</p>
            <Link href="/signup">
              <p className="sign-up-link">Sign Up</p>
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
