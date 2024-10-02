/* eslint-disable react-hooks/exhaustive-deps */
import { auth } from "@service";
import ProfilImage from "../../assets/profile.png";
import { Button, Card, Space } from "antd";
import { getToken, removeToken } from "@token-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateAccount, DeletAccount } from "@modals";
import LeftImg from "../../assets/login-bg-CeJ_7tXc.svg";

const Index = () => {
  const id: any = getToken("admin_id");
  const [admin, setAdmin] = useState<any>(null);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await auth.get_admin(id);
      setAdmin(response.data.data);
    } catch (error) {
      console.log("Error fetching admin data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const createAccount = () => {
    removeToken("admin_id");
    removeToken("access_token");
    removeToken("refresh_token");
    navigate("/sign-up");
    window.location.reload();
  };

  return (
    <>
      <div
        style={{ display: "flex", height: "100vh", backgroundColor: "#F8F9FD" }}
      >
        <div
          style={{
            width: "50%",
            height: "80%",
            position: "relative",
            top: "10px",
            left: "10px",
            backgroundImage: `url(${LeftImg})`,
            backgroundSize: "50%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#fff",
            borderRadius: "12px",
          }}
        ></div>
        <Space direction="vertical">
          <Card
            bordered={true} // Card ni chegarasini belgilash
            className="shadow-lg p-8 rounded-lg"
            style={{
              position: "relative",
              top: "10px",
              left: "25px",
              width: "130%",
              height: "113%",
              maxWidth: "1450px",
              borderRadius: "12px",
              backgroundColor: "#fff", // Card fon rangi
            }}
          >
            <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-center lg:items-start">
              <img
                src={ProfilImage}
                alt="Profile"
                className="rounded-full shadow-lg"
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
              />
              <div className="grid grid-cols-2 gap-y-6 gap-x-12 w-full bg-gray-50 p-6 rounded-lg">
                {" "}
                {/* Content foni va padding */}
                <div>
                  <p className="text-gray-500 text-md">First Name</p>
                  <p className="font-bold text-xl text-red-800">
                    {admin?.first_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Email</p>
                  <p className="font-bold text-xl text-gray-800">
                    {admin?.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Last Name</p>
                  <p className="font-bold text-xl text-gray-800">
                    {admin?.last_name || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-md">Phone Number</p>
                  <p className="font-bold text-xl text-gray-800">
                    {admin?.phone_number || "N/A"}
                  </p>
                </div>
                <div className="col-span-2 flex justify-center lg:justify-start gap-4 mt-6">
                  <Button
                    size="large"
                    onClick={createAccount}
                    type="primary"
                    style={{
                      position: "relative",
                      right: "10px",
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                      color: "#fff",
                      fontWeight: "bold",
                      padding: "10px 20px",
                    }}
                  >
                    Create Account
                  </Button>
                  <UpdateAccount data={admin} />
                  <DeletAccount />
                </div>
              </div>
            </div>
          </Card>
        </Space>
      </div>
    </>
  );
};

export default Index;
