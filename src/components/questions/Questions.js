import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router'
import { Col, Row } from 'antd';
import Table from './Table';

class MainPage extends Component {

    render() {
        return (
            <div>
                <Table />
            </div>
        );
    }
}

export default MainPage;