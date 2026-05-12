import React, { Component } from "react";
import { Table, Button, Space, Input, Tag, Row, Col, Spin, Empty, Result } from "antd";
import { SearchOutlined, BarcodeOutlined, CheckSquareOutlined, UnorderedListOutlined, LoadingOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import AddGenerateBarcode from "./AddGenerateBarcode";
import AddGenerateQRCode from "./AddGenerateQRCode";
import { BarcodeData } from "../../../util/constants";

const { Column } = Table;

const formatItems = (arr) =>
  arr.map((item, idx) => ({ ...item, key: `${item.barcode}-${idx}` }));

const fallbackItems = formatItems(BarcodeData[0] || []);

class GenerateBarcodeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: fallbackItems,
      barcodes: fallbackItems,
      searchText: "",
      searchedColumn: "",
      loading: !!window.opener, // show loader only if opened from another tab
    };
  }

  componentDidMount() {
    // Restore from sessionStorage on reload
    const sessionRaw = sessionStorage.getItem("barcode_data");
    if (sessionRaw) {
      try {
        const items = formatItems(JSON.parse(sessionRaw));
        this.setState({ items, barcodes: items, loading: false });
        return;
      } catch (_) { }
    }

    // Signal opener we are ready
    if (window.opener) {
      window.opener.postMessage("READY_FOR_BARCODES", "*");
      // Fallback: if no data arrives in 5s, use constant data
      this.loadingTimer = setTimeout(() => {
        this.setState({ loading: false });
      }, 5000);
    }

    this.messageHandler = (event) => {
      if (event.data?.type === "BARCODE_DATA") {
        clearTimeout(this.loadingTimer);
        const items = formatItems(event.data.data || []);
        this.setState({ items, barcodes: items, loading: false });
        sessionStorage.setItem("barcode_data", JSON.stringify(event.data.data));
        if (event.data.returnUrl) {
          sessionStorage.setItem("admin_return_url", event.data.returnUrl);
        }
      }
    };
    window.addEventListener("message", this.messageHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.messageHandler);
    clearTimeout(this.loadingTimer);
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
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
      if (visible) setTimeout(() => this.searchInput.select(), 100);
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({ searchText: selectedKeys[0], searchedColumn: dataIndex });
  };

  handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    this.setState({ searchText: "" });
  };

  clearState = () => {
    this.setState({ barcodes: [] });
  };

  render() {
    const { barcodes, items, loading } = this.state;
    console.log("Waiting for barcode data from opener...", items);
    const selectedCount = barcodes.length;

    if (loading) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 320, gap: 16 }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: "#1890ff" }} spin />} />
          <div style={{ color: "#888", fontSize: 14 }}>Loading barcode data...</div>
        </div>
      );
    }

    const isPurchaseMode = items.length > 0 && items.some((i) => i.isPurchase);

    const rowSelection = {
      selectedRowKeys: barcodes.map((b) => b.key),
      onChange: (_, selectedRows) => {
        this.setState({ barcodes: selectedRows });
      },
      getCheckboxProps: (record) => ({
        disabled: !!record.isPurchase,
      }),
    };

    return (
      <div>
        {/* Stats Bar */}
        <div style={{
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0f0",
          background: "#fafafa",
        }}>
          <Row gutter={16} align="middle">
            <Col>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <UnorderedListOutlined style={{ color: "#1890ff", fontSize: 16 }} />
                <span style={{ color: "#555", fontSize: 13 }}>
                  Total Items: <strong style={{ color: "#1890ff" }}>{items.length}</strong>
                </span>
              </div>
            </Col>
            {!isPurchaseMode && (
              <>
                <Col>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckSquareOutlined style={{ color: "#52c41a", fontSize: 16 }} />
                    <span style={{ color: "#555", fontSize: 13 }}>
                      Selected: <strong style={{ color: "#52c41a" }}>{selectedCount}</strong>
                    </span>
                  </div>
                </Col>
                {selectedCount > 0 && (
                  <Col>
                    <Tag color="blue" icon={<BarcodeOutlined />}>
                      {selectedCount} barcode{selectedCount > 1 ? "s" : ""} ready to generate
                    </Tag>
                  </Col>
                )}
              </>
            )}
            {isPurchaseMode && (
              <Col>
                <Tag color="purple" icon={<BarcodeOutlined />}>
                  Purchase Order — {items.length} item{items.length > 1 ? "s" : ""}
                </Tag>
              </Col>
            )}
          </Row>
        </div>

        {/* Table */}
        <div style={{ padding: "0 0 16px 0" }}>
          <Table
            dataSource={items}
            rowSelection={rowSelection}
            bordered={false}
            size="middle"
            scroll={{ y: 380 }}
            pagination={{ pageSize: 30, size: "small" }}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "table-row-light" : "table-row-dark"
            }
            style={{ fontSize: 13 }}
          >
            <Column
              title="#"
              key="index"
              render={(_v, _r, index) => (
                <span style={{ color: "#aaa", fontSize: 12 }}>{index + 1}</span>
              )}
              width={50}
            />
            <Column
              title="Barcode"
              dataIndex="barcode"
              key="barcode"
              width={110}
              {...this.getColumnSearchProps("barcode")}
              render={(val) => (
                <span style={{ fontFamily: "monospace", fontWeight: 600, color: "#1890ff" }}>
                  {val}
                </span>
              )}
            />
            <Column
              title="Design No."
              dataIndex="designNumber"
              key="designNumber"
              width={160}
              {...this.getColumnSearchProps("designNumber")}
            />
            <Column
              title="Brand"
              dataIndex="brand"
              key="brand"
              width={120}
              {...this.getColumnSearchProps("brand")}
              render={(val) => <Tag color="geekblue">{val}</Tag>}
            />
            <Column
              title="Size"
              dataIndex="size"
              key="size"
              width={80}
              {...this.getColumnSearchProps("size")}
            />
            <Column
              title="Color"
              dataIndex="color"
              key="color"
              width={90}
              render={(val) => <Tag color="cyan">{val}</Tag>}
            />
            <Column
              title="WSP"
              dataIndex="wsp"
              key="wsp"
              width={80}
              render={(val) => (
                <span style={{ fontWeight: 600, color: "#389e0d" }}>₹{val}</span>
              )}
            />
            <Column
              title="MOQ"
              dataIndex="MOQ"
              key="MOQ"
              width={70}
              render={(val) => (
                <Tag color="orange">{val}</Tag>
              )}
            />
          </Table>
        </div>

        {/* Footer Action */}
        <div style={{
          padding: "12px 24px 20px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {isPurchaseMode ? (
            <>
              <span style={{ color: "#888", fontSize: 12 }}>
                Purchase order — barcodes are auto-calculated from quantity &amp; MOQ
              </span>
              <Space>
                <AddGenerateBarcode
                  barcodes={items}
                  mode="generate"
                  buttonLabel="Generate Barcode"
                  clearState={this.clearState}
                />
                <AddGenerateBarcode
                  barcodes={items}
                  mode="sample"
                  buttonLabel="Sample Barcode"
                  clearState={this.clearState}
                />
              </Space>
            </>
          ) : (
            <>
              <span style={{ color: "#888", fontSize: 12 }}>
                {selectedCount > 0
                  ? `${selectedCount} item${selectedCount > 1 ? "s" : ""} selected — click Generate to proceed`
                  : "Select items from the table to generate barcodes"}
              </span>
              <AddGenerateBarcode barcodes={barcodes} clearState={this.clearState} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default GenerateBarcodeList;
