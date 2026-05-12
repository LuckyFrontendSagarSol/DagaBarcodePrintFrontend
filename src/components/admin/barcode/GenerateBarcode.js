import React, { Component } from "react";
import { Tag } from "antd";
import { BarcodeOutlined, ScanOutlined, AppstoreOutlined, TagsOutlined } from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import GenerateBarcodeList from "./GenerateBarcodeList";

const navItems = [
  { path: "/generate-barcode", label: "Generate Barcode", icon: <BarcodeOutlined /> },
];

class GenerateBarcode extends Component {
  render() {
    const currentPath = this.props.location?.pathname;

    return (
      <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
        {/* Top Nav Bar */}
        <div style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BarcodeOutlined style={{ fontSize: 22, color: "#1890ff" }} />
            <span style={{ fontWeight: 700, fontSize: 16, color: "#1890ff", letterSpacing: 0.5 }}>
              Daga Impex
            </span>
            <Tag color="blue" style={{ marginLeft: 6, fontSize: 11 }}>Barcode Studio</Tag>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? "#1890ff" : "#555",
                    background: isActive ? "#e6f4ff" : "transparent",
                    textDecoration: "none",
                    transition: "all 0.2s",
                    borderBottom: isActive ? "2px solid #1890ff" : "2px solid transparent",
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: "24px 28px" }}>
          {/* Page Header */}
          <div style={{
            background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
            borderRadius: 12,
            padding: "20px 28px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(24,144,255,0.3)",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <BarcodeOutlined style={{ fontSize: 28, color: "#fff" }} />
                <h2 style={{ margin: 0, color: "#fff", fontSize: 22, fontWeight: 700 }}>
                  Generate Barcode
                </h2>
              </div>
              <p style={{ margin: "4px 0 0 38px", color: "rgba(255,255,255,0.85)", fontSize: 13 }}>
                Select items from the list below and generate printable barcodes
              </p>
            </div>
          </div>

          {/* Main Card */}
          <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}>
            <GenerateBarcodeList />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(GenerateBarcode);
