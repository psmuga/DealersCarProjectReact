import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import _ from 'lodash-es'

class DealersList extends Component {

    componentDidMount() {
    }


    state = {
        selectedDealer: {}
    }

    selectDealer = (dealer) => (evt) => {
        this.props.onDealerSelect(dealer)
        this.setState({selectedDealer: dealer})
    }

    render() {
        const dealersList = _.sortBy(this.props.dealers, ['name']).map(dealer =>
            <ListGroupItem
                active={dealer.id === this.state.selectedDealer.id}
                onClick={this.selectDealer(dealer)}
                key={dealer.id}>
                {dealer.name}
            </ListGroupItem>
        )

        return (
            <div className='dealers-list'>
                <Panel >
                    <Panel.Heading>Dealers</Panel.Heading>
                    <ListGroup className='scrollable'>
                        {dealersList}
                    </ListGroup>
                </Panel>

            </div>
        );
    }
}

DealersList.propTypes = {
    dealers: PropTypes.array.isRequired,
    onDealerSelect: PropTypes.func.isRequired
};

DealersList.defaultProps = {};


export default DealersList;
