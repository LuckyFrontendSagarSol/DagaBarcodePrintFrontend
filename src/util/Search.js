import React, { Component } from "react";
import { Button, Input, Row, Col, Select, message, Form } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    purchaseBySearchValue, purchasesReturnBySearchValue, ecomBySearchValue,
    getInventoryBySearch, getBarcodeBySearch, getGeneratedBarcodes, getUniquePurchases, getAvailableStockBySearch
} from "../redux/actions/purchaseAction";
import { getBrandBySearch } from "../redux/actions/brandAction";
import { saleBySearchValue,saleOrderBySearchValue, salesReturnBySearchValue, salesReturnDefectiveBySearchValue } from "../redux/actions/saleAction"
import { userByNameOrUsername } from "../redux/actions/userAction"
import { getAllUsers } from "../redux/actions/userAction";
const { Option } = Select;
class Search extends Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            searchValue: "",
            dropdownValue: this.props.searchopt[0]
        };
    }

    componentDidMount = () => {
        let searchobj = localStorage.getItem("searchItem")
        searchobj = JSON.parse(searchobj)
        if (searchobj) {
            this.setState({ searchValue: searchobj.obj.searchValue })
            this.props.changeFunction(searchobj.obj.searchValue)
            if (searchobj.apiName == "Sales Bills" && this.props?.location?.pathname == "/dagaImpex/salesList") {
                this.props.setFilterValues(searchobj.obj); 
                this.props.saleBySearchValue(searchobj.obj)
            }
            else if (searchobj.apiName == "Sales PDF" && this.props?.location?.pathname == "/dagaImpex/salesPdf") {
                if (this.props?.setSearchObj) {
                    this.props.setSearchObj(searchobj.obj);
                }
                this.props.saleBySearchValue(searchobj.obj)
            }
            else if (searchobj.apiName == "Sales Orders" && this.props?.location?.pathname == "/dagaImpex/salesOrder") {
                this.props.handleFilterChange(searchobj.obj);
                this.props.saleOrderBySearchValue(searchobj.obj)
            } else if (searchobj.apiName == "Purchase Bill" && this.props?.location?.pathname == "/dagaImpex/purchaseBill") {
                this.props.purchaseBySearchValue(searchobj.obj)
            } else if (searchobj.apiName == "Sales Return Bill" && this.props?.location?.pathname == "/dagaImpex/saleReturnBill") {
                this.props.salesReturnBySearchValue(searchobj.obj)
            } else if (searchobj.apiName == "Defective Return Bill" && this.props?.location?.pathname == "/dagaImpex/defectedProductBill") {
                this.props.salesReturnDefectiveBySearchValue(searchobj.obj)
            }
            else if (searchobj.apiName == "Purchase Return Bill" && this.props?.location?.pathname == "/dagaImpex/purchaseReturnBillList") {
                this.props.purchasesReturnBySearchValue(searchobj.obj)
            } else {
                this.setState({
                    searchValue: ""
                })
                this.props.cancelState()
            }
            this.formRef.current.setFieldsValue({
                type: searchobj.obj.type
            })
            localStorage.removeItem("searchItem")
        }
    }

    cancelModal = () => {
        this.setState({ modalStatus: false })
    }



    componentWillUnmount() {
        localStorage.removeItem("searchItem")
    }

    handleDropdownChange = (e) => {
        console.log("check dropdown value", e)
        this.setState({
            dropdownValue: e
        })
        this?.props?.searchTypeChange?.(e) || (() => {
            console.warn("");
        })();
    }
    onChange = (event) => {
        // this.props.changeFunction(event.target.value)
        this.setState({ searchValue: event.target.value });
        this.props.changeFunction(event.target.value)
    };
    handleInputField = () => {
        this.setState({ searchValue: "", dropdownValue :  this.props.searchopt[0] })
        this.props.cancelState()
        let obj = {
            type: this.state.dropdownValue,
            searchValue: this.state.searchValue
        }
        if (this.props.title == "Purchase Bill") {
            this.props.purchaseBySearchValue("reset")
        } else if (this.props.title == "Inventory") {
            this.props.getInventoryBySearch("reset")
        }
        else if (this.props.title == "Available Stock") {
            this.props.getAvailableStockBySearch("reset")
        }
        else if (this.props.title == "Brands") {
            this.props.getBrandBySearch("reset")
        }
        else if (this.props.title == "Generate Barcode") {
            this.props.getGeneratedBarcodes(1)
            this.props.getBarcodeBySearch("reset")
        }
        else if (this.props.title == "Purchase Return Bill") {
            this.props.purchasesReturnBySearchValue("reset")
        } else if (this.props.title == "Sales Bills") {
            this.props.setFilterValues({});
            this.props.saleBySearchValue("reset")
        }
        else if (this.props.title == "Sales PDF") {
            this.props.saleBySearchValue("reset")
        }
        else if (this.props.title == "Sales Orders") {
            this.props.handleSearchType(false)
            this.props.handleFilterChange({});
            this.props.saleOrderBySearchValue("reset")
        }else if (this.props.title == "Sales Return Bill") {
            this.props.salesReturnBySearchValue("reset")
        } else if (this.props.title == "Defective Return Bill") {
            this.props.salesReturnDefectiveBySearchValue("reset")
        } else if (this.props.title == "E-com Offer") {
            this.props.ecomBySearchValue("reset")
        } else if (this.props.title == "E-COM PRODUCTS") {
            this.setState({ modalStatus: false })
            this.props.ecomBySearchValue("reset")
        } else if (this.props.title == "Users List" || "Customers List" || "Employees List") {
            this.props.userByNameOrUsername("reset")
            this.props.getAllUsers(1);
        }
        this.formRef.current.setFieldsValue({
            type: this.props.searchopt[0]
        })
    }
    componentWillUnmount = () => {
        this.state = {
            searchValue: "",
            dropdownValue: "",
            modalStatus: false
        };
    }

    handleSearchButtonClick = async (value) => {
        let obj = {
            type: this.state.dropdownValue,
            searchValue: this.state.searchValue
        }
        if (this.state.dropdownValue == "") {
            message.error("Please Select Search Option")
        } else if (this.state.searchValue == "") {
            message.error("Please Enter Value First")
        } else {
            if (this.props.title == "Purchase Bill") {
                let filterObj = { apiName: "Purchase Bill", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.purchaseBySearchValue(obj)
            } else if (this.props.title == "Inventory") {
                let requestObj = {
                    barcode: this.state.searchValue
                }
                this.props.getInventoryBySearch(requestObj)
            }
            else if (this.props.title == "Available Stock") {
                let requestObj = {
                    barcode: this.state.searchValue
                }
                this.props.getAvailableStockBySearch(requestObj)
            }
            else if (this.props.title == "Generate Barcode") {
                let requestObj = {
                    barcode: this.state.searchValue
                }
                this.props.getBarcodeBySearch(requestObj)
            } else if (this.props.title == "Brands") {
                let requestObj = {
                    searchValue: this.state.searchValue
                }
                this.props.getBrandBySearch(requestObj)
            } else if (this.props.title == "Purchase Return Bill") {
                let filterObj = { apiName: "Purchase Return Bill", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.purchasesReturnBySearchValue(obj)
            } else if (this.props.title == "Sales Bills") {
                let filterObj = { apiName: "Sales Bills", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.setFilterValues(obj);
                this.props.saleBySearchValue(obj)
            }
            else if (this.props.title == "Sales PDF") {
                let filterObj = { apiName: "Sales PDF", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                if (this.props?.setSearchObj) {
                    this.props.setSearchObj(obj);
                }
                this.props.saleBySearchValue(obj)
            }

            else if (this.props.title == "Sales Orders") {
                this.props.handleSearchType(this.state.dropdownValue)
                let filterObj = { apiName: "Sales Orders", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.handleFilterChange(obj);
                this.props.storeSearchData(obj)
                this.props.saleOrderBySearchValue(obj)
            }else if (this.props.title == "Sales Return Bill") {
                let filterObj = { apiName: "Sales Return Bill", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.salesReturnBySearchValue(obj)
            } else if (this.props.title == "Defective Return Bill") {
                let filterObj = { apiName: "Defective Return Bill", obj }
                localStorage.setItem("searchItem", JSON.stringify(filterObj))
                this.props.salesReturnDefectiveBySearchValue(obj)
            }
            else if (this.props.title == "E-com Offer") {
                this.props.ecomBySearchValue(obj)
            } else if (this.props.title == "E-COM PRODUCTS") {
                const response = await this.props.getUniquePurchases(obj)
                if (response && response.status == 200) {
                    this.setState({ modalStatus: true })
                }
            } else if (this.props.title == "Users List" || "Customers List" || "Employees List") {
                const req = {
                    type: this.state.dropdownValue,
                    searchValue: this.state.searchValue,
                    searchType: this.props.title == "Users List" ? "USERLIST" : this.props.title == "Customers List" ? "CUSTOMERLIST" : "EMPLIST",
                };
                this.props.userByNameOrUsername(req)
            }
        }
    }

    render() {
        return <>
            <Row gutter={16}>
                <Col xs={10} sm={7} md={7} lg={7} xl={7}>
                    <Form ref={this.formRef}>
                        <Form.Item
                            name="type"
                        >
                            <Select
                                showSearch
                                className="custom-select-option"
                                value={this.props.searchopt[0]}
                                style={{ width: '100%' }}
                                onChange={this.handleDropdownChange}
                                placeholder="Select"
                            >
                                {
                                    this.props.searchopt.map(obj => {
                                        return <Option value={obj}>{obj}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Form>

                </Col>

                <Col xs={14} sm={9} md={9} lg={9} xl={8}  >
                    <Input
                        placeholder={this.props.placeholder}
                        value={this.state.searchValue}
                        onChange={this.onChange}
                        onPressEnter={this.handleSearchButtonClick}
                    />
                </Col>
                <Col xs={10} sm={1} md={1} lg={1} xl={1} >
                    <Button type="primary" className="serach-button" icon={<SearchOutlined />} onClick={this.handleSearchButtonClick} />
                </Col>
                <Col xs={10} sm={1} md={1} lg={1} xl={1} style={{ marginLeft: "20px" }} >
                    <Button type="primary" className="serach-button" icon={<CloseOutlined onClick={this.handleInputField} />} />
                </Col>
                <Col xs={24} sm={4} md={4} lg={4} xl={3} className="details-search-col" style={{ marginLeft: "15px", marginBottom: "10px" }} >
                </Col>
            </Row>
        </>
    }
}


Search.propTypes = {
    purchaseBySearchValue: PropTypes.func.isRequired,
    purchasesReturnBySearchValue: PropTypes.func.isRequired,
    saleBySearchValue: PropTypes.func.isRequired,
    saleOrderBySearchValue: PropTypes.func.isRequired,
    salesReturnBySearchValue: PropTypes.func.isRequired,
    ecomBySearchValue: PropTypes.func.isRequired,
    userByNameOrUsername: PropTypes.func.isRequired,
    getInventoryBySearch: PropTypes.func.isRequired,
    getBrandBySearch: PropTypes.func.isRequired,
    getGeneratedBarcodes: PropTypes.func.isRequired,
    getUniquePurchases: PropTypes.func.isRequired,
    salesReturnDefectiveBySearchValue: PropTypes.func.isRequired,
    getAvailableStockBySearch: PropTypes.func.isRequired,
    getAllUsers :  PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, {
    purchaseBySearchValue, purchasesReturnBySearchValue, saleBySearchValue,saleOrderBySearchValue, salesReturnBySearchValue, ecomBySearchValue, userByNameOrUsername,
    getInventoryBySearch, getBarcodeBySearch, getGeneratedBarcodes, getUniquePurchases, salesReturnDefectiveBySearchValue, getBrandBySearch, getAvailableStockBySearch,
    getAllUsers
})(Search);