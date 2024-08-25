import { notification } from "antd";

const Notification = (
  type: "success" | "error" | "info" | "warning",
  message: string,
  description: string
) => {
  notification[type]({
    message: message,
    description: description,
    duration: 3,
    onClick: () => {
      console.log("Notification Clicked!");
    },
  });
};

export default Notification;
