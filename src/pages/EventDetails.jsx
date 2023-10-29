import Header from "../components/header";
import Footer from "../components/footer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RSVP from "../components/rsvp";
const EventDetails = () => {
  const { id } = useParams();

  const event = useSelector((state) => state.card.event);
  const details = event.find((data) => data.id === id);
  const { name, image, city, desc, date} = details;
  return (
    <>
      <Header />
      <div className="container w-3/4 mx-auto p-10">
        <img
          className="mx-auto w-2/12 rounded-md shadow-md "
          src={image}
          alt={name}
        />
        <p className="text-4xl font-bold my-5">{name}</p>
        <p className="text-md text-gray-900 font-semibold mb-5">{city} <span> - </span> {date}</p>
        <p className="text-xl font-regular">{desc}</p>
      </div>
      <RSVP />

      <Footer />
    </>
  );
};

export default EventDetails;
