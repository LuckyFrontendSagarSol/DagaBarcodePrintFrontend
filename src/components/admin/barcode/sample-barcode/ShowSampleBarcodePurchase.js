import React, { useState, useRef } from "react";
import { Table, Tooltip, Button, Space, Input, Modal, Row, Col, Checkbox, Form } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import Barcode from "react-barcode";
import { BarcodeData } from "../../../../util/constants";

const { Column } = Table;
const purchases = (BarcodeData[0] || []).map((item, idx) => ({ ...item, key: `${item.barcode}-${idx}` }));

const ShowSampleBarcodePurchase = () => {
    const [visible, setVisible] = useState(false);
    const [visibleB, setVisibleB] = useState(false);
    const [selectedBarcodes, setSelectedBarcodes] = useState([]);
    const [barcodes, setBarcodes] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [totalCount, setTotalCount] = useState("");
    const searchInput = useRef(null);
    const componentRef = useRef(null);

    const onCheckboxChange = (record) => {
        setSelectedBarcodes(
            selectedBarcodes.includes(record.key)
                ? selectedBarcodes.filter((k) => k !== record.key)
                : [...selectedBarcodes, record.key]
        );
    };

    const showModalBarcode = () => {
        setBarcodes(purchases.filter((p) => selectedBarcodes.includes(p.key)));
        setVisibleB(true);
    };

    const handleModalCancel = () => {
        setVisible(false);
        setTotalCount("");
        setSelectedBarcodes([]);
    };

    const handleModalCancelBarcode = () => {
        setVisibleB(false);
        setTotalCount("");
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />} size="small" style={{ width: 90 }} className="search-name">Search</Button>
                    <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>Reset</Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) =>
            record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) setTimeout(() => searchInput.current?.select(), 100);
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ""} />
            ) : (text),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters, confirm) => {
        clearFilters();
        confirm();
        setSearchText("");
    };

    const createdAt = barcodes.length > 0 && barcodes[0]?.created_at;
    const date = new Date(createdAt || Date.now());
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (month < 10) month = "0" + month;
    const last2Str = String(year).slice(-2);
    const out = month + last2Str;

    const barcodesContent = barcodes.map((barcode, idx) => {
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
        return Array(Number(totalCount)).fill(data);
    });

    return (
        <div>
            <button className="btn" type="button" onClick={() => setVisible(true)}>
                <Tooltip title="View Items">
                    <EyeOutlined />
                </Tooltip>
            </button>
            <Modal visible={visible} onCancel={handleModalCancel} title="View Sample Barcode Items" style={{ top: 20 }} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} destroyOnClose width={1500}>
                <Table dataSource={purchases} bordered size="middle" pagination={false} scroll={{ y: 500 }} rowKey="key">
                    <Column title="SRN" key="index" render={(_v, _r, index) => index + 1} width={60} />
                    <Column title="Barcode" dataIndex="barcode" key="barcode" width={100} {...getColumnSearchProps("barcode")} />
                    <Column title="Design No." dataIndex="designNumber" key="designNumber" width={150} {...getColumnSearchProps("designNumber")} />
                    <Column title="Brand" dataIndex="brand" key="brand" width={120} {...getColumnSearchProps("brand")} />
                    <Column title="Size" dataIndex="size" key="size" width={80} {...getColumnSearchProps("size")} />
                    <Column title="Color" dataIndex="color" key="color" width={80} />
                    <Column title="MOQ" dataIndex="MOQ" key="MOQ" width={60} />
                    <Column title="Qnty" dataIndex="quantity" key="quantity" width={60} />
                    <Column title="WSP" dataIndex="wsp" key="wsp" width={80} />
                    <Column title="Action" key="action" width={80} render={(_text, record) => (
                        <Row gutter={[8, 0]}>
                            <Col span={12}>
                                <Checkbox checked={selectedBarcodes.includes(record.key)} onChange={() => onCheckboxChange(record)} />
                            </Col>
                        </Row>
                    )} />
                </Table>
                <Button className="mt-2 mb-4 mr-3 float-right" type="primary" onClick={showModalBarcode} disabled={selectedBarcodes.length === 0}>
                    Generate Barcode
                </Button>

                <ReactToPrint content={() => componentRef.current}>
                    <Modal visible={visibleB} onCancel={handleModalCancelBarcode} title="Generate Barcode" style={{ top: 20 }} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} destroyOnClose width={1300}>
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
                                <Row gutter={[8, 0]} className="my-barcodes">{barcodesContent}</Row>
                            </div>
                        </div>
                    </Modal>
                </ReactToPrint>
            </Modal>
        </div>
    );
};

export default ShowSampleBarcodePurchase;
