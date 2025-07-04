import { Flex } from "antd";
import { Footer } from "antd/es/layout/layout";

function FooterComponent() {
  const footerStyle = {
    color: "#000000",
    fontSize: "14px",
    backgroundColor: "#ffffff",
    borderTop: "0.1px solid #0000001A",
  };
  return (
    <Footer style={footerStyle}>
      <Flex justify="center" align="center">
        @ {new Date().getFullYear()} Famrec | Preserving Memories, Forever
      </Flex>
    </Footer>
  );
}

export default FooterComponent;
