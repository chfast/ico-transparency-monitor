import React, { Component } from 'react';
import '../assets/css/App.css';
import ICO from '../components/ICO';
import ScanBoxLoadingMessage from '../components/ScanBoxLoadingMessage';
import ScanBoxDetails from '../components/ScanBoxDetails';
import { default as config } from '../config.js';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { web3Connection, getLogs } from '../reducers/web3';

class Scan extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLogs(this.props.address);
  }

  render() {

    return (
      <div className="App">
        <div>
          <Grid fluid>
            <Row className="nav-buttons">
              <Col md={6}>
                <div className="back-list">
                  <a href="/"><i className="fa fa-arrow-left" /> Go back to the list </a>
                </div>
              </Col>
              <Col md={6}>
                <div className="next-list">
                  <a href="/">Go back to the list <i className="fa fa-arrow-right" /></a>
                </div>
              </Col>
            </Row>
          </Grid>

          <Grid className="scanbox ico-box-scan">

            {<ICO ico={this.props.ico} isInSingleICOView address={this.props.address} />}
            {!this.props.isShowStats && <ScanBoxLoadingMessage />}
            {this.props.isShowStats && <ScanBoxDetails address={this.props.address} /> }
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const address = props.match.params.name;
  return {
    address,
    ico: config.ICOs[address],
    currencyValue: state.currency.value,
    isShowStats: state.scan.showStats,
    web3: state.modal.web3,
  };
};

const mapDispatchToProps = dispatch => ({
  getLogs: (address) => {
    dispatch(getLogs(address));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scan);
