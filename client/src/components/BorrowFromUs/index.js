import React from 'react';

const BorrowFromUs = () => {
    return (
        <div>

            <div className='borrow-container-header'>
                <h1>  Personal Loan </h1>
            </div>

            <div className="borrow-container">

                <div className='borrow-card'>
                    <div className='borrow-card-title'>
                        <h1>TOP FEATURES</h1>
                    </div>

                    <div className='borrow-card-body'>
                        <p>
                            <ul>
                                <li>100% digital application with just a few tips.</li>
                                <li>Instant loan approval in minutes</li>
                                <li>You only need your ID or Passport</li>
                                <li>Repayment period of up to 48 months</li>
                            </ul>
                        </p>
                    </div>
                </div>

                <div className='borrow-card'>
                    <div className='borrow-card-title'>
                        <h1>ELIGIBILITY</h1>
                    </div>

                    <div className='borrow-card-body'>
                        <p>
                            <ul>
                                <li>Age: minimum 21 years. Max 60 years.</li>
                                <li>No minimum balance required</li>
                                <li>Eligibility is subject to Banco connect Policy</li>

                            </ul>
                        </p>
                    </div>
                </div>

                <div className='borrow-card'>
                    <div className='borrow-card-title'>
                        <h1>Fees and Charges</h1>
                    </div>

                    <div className='borrow-card-body'>
                        <p>
                            Contact us, we are always available for you, wheter a query or suggestion.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowFromUs;