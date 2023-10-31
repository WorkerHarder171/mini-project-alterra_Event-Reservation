import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiEvent } from "../store/RegisterSlice";
import { Link } from "react-router-dom";

function Card() {
  const event = useSelector((state) => state.card.event);
  const dispatch = useDispatch();
  const maxDescriptionLength = 250; // Ganti dengan panjang maksimum yang Anda inginkan

  useEffect(() => {
    dispatch(getApiEvent());
  }, [dispatch]);

  useEffect(() => {
    console.log(event);
  }, [event]);

  return (
    <div
      id="list-event"
      className="container mx-auto lg:max-w-7xl md:max-w-xl sm:max-w-md"
    >
      <p className="text-3xl font-bold">List Event</p>
      <div className="container mx-auto gap-5 p-10  border-4 border-dashed m-10 overflow-y-auto max-h-screen ">
        {event?.map((data) => (
          <div
            className="flex flex-col justify-between mx-auto m-5 p-5 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:w-11/12 hover:bg-gray-100 "
            key={data.id}
          >
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 sm:max-w-xs  md:rounded-none md:rounded-l-lg "
              src={data.image}
              alt={data.name}
            />
            <div className="flex flex-col w-7/12 justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {data.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 ">
                {data.desc.length > maxDescriptionLength
                  ? data.desc.slice(0, maxDescriptionLength) + "..."
                  : data.desc}
              </p>
              <p className="mb-3 font-semibold text-gray-90 ">
                {data.date}
              </p>
            </div>
            <Link
              to={`/event-details/${data.id}`}
              className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
