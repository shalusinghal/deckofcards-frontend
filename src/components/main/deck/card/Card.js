import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drawCardFromDeck } from '../../../../service';
import {
  toggleCard,
  newDraw,
  setCardDrawCounter,
  setLastOpenCard,
  setCardMatch,
  toggeLoading,
  setError,
} from '../../../../actions';

class Card extends Component {
  async onCardClick(deckId, card, index) {
    let newCard = card;

    const {
      toggleCardAction,
      setCardDrawCounterAction,
      setLastOpenCardAction,
      newDrawAction,
      setCardMatchAction,
      toggeLoadingAction,
      setErrorAction,
      lastOpenCard, // props
    } = this.props;

    setErrorAction(false);

    // check the deckId also, if two cards are from same decK
    // or back state was cliked then do nothing
    if ((lastOpenCard && lastOpenCard.deckId === deckId) || card.displayState === 'back') {
      return Promise.resolve();
    }

    if (!card.alreadyDrawn) {
      // call the API, set the backSrc and code
      toggeLoadingAction();
      try {
        const response = await drawCardFromDeck(deckId);
        const { data: { cards } } = response;
        newCard = {
          ...card,
          code: cards[0].code,
          backSrc: cards[0].image,
          alreadyDrawn: true,
          displayState: 'back',
        };
      } catch (error) {
        setErrorAction(true);
      }
      newDrawAction({ deckId, newCard, index });
      toggeLoadingAction();
    } else {
      // Toggle the clicked card state,
      toggleCardAction({ deckId, index });
    }

    // increase the counter and set the last open card
    setCardDrawCounterAction();

    if (lastOpenCard) {
      // Match the last open cards and this card
      if (newCard.code === lastOpenCard.code) {
        // increase the match counter
        setCardMatchAction();
      } else {
        // if not same then toggle the state to front
        setTimeout(() => {
          toggleCardAction({ deckId, index });
          toggleCardAction({ deckId: lastOpenCard.deckId, index: lastOpenCard.index });
        }, 1000);
      }
    }
    setLastOpenCardAction({ deckId, index });
    return Promise.resolve();
  }

  render() {
    const { deck } = this.props;
    const { deckId, cards } = deck;

    return (
      cards.map((card, cardIndex) => (
        <div className="col-md-4 mb-3" key={card.code}>
          <div className="media" onClick={() => this.onCardClick(deckId, card, cardIndex)} role="button" aria-disabled="true" onKeyDown={() => {}}>
            <img src={(card.displayState === 'front') ? card.frontSrc : card.backSrc} className="align-self-end mr-3 front" alt="" />
          </div>
        </div>
      ))
    );
  }
}

Card.defaultProps = {
  lastOpenCard: null,
};

Card.propTypes = {
  newDrawAction: PropTypes.func.isRequired,
  toggleCardAction: PropTypes.func.isRequired,
  setCardDrawCounterAction: PropTypes.func.isRequired,
  setLastOpenCardAction: PropTypes.func.isRequired,
  setCardMatchAction: PropTypes.func.isRequired,
  toggeLoadingAction: PropTypes.func.isRequired,
  setErrorAction: PropTypes.func.isRequired,
  lastOpenCard: PropTypes.oneOfType([PropTypes.object]),
  deck: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

const mapStateToProps = (state) => ({
  lastOpenCard: state.deck.lastOpenCard,
});


const mapDispatchToProps = {
  newDrawAction: newDraw,
  toggleCardAction: toggleCard,
  setCardDrawCounterAction: setCardDrawCounter,
  setLastOpenCardAction: setLastOpenCard,
  setCardMatchAction: setCardMatch,
  toggeLoadingAction: toggeLoading,
  setErrorAction: setError,
};

const CardContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Card);

export default CardContainer;
