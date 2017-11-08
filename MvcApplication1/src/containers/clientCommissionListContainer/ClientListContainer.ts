
import { connect } from 'react-redux';
import { mapDispatchToProps } from './ClientCommissionListContainer';
import ClientListComponent from '../../components/ClientListComponent/ClientListComponent';

const mapStateToProps = (state) => ({           
    });

export const ClientListContainer = connect(mapStateToProps, mapDispatchToProps)(ClientListComponent);