import React, { Component } from "react";
import {
  Button,
  Space,
  Input,
  Row,
  Col,
  Popconfirm,
  Tooltip,
  DatePicker,
  Form,
  message,
} from "antd";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getSalesListBydate, getSaleOrderBillsBydate, getSalesReturnsBydate, getAllSalesReturnBillBydate, getSalesReturnsDefectedBydate,
  getAlldefectedProductBillBydate
} from "../redux/actions/saleAction";
import {
  getPurchasesBydate, getPurchaseBillsBydate,
  purchaseReturnBydate, getPurchaseReturnBillListBydate, getEcomOnlineSales
} from "../redux/actions/purchaseAction";
import { getTopCustomerReports, getInactiveCustomerReports, getPurchaseAllReports, getSalesReport, getFastMovingItemsReports } from "../redux/actions/reportsActions";


const dateFormat = "YYYY-MM-DD";

class DateWiseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD"),
    };
  }

  componentDidMount = () => {
    const { historyProps } = this.props
    if (historyProps && historyProps.history && historyProps.history.location && historyProps.history.location.state) {
      let localStartDate = localStorage.getItem("startDate");
      let localEnddate = localStorage.getItem("endDate");
      if (localEnddate && localStartDate) {
        this.setState({ startDate: localStartDate, endDate: localEnddate })
      }
    }
    if (this.props && this.props.propsHistory && this.props.propsHistory.location &&
      this.props.propsHistory.location.state) {
      let localStartDate = localStorage.getItem("startDate");
      let localEnddate = localStorage.getItem("endDate");
      if (localEnddate && localStartDate) {
        this.setState({ startDate: localStartDate, endDate: localEnddate })
      }
    }
  }

  // componentDidUpdate = (preveProp, preveState) => {
  //   let localStartDate = localStorage.getItem("startDate");
  //   if (preveState.startDate !== localStartDate) {
  //     console.log("check mohit inside component diupdate",localStartDate)
  //     this.setState({ startDate: localStartDate })
  //   }
  // }

  onStartDateChange = (date, dateString) => {
    const startDate = new Date(dateString);
    const endDate = new Date(this.state.dateString);
    this.setState({ startDate: dateString });
  };

  onEndDateChange = (date, dateString) => {
    this.setState({ endDate: dateString });
  };

  showDataOnList = async () => {
    const { startDate, endDate } = this.state;
    let today = moment(new Date()).format("YYYY-MM-DD")
    let reportObj
    if (today == endDate) {
      reportObj = {
        startDate: startDate,
        endDate: endDate + " " + moment().format("HH:mm:ss"),
      };
    } else {
      const dateMoment = moment(endDate, 'YYYY-MM-DD');
      const endTime = dateMoment.endOf('day').format('HH:mm:ss');
      const endDateWithEndTime = `${endDate} ${endTime}`;
      reportObj = {
        startDate: startDate,
        endDate: endDateWithEndTime,
      };
    }
    if (this.props.keyId == "Sales Bills") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
    this.props.setFilterValues(reportObj);
      this.props.getSalesListBydate(reportObj);
    }
    else if (this.props.keyId == "Sales PDF") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      if (this.props?.dateObj) {
        this.props.dateObj(reportObj)
      }
      this.props.getSalesListBydate(reportObj);
    }
    else if (this.props.keyId == "Sales Orders") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.storeSearchData(reportObj)
      this.props.getSaleOrderBillsBydate(reportObj)
    } else if (this.props.keyId == "Purchases") {
      this.props.getPurchasesBydate(reportObj)
    } else if (this.props.keyId == "Purchase Bill") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.getPurchaseBillsBydate(reportObj)
    } else if (this.props.keyId == "Sales Returns") {
      if (this.props.handleSetDates) {
        this.props.handleSetDates(reportObj)
      }

      const newObj = {
        ...reportObj,
        limit: 1,
      }
      this.props.getSalesReturnsBydate(newObj)
    } else if (this.props.keyId == "Sales Return Bill") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.getAllSalesReturnBillBydate(reportObj)
    } else if (this.props.keyId == "Sales Return Defective") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.getSalesReturnsDefectedBydate(reportObj)
    } else if (this.props.keyId == "Defected Product Bill") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.getAlldefectedProductBillBydate(reportObj)
    } else if (this.props.keyId == "Purchase Returns") {
      this.props.purchaseReturnBydate(reportObj)
    } else if (this.props.keyId == "Purchase Return Bill") {
      localStorage.setItem('startDate', startDate);
      localStorage.setItem('endDate', endDate);
      this.props.getPurchaseReturnBillListBydate(reportObj)
    } else if (this.props.keyId == "Top Customer Report") {
      let obj = {
        startDate: reportObj.startDate,
        endDate: reportObj.endDate,
        type: "dateFilter"
      }
      this.props.getTopCustomerReports(obj)
    } else if (this.props.keyId == "Inactive Customer Report") {
      let obj = {
        startDate: reportObj.startDate,
        endDate: reportObj.endDate,
        type: "dateFilter"
      }
      this.props.getInactiveCustomerReports(obj)
    } else if (this.props.keyId == "Fast Moving Item Report") {
      let obj = {
        startDate: reportObj.startDate,
        endDate: reportObj.endDate,
        type: "dateFilter"
      }
      this.props.getFastMovingItemsReports(obj)
    }
    else if (this.props.keyId == "E-COM Online Sales") {
      this.props.getEcomOnlineSales(reportObj)
    } else if (this.props.keyId == "Purchase Report") {
      this.props.getPurchaseAllReports(reportObj)
    } else if (this.props.keyId == "Sales Report") {
      let today = moment(new Date()).format("YYYY-MM-DD");
      let obj = {};
      this.props.setFun(reportObj?.startDate, reportObj?.endDate);
      if (today === this.state.endDate) {
        obj = {
          startDate: reportObj?.startDate,
          endDate: reportObj?.endDate,
          limit: 1,
          perPage: 30,
          type: 'perpage'
        }
      }
      else {
        const endDateWithEndTime = `${reportObj?.endDate}`;
        obj = {
          startDate: reportObj?.startDate,
          endDate: endDateWithEndTime,
          limit: 1,
          perPage: 30,
          type: 'perPage',
        };
      }
      const initialReport = await this.props.getSalesReport(obj)

      const reportObjAll = {
        startDate: reportObj?.startDate,
        endDate: obj?.endDate,
        limit: 1,
        perPage: initialReport?.count,
        type: 'all',
      };
      this.props.setReportObj(reportObjAll)
      // await this.props.getSalesReport(reportObjAll);

    } else if (this.props.keyId == "Sales Report-New") {
      let today = moment(new Date()).format("YYYY-MM-DD");
      let obj = {};
      this.props.setFun(reportObj?.startDate, reportObj?.endDate);
      if (today === this.state.endDate) {
        obj = {
          startDate: reportObj?.startDate,
          endDate: reportObj?.endDate,
          limit: 1,
          perPage: 30,
          type: 'perpage'
        }
      }
      else {
        const endDateWithEndTime = `${reportObj?.endDate}`;
        obj = {
          startDate: reportObj?.startDate,
          endDate: endDateWithEndTime,
          limit: 1,
          perPage: 30,
          type: 'perPage',
        };
      }
      const initialReport = await this.props.getSalesReport(obj, "new")

      const reportObjAll = {
        startDate: reportObj?.startDate,
        endDate: obj?.endDate,
        limit: 1,
        perPage: initialReport?.count,
        type: 'all',
      };
      this.props.setReportObj(reportObjAll)
      // await this.props.getSalesReport(reportObjAll);

    }
  };

  resetfuntion = async () => {
    let startDate = moment(new Date()).format("YYYY-MM-DD")
    let endDate = moment(new Date()).format("YYYY-MM-DD")
    let reportObj = {
      startDate: startDate,
      endDate: endDate + " " + moment().format("HH:mm:ss"),
    };

    // let reportObj = {};
    if (this.props.keyId == "Sales Bills") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.setFilterValues(reportObj);
      this.props.getSalesListBydate(reportObj);
    }
    else if (this.props.keyId == "Sales PDF") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      if (this.props?.dateObj) {
        this.props.dateObj(reportObj)
      }
      this.props.getSalesListBydate(reportObj);
    }
    else if (this.props.keyId == "Sales Orders") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.handleFilterChange(reportObj);
      this.props.storeSearchData(reportObj)
      this.props.getSaleOrderBillsBydate(reportObj)
    } else if (this.props.keyId == "Purchases") {
      this.props.getPurchasesBydate(reportObj)
    } else if (this.props.keyId == "Purchase Bill") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.getPurchaseBillsBydate(reportObj)
    } else if (this.props.keyId == "Sales Returns") {
      if (this.props.handleSetDates) {
        this.props.handleSetDates(reportObj)
      }
      const newObj = {
        ...reportObj,
        limit: 1,
      }
      this.props.getSalesReturnsBydate(newObj)
    } else if (this.props.keyId == "Sales Return Bill") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.getAllSalesReturnBillBydate(reportObj)
    } else if (this.props.keyId == "Sales Return Defective") {
      this.props.getSalesReturnsDefectedBydate(reportObj)
    } else if (this.props.keyId == "Defected Product Bill") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.getAlldefectedProductBillBydate(reportObj)
    } else if (this.props.keyId == "Purchase Returns") {
      this.props.purchaseReturnBydate(reportObj)
    } else if (this.props.keyId == "Purchase Return Bill") {
      localStorage.removeItem("startDate");
      localStorage.removeItem("endDate");
      this.props.getPurchaseReturnBillListBydate(reportObj)
    } else if (this.props.keyId == "Top Customer Report") {
      let obj = {
        startDate: startDate,
        endDate: endDate + " " + moment().format("HH:mm:ss"),
        type: "dateFilter"
      }
      this.props.getTopCustomerReports(obj)
    } else if (this.props.keyId == "Inactive Customer Report") {
      let obj = {
        startDate: startDate,
        endDate: endDate + " " + moment().format("HH:mm:ss"),
        type: "dateFilter"
      }
      this.props.getInactiveCustomerReports(obj)
    } else if (this.props.keyId == "Fast Moving Item Report") {
      let obj = {
        startDate: startDate,
        endDate: endDate + " " + moment().format("HH:mm:ss"),
        type: "dateFilter"
      }
      this.props.getFastMovingItemsReports(obj)
    }
    else if (this.props.keyId == "E-COM Online Sales") {
      this.props.getEcomOnlineSales(reportObj)
    } else if (this.props.keyId == "Purchase Report") {
      this.props.getPurchaseAllReports(reportObj)
    } else if (this.props.keyId == "Sales Report") {
      this.props.setFun(reportObj?.startDate, reportObj?.endDate);
      const obj = {
        startDate: reportObj?.startDate,
        endDate: reportObj?.endDate,
        limit: 1,
        perPage: 30,
        type: 'perpage'
      }
      const initialReport = await this.props.getSalesReport(obj)
      console.log("Initial report data:", initialReport);

      const reportObjAll = {
        startDate: reportObj?.startDate,
        endDate: reportObj?.endDate,
        limit: 1,
        perPage: initialReport?.count,
        type: 'all',
      };

      // await this.props.getSalesReport(reportObjAll);
      this.props.setReportObj(reportObjAll)


    }

    else if (this.props.keyId == "Sales Report-New") {
      this.props.setFun(reportObj?.startDate, reportObj?.endDate);
      const obj = {
        startDate: reportObj?.startDate,
        endDate: reportObj?.endDate,
        limit: 1,
        perPage: 30,
        type: 'perpage'
      }
      const initialReport = await this.props.getSalesReport(obj, "new")
      console.log("Initial report data:", initialReport);

      const reportObjAll = {
        startDate: reportObj?.startDate,
        endDate: reportObj?.endDate,
        limit: 1,
        perPage: initialReport?.count,
        type: 'all',
      };

      // await this.props.getSalesReport(reportObjAll);
      this.props.setReportObj(reportObjAll)


    }
    this.setState({
      //   totalCount: 0,
      startDate: moment(new Date()).format("YYYY-MM-DD"),
      endDate: moment(new Date()).format("YYYY-MM-DD")
    })
  }

  render() {
    return (
      <Form
        name="add-Purchase"
        className="add-Purchase"
        onFinish={this.showDataOnList}
        initialValues={{ remember: true }}
      >
        <div className="datePicker-hideCross">
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Tooltip title="Select Start Date">
                <Form.Item
                  name="startDate"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Select Start Date !",
                //   },
                // ]}
                >
                  {/* <DatePicker
                  style={{ width: "100%" }}
                  defaultValue={moment()}
                  disabledDate={(current) => {
                    return current && current > Date.now();
                  }}
                  onChange={this.onStartDateChange}
                  placeholder="Select Start Date"
                  format={dateFormat}
                /> */}
                  {console.log("")}
                  <DatePicker

                    style={{ width: "100%" }}
                    onChange={this.onStartDateChange}
                    placeholder="Select Start Date"
                    value={moment(this.props.startDate || this.state.startDate, dateFormat)}
                    format={dateFormat}
                    showClose={false}
                  />
                </Form.Item>
              </Tooltip>
            </Col>
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Tooltip title="Select End Date">
                <Form.Item name="endDate">
                  {/* <DatePicker
                  defaultValue={moment()}
                  disabledDate={(current) => {
                    return current && current > Date.now();
                  }}
                  style={{ width: "100%" }}
                  onChange={this.onEndDateChange}
                  placeholder="Select End Date"
                  format={dateFormat}
                /> */}
                  {console.log("")}
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={this.onEndDateChange}
                    placeholder="Select End Date"
                    value={moment(this.props.endDate || this.state.endDate, dateFormat)}
                    format={dateFormat}
                  />
                </Form.Item>
              </Tooltip>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="close-modal"
                  block
                >
                  Search
                </Button>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
              <Form.Item>
                <Button type="primary" block onClick={this.resetfuntion}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}

DateWiseSearch.propTypes = {
  getSalesListBydate: PropTypes.func.isRequired,
  getSaleOrderBillsBydate: PropTypes.func.isRequired,
  getPurchasesBydate: PropTypes.func.isRequired,
  getPurchaseBillsBydate: PropTypes.func.isRequired,
  getSalesReturnsBydate: PropTypes.func.isRequired,
  getAllSalesReturnBillBydate: PropTypes.func.isRequired,
  getSalesReturnsDefectedBydate: PropTypes.func.isRequired,
  getAlldefectedProductBillBydate: PropTypes.func.isRequired,
  purchaseReturnBydate: PropTypes.func.isRequired,
  getPurchaseReturnBillListBydate: PropTypes.func.isRequired,
  getTopCustomerReports: PropTypes.func.isRequired,
  getInactiveCustomerReports: PropTypes.func.isRequired,
  getFastMovingItemsReports: PropTypes.func.isRequired,
  getEcomOnlineSales: PropTypes.func.isRequired,
  getPurchaseAllReports: PropTypes.func.isRequired,
  getSalesReport: PropTypes.func.isRequired,
  // storeSearchData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reports: state.reportData.salesAll,
});

export default connect(mapStateToProps, {
  getSalesListBydate, getSaleOrderBillsBydate, getPurchasesBydate,
  getPurchaseBillsBydate, getSalesReturnsBydate, getAllSalesReturnBillBydate,
  getSalesReturnsDefectedBydate, getAlldefectedProductBillBydate,
  purchaseReturnBydate, getPurchaseReturnBillListBydate, getTopCustomerReports,
  getInactiveCustomerReports, getFastMovingItemsReports, getEcomOnlineSales, getPurchaseAllReports, getSalesReport
})(DateWiseSearch);