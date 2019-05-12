import React from "react";
import PropTypes from "prop-types";
import ReactPlayer from 'react-player';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Pause from "@material-ui/icons/Pause";
// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import RegularButton from "components/CustomButtons/Button.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

function Player(props) {
  const { classes } = props;

  // let handlePlay = () => {
  //   syncConnection.talk("Play", "Cineplex");
  // };
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
        <p className={classes.cardCategoryWhite}>
          Handcrafted by our friends from{" "}
          <a
            href="https://design.google.com/icons/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google
          </a>
        </p>
      </CardHeader>
      <CardBody>
        <ReactPlayer
          url='https://www.youtube.com/watch?v=2S24-y0Ij3Y'
          width='100%'
          height='720px'
          volume={0}
          config={{
            youtube: {
              playerVars: { showinfo: 0 }
            },
          }}
        />
      <RegularButton color='white' justIcon round>
        <PlayArrow />
      </RegularButton>
      <RegularButton color='white' justIcon round>
        <Pause />
      </RegularButton>
      </CardBody>
    </Card>
  );
}

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Player);
