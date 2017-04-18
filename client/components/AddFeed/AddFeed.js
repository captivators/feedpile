import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import {toggleModal} from '../../actions';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {connect} from 'react-redux';

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
      label="Ok"
      primary={true}
      keyboardFocused={true}
      onTouchTap={() => {
        props.toggleModal(false);
      }}
    />,
  ];

  return (
    <div>
      {/* <RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} /> */}
      <Dialog
        title="Dialog With Date Picker"
        actions={actions}
        modal={false}
        open={props.modalOpen}
        onRequestClose={() => {
          props.toggleModal(false);
        }}
      >
        Open a Date Picker dialog from within a dialog.
        {/* <DatePicker hintText="Date Picker" /> */}
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modalOpen
  }
}

export default connect(mapStateToProps, {toggleModal})(AddFeed);
