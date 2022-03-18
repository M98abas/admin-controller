import MainLayout from "../components/MainLayout";
import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { URL } from "../api";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
const lectures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoadin] = useState(false);
  //   const Router = useRouter();

  /**
   *
   */
  const getData = () => {
    setLoadin(true);
    const token: any = Cookies.get("token");
    var myHeaders = new Headers();
    myHeaders.append("token", token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions: any = {
      method: "Get",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${URL}/lecture`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.data);
        // console.log(result);

        setLoadin(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);
  const columns: any = [
    {
      title: "IDs",
      dataIndex: "id",
      width: 50,
      //   sorter: (a: any, b: any) => a.id - b.id,
      render: (text: any, row: any, index: any) => (
        <a href={`/${text}`}>{text}</a>
      ),

      //   defaultSortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (name: any) => <strong>{name}</strong>,
      // width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (name: any) => <strong>{name}</strong>,
      // width: 200,
    },
    {
      title: "Created at",
      dataIndex: "created_at",
      render: (data: any) => (
        <strong>{moment(data).format("DD-MM-YYYY")}</strong>
      ),
    },
  ];

  return (
    <div className="home-container">
      <MainLayout title="Lectures" hasBack="true" subTitle="Table of Content" />
      <div className="container">
        <div className="header">
          <h1>Lectures</h1>
          <div className="cont-btn">
            <Link href={`/new-lecture`}>Add Lectures</Link>
          </div>
        </div>
        <Table
          scroll={{ x: "700px" }}
          pagination={{
            defaultPageSize: 10,
          }}
          size="small"
          rowKey={(record: any) => record.id}
          loading={loading}
          className="table"
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default lectures;
