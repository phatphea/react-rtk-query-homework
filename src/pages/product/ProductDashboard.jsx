import { NavLink } from "react-router";
import DataTable from "react-data-table-component";
import { useGetProductsQuery } from "../../features/product/productSlice2";

export default function ProductDashboard() {
  const { data, isLoading } = useGetProductsQuery();

  const columns = [
    {
      name: "Thumbnail",
      selector: (row) =>
        row?.thumbnail ? (
          <img
            src={row.thumbnail}
            alt={row.name}
            className="w-16 h-16 object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-xs text-gray-400 bg-gray-100 rounded-md">
            No Image
          </div>
        ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
      cell: (row) => (
        <div className="text-sm font-medium text-gray-900">{row?.name}</div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row?.category?.name,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-500">{row?.category?.name}</div>
      ),
    },
    {
      name: "Price",
      selector: (row) => `$${row?.priceOut?.toFixed(2)}`,
      sortable: true,
      right: true,
      cell: (row) => (
        <div className="text-sm font-semibold text-gray-700">
          ${row?.priceOut?.toFixed(2)}
        </div>
      ),
    },
    {
      name: "Stock",
      selector: (row) => row?.stockQuantity,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            row?.stockQuantity > 5
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row?.stockQuantity}
        </span>
      ),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="flex space-x-2">
          <NavLink
            to={`/edit/${row.id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-900"
          >
            Edit
          </NavLink>
          <NavLink
            to={`/delete/${row.id}`}
            className="text-sm font-medium text-red-600 hover:text-red-900"
          >
            Delete
          </NavLink>
        </div>
      ),
    },
  ];

  return (
    <main className="max-w-screen-xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Product Dashboard
          </h2>
        </div>
        <DataTable
          columns={columns}
          data={data?.content}
          pagination
          progressPending={isLoading}
          highlightOnHover
        />
      </main>
  );
}
