import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DeckContainer from './deck/DeckContainer';
import HighScoreContainer from './highScore/HighScore';
import {
  fetchHightScore,
  addHighScore,
  resetHightScore,
  shuffleDeck,
} from '../../service';
import {
  shuffle,
  toggeLoading,
  setError,
  fetchHighScore,
} from '../../actions';

import './main.css';

class Main extends PureComponent {
  constructor(props) {
    super(props);

    const { toggeLoadingAction, setErrorAction } = this.props;
    this.toggeLoadingAction = toggeLoadingAction;
    this.setErrorAction = setErrorAction;
  }

  componentDidMount() {
    this.shuffleDecks();
    this.fetchHighScoreList();
  }

  componentDidUpdate(prevProps) {
    this.setHighScore(prevProps);
  }

  async setHighScore(prevProps) {
    const { match, cardDrawCounter } = this.props;
    if (match === 9 && prevProps.match !== 9) {
      // prompt the name and fetch set the high score
      setTimeout(async () => {
        // eslint-disable-next-line no-alert
        const name = window.prompt('Congrats!! you have won the game. Please enter your name');
        if (name) {
          const turn = Math.floor(cardDrawCounter / 2);
          this.toggeLoadingAction();
          await addHighScore({ name, turn });
          this.toggeLoadingAction();
          this.fetchHighScoreList();
        }
      }, 1300);
    }
  }

  async shuffleDecks() {
    const { shuffleAction } = this.props;
    try {
      this.toggeLoadingAction();
      this.setErrorAction(false);

      const response = await Promise.all([shuffleDeck(), shuffleDeck()]);
      const deckIds = [];
      let totalItems = 0;

      response.forEach((res) => {
        if (res.data && res.data.deck_id) {
          deckIds.push(res.data.deck_id);
          totalItems = res.data.remaining;
        }
      });
      shuffleAction({ deckIds, totalItems });
      this.toggeLoadingAction();
    } catch (e) {
      // error handler
      this.setErrorAction(true);
    }
  }

  handleShuffleBtn() {
    this.shuffleDecks();
  }

  async fetchHighScoreList() {
    const { fetchHighScoreAction } = this.props;
    try {
      this.setErrorAction(false);
      this.toggeLoadingAction();

      const response = await fetchHightScore();
      const highScoreList = response.data;
      fetchHighScoreAction(highScoreList);

      this.toggeLoadingAction();
    } catch (e) {
      this.setErrorAction(true);
    }
  }

  async handleHighScoreResetBtn() {
    try {
      this.setErrorAction(false);
      this.toggeLoadingAction();

      await resetHightScore();
      this.fetchHighScoreList();

      this.toggeLoadingAction();
    } catch (e) {
      this.setErrorAction(true);
    }
  }

  render() {
    const {
      cardDrawCounter,
      match,
      loading,
      isError,
    } = this.props;
    const turns = Math.floor(cardDrawCounter / 2);

    let renderError = '';
    if (isError) {
      renderError = (
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-danger" role="alert">There is some error. Please try again!</div>
          </div>
        </div>
      );
    }
    return (
      <main role="main" className="container-fluid">
        <div className="main-container">
          {renderError}
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-5">
                  <button type="button" className="btn btn-sm btn-primary mr-1" onClick={() => this.handleShuffleBtn()}>Play/Shuffle</button>
                  <button type="button" className="btn btn-sm btn-info" onClick={() => this.handleHighScoreResetBtn()}>Reset High Score</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <span className="mr-2">Turns: {turns}</span>
              <span className="mr-4">Match: {match}</span>
              <div className={loading ? 'spinner-border' : 'invisible spinner-border'} role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <DeckContainer />
          <HighScoreContainer />
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  shuffleAction: PropTypes.func.isRequired,
  toggeLoadingAction: PropTypes.func.isRequired,
  setErrorAction: PropTypes.func.isRequired,
  fetchHighScoreAction: PropTypes.func.isRequired,
  match: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  cardDrawCounter: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  match: state.deck.match,
  loading: state.util.loading,
  isError: state.util.isError,
  cardDrawCounter: state.deck.cardDrawCounter,
});

const mapDispatchToProps = {
  shuffleAction: shuffle,
  toggeLoadingAction: toggeLoading,
  setErrorAction: setError,
  fetchHighScoreAction: fetchHighScore,
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

export default MainContainer;
