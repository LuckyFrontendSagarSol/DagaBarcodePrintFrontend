import React, { Component } from "react";
import { Button, Row, Col, Modal, Input, Form } from "antd";
import { QrcodeOutlined, PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
import "../../../assets/css/barcode.css";

function PrintButton({ contentRef, disabled }) {
  const handlePrint = useReactToPrint({ content: () => contentRef.current });
  return (
    <Button
      type="primary"
      icon={<PrinterOutlined />}
      style={{ margin: "0 0 0 45%" }}
      onClick={handlePrint}
      disabled={disabled}
    >
      Print this out!
    </Button>
  );
}

export default class AddGenerateQRCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      barcodes: [],
      totalCount: "",
    };
    this.componentRef = React.createRef();
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleModalCancel = () => {
    if (this.props.clearState) this.props.clearState();
    this.setState({ visible: false, totalCount: "" });
  };

  shouldComponentUpdate(nextProps, prevState) {
    if (nextProps.barcodes.length !== prevState.barcodes.length) {
      this.setState({ barcodes: nextProps.barcodes });
    }
    return true;
  }

  render() {
    const { visible, totalCount, barcodes } = this.state;

    const out = (() => {
      const createdAt = barcodes?.[0]?.created_at;
      if (!createdAt) return "";
      const date = new Date(createdAt);
      let month = date.getMonth() + 1;
      const year = date.getFullYear();
      if (month < 10) month = `0${month}`;
      return `${month}${String(year).slice(-2)}`;
    })();

    const qrRows = barcodes?.map((barcode, bi) => {
      if (!barcode) return null;
      const qrValue = barcode.barcode ? String(barcode.barcode) : (barcode.designNumber || "N/A");

      const label = (
        <Col key={`${barcode.barcode}-${bi}`} sm={24} md={12} lg={12} xl={12}>
          <div
            className="box-qr"
            style={{ marginRight: 85, marginLeft: 15, marginTop: -15, flexGrow: 3 }}
          >
            {/* Same layout structure as barcode label but QR replaces the barcode strip */}
            <div style={{ display: "flex", alignItems: "flex-start", height: "100%" }}>
              {/* Left: QR Code */}
              <div style={{ flexShrink: 0, marginRight: 4, marginTop: 2 }}>
                <QRCode
                  value={qrValue}
                  size={76}
                  style={{ display: "block" }}
                />
              </div>

              {/* Right: Text info — mirrors barcode label text */}
              <div style={{ flex: 1, overflow: "hidden" }}>
                <h3 style={{ marginBottom: 0, marginTop: "-8%", fontWeight: "bolder" }}>
                  {barcode.brand || "—"}
                </h3>
                <Row className="code-row-one" style={{ width: "auto" }}>
                  <Col span={24}>
                    <p style={{ color: "black" }}>
                      D.No.-{barcode.designNumber || "—"}
                      <span style={{ marginLeft: 5 }}>{barcode.MOQ ?? ""}</span>
                    </p>
                  </Col>
                </Row>
                <Row className="code-row" style={{ overflow: "hidden" }}>
                  <Col span={24}>
                    <p style={{ color: "black", whiteSpace: "nowrap" }}>
                      Sz.-{barcode.size || "—"}
                      <span style={{ marginLeft: 5 }}>{barcode.color || ""}</span>
                    </p>
                  </Col>
                </Row>
                <h4 className="code" style={{ marginLeft: "10%" }}>91{barcode.wsp ?? ""}</h4>
                <h5 className="barcode-number mb-2" style={{ marginLeft: "2%", fontSize: "9px" }}>
                  {Math.floor(1000 + Math.random() * 9000)}
                  {barcode.barcode}
                  {out}
                </h5>
              </div>
            </div>
          </div>
        </Col>
      );

      return Array(Number(totalCount || 0)).fill(label);
    });

    const isPrintDisabled = !totalCount || Number(totalCount) === 0;

    return (
      <div className="barcode-generator">
        <Button
          icon={<QrcodeOutlined />}
          onClick={this.showModal}
          disabled={!this.props.barcodes?.length}
          style={{
            background: "linear-gradient(135deg, #52c41a, #237804)",
            border: "none",
            color: "#fff",
            fontWeight: 600,
          }}
        >
          Generate QR
        </Button>

        <Modal
          open={visible}
          onCancel={this.handleModalCancel}
          title="Generate QR Code Labels"
          style={{ top: 20 }}
          footer={null}
          destroyOnClose
          width={1500}
        >
          <div>
            <Form name="qr-form" initialValues={{ remember: true }}>
              <Form.Item name="totalCount">
                <Input
                  placeholder="Enter number of copies per label"
                  name="totalCount"
                  type="number"
                  min={1}
                  value={totalCount}
                  onChange={this.onChange}
                />
              </Form.Item>
            </Form>
            <PrintButton contentRef={this.componentRef} disabled={isPrintDisabled} />
          </div>

          <div className="card barcode-card">
            <div ref={this.componentRef} className="card-body">
              {barcodes?.length === 0 ? (
                <div style={{ textAlign: "center", color: "#999", padding: 40 }}>
                  No items selected
                </div>
              ) : (
                <Row gutter={[8, 0]} className="my-barcodes">
                  {qrRows}
                </Row>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
