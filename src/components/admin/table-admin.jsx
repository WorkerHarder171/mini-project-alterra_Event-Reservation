import { useDispatch, useSelector } from "react-redux";
import { getApiEvent } from "../../store/registerSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteApiEvent } from "../../store/registerSlice";
const TableAdmin = () => {
  const event = useSelector((state) => state.card.event);
  const dispatch = useDispatch();

  useEffect(() => {
    // const timer = setTimeout(() => {
      dispatch(getApiEvent());

  //   })
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <p className="text-3xl font-bold">List Event</p>
        <Link
          to={"/create-event"}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          + Event
        </Link>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Event Name
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Quota
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              month
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {event?.map((data, index) => (
            <tr
              className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
              key={data.id}
            >
              <td className="px-6 py-4">{index + 1}</td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {data.eventName}
              </th>
              <td className="px-6 py-4">
                {
                  <img
                    className="border p-1"
                    src={data.imageEvent}
                    alt={data.eventName}
                    width={150}
                    height={150}
                  />
                }
              </td>
              <td className="px-6 py-4">{data.descEvent}</td>
              <td className="px-6 py-4">{data.quotaEvent}</td>
              <td className="px-6 py-4">{data.cityEvent}</td>
              <td className="px-6 py-4">{data.dateEvent}</td>
              <td className="px-6 py-4 ">
                <Link
                  to={`/form-edit-admin/${data.id}`}
                  className="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteApiEvent(data.id))}
                  className="mx-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdmin;
