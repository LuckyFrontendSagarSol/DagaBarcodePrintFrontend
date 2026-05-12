import React, { useState, useEffect, useRef } from "react";
import {
    Table,
    Button,
    Input,
    Checkbox,
    Row,
    Col,
    Modal,
    Form,
    Space,
    Card,
} from "antd";
import { BarcodeOutlined, SearchOutlined } from "@ant-design/icons";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";
import Barcode from "react-barcode";
import Highlighter from "react-highlight-words";
import { BarcodeData } from "../../../../util/constants";
import "./style.css";

const allItems = (BarcodeData[0] || []).map((item, idx) => ({
    ...item,
    key: `${item.barcode}-${idx}`,
    checkboxStatus: false,
}));

const GenerateSetsBarcode = () => {
    const [selectedBarcodes, setSelectedBarcodes] = useState([]);
    const [customizedModalVisible, setCustomizedModalVisible] = useState(false);
    const [setModalVisible, setSetModalVisible] = useState(false);
    const [totalCount, setTotalCount] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [tableData, setTableData] = useState(allItems);

    const searchInput = useRef(null);
    const printRef = useRef(null);
    const setPrintRef = useRef(null);

    const handleCheckboxChange = (e, record) => {
        const checked = e.target.checked;
        setTableData(tableData.map((item) =>
            item.key === record.key ? { ...item, checkboxStatus: !item.checkboxStatus } : item
        ));
        if (checked) {
            setSelectedBarcodes([...selectedBarcodes, record]);
        } else {
            setSelectedBarcodes(selectedBarcodes.filter((item) => item.key !== record.key));
        }
    };

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
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        className="search-name"
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) setTimeout(() => searchInput.current?.select(), 100);
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (text),
    });

    const columns = [
        { title: "SRN", key: "index", width: 60, render: (_v, _r, index) => index + 1 },
        { title: "Barcode", dataIndex: "barcode", key: "barcode", width: 100, ...getColumnSearchProps("barcode") },
        { title: "Design No.", dataIndex: "designNumber", key: "designNumber", width: 150, ...getColumnSearchProps("designNumber") },
        { title: "Brand", dataIndex: "brand", key: "brand", width: 120, ...getColumnSearchProps("brand") },
        { title: "Size", dataIndex: "size", key: "size", width: 80, ...getColumnSearchProps("size") },
        { title: "Color", dataIndex: "color", key: "color", width: 80 },
        { title: "WSP", dataIndex: "wsp", key: "wsp", width: 80 },
        { title: "MOQ", dataIndex: "MOQ", key: "MOQ", width: 80 },
        { title: "Set", dataIndex: "set", key: "set", width: 80 },
        {
            title: "Action", key: "action", dataIndex: "checkboxStatus", fixed: "right", width: 80,
            render: (checkboxStatus, record) => (
                <Checkbox checked={checkboxStatus} onChange={(e) => handleCheckboxChange(e, record)} />
            ),
        },
    ];

    const generateSingleBarcode = (barcode) => {
        const createdAt = barcode?.created_at || new Date().toISOString();
        const date = new Date(createdAt);
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (month < 10) month = "0" + month;
        const last2Str = String(year).slice(-2);
        const out = month + last2Str;

        return (
            <Col sm={24} md={12} lg={12} xl={12} className="" key={Math.random()}>
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
    };

    const renderCustomizedBarcodes = () => {
        if (!selectedBarcodes.length || !totalCount) return null;
        const result = [];
        selectedBarcodes.forEach((barcode) => {
            for (let i = 0; i < Number(totalCount); i++) {
                result.push(generateSingleBarcode(barcode));
            }
        });
        return result;
    };

    const renderSetBarcodes = () => {
        if (!selectedBarcodes.length) return null;
        const result = [];
        selectedBarcodes.forEach((barcode) => {
            const setCount = Number(barcode.set) || 1;
            for (let i = 0; i < setCount; i++) {
                result.push(generateSingleBarcode(barcode));
            }
        });
        return result;
    };

    const handleCustomizedModalCancel = () => {
        setCustomizedModalVisible(false);
        setTotalCount("");
        setSelectedBarcodes([]);
        setTableData(allItems.map((item) => ({ ...item, checkboxStatus: false })));
    };

    const handleSetModalCancel = () => {
        setSetModalVisible(false);
        setSelectedBarcodes([]);
        setTableData(allItems.map((item) => ({ ...item, checkboxStatus: false })));
    };

    return (
        <div>
            <Card style={{ marginBottom: "16px" }} bodyStyle={{ padding: "16px 24px" }}>
                <Row justify="space-between" align="middle">
                    <Col>
                        <h3 level={3} style={{ margin: 0 }}>
                            <BarcodeOutlined style={{ marginRight: "12px" }} />
                            Generate Sets Barcode
                        </h3>
                    </Col>
                </Row>
            </Card>

            <div className="card mt-4 generate-barcode-list">
                <div className="card-body">
                    <Table
                        dataSource={tableData}
                        columns={columns}
                        bordered
                        size="middle"
                        scroll={{ y: 240, x: 1000 }}
                        pagination={{ pageSize: 30 }}
                    />
                    <div className="barcode-generator mb-4">
                        <Button className="btn-admin btn-subCategory add-button mx-3" type="primary" onClick={() => { if (selectedBarcodes.length) setCustomizedModalVisible(true); }} style={{ marginRight: "10px" }}>
                            Generate Customized Barcode
                        </Button>
                        <Button className="btn-admin btn-subCategory add-button mx-3" type="primary" onClick={() => { if (selectedBarcodes.length) setSetModalVisible(true); }}>
                            Generate Set Barcode
                        </Button>

                        <ReactToPrint content={() => printRef.current}>
                            <Modal open={customizedModalVisible} onCancel={handleCustomizedModalCancel} title="Generate Customized Barcode" style={{ top: 20 }} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} destroyOnClose width={1500}>
                                <Form name="add-Purchase" className="add-Purchase" initialValues={{ remember: true }}>
                                    <Form.Item name="totalCount">
                                        <Input placeholder="Enter Number" value={totalCount} onChange={(e) => setTotalCount(e.target.value)} required />
                                    </Form.Item>
                                </Form>
                                <PrintContextConsumer>
                                    {({ handlePrint }) =>
                                        totalCount === "" || totalCount == 0 ? (
                                            <Button style={{ margin: "0 0 0 45%" }} type="primary" className="ok-modal" disabled>Print this out!</Button>
                                        ) : (
                                            <Button style={{ margin: "0 0 0 45%" }} type="primary" className="ok-modal" onClick={handlePrint}>Print this out!</Button>
                                        )
                                    }
                                </PrintContextConsumer>
                                <div className="card barcode-card">
                                    <div ref={printRef} className="card-body">
                                        <Row gutter={[8, 0]} className="my-barcodes">{renderCustomizedBarcodes()}</Row>
                                    </div>
                                </div>
                            </Modal>
                        </ReactToPrint>

                        <ReactToPrint content={() => setPrintRef.current}>
                            <Modal open={setModalVisible} onCancel={handleSetModalCancel} title="Generate Set Barcode" style={{ top: 20 }} okButtonProps={{ hidden: true }} cancelButtonProps={{ hidden: true }} destroyOnClose width={1500}>
                                <PrintContextConsumer>
                                    {({ handlePrint }) => (
                                        <Button style={{ margin: "0 0 20px 45%" }} type="primary" className="ok-modal" onClick={handlePrint}>Print this out!</Button>
                                    )}
                                </PrintContextConsumer>
                                <div className="card barcode-card">
                                    <div ref={setPrintRef} className="card-body">
                                        <Row gutter={[8, 0]} className="my-barcodes">{renderSetBarcodes()}</Row>
                                    </div>
                                </div>
                            </Modal>
                        </ReactToPrint>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerateSetsBarcode;
