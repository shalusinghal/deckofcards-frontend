import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const HighScore = (props) => {
  const { highScoreList } = props;
  let renderList = (
    <tr>
      <th colSpan="3" className="text-center">No data available</th>
    </tr>
  );

  if (highScoreList.length > 0) {
    renderList = highScoreList.map((score, index) => (
      <tr key={`${score.turn}_${score.name}`}>
        <th scope="row">{index + 1}</th>
        <td>{score.turn}</td>
        <td>{score.name}</td>
      </tr>
    ));
  }
  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <h3>High Score List</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Turn</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {renderList}
          </tbody>
        </table>
      </div>
    </div>
  );
};

HighScore.propTypes = {
  highScoreList: PropTypes.oneOfType([PropTypes.array]).isRequired,
};

const mapStateToProps = (state) => ({
  highScoreList: state.highScore.highScoreList,
});

const mapDispatchToProps = {};

const HighScoreContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HighScore);

export default HighScoreContainer;
