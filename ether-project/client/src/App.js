import React, { Component } from "react";
import SimpleStorageContract from "./abis/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Header from "./newComponent/header";
// import PlacesToStayCard from "./component/placesToStayCard";
// import MyPlacesCard from "./component/myPlacesCard";
// import MyStatusCard from "./component/myStatusCard";
import "./App.css";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Alert from "@material-ui/lab/Alert";
import clsx from "clsx";
import InputAdornment from "@material-ui/core/InputAdornment";
import AllPlaces from "./newComponent/AllPlacesCard";
import MyPlaces from "./newComponent/myPlacesCard";
import MyStatus from "./newComponent/myStatusCard";

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import Slider from "react-slick";

import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SearchIcon from "@material-ui/icons/Search";

import ipfs from "./ipfs";
import Loader from "./newComponent/loadingSpinner";

class App extends Component {
  constructor() {
    super();

    this.state = {
      storageValue: 0,
      web3: null,
      account: "",
      contract: null,
      items: [],
      open: false,
      checkFill: true,
      myPlacesFlag: true,
      statusFlag: false,
      imgs: null,
      buffer: null,
      ipfsHash: "",
      location: null,
      state: null,
      description: null,
      price: null,
      searchState: "",
      searchLocation: "",
      loading: false,
    };
  }

  // componentDidUpdate = async () => {
  //   const web3 = await getWeb3();
  //   await web3.eth
  //     .getAccounts()
  //     .then((data) => this.setState({ account: data }));
  //   console.log(this.state.account);
  //   console.log("componentDidiupdate");
  // };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const account = await web3.eth
        .getAccounts()
        .then((data) => this.setState({ account: data }));

