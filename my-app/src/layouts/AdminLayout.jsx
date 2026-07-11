import React from "react";
import AdminSidebar from "../pages/admin/components/AdminSidebars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style/AdminLayout.css";

function AdminLayout({ icon, title, subtitle, children }) {
  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-content">
        {(icon || title) && (
          <div className="admin-page-header">
            {icon && (
              <div className="header-icon">
                <FontAwesomeIcon icon={icon} />
              </div>
            )}
            <div>
              {title && <h1 className="admin-page-title">{title}</h1>}
              {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
