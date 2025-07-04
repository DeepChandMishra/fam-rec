import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Grid,
  Input,
  Layout,
  Row,
  Select,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/footer/FooterComponent";
import { IMAGES_PATH } from "../../constants/images-path";
import "./Signup.scss";
import { RegisterPayload } from "../../types/register-payload.type";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import HeaderComponent from "../../components/header-component/HeaderComponent";

function Signup() {
  // Signup Form Declarations
  const [signUpForm] = Form.useForm();

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

  // Handle form finish
  const onFinish = (values: RegisterPayload) => {
    // Generate payload
    const payload: RegisterPayload = {
      ...values,
      dob: dayjs(values.dob).format("YYYY-MM-DD"),
    };
    console.log(payload);
     // Handle register API call
  authService.register(payload).then(
    (res) => {
      if (res?.data?.user) {
        toast.success(res.data.message || "Registered successfully.");
        navigate("/login");
      } else {
        toast.error(res.data.message);
        console.log("Unexpected response:", res.data.detail );
        console.warn("Unexpected response:", res);
      }
    },  
    
  );
};

  return (
    <Layout style={layoutStyle}>
      <HeaderComponent />
      <Layout>
        <Sider width={screens.xl ? "40%" : "100%"} style={sideStyle}>
          <Flex
            justify="center"
            align="center"
            style={
              screens.xs
                ? { overflowY: "auto" }
                : { height: "100vh", overflowY: "auto" }
            }
          >
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
                Let’s get Started!
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
                Submit your information and let’s connect our family.
              </div>
              <Form
                form={signUpForm}
                layout="vertical"
                style={{ textAlign: "left" }}
                variant={"filled"}
                onFinish={onFinish}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="User Name"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username",
                        },
                      ]}
                    >
                      <Input placeholder="Enter username" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Phone Number"
                      name="phone_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone number",
                        },
                        {
                          pattern: /^[0-9]{10}$/, // or your specific phone pattern
                          message: "Please enter valid phone number",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter phone number"
                        size="large"
                        type="tel"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                        {
                          type: "email",
                          message: "Please enter valid email address",
                        },
                      ]}
                    >
                      <Input placeholder="Enter your email" size="large" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Gender"
                      name="gender"
                      rules={[
                        { required: true, message: "Please select gender" },
                      ]}
                    >
                      <Select
                        placeholder="Select gender"
                        size="large"
                        options={[
                          { value: "male", label: "Male" },
                          { value: "female", label: "Female" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Birth Day"
                      name="dob"
                      rules={[
                        { required: true, message: "Please select birth date" },
                      ]}
                    >
                      <DatePicker
                        size="large"
                        style={{ width: "100%" }}
                        placeholder="Select birth date"
                        format={"YYYY-MM-DD"}
                        maxDate={dayjs(new Date())}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        { required: true, message: "Please enter password" },
                      ]}
                    >
                      <Input.Password placeholder="Password" size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "100%", backgroundColor: "#E31F25" }}
                  >
                    Signup
                  </Button>
                </Form.Item>
                <Flex align="center" gap={5}>
                  Already have an account?
                  <Link to={"/login"}>
                    <Button
                      type="link"
                      style={{ color: "#E31F25", padding: 0 }}
                    >
                      Login
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
                  <div className="signup-quote-container">
                    <span className="signup-quote-mark">“</span>
                    <p className="signup-quote-text">
                      Captured with love, stored with care{" "}
                      <span className="signup-quote-highlight">
                        – your family’s journey, forever.
                      </span>
                    </p>
                  </div>

                  <Flex
                    gap={16}
                    wrap="wrap"
                    justify="center"
                    className="signup-image-gallery"
                  >
                    <img
                      src={IMAGES_PATH.EVENT_FESTIVE}
                      alt="Festive Event"
                      className="signup-gallery-image"
                    />
                    <img
                      src={IMAGES_PATH.EVENT_BIRTHDAYS}
                      alt="Birthdays Event"
                      className="signup-gallery-image"
                    />
                    <img
                      src={IMAGES_PATH.EVENT_CHILDHOOD}
                      alt="Childhood Event"
                      className="signup-gallery-image"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Content>
          </Layout>
        )}
      </Layout>
      <FooterComponent></FooterComponent>
    </Layout>
  );
}

export default Signup;
