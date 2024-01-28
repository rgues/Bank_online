import React, { useEffect } from 'react';
import { faArrowDown, faRemove} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { getCodes, archiveCode } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Codes = ({ dispatch, showMore,wallet }) => {

    useEffect(() => {
        dispatch(getCodes());
    }, [dispatch]);

    const loadmore = () => {
        const nbCodes = wallet.codes.length;
        dispatch(getCodes(1,nbCodes,'DESC',wallet.codes));
    }

    const  deleteCode = ({id}) => {
        dispatch(archiveCode(id, wallet.codes));
    }

    const showCodes = (wallet) => (

        wallet && wallet.codes && wallet.codes.length ?
        wallet.codes.map((item,i) => (
                item ? <tr key={i}>
                    <td>{item.codeReference}</td>
                    <td>{item.codeTransfer}</td>
                    <td>{item.amountLimit}</td>
                    <td>{item.currency}</td>
                    <td>
                         <FontAwesomeIcon onClick={() => deleteCode(item)} icon={faRemove}/> 
                    </td>
                   
                </tr> :
                    null
            ))
            : null
    )

    return (
        <div>
            <div className='container-header'>
                <div className='container-title'>
                    <h1>  Manage Transfer code</h1>
                </div>
               
                <div className='btn-generate' >
                    <Link to="/user/wallet/generateCode"> Generate</Link>
                </div>
            </div>

            {
                wallet && wallet.codes && wallet.codes.length ?
                    <div className='current_users'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Reference code</th>
                                    <th>Transfer Code</th>
                                    <th>Max Amount</th>
                                    <th>Currency</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showCodes(wallet)}
                            </tbody>
                        </table>
                    </div> : null
            }

            {showMore && wallet && wallet.codes && wallet.codes.length && wallet.codes.length < wallet.nbCodes &&
                        <div className='loadmore' onClick={loadmore}>
                        <FontAwesomeIcon icon={faArrowDown}  style={{
                            color:'#fff',
                            fontSize:'20px'
                        }}/>
                    </div>
            }

        </div>


    );
};

const mapStateToProps = (state) => {

    return {
        wallet: state.wallet
    }
}

export default connect(mapStateToProps)(Codes);