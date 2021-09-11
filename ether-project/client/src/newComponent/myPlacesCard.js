import React, { Component } from "react";
import "./card.css";

import { makeStyles } from "@material-ui/core/styles";
import { ReactComponent as ETHlogo } from "../images/ethereum-brands.svg";
import { Button } from "@material-ui/core";
import Change from "./change";
//kartica za mesto koja sam "ja" izbacio
const useStyles = makeStyles({
  avatar: {
    backgroundColor: "#3333ff",
  },
});

export default function AllPlacesCard(props) {
  const classes = useStyles();

  const deletePlace = () => {
    props.deletePlaceFunction(props.id);
  };

  const changeValue = (_id, _price, _description) => {
    props.changeValueFunction(_id, _price, _description);
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
            ) : props.deletePlace ? (
              <div>
                <Button
                  onClick={deletePlace}
                  style={{ marginRight: "2px", marginBottom: "20px" }}
                  class="tag tag-green"
                >
                  {" "}
                  ALLOW FOR RENT
                </Button>
                <Change
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
                  changeValueFunction={changeValue}
                />
              </div>
            ) : (
              <div>
                <Button
                  onClick={deletePlace}
                  style={{ marginRight: "2px" }}
                  class="tag tag-red"
                >
                  {" "}
                  DELETE
                </Button>
              </div>
            )}
            {props.price}
            {"   "}
            <div style={{ display: "flex" }}> USD</div>
          </div>
          <h4 style={{ marginTop: "10px" }}>
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
                    style={{
                      background: "green",
                      height: "60px",
                      marginTop: "20px",
                    }}
                    type="button"
                    class="btn btn-primary"
                  >
                    PAID BY THE USER
                    <p style={{ fontSize: "10px" }}> {props.rentMan} </p>
                  </button>
                ) : (
                  <button
                    style={{
                      background: "#ff9900",
                      height: "60px",
                      marginTop: "20px",
                    }}
                    type="button"
                    class="btn btn-primary"
                  >
                    RENTED to
                    <p style={{ fontSize: "10px" }}> {props.rentMan} </p>
                  </button>
                )}
              </div>
            ) : (
              <div
                style={
                  props.deletePlace
                    ? { visibility: "hidden" }
                    : {
                        display: "flex",
                        flexDirection: "row",
                        marginTop: "40px",
                      }
                }
              >
                <button
                  style={{
                    width: "100%",
                    background: "red",
                    marginRight: "20px",
                  }}
                  type="button"
                  class="btn btn-primary"
                >
                  NOT rented
                </button>
                <Change
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
                  changeValueFunction={changeValue}
                />
              </div>
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
