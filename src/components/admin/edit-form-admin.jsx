import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { editApiEvent } from "../../store/RegisterSlice";

const EditFormAdmin = () => {
  const events = useSelector((state) => state.card.event);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const checkEvent = events.filter((data) => data.id === id);
  const { name, image, desc, quota, city, date } = checkEvent[0];

  console.log("ini check =>", checkEvent);

  //useState
  const [fields, setFields] = useState();
  const [file, setFile] = useState(image);
  const [validation, setValidation] = useState({});
  const [event, setEvent] = useState({
    id: id,
    eventName: name,
    descEvent: desc,
    quotaEvent: quota,
    cityEvent: city,
    dateEvent: date,
  });
  console.log("cek events variable => ", events);

  // const Regex
  const imageRegex = /\.(jpg|jpeg|png)$/i;
  const quotaRegex = /^\d+(\.\d{1,2})?$/;
  const validateEvent = () => {
    let isValid = true;
    const error = {};

    // validasi eventName
    if (event.eventName === "") {
      error.eventName = "Event Name is required";
      isValid = true;
    } else if (event.eventName.length > 25) {
      error.eventName = "Event Name must not exceed 25 characters";
      isValid = true;
    } else if (event.eventName.length < 3) {
      error.eventName = "Event Name must be at least 3 characters.";
      isValid = true;
    } else {
      error.eventName = "";
      isValid = false;
    }

    // validasi imageEvent
    if (event.imageEvent === "") {
      error.imageEvent = "Image is required";
      isValid = true;
    } else if (!imageRegex.test(event.imageEvent)) {
      error.imageEvent = "Please upload a file jpg, jpeg, or png";
      isValid = true;
    } else {
      error.imageEvent = "";
      isValid = false;
    }

    // validasi descEvent
    if (event.descEvent === "") {
      error.descEvent = "Description is required";
      isValid = true;
    } else {
      error.descEvent = "";
      isValid = false;
    }

    // validasi quotaEvent
    if (event.quotaEvent === "") {
      error.quotaEvent = "Quota is require";
      isValid = true;
    } else if (!quotaRegex.test(event.quotaEvent)) {
      error.quotaEvent = "Please input a valid number";
      isValid = true;
    } else {
      error.quotaEvent = "";
      isValid = false;
    }

    // validasi cityEvent
    if (event.cityEvent === "") {
      error.cityEvent = "City is required";
      isValid = true;
    } else {
      error.cityEvent = "";
      isValid = false;
    }

    // validasi dateEvent
    if (event.dateEvent === "") {
      error.dateEvent = "Date is require";
      isValid = true;
    } else {
      error.dateEvent = "";
      isValid = false;
    }

    setValidation(error);
    return isValid;
  };

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

      validateEvent();
    }
  };
  console.log("check Event => ", event);
  const handleOnSubmit = (e) => {
    e.preventDefault();

    const hasError = validateEvent();
    if (!hasError) {
      dispatch(
        editApiEvent({
          id,
          name: event.eventName,
          image: file,
          desc: event.descEvent,
          quota: event.quotaEvent,
          city: event.cityEvent,
          date: event.dateEvent,
        })
      );
      alert("Data berhasil diupdate");
      navigate("/dashboard-admin");
    } else {
      alert("Data gagal diupdate");
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center mx-auto">
        <form className="w-2/6" onSubmit={handleOnSubmit}>
          <h1 className="text-3xl font-bold italic mb-5">Edit Event</h1>
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
              style={{
                border: validation?.eventName
                  ? "2px solid red"
                  : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
              }}
            />
            {validation?.event && (
              <div className="error py-2" style={{ color: "red" }}>
                {validation?.event}
              </div>
            )}
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
              style={{
                border: validation?.imageEvent
                  ? "2px solid red"
                  : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
              }}
            />
            {validation?.imageEvent && (
              <div className="error py-2" style={{ color: "red" }}>
                {validation?.imageEvent}
              </div>
            )}
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
              style={{
                border: validation?.descEvent
                  ? "2px solid red"
                  : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
              }}
            />
            {validation?.descEvent && (
              <div className="error py-2" style={{ color: "red" }}>
                {validation?.descEvent}
              </div>
            )}
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
              style={{
                border: validation?.quotaEvent
                  ? "2px solid red"
                  : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
              }}
            />
            {validation?.quotaEvent && (
              <div className="error py-2" style={{ color: "red" }}>
                {validation?.quotaEvent}
              </div>
            )}
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
              style={{
                border: validation?.cityEvent
                  ? "2px solid red"
                  : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
              }}
            >
              <option value="">Select City</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Semarang">Semarang</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bandung">Bandung</option>
            </select>
            {validation?.cityEvent && (
              <div className="error py-2" style={{ color: "red" }}>
                {validation?.cityEvent}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Date
            </label>
            <div className="relative max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-event-none">
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
                style={{
                  border: validation?.dateEvent
                    ? "2px solid red"
                    : "1px solid #ccc", // deepscan-disable-line // deepscan-disable-line INSUFFICIENT_NULL_CHECK
                }}
              />
              {validation?.dateEvent && (
                <div className="error py-2" style={{ color: "red" }}>
                  {validation?.dateEvent}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <button
              type="button"
              onClick={handleOnSubmit}
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Submit
            </button>

            <Link
              to={"/dashboard-admin"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Back
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditFormAdmin;
