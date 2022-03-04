import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Item from "../components/item/Item";
import { makeStyles, IconButton, Paper, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { queryDiscovery, queryTitle } from "../utils/index";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "60px",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    width: "100%",
    margin: 4,
  },
  grid: {
    marginTop: "48px",
    width: "100",
  },
}));

const Top = () => {
  const [sendText, setSendText] = useState("");
  const [recvTexts, setRecvTexts] = useState([]);
  const [title, setTitle] = useState("");

  const classes = useStyles();

  useEffect(() => {
    const getTitle = async () => {
      const res = await queryTitle();
      setTitle(res.data.title);
      console.log(res)
    }
    getTitle()
  }, []);

  const onPressQuery = async (event) => {
    event.preventDefault();
    const res = await queryDiscovery(sendText);
    setRecvTexts(res.data.responseTexts);
    console.log(res);
  };

  return (
    <Layout>
      <div style={{margin: 10}}>Subtitle: {title}</div>
      <form
        onSubmit={(e) => {
          onPressQuery(e);
        }}
      >
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Watson Discovery で検索!!??"
            inputProps={{ "aria-label": "search watson discovery" }}
            onChange={(e) => {
              setSendText(e.target.value);
            }}
          />
          <IconButton
            type="button"
            className={classes.iconButton}
            aria-label="search"
            onClick={(e) => onPressQuery(e)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
      <div style={{ margin: 50, textAlign: "left" }}>
        {recvTexts.length > 0 &&
          recvTexts.map((recvText, index) => (
            <Item recvText={recvText} key={index} />
          ))}
      </div>

      {/* {recvTexts.length>0 && JSON.stringify(recvTexts)} */}
    </Layout>
  );
};

export default Top;
