import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from './card/Card';

const DeckContainer = (props) => {
  const { decks } = props;
  const renderContainer = decks.map((deck, index) => {
    const { deckId } = deck;
    return (
      <div className="col-md-6" key={deckId}>
        <h4>Deck { index + 1 }</h4>
        <div className="row">
          <Card deck={deck} />
        </div>
      </div>
    );
  });

  return (
    <div className="row mt-3">
      { renderContainer }
    </div>
  );
};

DeckContainer.propTypes = {
  decks: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

const mapStateToProps = (state) => ({
  decks: state.deck.decks,
});


const mapDispatchToProps = {};

const DeckContainerConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckContainer);

export default DeckContainerConnect;
