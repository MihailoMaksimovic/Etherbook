import React, { Component } from "react";
import "./card.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ETHlogo } from "../images/ethereum-brands.svg";
import DialogLearnMore from "./learnMoreDialog";

//kartica mesta koje smo rentovali, sa opciom da to mesto platimo
const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#3333ff",
  },
});

export default function AllPlacesCard(props) {
  const classes = useStyles();

  const rentAndPay = () => {
    props.rentAndPayFunction(props.id, props.price);
  };

  console.log(props.rentMan);
  console.log(props.creator);
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
            {props.paid ? (
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

            {props.price}
            {"   "}
            <div style={{ display: "flex" }}> USD</div>
          </div>
          <h4 style={{ height: "80px", padding: "10px" }}>
            {props.state} - {props.location}
          </h4>

          {props.paid ? (
            <button
              style={{ width: "100%", marginTop: "15px" }}
              type="button"
              class="btn btn-success"
            >
              ALREADY PAID, ENJOY!
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={rentAndPay}
                style={{ marginTop: "15px", height: "60px" }}
                type="button"
                class="btn btn-primary"
              >
                PAY {props.price / props.usdPriceValue}{" "}
                <ETHlogo
                  fill="red"
                  stroke="green"
                  style={{
                    marginBottom: "3px",
                    height: "12px",
                    color: "#555a61",
                  }}
                />
                to
                <p style={{ fontSize: "10px" }}> {props.creator} </p>
              </button>
            </div>
            // <button type="button" class="btn btn-primary" onClick={rentAndPay}>
            //   <div
            //     style={{
            //       marginTop: "15px",
            //       display: "flex",
            //       flexDirection: "column",
            //       height: "60px",
            //     }}
            //   >
            //     {" "}
            //     PAY {props.price * 1e-18}{" "}
            //     <ETHlogo
            //       fill="red"
            //       stroke="green"
            //       style={{ marginBottom: "3px", height: "12px", color: "red" }}
            //     />{" "}
            //     <p style={{ fontSize: "11px" }}> {props.creator} </p>
            //   </div>
            // </button>
          )}

          <div class="user">
            <div class="user-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
