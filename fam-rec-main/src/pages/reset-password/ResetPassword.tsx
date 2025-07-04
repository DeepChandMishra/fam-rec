import { LeftOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { IMAGES_PATH } from "../../constants/images-path";
import "./ResetPassword.scss";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";

function ResetPassword() {
  // Reset Password Form Declarations
  const [resetPasswordForm] = Form.useForm();

  // Inject auth service
  const authService = AuthService;

  // Handle page navigation
  const navigate = useNavigate();

  // Handle form finish
  const onResetPasswordFormFinish = (value: any) => {
    authService.resetPassword(value).then(
      (res) => {
        console.log(res);
        toast.success("Password Reset Successfully.");
        navigate("/login");
      },
      (error) => {
        console.log(error);
        toast.error("Failed to reset password");
      }
    );
  };

  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <Card
        style={{
          width: "500px",
          border: "none",
          textAlign: "center",
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <img
            src={IMAGES_PATH.FAMREC_LOGO}
            alt="Famrec Logo"
            style={{ width: "150px" }}
          />
        </div>
        <div className="reset-password-title">Reset Password!</div>
        <div className="reset-password-description">
          Please enter your email, OTP and new password.
        </div>
        <Form
          form={resetPasswordForm}
          layout="vertical"
          style={{ textAlign: "left" }}
          variant="filled"
          onFinish={onResetPasswordFormFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="OTP"
            name="otp"
            rules={[{ required: true, message: "Please enter the OTP" }]}
          >
            <Input placeholder="Enter OTP" size="large" />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: "Please enter your new password" }]}
          >
            <Input.Password placeholder="Enter new password" size="large" />
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

export default ResetPassword;
