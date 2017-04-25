import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {toggleModal, addFeed, setAddFeedCategoryId, setAddFeedUrl, setDisplayProgress} from '../../actions';
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
  var userId = JSON.parse(localStorage.getItem('profile')).identities[0].user_id;

  console.log('user: ', props.user);
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
        props.addFeed(props.urlInput, userId, props.selectedCategory)
        props.setDisplayProgress(true)
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
            onChange={(e) => {
              props.setAddFeedUrl(e.target.value)
            }}
          />
        </div>
        <div className="radio-buttons">
          <RadioButtonGroup name="categories" defaultSelected="other">
            {props.categories.map((category, i) => {
              return (<RadioButton
                  key={i}
                  value={props.categories[i].name}
                  label={props.categories[i].name}
                  onTouchTap={() => {
                    props.setAddFeedCategoryId(props.categories[i]._id)
                  }}
                  style={styles.radioButton}
              />)
            })}
          </RadioButtonGroup>
        </div>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modalOpen,
    categories: state.categories,
    urlInput: state.addFeedUrl,
    selectedCategory: state.addFeedCategoryId
  }
}

export const Unwrapped = AddFeed;
export default connect(mapStateToProps, {toggleModal, addFeed,
setAddFeedCategoryId, setAddFeedUrl, setDisplayProgress})(AddFeed);
