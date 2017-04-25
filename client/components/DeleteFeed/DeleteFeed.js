import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import {toggleDeleteModal} from '../../actions';

class DeleteFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedsToDelete: []
    }
  }

  handleCheck(isInputChecked, feedId) {
    if (isInputChecked) {
    this.setState({
      feedsToDelete: this.state.feedsToDelete.filter(x => x !== feedId)
    })
  } else {
    this.setState({
      feedsToDelete: [ ...this.state.feedsToDelete, feedId ]
    })
  }
  }

  render () {
     const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => {
          this.props.toggleDeleteModal(false);
        }}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={() => {
          this.props.deleteFeedsFromDb(this.state.feedsToDelete)
          this.props.toggleDeleteModal(false);
        }}
      />
    ];

    return (
      <div>
        {/* <RaisedButton label="Dialog With Date Picker" onTouchTap={this.handleOpen} /> */}
        <Dialog
          title="Choose the feeds you would like to delete."
          actions={actions}
          modal={false}
          open={this.props.openDeleteFeedModal}
          contentStyle={{width: '75%', maxWidth: '600px'}}
          onRequestClose={() => {
            this.props.toggleDeleteModal(false);
          }}
        >
        <div className="radio-buttons">
            <Checkbox name="feeds" defaultSelected="other"/>
              {this.props.feeds.map((feed, i) => {
                return (<Checkbox
                    key={i}
                    value={feed._id}
                    label={feed.name}
                    onCheck={(event, isInputChecked) => {
                      handleCheck(isInputChecked, feed._id);
                    }}
                />)
              })}
            </RadioButtonGroup>
          </div>
        </Dialog>
      </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    openDeleteFeedModal: state.openDeleteFeedModal,
    feeds: state.feeds
  }
}

export const Unwrapped = DeleteFeed;
export default connect(mapStateToProps  x`, {toggleDeleteModal: toggleDeleteModal})(DeleteFeed)
