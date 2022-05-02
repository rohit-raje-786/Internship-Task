import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditEvent() {
  const [state, setState] = useState({
    status: "",
    category: "",
    city: "",
    deadline: "",
    title: "",
    description: "",
    targetprice: "",
    amount: "",
  });
  let { id } = useParams();
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        await axios
          .get(`http://hiring-tests.herokuapp.com/event/${id}`)
          .then((res) => {
            console.log(res.data.event);
            const evt = res.data.event;
            setState({
              status: evt.status,
              category: evt.category,
              city: evt.city,
              deadline: evt.deadline,
              title: evt.title,
              description: evt.description,
              targetprice: evt.targetPrice,
              amount: evt.amount,
            });
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    };

    fetchEventById();
  }, []);

  const onChangeHandler = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(state);
    try {
      await axios
        .put(
          `http://hiring-tests.herokuapp.com/editEvent/${id}`,
          new URLSearchParams(state),
          {
            headers: {
              Authorization: "Bearer " + process.env.REACT_APP_AUTH_TOKEN,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          console.log(res);
          alert("Event Updated SuccessFully");
        })
        .catch((e) => alert(e.message));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <form action="/action_page.php">
        <div className="row">
          <div className="col-25">
            <label>Status</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={state.status}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Category</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={state.category}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>City</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={state.city}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Deadline</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="deadline"
              placeholder="Deadline"
              value={state.deadline}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Title</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={state.title}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Description</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={state.description}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>TargetPrice</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="targetprice"
              placeholder="TargetPrice"
              value={state.targetprice}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Amount</label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="amount"
              placeholder="Amount"
              value={state.amount}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <input type="submit" value="Edit" onClick={submitHandler} />
        </div>
      </form>
    </div>
  );
}

export default EditEvent;