      const networkId = await web3.eth.net.getId();

      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3: web3, contract: instance });

      await this.getAllPlaces();
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  changeRent = async (_id) => {
    this.setState({ loading: true });
    const instance = await this.state.contract.methods
      .changeRent(_id)
      .send({ from: this.state.account.toString() });
    this.setState({ loading: false });
    window.location.reload();
  };

  rentAndPay = async (_id, _price) => {
    this.setState({ loading: true });
    const instance = await this.state.contract.methods.rentAndPay(_id).send({
      from: this.state.account.toString(),
      value: this.state.web3.utils.toWei(_price.toString(), "Wei"),
    });
    this.setState({ loading: false });
    window.location.reload();
  };

  getAllPlaces = async () => {
    const number = await this.state.contract.methods.placeCount().call();

    for (var i = 1; i <= number; i++) {
      const item = await this.state.contract.methods.allPlaces(i).call();
      const itemId = item[0];
      const creator = item[1];
      const image = item[2];
      const location = item[3];
      const state = item[4];
      const price = item[5];
      const rented = item[6];
      const rentMan = item[7];
      const description = item[8];
      const paid = item[9];

      // this.setState({
      //   items: [...this.state.items, ...[taskId, taskContent, taskComplited]],
      // });

      this.setState({
        items: this.state.items.concat([
          [
            itemId,
            creator,
            image,
            location,
            state,
            price,
            rented,
            rentMan,
            description,
            paid,
          ],
        ]),
      });
    }
  };

  // handleAddPLace = async () => {};

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ imgs: null });
  };

  handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleChangeLocation = (e) => {
    this.setState({ location: e.target.value });
  };
  handleChangeState = (e) => {
    this.setState({ state: e.target.value });
  };
  handleChangePrice = (e) => {
    this.setState({ price: e.target.value });
  };

  inputPhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
    };

    this.setState({
      imgs: e.target.files,
    });
  };

  handleSubmit = async (e) => {
    if (
      this.state.location == null ||
      this.state.state == null ||
      this.state.price == null ||
      this.state.description == null ||
      this.state.imgs == null
    ) {
      this.setState({ checkFill: false });
    } else {
      this.setState({ loading: true });
      await ipfs.files.add(this.state.buffer, async (err, result) => {
        this.setState({ ipfsHash: result[0].hash });

        await this.state.contract.methods
          .setPlace(
            this.state.account.toString(),
            this.state.ipfsHash.toString(),
            this.state.location.toString().toLowerCase(),
            this.state.state.toString().toLowerCase(),
            this.state.price,
            this.state.description.toString()
          )
          .send({ from: this.state.account.toString() });

        this.setState({ checkFill: true });
        this.setState({ open: false });
        this.setState({ loading: false });
        window.location.reload();
      });
    }
  };

  render() {
    let settings = {
      infinite: false,
      speed: 800,
      arrows: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      dots: true,
      responsive: [
        {
          breakpoint: 960,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 2,
          },
        },
      ],
    };

    console.log(this.state.searchLocation);
    console.log(this.state.searchState);
    return (
      <div style={{ height: "100%" }}>
        {this.state.loading ? (
          <Loader></Loader>
        ) : (
          <div className="App">
            <Header currentAddress={this.state.account} />

            <main>
              <Slider {...settings}>
                {this.state.items.map((item) => {
                  if (
                    this.state.myPlacesFlag &&
                    this.state.account.toString() != item[1].toString() &&
                    !item[6] &&
                    !this.state.statusFlag &&
                    item[4].includes(this.state.searchState.toLowerCase()) &&
                    item[3].includes(this.state.searchLocation.toLowerCase())
                  ) {
                    return (
                      <div key={item[0]}>
                        <AllPlaces
                          id={item[0]}
                          creator={item[1]}
                          image={item[2]}
                          location={item[3]}
                          state={item[4]}
                          price={item[5]}
                          rented={item[6]}
                          rentMan={item[7]}
                          description={item[8]}
                          paid={item[9]}
                          changeRentFunction={this.changeRent}
                        />
                      </div>
                    );
                  } else if (
                    !this.state.myPlacesFlag &&
                    item[1].toString() == this.state.account.toString() &&
                    !this.state.statusFlag &&
                    item[4].includes(this.state.searchState.toLowerCase()) &&
                    item[3].includes(this.state.searchLocation.toLowerCase())
                  ) {
                    return (
                      <div key={item[0]}>
                        <MyPlaces
                          id={item[0]}
                          creator={item[1]}
                          image={item[2]}
                          location={item[3]}
                          state={item[4]}
                          price={item[5]}
                          rented={item[6]}
                          rentMan={item[7]}
                          description={item[8]}
                          paid={item[9]}
                        />
                      </div>
                    );
                  } else if (
                    this.state.statusFlag &&
                    item[7].toString() == this.state.account.toString() &&
                    item[1].toString() != this.state.account.toString() &&
                    item[4].includes(this.state.searchState.toLowerCase()) &&
                    item[3].includes(this.state.searchLocation.toLowerCase())
                  ) {
                    return (
                      <div key={item[0]}>
                        <MyStatus
                          id={item[0]}
                          creator={item[1]}
                          image={item[2]}
                          location={item[3]}
                          state={item[4]}
                          price={item[5]}
                          rented={item[6]}
                          rentMan={item[7]}
                          description={item[8]}
                          paid={item[9]}
                          rentAndPayFunction={this.rentAndPay}
                        />
                      </div>
                    );
                  }
                })}
              </Slider>
            </main>
            <div
              style={{
                marginBottom: "3%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                float: "center",
              }}
            ></div>
            <div className="buttonSection">
              <TextField
                onChange={(e) => {
                  this.setState({ searchState: e.target.value });
                }}
                label="Search by state "
                id="outlined-start-adornment"
                // className={clsx(classes.margin, classes.textField)}
                InputProps={{
                  style: {
                    color: "white",
                    notchedOutline: { borderColor: "white !important" },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <SearchIcon style={{ color: "white" }} />{" "}
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: 15, color: "white" },
                }}
                variant="standard"
              />
              <Button
                style={{ fontSize: "medium", width: "200px" }}
                onClick={() => {
                  this.setState({ myPlacesFlag: false, statusFlag: false });
                }}
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
              >
                My places!
              </Button>
              <Button
                style={{
                  fontSize: "medium",
                  width: "200px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  this.setState({ myPlacesFlag: true, statusFlag: false });
                }}
                variant="contained"
                color="primary"
                startIcon={<LoyaltyIcon />}
              >
                Places to stay
              </Button>
              <Button
                style={{
                  fontSize: "medium",
                  width: "200px",
                  marginLeft: "10px",
                }}
                onClick={this.handleClickOpen}
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add place!
              </Button>
              <Button
                style={{
                  fontSize: "medium",
                  width: "200px",
                  marginLeft: "10px",
                }}
                onClick={() => {
                  this.setState({ statusFlag: !this.state.statusFlag });
                }}
                variant="contained"
                color="primary"
                startIcon={<NotificationsActiveIcon />}
              >
                Status
              </Button>
              <TextField
                onChange={(e) => {
                  this.setState({ searchLocation: e.target.value });
                }}
                label="Search by location "
                id="outlined-start-adornment"
                InputProps={{
                  style: {
                    color: "white",
                    notchedOutline: { borderColor: "white !important" },
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      {" "}
                      <SearchIcon style={{ color: "white" }} />{" "}
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: { fontSize: 15, color: "white" },
                }}
                variant="standard"
              />
            </div>

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                Add your place to rent
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  please enter basic information and rent your place tomorrow
                </DialogContentText>
                {this.state.imgs == null ? (
                  <input
                    required
                    onChange={this.inputPhotoChange}
                    autoFocus
                    margin="dense"
                    id="image"
                    label="image"
                    type="file"
                    // multiple="true"
                    ref="file"
                  />
                ) : (
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <div>
                      {this.state.imgs &&
                        [...this.state.imgs].map((file) => (
                          <img
                            style={{ width: "50%", padding: "2px" }}
                            src={URL.createObjectURL(file)}
                          />
                        ))}
                    </div>
                  </div>
                )}

                <form>
                  <TextField
                    onChange={this.handleChangeLocation}
                    autoFocus
                    margin="dense"
                    id="location"
                    label="Location"
                    type="text"
                    fullWidth
                    required
                  />
                  <TextField
                    onChange={this.handleChangeState}
                    autoFocus
                    margin="dense"
                    id="state"
                    label="State"
                    type="text"
                    fullWidth
                    required
                  />
                  <textarea
                    style={{ width: "100%" }}
                    placeholder="description"
                    onChange={this.handleChangeDescription}
                    name="description"
                    cols="40"
                    rows="5"
                    maxlength="400"
                  ></textarea>

                  <div style={{ display: "flex" }}>
                    <TextField
                      onChange={this.handleChangePrice}
                      autoFocus
                      margin="dense"
                      id="price"
                      label="Price in WEI"
                      type="number"
                      required
                    />
                    <Button
                      style={{
                        fontSize: "small",
                        width: "100%",
                        marginLeft: "10px",
                      }}
                      variant="contained"
                      color="primary"
                      startIcon={<AttachMoneyIcon />}
                    >
                      price in ETH: {this.state.price * 1e-18}
                      <br />
                      price in USD: {this.state.price * 1e-18 * 3431.94}
                    </Button>
                  </div>
                </form>
              </DialogContent>
              <DialogActions>
                <Alert
                  style={
                    this.state.checkFill
                      ? { visibility: "hidden" }
                      : { visibility: "visible" }
                  }
                  className="alert"
                  severity="error"
                >
                  Please fill out all fields!
                </Alert>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}
      </div>
    );
  }
}

export default App;
