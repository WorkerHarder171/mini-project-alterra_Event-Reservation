import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiEvent, postApiEvent } from "../../store/registerSlice";
import { useNavigate } from "react-router-dom";

const AddEventAdmin = () => {
  const [event, setEvent] = useState([]);
  const [file, setFile] = useState();
  const [fields, setFields] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getApiEvent());
  }, [dispatch]);

  //Convert file gambar
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleOnChange = async (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    if (type === "file") {
      const file = e.target.files[0];
      setFile(URL.createObjectURL(file));

      const base64 = await convertToBase64(file);
      setFields({
        ...fields,
        [e.target.name]: base64,
      });
    } else {
      setEvent({
        ...event,
        [name]: value,
      });
    }
    setEvent({ ...event, [name]: value });
  };
console.log("check Event => " ,event)

  const handleOnSubmit = (e) => {
    e.preventDefault;
    const newEvent = {
      eventName: event.eventName,
      imageEvent: file,
      descEvent: event.descEvent,
      quotaEvent: event.quotaEvent,
      cityEvent: event.cityEvent,
      dateEvent: event.dateEvent,
    };
    dispatch(postApiEvent(newEvent));
    alert("Data berhasil ditambahkan");
    navigate("/dashboard-admin");

  };
  return (
    <>
      <div className="h-screen flex justify-center items-center mx-auto">
        <form className="w-2/6" onSubmit={handleOnSubmit}>
          <h1 className="text-3xl font-bold italic mb-5">Registration</h1>
          <div className="mb-3">
            <label
              htmlFor="eventName"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={event.eventName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Release Party"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5"
              id="imageEvent"
              name="imageEvent"
              value={event.imageEvent}
              type="file"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Description
            </label>
            <textarea
              id="message"
              name="descEvent"
              value={event.descEvent}
              onChange={handleOnChange}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
          <div className="mb-3">
            <label
              htmlFor="quotaEvent"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Quota
            </label>
            <input
              type="number"
              id="quotaEvent"
              name="quotaEvent"
              value={event.quotaEvent}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="50"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              City
            </label>
            <select
              id="cityEvent"
              name="cityEvent"
              value={event.cityEvent}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              onChange={handleOnChange}
            >
              <option selected="">Select City</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Semarang">Semarang</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bandung">Bandung</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                name="dateEvent"
                value={event.dateEvent}
                onChange={handleOnChange}
                className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                placeholder="Select date"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={handleOnSubmit}
            className="text-white bg-blue-700 hover:bg-blue-800  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddEventAdmin;
