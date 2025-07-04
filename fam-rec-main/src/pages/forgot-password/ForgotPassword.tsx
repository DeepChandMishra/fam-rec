import { ForgotPasswordPayload } from "../../types/forgot-password-payload.type";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input } from "antd";
import { IMAGES_PATH } from "../../constants/images-path";
import "./ForgotPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";

function ForgotPassword() {
  // Forgot Password Form Declarations
  const [forgotPasswordForm] = Form.useForm();

  // Inject auth service
  const authService = AuthService;

  // Handle page navigation
  const navigate = useNavigate();

  // Handle form finish
  const onForgotPasswordFormFinish = (value: ForgotPasswordPayload) => {
    authService.forgotPassword(value).then(
      (res) => {
        console.log(res);
        toast.success("Please check you mail.");
        navigate("/reset-password");
      },
      (error) => {
        console.log(error);
        toast.error("Failed to send reset link");
      }
    );
  };
  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card
        style={{
          maxWidth: "500px",
          border: "none",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <img
            src={IMAGES_PATH.FAMREC_LOGO} // Replace with your logo URL
            alt="Famrec Logo"
            style={{ width: "150px" }}
          />
        </div>
        <div className="forgot-password-title">Forgot Your Password!</div>
        <div className="forgot-password-description">
          Please enter your email address and we will send you a link to reset
          your password.
        </div>
        <Form
          form={forgotPasswordForm}
          layout="vertical"
          style={{ textAlign: "left" }}
          variant={"filled"}
          onFinish={onForgotPasswordFormFinish}
        >
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter valid email" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                width: "100%",
                backgroundColor: "#E31F25",
              }}
            >
              Submit
            </Button>
          </Form.Item>
          <Flex justify="center" align="center" gap={5}>
            <Link to="/login">
              <Button
                type="link"
                style={{ color: "#E31F25", padding: 0 }}
                icon={<LeftOutlined />}
              >
                Back to Login
              </Button>
            </Link>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
}

export default ForgotPassword;
