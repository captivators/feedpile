import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {connect} from 'react-redux';
import userFeedsSelector from '../../selectors/user-feeds-selector';
import {toggleDeleteModal, deleteFeedsFromDb, setDisplayProgress} from '../../actions';

class DeleteFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedsToDelete: []
    };
    this.handleCheck = this.handleCheck.bind(this)
  }

  handleCheck(isInputChecked, feedId) {
    if (isInputChecked) {
      this.state.feedsToDelete.push(feedId);
    } else if(!isInputChecked) {
      let remainingFeeds = this.state.feedsToDelete.filter(x => x !== feedId);
      this.state.feedsToDelete = remainingFeeds;
    }
  }

  render() {
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
            this.props.setDisplayProgress(true);
            this.props.deleteFeedsFromDb(this.state.feedsToDelete,
                JSON.parse(localStorage.getItem('profile')).identities[0].user_id
            )
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
            <div className="checkboxes">
              {this.props.userFeeds.map((feed, i) => {

                return (<Checkbox
                    key={i}
                    value={feed._id}
                    label={feed.name}
                    onCheck={(event, isInputChecked) => {
                      this.handleCheck(isInputChecked, feed._id);
                    }}
                />)
              })}
            </div>
          </Dialog>
        </div>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    openDeleteFeedModal: state.openDeleteFeedModal,
    userFeeds: userFeedsSelector(state)
  }
};

export const Unwrapped = DeleteFeed;
export default connect(mapStateToProps, {toggleDeleteModal, deleteFeedsFromDb, setDisplayProgress})(DeleteFeed)
