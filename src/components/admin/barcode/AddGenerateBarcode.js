import React, { Component } from "react";
import { Button, Row, Col, Modal, Input, Form } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import "../../../assets/css/barcode.css";
var Barcode = require("react-barcode");

export default class AddGenerateBarcode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      barcodes: [],
      totalCount: "",
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleModalCancel = () => {
    this.props.clearState()
    this.setState({ visible: false, totalCount : "" });
  };
  shouldComponentUpdate(nextProps, prevState) {
    if (nextProps.barcodes.length != prevState.barcodes.length) {
      this.setState({
        barcodes: nextProps.barcodes,
      });
    }
    return true;
  }

  render() {
    const { visible, } = this.state;
    // let d = new Date();
    // const num = d.getFullYear();
    // const last2Str = String(num).slice(-2);
    // let month = "" + (d.getMonth() + 1);
    // if (month.length < 2) month = "0" + month;
    // let out = month + last2Str;

    const createdAt =  this.state.barcodes && this.state.barcodes?.length > 0 && this.state.barcodes?.[0]?.created_at;
    const date = new Date(createdAt);
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = "0" + month;
    const last2Str = String(year).slice(-2);
    const out = month + last2Str;


    let barcodes = this.state.barcodes?.map((barcode) => {
      let barcodeData = [];

      let data = (
        <Col sm={24} md={12} lg={12} xl={12} className="">
          {/* <div className="box-barcode">
            <h3> {barcode.brand}</h3>
            <Row gutter={[8, 0]} className="code-row-one">
              <Col sm={12} md={12} lg={12} xl={12}>
                <p>D.No. -{barcode.designNumber}</p>
              </Col>
              <Col sm={12} md={12} lg={12} xl={12} className="code-col">
                <p>Pcs. - {barcode.MOQ}</p>
              </Col>
            </Row>
            <Row gutter={[8, 0]} className="code-row">
              <Col sm={12} md={12} lg={12} xl={12}>
                <p>Size. - {barcode.size}</p>
              </Col>
              <Col sm={12} md={12} lg={12} xl={12} className="code-col">
                <p>{barcode.color}</p>
              </Col>
            </Row> */}
          <div
            className="box-barcode"
            style={{
              // width: "6cm",
              marginRight: "85px",
              marginLeft: "15px",
              marginTop: "-15px",
              flexGrow: 3,
            }}
          >
            <h3 style={{ marginBottom: "0px" }}> {barcode.brand}</h3>
            {/* =============== */}
            {
              (() => {
                return (
                  <Row className="code-row-one" style={{ width: "300px" }}>
                    <Col sm={24} md={24} lg={24} xl={24}  >
                      <p style={{ color: "black" }}>D.No. -{barcode.designNumber} <span style={{ marginLeft: "5px" }}>{barcode.MOQ}</span></p>
                    </Col>
                  </Row>
                );
              })()
            }
            <Row className="code-row" style={{ width: "300px", overflow: "hidden" }}>
              <Col sm={24} md={24} lg={24} xl={24}>
                <p style={{ color: "black", whiteSpace: "nowrap" }}>Size. - {barcode.size} <span style={{ marginLeft: "5px" }}>{barcode.color}</span> </p>
              </Col>
            </Row>
            <h4 className="code" style={{ marginLeft: "30%" }}>
              91{barcode.wsp}
            </h4>
            <Barcode
              height={30}
              width={1.5}
              marginTop={-4}
              marginBottom={-4}
              marginLeft={16}
              displayValue={false}
              value={barcode.barcode}
              className="barcode-strip"
            />
            <h5 className="barcode-number mb-2" style={{ marginLeft: "7.5%" }}>
              {Math.floor(1000 + Math.random() * 9000)}
              {barcode.barcode}
              {out}
            </h5>
          </div>
        </Col>
      );
      // barcodeData = Array(Math.ceil(Number(barcode.totalBox))).fill(data);
      barcodeData = Array(Number(this.state.totalCount)).fill(data);
      return barcodeData;
    });
    return (
      <div className="barcode-generator">
        <Button
          className="btn-admin btn-subCategory add-button mt-3"
          type="primary"
          onClick={this.showModal}
        >
          Generate
        </Button>
        <ReactToPrint content={() => this.componentRef}>
          <Modal
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleModalCancel}
            title="Generate Barcode"
            style={{ top: 20 }}
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
            destroyOnClose={true}
            width={1500}
          >
            <div>
              <Form
                name="add-Purchase"
                className="add-Purchase"
                initialValues={{ remember: true }}
              >
                <Form.Item
                  name="totalCount"
                // rules={[{ required: true, message: 'Please input your username!' }]}
                >
                  <Input
                    placeholder="Enter Number"
                    name="totalCount"
                    value={this.state.totalCount}
                    onChange={this.onChange}
                    required
                  />
                </Form.Item>
              </Form>
              <PrintContextConsumer>
                {({ handlePrint }) =>
                  (() => {
                    if (
                      this.state.totalCount == "" ||
                      this.state.totalCount == 0
                    ) {
                      return (
                        <Button
                          style={{ margin: " 0 0 0 45%" }}
                          type="primary"
                          className="ok-modal"
                          disabled
                        >
                          Print this out!
                        </Button>
                      );
                    } else {
                      return (
                        <Button
                          style={{ margin: " 0 0 0 45%" }}
                          type="primary"
                          className="ok-modal"
                          onClick={handlePrint}
                        >
                          Print this out!
                        </Button>
                      );
                    }
                  })()
                }
              </PrintContextConsumer>
            </div>

            <div className="card barcode-card">
              <div ref={(el) => (this.componentRef = el)} className="card-body">
                <Row gutter={[8, 0]} className=" my-barcodes">
                  {barcodes}
                </Row>
              </div>
            </div>
          </Modal>
        </ReactToPrint>
      </div>
    );
  }
}
