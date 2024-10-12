/* eslint-disable react-hooks/exhaustive-deps */
import { auth } from "@service";
import ProfilImage from "../../assets/profile.png";
import { Button, Card, Space } from "antd";
import { getToken, removeToken } from "@token-service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateAccount, DeletAccount } from "@modals";

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
      <div className="flex justify-center">
        <Space direction="vertical">
          <Card
            bordered={true}
            style={{
              position: "relative",
              top: "10px",
              left: "25px",
              height: "100%",
              borderRadius: "12px",
              backgroundColor: "#fff",
            }}
          >
            <div className="flex flex-col lg:flex-row lg:gap-12 gap-8 items-center lg:items-start">
              <img
                src={ProfilImage}
                alt="Profile"
                className="rounded-full shadow-lg"
                style={{ width: "250px", height: "250px", objectFit: "cover" }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 w-full bg-gray-50 p-6 rounded-lg">
                {/* Content foni va padding */}
                <div>
                  <p className="text-gray-500 text-md">First Name</p>
                  <p className="font-bold text-xl text-gray-800">
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
                <div className="col-span-full flex flex-col lg:flex-row justify-center lg:justify-start gap-3 mt-6">
                  <Button
                    size="large"
                    onClick={createAccount}
                    type="primary"
                    className="w-full lg:w-auto" // Telefon ekranida to'liq kenglikni egallaydi
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                      color: "#fff",
                      fontWeight: "inherit",
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
