import { useDispatch, useSelector } from "react-redux";
import { getApiEvent } from "../../store/registerSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  deleteApiEvent,
  toggleShouldFetchLatestEvents,
} from "../../store/registerSlice";

const TableAdmin = () => {
  const { event, shouldFetchLatestEvents } = useSelector((state) => state.card);
  const [searchField, setSearchField] = useState("");

  const dispatch = useDispatch();
  const maxDescriptionLength = 100; // Ganti dengan panjang maksimum yang Anda inginkan

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getApiEvent());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  useEffect(() => {
    if (shouldFetchLatestEvents) {
      dispatch(toggleShouldFetchLatestEvents());
      dispatch(getApiEvent());
    }
  }, [dispatch, shouldFetchLatestEvents]);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <div className="flex justify-between items-center p-5 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <p className="text-3xl font-bold">List Event</p>
        <button
          type="button"
          data-collapse-toggle="navbar-search"
          aria-controls="navbar-search"
          aria-expanded="false"
          className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round "
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
          />
        </div>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
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
          {event ? (
            event
              .filter((data) =>
                data.name.toLowerCase().includes(searchField.toLowerCase())
              )
              .map((data, index) => (
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={data.id}
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {data.name}
                  </th>
                  <td className="px-6 py-4">
                    {
                      <img
                        className="border p-1"
                        src={data.image}
                        alt={data.name}
                        width={150}
                        height={150}
                      />
                    }
                  </td>
                  <td className="px-6 py-4">
                    {data.desc.length > maxDescriptionLength
                      ? data.desc.slice(0, maxDescriptionLength) + "..."
                      : data.desc}
                  </td>
                  <td className="px-6 py-4">{data.quota}</td>
                  <td className="px-6 py-4">{data.city}</td>
                  <td className="px-6 py-4">{data.date}</td>
                  <td className="px-6 py-4 ">
                    <Link
                      to={`/form-edit-admin/${data.id}`}
                      className="mx-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        dispatch(deleteApiEvent(data.id)).then(() => {
                          dispatch(toggleShouldFetchLatestEvents());
                        })
                      }
                      className="mx-2 font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="8" className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableAdmin;
