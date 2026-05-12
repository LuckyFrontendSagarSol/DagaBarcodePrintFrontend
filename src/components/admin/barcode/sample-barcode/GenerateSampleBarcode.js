import React, { useState, useRef } from "react";
import { Button, Row, Col, Modal, Input, Form, Tooltip } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import "../../../../assets/css/barcode.css";
import { BarcodeData } from "../../../../util/constants";
var Barcode = require("react-barcode");

const barcodes = BarcodeData[0] || [];

const GenerateSampleBarcode = () => {
    const [visible, setVisible] = useState(false);
    const [totalCount, setTotalCount] = useState("");
    const componentRef = useRef(null);

    const handleModalCancel = () => {
        setVisible(false);
        setTotalCount("");
    };

    const createdAt = barcodes.length > 0 && barcodes[0]?.created_at;
    const date = new Date(createdAt || Date.now());
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = "0" + month;
    const last2Str = String(year).slice(-2);
    const out = month + last2Str;

    const barcodesRender = barcodes.map((barcode, idx) => {
        const data = (
            <Col sm={24} md={12} lg={12} xl={12} className="" key={idx}>
                <div className="box-barcode" style={{ marginRight: "85px", marginLeft: "15px", marginTop: "-15px", flexGrow: 3 }}>
                    <h3 style={{ marginBottom: "0px" }}>{barcode.brand}</h3>
                    <Row className="code-row-one" style={{ width: "300px" }}>
                        <Col sm={24} md={24} lg={24} xl={24}>
                            <p style={{ color: "black" }}>D.No. -{barcode.designNumber} <span style={{ marginLeft: "5px" }}>{barcode.MOQ}</span></p>
                        </Col>
                    </Row>
                    <Row className="code-row" style={{ width: "300px", overflow: "hidden" }}>
                        <Col sm={24} md={24} lg={24} xl={24}>
                            <p style={{ color: "black", whiteSpace: "nowrap" }}>Size. - {barcode.size} <span style={{ marginLeft: "5px" }}>{barcode.color}</span></p>
                        </Col>
                    </Row>
                    <h4 className="code" style={{ marginLeft: "30%" }}>91{barcode.wsp}</h4>
                    <Barcode height={30} width={1.5} marginTop={-4} marginBottom={-4} marginLeft={16} displayValue={false} value={barcode.barcode} className="barcode-strip" />
                    <h5 className="barcode-number mb-2" style={{ marginLeft: "7.5%" }}>
                        {Math.floor(1000 + Math.random() * 9000)}{barcode.barcode}{out}
                    </h5>
                </div>
            </Col>
        );
        return Array(Number(totalCount) || 0).fill(data);
    });

    return (
        <div className="barcode-generator">
            <Tooltip title="Generate Barcode">
                <FileTextOutlined onClick={() => setVisible(true)} />
            </Tooltip>
            <ReactToPrint content={() => componentRef.current}>
                <Modal
                    visible={visible}
                    onCancel={handleModalCancel}
                    title="Generate Barcode"
                    style={{ top: 20 }}
                    okButtonProps={{ hidden: true }}
                    cancelButtonProps={{ hidden: true }}
                    destroyOnClose
                    width={1500}
                >
                    <Form name="add-Purchase" className="add-Purchase" initialValues={{ remember: true }}>
                        <Form.Item name="totalCount">
                            <Input placeholder="Enter Number" value={totalCount} onChange={(e) => setTotalCount(e.target.value)} required />
                        </Form.Item>
                    </Form>
                    <PrintContextConsumer>
                        {({ handlePrint }) =>
                            totalCount === "" || totalCount === "0" ? (
                                <Button style={{ margin: "0 0 0 45%" }} type="primary" className="ok-modal" disabled>Print this out!</Button>
                            ) : (
                                <Button style={{ margin: "0 0 0 45%" }} type="primary" className="ok-modal" onClick={handlePrint}>Print this out!</Button>
                            )
                        }
                    </PrintContextConsumer>
                    <div className="card barcode-card">
                        <div ref={componentRef} className="card-body">
                            <Row gutter={[8, 0]} className="my-barcodes">{barcodesRender}</Row>
                        </div>
                    </div>
                </Modal>
            </ReactToPrint>
        </div>
    );
};

export default GenerateSampleBarcode;
