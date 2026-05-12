import React from "react";
import { Table, Row, Col } from "antd";
import { BarcodeData } from "../../../../util/constants";
import ShowSampleBarcodePurchase from "./ShowSampleBarcodePurchase";
import GenerateSampleBarcode from "./GenerateSampleBarcode";

const { Column } = Table;

const items = BarcodeData[0] || [];
const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
const totalAmt = items.reduce((sum, item) => sum + (item.wsp || 0) * (item.quantity || 0), 0);

const fakePurchases = [
    {
        key: "SAMPLE-001",
        purchaseId: "SAMPLE-001",
        dealerName: items[0]?.brand || "SAFAYER",
        location: "Store",
        billNo: "BILL-001",
        created_at: new Date().toISOString(),
        date: new Date().toISOString(),
        quantity: totalQty,
        totalAmount: totalAmt,
        discount: 0,
        tax: 0,
        netAmount: totalAmt,
    },
];

const SampleBarcodeList = () => {
    return (
        <div>
            <Row className="title-row">
                <Col span={24}>
                    <div className="page-header">Sample Barcode</div>
                </Col>
            </Row>
            <div className="card final-purchases-list mt-4">
                <div className="card-body">
                    <Table
                        dataSource={fakePurchases}
                        bordered
                        size="middle"
                        pagination={{ pageSize: 100 }}
                        scroll={{ y: 440 }}
                        rowKey="purchaseId"
                    >
                        <Column title="SRN" key="index" render={(_v, _r, index) => index + 1} width={60} />
                        <Column title="Purchase Id" dataIndex="purchaseId" key="purchaseId" width={150} />
                        <Column title="Dealer Name" dataIndex="dealerName" key="dealerName" width={150} />
                        <Column title="Location" dataIndex="location" key="location" width={150} />
                        <Column title="Bill No" dataIndex="billNo" key="billNo" width={120} />
                        <Column title="Qnty" dataIndex="quantity" key="quantity" width={90} />
                        <Column title="Total Amt" dataIndex="totalAmount" key="totalAmount" width={120} render={(val) => parseInt(val).toFixed()} />
                        <Column title="Net Amt" dataIndex="netAmount" key="netAmount" width={120} render={(val) => parseInt(val).toFixed()} />
                        <Column
                            title="Action"
                            key="action"
                            fixed="right"
                            width={120}
                            render={(_text, record) => (
                                <Row gutter={[8, 0]}>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <ShowSampleBarcodePurchase purchaseId={record.purchaseId} data={record} />
                                    </Col>
                                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                        <div className="btn">
                                            <GenerateSampleBarcode purchaseId={record.purchaseId} />
                                        </div>
                                    </Col>
                                </Row>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default SampleBarcodeList;
