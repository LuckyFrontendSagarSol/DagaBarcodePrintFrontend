import React, { Component } from "react";
import { Tag, Button, Spin } from "antd";
import { BarcodeOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import GenerateBarcodeList from "./GenerateBarcodeList";
import logo from "../../../assets/images/oldlogo.png";

class GenerateBarcode extends Component {
  componentDidMount() {
    // Store referrer once so it survives page reloads
    if (!sessionStorage.getItem("barcode_referrer")) {
      const ref = document.referrer;
      if (ref) sessionStorage.setItem("barcode_referrer", ref);
    }
  }

  handleBack = () => {
    const referrer = sessionStorage.getItem("barcode_referrer");
    if (referrer) {
      window.location.href = referrer;
    } else {
      window.history.back();
    }
  };

  render() {
    const referrer = sessionStorage.getItem("barcode_referrer") || document.referrer;

    return (
      <div style={{ minHeight: "100vh", background: "#f0f2f5", fontFamily: "Inter, Arial, sans-serif" }}>

        {/* ── Top Nav Bar ── */}
        <div style={{
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          {/* Logo + Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src={logo}
              alt="Daga Impex"
              style={{ height: 44, width: "auto", objectFit: "contain" }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <Tag color="blue" style={{ fontSize: 11 }}>Printer</Tag>
          </div>

          {/* Back Button */}
          {referrer && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={this.handleBack}
              style={{
                background: "linear-gradient(135deg, #1976d2, #0d47a1)",
                border: "none",
                color: "#fff",
                borderRadius: 6,
                fontWeight: 600,
                fontSize: 13,
                height: 36,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Back to Admin
            </Button>
          )}
        </div>

        {/* ── Page Content ── */}
        <div style={{ padding: "24px 28px" }}>

          {/* Page Header */}
          <div style={{
            background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
            borderRadius: 12,
            padding: "22px 28px",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 16px rgba(24,144,255,0.35)",
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  padding: "8px 10px",
                  display: "flex",
                  alignItems: "center",
                }}>
                  <BarcodeOutlined style={{ fontSize: 26, color: "#fff" }} />
                </div>
                <div>
                  <h2 style={{ margin: 0, color: "#fff", fontSize: 20, fontWeight: 700 }}>
                    Generate Barcode
                  </h2>
                  <p style={{ margin: "3px 0 0", color: "rgba(255,255,255,0.8)", fontSize: 13 }}>
                    Select items from the list and generate printable barcode labels
                  </p>
                </div>
              </div>
            </div>
            
          </div>

          {/* Main Card */}
          <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}>
            <GenerateBarcodeList />
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateBarcode;
