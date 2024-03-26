import React, { useState, useEffect } from "react";
import { Button, FormControl } from "react-bootstrap";
import { MDBDataTable, MDBDataTableV5 } from "mdbreact";
import "./tokenList.css";
import { addToken, deleteToken, listTokens } from "./api";
import Web3 from "web3";
import CONFIG from "./constant/config";

const TokenList = () => {
  const wssWeb3 = new Web3(
    new Web3.providers.WebsocketProvider(CONFIG.NODE_URL)
  );

  const [tokens, setTokens] = useState([]);
  const [address, setAddress] = useState([]);

  var rows = tokens.map((item) => {
    item.actions = (
      <div>
        <a
          href={CONFIG.EXPLORER_ADDR + item.address}
          target="_blank"
        >
          <Button variant="success" size="sm" className="check-token">
            Check
          </Button>
        </a>
        <Button
          variant="danger"
          size="sm"
          onClick={() => del_Token(item.address)}
        >
          Delete
        </Button>
      </div>
    );

    return item;
  });

  const data = {
    columns: [
      {
        label: "Address",
        field: "address",
      },
      {
        label: "Actions",
        field: "actions",
      },
    ],
    rows: rows,
  };

  const del_Token = (address) => {
    deleteToken(address);
    let newTokens = tokens.filter(function(obj) {
      return obj.address !== address;
    });
    setTokens(newTokens);
  };

  const add_Token = async (_address) => {
    let address = Web3.utils.toChecksumAddress(_address);
    let newTokens = [
      ...tokens,
      {
        address: address,
      },
    ];
    setTokens(newTokens);
    addToken(address);
    setAddress("");
  };

  const list_Tokens = async () => {
    let items = await listTokens();
    setTokens(items);
  };

  useEffect(() => {
    list_Tokens();
  }, []);

  return (
    <div>
      <div className="col-sm-12 col-md-12 col-lg-12 ">
        <label htmlFor="usr">Wallet Address:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          className="medium-input"
        />

        <Button variant="primary" size="md" onClick={() => add_Token(address)}>
          Add Wallet
        </Button>
      </div>

      <div className="col-sm-12 col-md-12 col-lg-12">
        <MDBDataTableV5 hover data={data} />
      </div>
    </div>
  );
};

export default TokenList;
