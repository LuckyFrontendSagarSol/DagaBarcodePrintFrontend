import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Select, Input, Button, Tooltip, Row, message } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getwhPurchasebillbySearch,
  getwhOutbillbySearch,
  whInventorySearchByBarcode,
} from "../redux/actions/warehouseActions";
import {
  getBarcodeBySearch,
  purchaseBySearchValue,
} from "../redux/actions/purchaseAction";

const { Option } = Select;

const WhSearch = ({ title, changeFunction, cancelState }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState({ selectType: "Barcode", searchValue: "" });
  const [searchOption, setSearchOption] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const dispatch = useDispatch();

  const handleSelectChange = (value) => {
    setData({ ...data, selectType: value });
  };

  const handleSearchValue = (event) => {
    setData({ ...data, searchValue: event.target.value });
    changeFunction(event.target.value);
  };

  const handleSubmit = () => {
    let obj;

    if (!data.searchValue) {
      message.error("Please Enter Value First");
    } else {
      if (data.selectType === "Barcode") {
        obj = {
          type: data.selectType,
          searchValue: Number(data.searchValue),
        };
      } else {
        obj = {
          type: data.selectType,
          searchValue: data.searchValue,
        };
      }
      if (title === "Warehouse Purchase Bill") {
        dispatch(getwhPurchasebillbySearch(obj));
      } else if (title === "Wairehouse Sales Bills") {
        dispatch(getwhOutbillbySearch(obj));
      } else if (title === "whInventory") {
        obj = {
          barcode: Number(data.searchValue),
        };
        dispatch(whInventorySearchByBarcode(obj));
      } else if (title === "Sample Barcode") {
        obj = {
          searchValue: data.searchValue,
          type: data.selectType
        };
        dispatch(purchaseBySearchValue(obj));
      }
    }
  };

  const handleClear = () => {
    setData({ selectType: "Barcode", searchValue: "" });
    form.resetFields();
    cancelState();
    if (title === "Warehouse Purchase Bill") {
      dispatch(getwhPurchasebillbySearch("reset"));
    } else if (title === "Wairehouse Sales Bills") {
      dispatch(getwhOutbillbySearch("reset"));
    } else if (title === "whInventory") {
      dispatch(whInventorySearchByBarcode("reset"));
    } else if (title === "Sample Barcode") {
      dispatch(purchaseBySearchValue("reset"));
    }
  };

  useEffect(() => {
    let searchoption = [];
    let placeHolder;
    if (title === "Warehouse Purchase Bill") {
      placeHolder = "Dealer Name, PurchaseId or Barcode";
      searchoption = [
        { value: "Barcode", label: "Barcode" },
        { value: "warehousepurchaseId", label: "Purchase Id" },
        { value: "DealerName", label: "Dealer Name" },
      ];
    } else if (title === "Wairehouse Sales Bills") {
      placeHolder = "Store Name, SaleId or Barcode";
      searchoption = [
        { value: "Barcode", label: "Barcode" },
        { value: "warehousesaleId", label: "Sales Id" },
        { value: "storename", label: "Store Name" },
      ];
    } else if (title === "whInventory") {
      placeHolder = "Barcode";
      searchoption = [{ value: "Barcode", label: "Barcode" }];
    } else if (title === "Sample Barcode") {
      placeHolder = "Dealer, PurchaseId or Barcode";
      searchoption = [
        { value: "Barcode", label: "Barcode" },
        { value: "PurchaseId", label: "Purchase Id" },
        { value: "DealerName", label: "Dealer Name" },
      ];
    }
    setPlaceholder(placeHolder);
    setSearchOption(searchoption);
  }, [title]);

  return (
    <Form form={form}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={10} lg={8} xl={8} xxl={6}>
          <Form.Item name="type" className="warehouse-select-option">
            <Select
              defaultValue={data.selectType}
              onChange={handleSelectChange}
              style={{ width: "100%" }}
            >
              {searchOption.map((data) => (
                <Option key={data.value} value={data.value}>
                  <Tooltip title={data.label}>
                    <span className="filter-list-tooltip">{data.label}</span>
                  </Tooltip>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={14} lg={12} xl={12} xxl={14}>
          <Form.Item name="searchValue" className="warehouse-select-option">
            <Input
              name="searchValue"
              placeholder={placeholder}
              value={data.searchValue}
              onChange={handleSearchValue}
              onPressEnter={handleSubmit}
            />
          </Form.Item>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} xl={2} xxl={2} align="center">
          <Tooltip title="Search">
            <Button
              type="primary"
              shape="circle"
              onClick={handleSubmit}
              icon={<SearchOutlined />}
              
            />
          </Tooltip>
        </Col>
        <Col xs={12} sm={6} md={4} lg={2} xl={2} xxl={2} align="center">
          <Tooltip title="Clear">
            <Button
              type="primary"
              shape="circle"
              onClick={handleClear}
              icon={<CloseOutlined />}
              style={{ marginLeft: "8px" }}
            />
          </Tooltip>
        </Col>
      </Row>
    </Form>
  );
};

export default WhSearch;