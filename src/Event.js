import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Event() {
  const [event, setEvent] = useState();
  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        await axios
          .get(`http://hiring-tests.herokuapp.com/event/${id}`)
          .then((res) => {
            console.log(res.data.event);
            setEvent(res.data.event);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    };
    fetchEventById();
  }, []);
  return (
    <div className="event-container">
      <ul>
        <li>User Id:{event?._id}</li>
        <li>Status:{event?.status}</li>
        <li>Title:{event?.title}</li>
        <li>Category:{event?.category}</li>
        <li>Deadline:{event?.deadline}</li>
        <li>City:{event?.city}</li>
        <li>CreatedAt:{new Date(event?.createdAt).toDateString()}</li>
        <li>Description:{event?.description}</li>
        <li>Amount:{event?.amount}</li>
        <li>TargetPrice:{event?.targetPrice}</li>
      </ul>
    </div>
  );
}

export default Event;
