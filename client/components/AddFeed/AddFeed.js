import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {toggleModal} from '../../actions';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {connect} from 'react-redux';
import './AddFeed.css';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */
const AddFeed = (props) => {
  const actions = [
    <FlatButton
      label="Cancel"
      primary={true}
      onTouchTap={() => {
        props.toggleModal(false);
      }}
    />,
    <RaisedButton
      label="Submit"
      primary={true}
      onTouchTap={() => {
      // Placeholder for addFeed call to the database
      props.toggleModal(false);
      }}
    />
  ];

  return (
    <div>
      {/* <RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} /> */}
      <Dialog
        title="Enter a feed URL and select an associated category"
        actions={actions}
        modal={false}
        open={props.modalOpen}
        contentStyle={{width: '75%', maxWidth: '600px'}}
        onRequestClose={() => {
          props.toggleModal(false);
        }}
      >
        <div className="url-input">
          <TextField
            hintText="http://coolnews.rss"
            fullWidth={true}
          />
        </div>
        <div className="radio-buttons">
          <RadioButtonGroup name="categories" defaultSelected="other">
            <RadioButton
              value="wordNews"
              label="World News"
              style={styles.radioButton}
            />
            <RadioButton
              value="technology"
              label="Technology"
              style={styles.radioButton}
            />
            <RadioButton
              value="politics"
              label="Politics"
              style={styles.radioButton}
            />
            <RadioButton
              value="business"
              label="Business"
              style={styles.radioButton}
            />
            <RadioButton
              value="money"
              label="Money"
              style={styles.radioButton}
            />
            <RadioButton
              value="sports"
              label="Sports"
              style={styles.radioButton}
            />
            <RadioButton
              value="entertainment"
              label="Entertainment"
              style={styles.radioButton}
            />
            <RadioButton
              value="music"
              label="Music"
              style={styles.radioButton}
            />
            <RadioButton
              value="games"
              label="Games"
              style={styles.radioButton}
            />
            <RadioButton
              value="food"
              label="Food"
              style={styles.radioButton}
            />
            <RadioButton
              value="travel"
              label="Travel"
              style={styles.radioButton}
            />
            <RadioButton
              value="other"
              label="Other"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modalOpen
  }
}
export const Unwrapped = AddFeed;
export default connect(mapStateToProps, {toggleModal})(AddFeed);
