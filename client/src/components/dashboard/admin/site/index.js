import React from "react";
import DashboardLayout from "hoc/dashboard.layout";
import SiteVars from "./siteVars";

const ManageSite = () => {
    return (
        <DashboardLayout title="Manage Site">
            <SiteVars/>
        </DashboardLayout>

    )
}

export default ManageSite