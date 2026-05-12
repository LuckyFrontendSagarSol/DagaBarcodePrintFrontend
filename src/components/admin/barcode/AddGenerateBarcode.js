import React, { Component } from "react";
import { Button, Row, Col, Modal, Input, Form } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import "../../../assets/css/barcode.css";
import Barcode from "react-barcode";

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

export default class AddGenerateBarcode extends Component {
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

    const barcodeRows = barcodes?.map((barcode, bi) => {
      if (!barcode) return null;
      const data = (
        <Col key={`${barcode.barcode}-${bi}`} sm={24} md={12} lg={12} xl={12}>
          <div
            className="box-barcode"
            style={{ marginRight: 85, marginLeft: 15, marginTop: -15, flexGrow: 3 }}
          >
            <h3 style={{ marginBottom: 0 }}>{barcode.brand || "—"}</h3>
            <Row className="code-row-one" style={{ width: 300 }}>
              <Col sm={24} md={24} lg={24} xl={24}>
                <p style={{ color: "black" }}>
                  D.No. -{barcode.designNumber || "—"}
                  <span style={{ marginLeft: 5 }}>{barcode.MOQ ?? ""}</span>
                </p>
              </Col>
            </Row>
            <Row className="code-row" style={{ width: 300, overflow: "hidden" }}>
              <Col sm={24} md={24} lg={24} xl={24}>
                <p style={{ color: "black", whiteSpace: "nowrap" }}>
                  Size. - {barcode.size || "—"}
                  <span style={{ marginLeft: 5 }}>{barcode.color || ""}</span>
                </p>
              </Col>
            </Row>
            <h4 className="code" style={{ marginLeft: "30%" }}>91{barcode.wsp ?? ""}</h4>
            {barcode.barcode ? (
              <Barcode
                height={30}
                width={1.5}
                marginTop={-4}
                marginBottom={-4}
                marginLeft={16}
                displayValue={false}
                value={String(barcode.barcode)}
                className="barcode-strip"
              />
            ) : (
              <div style={{ height: 30, background: "#f0f0f0", margin: "4px 0" }} />
            )}
            <h5 className="barcode-number mb-2" style={{ marginLeft: "7.5%" }}>
              {Math.floor(1000 + Math.random() * 9000)}
              {barcode.barcode}
              {out}
            </h5>
          </div>
        </Col>
      );
      return Array(Number(totalCount || 0)).fill(data);
    });

    const isPrintDisabled = !totalCount || Number(totalCount) === 0;

    return (
      <div className="barcode-generator">
        <Button
          type="primary"
          icon={<PrinterOutlined />}
          onClick={this.showModal}
          disabled={!this.props.barcodes?.length}
        >
          Generate
        </Button>

        <Modal
          open={visible}
          onCancel={this.handleModalCancel}
          title="Generate Barcode"
          style={{ top: 20 }}
          footer={null}
          destroyOnClose
          width={1500}
        >
          <div>
            <Form name="barcode-form" initialValues={{ remember: true }}>
              <Form.Item name="totalCount">
                <Input
                  placeholder="Enter number of copies per barcode"
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
                  No barcodes selected
                </div>
              ) : (
                <Row gutter={[8, 0]} className="my-barcodes">
                  {barcodeRows}
                </Row>
              )}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
