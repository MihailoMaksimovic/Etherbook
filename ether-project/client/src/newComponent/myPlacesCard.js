import React, { Component } from "react";
import "./card.css";

import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ETHlogo } from "../images/ethereum-brands.svg";

//kartica za mesto koja sam "ja" izbacio
const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#3333ff",
  },
});

export default function AllPlacesCard(props) {
  const classes = useStyles();

  const changeRent = () => {
    props.changeRentFunction(props.id);
  };

  return (
    <div class="container">
      <div class="card">
        <div class="card-header">
          <img
            loading="eager"
            style={{
              objectFit: "fill",
              maxWidth: "100%",
            }}
            src={`https://ipfs.io/ipfs/${props.image}`}
          />
        </div>
        <div class="card-body">
          <div
            style={{
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {props.rented ? (
              <span style={{ marginRight: "15px" }} class="tag tag-teal">
                {" "}
                BUSY
              </span>
            ) : (
              <span style={{ marginRight: "15px" }} class="tag tag-teal">
                {" "}
                FREE
              </span>
            )}

            {props.price * 1e-18}
            {"   "}
            <div style={{ display: "flex" }}>
              {" "}
              ETH
              <ETHlogo
                fill="red"
                stroke="green"
                style={{ marginTop: "4px", color: "#555a61", height: "15px" }}
              />
            </div>
          </div>
          <h4 style={{ height: "80px", padding: "10px" }}>
            {props.state} - {props.location}
          </h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: "7px",
            }}
          >
            {props.rented ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                {props.paid ? (
                  <button
                    style={{ background: "green", height: "60px" }}
                    type="button"
                    class="btn btn-primary"
                  >
                    PAID BY THE USER
                    <p style={{ fontSize: "10px" }}> {props.rentMan} </p>
                  </button>
                ) : (
                  <button
                    style={{ background: "#ff9900", height: "60px" }}
                    type="button"
                    class="btn btn-primary"
                  >
                    RENTED to
                    <p style={{ fontSize: "10px" }}> {props.rentMan} </p>
                  </button>
                )}
              </div>
            ) : (
              <button
                style={{ width: "100%", background: "red", marginTop: "15px" }}
                type="button"
                class="btn btn-primary"
              >
                NOT rented
              </button>
            )}
          </div>
          <div class="user">
            <div class="user-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
