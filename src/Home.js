import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [events, setEvents] = useState([]);
  const [idx, setIndex] = useState({
    i: -1,
    show: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get("http://hiring-tests.herokuapp.com/listEvents")
          .then((res) => {
            console.log(res.data.events);
            setEvents(res.data.events);
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [setEvents]);

  const deletEvt = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`http://hiring-tests.herokuapp.com/deleteEvent/${id}`, {
          headers: {
            Authorization: "Bearer " + process.env.REACT_APP_AUTH_TOKEN,
          },
        })
        .then((res) => alert(`Event with id ${id} has Succesfully deleted`))
        .catch((err) => alert(err.message));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Amt Raised</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {events?.map((e, i) => (
            <>
              <tr key={i}>
                <td>{e?.title ? e.title : "No title"}</td>
                <td>
                  <div
                    style={{
                      background: "#CFFCCA",
                      borderRadius: 5,
                      padding: 2,
                    }}
                  >
                    {e.status}
                  </div>
                </td>
                <td>
                  ₹{e.amount} out of ₹{e?.targetPrice ? e.targetPrice : 0}
                </td>
                <td>{e?.deadline ? e.deadline : "No deadline"}</td>
              </tr>
              <div
                style={{
                  position: "absolute",
                  marginLeft: "470px",
                  marginTop: "-10px",
                  zIndex: 1,
                }}
              >
                {idx.i == i && idx.show && (
                  <ul className="ul" key={i}>
                    <li>
                      <a href={`/event/${e._id}`}>
                        <span style={{ marginRight: 5 }}>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        View Campaign
                      </a>
                    </li>
                    <li>
                      <span style={{ marginRight: 5 }}>
                        <i
                          className="fa fa-trash"
                          aria-hidden="true"
                          style={{ color: "#585858" }}
                        ></i>
                      </span>

                      <a href="#" onClick={() => deletEvt(e._id)}>
                        Delete Campaign
                      </a>
                    </li>
                    <li>
                      <a href={`/editevt/${e._id}`}>
                        <span style={{ marginRight: 5 }}>
                          <i
                            className="fa fa-pencil-square"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Edit Campaign
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          position: "absolute",
          top: "29%",
          left: "71%",
        }}
      >
        {events.map((e, i) => (
          <div>
            <div>
              <button
                key={i}
                onClick={() => setIndex({ i: i, show: !idx.show })}
                style={{
                  marginBottom: 20,
                  width: 25,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className="bi bi-three-dots-vertical"></span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
