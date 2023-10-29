import TableAdmin from "../components/admin/table-admin";
// import HeaderAdmin from "../components/admin/header-admin";
import AdminMenu from "../components/admin/dashboard-menu-admin"

const adminPage = () => {


  return (
    <>
      <AdminMenu />
      {/* <HeaderAdmin /> */}
      <div className=" sm:ml-64">
        <TableAdmin />
      </div>
    </>
  );
};

export default adminPage;
