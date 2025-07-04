import { Button, Card, Checkbox, Flex, Form, Grid, Input, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/footer/FooterComponent";
import { IMAGES_PATH } from "../../constants/images-path";
import "./Login.scss";
import { LoginPayload } from "../../types/login-payload.type";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import HeaderComponent from "../../components/header-component/HeaderComponent";

function Login() {
  // Login Form Declarations
  const [loginForm] = Form.useForm();

  // Get the breakpoint for responsiveness
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  // Layout style
  const sideStyle: React.CSSProperties = {
    color: "$fff",
    backgroundColor: "#fff",
  };

  const layoutStyle = {
    height: "100vh",
    overflow: "auto",
  };

  // Inject auth service
  const authService = AuthService;

  // Handle page navigation
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await authService.getCurrentUser();
      console.log("Fetched user data:", response.data);
      const userData = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data.");
    }
  }

  // Handle form finish
  // const onFinish = (values: LoginPayload) => {
  //   authService.login(values).then(
  //     (res) => {
  //       console.log(res);
  //       toast.success("Login Successfully.");
  //       navigate("/family-tree");
  //     },
  //     (error) => {
  //       console.log(error);
  //       toast.error("Login Failed.");
  //     }
  //   );
  // };
  // const onFinish = (values: LoginPayload) => {
  //   authService.login(values).then(
  //     (res) => {
  //       console.log(res);

  //       const { name, email, token } = res.data;

  //       // Save user info to localStorage
  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({
  //           name,
  //           email,
  //           token,
  //         })
  //       );

  //       toast.success("Login Successfully.");
  //       navigate("/family-tree");
  //     },
  //     (error) => {
  //       console.log(error);
  //       toast.error("Login Failed.");
  //     }
  //   );
  // };

  const onFinish = async (values: LoginPayload) => {
    try {
      const res = await authService.login(values);
      console.log(res);
  
      const { name, email, access_token, refresh_token } = res.data;
  
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name,
          email,
        })
      );
  
      await fetchUser(); // ✅ Yahan await ab properly chalega
  
      toast.success("Login Successfully.");
      navigate("/family-tree");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed.");
    }
  };
  

  return (
    <Layout style={layoutStyle}>
      <HeaderComponent />
      <Layout>
        <Sider width={screens.xl ? "30%" : "100%"} style={sideStyle}>
          <Flex justify="center" align="center" style={{ height: "100vh" }}>
            <Card
              style={{
                width: "100%",
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
              <div
                style={{
                  marginBottom: 8,
                  fontWeight: 500,
                  fontSize: "32px",
                  color: "#E31F25",
                }}
              >
                Welcome back!
              </div>
              <div
                style={{
                  marginBottom: 16,
                  display: "block",
                  fontSize: "16px",
                  color: "#000000",
                  fontWeight: 400,
                }}
              >
                Enter your Credentials to access your account
              </div>
              <Form
                form={loginForm}
                layout="vertical"
                style={{ textAlign: "left" }}
                initialValues={{ remember: true }}
                variant={"filled"}
                onFinish={onFinish}
              >
                <Form.Item
                  label={
                    <span className="login-form-item-label">Email address</span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input placeholder="Enter your email" size="large" />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="login-form-item-label">Password</span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>
                <Flex
                  justify="space-between"
                  align="center"
                  style={{
                    marginBottom: 16,
                  }}
                >
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>
                      <span className="login-form-item-label">Remember me</span>
                    </Checkbox>
                  </Form.Item>
                  <Link to={"/forget-password"}>
                    <Button type="link" style={{ color: "#E31F25" }}>
                      Forgot password?
                    </Button>
                  </Link>
                </Flex>
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
                    Log in
                  </Button>
                </Form.Item>
                <Flex align="center" gap={5}>
                  Don't have an account?
                  <Link to={"/signup"}>
                    <Button
                      type="link"
                      style={{ color: "#E31F25", padding: 0 }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Flex>
              </Form>
            </Card>
          </Flex>
        </Sider>
        {screens.xl && (
          <Layout>
            <Content>
              <Flex
                justify="center"
                align="center"
                style={{ height: "100vh" }}
                vertical
              >
                <Flex vertical gap={20}>
                  {/* Quote Section */}
                  <div className="login-quote-container">
                    <span className="login-quote-mark">“</span>
                    <p className="login-quote-text">
                      Cherish every moment, relive every memory.{" "}
                      <span className="login-quote-highlight">
                        Secure your family's journey with love.{" "}
                      </span>
                    </p>
                  </div>

                  <Flex
                    gap={16}
                    wrap="wrap"
                    justify="center"
                    className="login-image-gallery"
                  >
                    <img
                      src={IMAGES_PATH.EVENT_FESTIVE}
                      alt="Festive Event"
                      className="login-gallery-image"
                    />
                    <img
                      src={IMAGES_PATH.EVENT_BIRTHDAYS}
                      alt="Birthdays Event"
                      className="login-gallery-image"
                    />
                    <img
                      src={IMAGES_PATH.EVENT_CHILDHOOD}
                      alt="Childhood Event"
                      className="login-gallery-image"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Content>
          </Layout>
        )}
      </Layout>
      {!screens.xs && <FooterComponent></FooterComponent>}
    </Layout>
  );
}

export default Login;
