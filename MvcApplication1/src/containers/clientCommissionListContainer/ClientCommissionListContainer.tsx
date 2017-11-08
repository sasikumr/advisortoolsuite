 import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import './ClientCommissionListContainer.css';
import { ApplicationState } from '../../store';
import * as LoaderStore from '../../store/loader';
import {ClientListContainer} from './ClientListContainer';


export class ClientCommissionListContainer extends Component<any, any> {
    componentDidMount() {
        this.props.componentDidMount();
    }  
    render() {
        return (
		<div>
            <ClientListContainer /></div>
        );
    }
}
const mapStateToProps = (state: ApplicationState) => ({   
    isLoading: state.isLoading
})
export const mapDispatchToProps = (dispatch) => ({
    componentDidMount: function () {
		
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ClientCommissionListContainer) as typeof ClientCommissionListContainer;
