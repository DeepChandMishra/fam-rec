import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row } from "antd";

interface EventPageProp {
  title: string;
  description: string;
  imageOrientation: "LEFT" | "RIGHT";
  imagePath: string;
}

function EventPage(props: Readonly<EventPageProp>) {
  const { title, description, imageOrientation, imagePath } = props;

  return (
    <div
      style={{
        background: "#DADADA",
        borderRadius: "4px",
        padding: "20px",
      }}
    >
      {imageOrientation == "LEFT" ? (
        <Row wrap gutter={[16, 16]} align="middle">
          {/* Image Section */}
          <Col xs={24} md={8}>
            <img
              src={imagePath}
              alt="Event"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Col>

          {/* Content Section */}
          <Col xs={24} md={16}>
            <div
              style={{
                color: "#000000",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                marginBottom: "16px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#555555",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              {description}
            </div>
            <Flex gap={10}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#FF006F",
                  color: "#FFFFFF",
                }}
                icon={<RightOutlined />}
                iconPosition="end"
              >
                View In Memory
              </Button>
              <Button
                type="default"
                style={{
                  backgroundColor: "#497A78",
                  color: "#FFFFFF",
                }}
                icon={<RightOutlined />}
                iconPosition="end"
              >
                Visit this Album
              </Button>
            </Flex>
          </Col>
        </Row>
      ) : (
        <Row wrap gutter={[16, 16]} align="middle">
          {/* Image Section */}

          {/* Content Section */}
          <Col xs={24} md={16}>
            <div
              style={{
                color: "#000000",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "32px",
                marginBottom: "16px",
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: "16px",
                color: "#555555",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              {description}
            </div>
            <Flex gap={10}>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#FF006F",
                  color: "#FFFFFF",
                }}
                icon={<RightOutlined />}
                iconPosition="end"
              >
                View In Memory
              </Button>
              <Button
                type="default"
                style={{
                  backgroundColor: "#497A78",
                  color: "#FFFFFF",
                }}
                icon={<RightOutlined />}
                iconPosition="end"
              >
                Visit this Album
              </Button>
            </Flex>
          </Col>
          <Col xs={24} md={8}>
            <img
              src={imagePath}
              alt="Event"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default EventPage;
