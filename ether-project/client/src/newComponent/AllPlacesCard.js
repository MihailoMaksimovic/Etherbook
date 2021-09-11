import React, { Component } from "react";
import "./card.css";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ETHlogo } from "../images/ethereum-brands.svg";
import DialogLearnMore from "../newComponent/learnMoreDialog";

// mesto za kartice koje svi mogu da vide i pri tom imaju opciju da rentuju
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
            <span style={{ marginRight: "15px" }} class="tag tag-teal">
              {" "}
              FREE
            </span>
            {props.price}
            <div style={{ display: "flex" }}> USD</div>
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
            <button
              style={{ marginRight: "20px", marginTop: "15px" }}
              onClick={changeRent}
              type="button"
              class="btn btn-primary"
            >
              RENT
            </button>
            <div style={{ marginTop: "16px" }}>
              <DialogLearnMore
                id={props.id}
                creator={props.creator}
                image={props.image}
                location={props.location}
                state={props.state}
                price={props.price}
                rented={props.rented}
                rentMan={props.rentMan}
                description={props.description}
                usdPriceValue={props.usdPriceValue}
              />
            </div>
          </div>
          <div class="user">
            <div class="user-info"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
