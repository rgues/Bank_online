import React, { useEffect, useState } from 'react';
import { faEye} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { userRegister, getRoles, getHideHeader, clearHideHeader, clearRegisterAndUpdate } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

const Register = ({dispatch,user}) => {

    let validation = { 
        firstname: { 
            validation:{
                required:true,
                maxLen:100
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        lastname: { 
            validation:{
                required:true,
                maxLen:100
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        address: { 
            validation:{
                required:false,
                maxLen:100
            },
            valid:true,
            touched:false,
            validationMessage:''
        },
        phone: { 
            validation:{
                required:false,
                pattern:/^[0-9](?:[- ]?[0-9]){5,15}$/
            },
            valid:true,
            touched:false,
            validationMessage:''
        },
        accountNumber: { 
            validation:{
                required:true,
                pattern:/^[0-9]{1,11}$/
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        role: { 
            validation:{
                required:true,
                maxLen:256
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        email: { 
            validation:{
                required:true,
                pattern:/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/,
                maxLen:100
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        password: { 
            validation:{
                required:true,
                minLen:6,
                maxLen:25
            },
            valid:false,
            touched:false,
            validationMessage:''
        }
    }

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formValidation, setFormValidation] = useState(validation);
    const navigate = useNavigate();

    useEffect(() => {
    
        dispatch(getRoles());
        dispatch(getHideHeader(true));

        return () => {
            dispatch(clearHideHeader());
            dispatch(clearRegisterAndUpdate())
        }
    },[]);

    useEffect(() => {  
           
            if (user && user.register) {
                setFirstname('');
                setLastname('');
                setAccountNumber('');
                setRole('');
                setAddress('');
                setEmail('');
                setPassword('');
                setPhone('');
                navigate('/user');
            }  
            
            if (user && user.register === false) {
                setError(user.message)
            }
    })

    const validateForm = (inputName,value) => {

        const input = formValidation[inputName];
        let error = [true,''];

        if (input.validation.maxLen) {
            const valid = value.length <= input.validation.maxLen;
            const message = `${ !valid ? `Must be less than ${input.validation.maxLen}`:''}`
            error = valid ? error : [valid,message]
        }

        if (input.validation.pattern) {
            const valid = input.validation.pattern.test(value);
            const message = `${ !valid ? `This fiels is incorrect`:''}`
            error = valid ? error : [valid,message]
        }

        if (input.validation.minLen) {
            const valid = value.length >= input.validation.minLen;
            const message = `${ !valid ? `Must be greather than ${input.validation.minLen}`:''}`
            error = valid ? error : [valid,message]
        }

        if (input.validation.required) {
            const valid = value.trim() !=='' ;
            const message = `${ !valid ? `This field is required !`:''}`
            error = valid ? error : [valid,message]
        }

       return error;
    }

    const showValidation = (data) => {
        let errorMessage = null;
        if(data.validation &&!data.valid) {
            errorMessage = (
                <div className="error">
                    {data.validationMessage }
                </div>
            )
        }
        return errorMessage;
    }


    const handleInputChange = (setState,inputName,blur) => (event) => {
        
        const newFormValidation = formValidation;

        if (blur) {
            let validData =validateForm(inputName,event.target.value);
            newFormValidation[inputName].valid = validData[0];
            newFormValidation[inputName].validationMessage = validData[1];
        }

        newFormValidation[inputName].touched = blur; 
        setState(event.target.value);
        setFormValidation(newFormValidation);
       
    }

    const submitForm = (event) => {
        event.preventDefault();

        let formValid= true;
        for(let key in formValidation) {
                formValid = formValid && formValidation[key].valid;
        }

        if (formValid) {
            setError('');
            dispatch(userRegister({ firstname,accountNumber,role, phone,address, lastname, email, password }, user.users && user.users.length > 0 ? user.users : []));
        } else {
            setError('Form is invalid !');
        }

    }

    const  showHidePassord = () =>{
        showPassword ? setShowPassword(false) : setShowPassword(true) ; 
    }

    const showRoles = (user) => (
       user && user.roles  && user.roles.length ? 
        user.roles.map((item,i) =>(
            item ?  
                <option key={i} value={item.slug}>{item.title}</option>
            :null
        )):null
    )

    return (
        
        <div className='auth-container' style={{
            background: `url(/images/worldwide.jpg)`,
            backgroundRepeat:'no-repeat !important',
            backgroundSize:'cover',
        }}>

        <div className="equity-brand-ads" style={{
            background: `url(/images/banco_brand.png)`
        }}>
        
        </div>

        <div className='rl_container registration'>

            <form onSubmit={submitForm}  >

                    <h2>Create account</h2>
                    <p>Enter the registration detail. Give credentials to user when it's done.</p>
                    <div className='error'>
                        {
                            !user.register ?
                                <div>
                                    {error}
                                </div>
                                : null
                        }
                    </div>

                <div className={`form_element ${formValidation['firstname'].touched &&!formValidation['firstname'].valid  ? ' form_invalid' : ''}`}>
                    <input type="text" placeholder='Firstname' value={firstname} 
                     onBlur={handleInputChange(setFirstname,'firstname',true)}
                    onChange={handleInputChange(setFirstname,'firstname',false)} />
                    {formValidation['firstname'].touched ? showValidation(formValidation['firstname']) : null}              
                </div>

                <div className={`form_element ${formValidation['lastname'].touched&&!formValidation['lastname'].valid  ? ' form_invalid' : ''}`}>
                    <input type="text" placeholder='Lastname' value={lastname} 
                    onBlur={handleInputChange(setLastname,'lastname',true)}
                    onChange={handleInputChange(setLastname,'lastname',false)} />
                    {formValidation['lastname'].touched ? showValidation(formValidation['lastname']) :null}                  
                </div>

                <div className={`form_element ${formValidation['email'].touched&&!formValidation['email'].valid  ? ' form_invalid' : ''}`}>
                    <input type="email" placeholder='Email' value={email}
                    onBlur={handleInputChange(setEmail,'email',true)}
                    onChange={handleInputChange(setEmail,'email',false)} />
                    {formValidation['email'].touched ? showValidation(formValidation['email']) : null}   
                </div>

                <div className={`form_element ${formValidation['phone'].touched&&!formValidation['phone'].valid  ? ' form_invalid' : ''}`}>
                    <input type="tel" placeholder='Phone number' value={phone}
                     onBlur={handleInputChange(setPhone,'phone',true)}
                     onChange={handleInputChange(setPhone,'phone',false)} />
                    {formValidation['phone'].touched ? showValidation(formValidation['phone']) : null}   
                </div>

                <div className={`form_element ${formValidation['address'].touched&&!formValidation['address'].valid  ? ' form_invalid' : ''}`}>
                    <input type="text" placeholder='Address' value={address}
                     onBlur={handleInputChange(setAddress,'address',true)}
                     onChange={handleInputChange(setAddress,'address',false)} />
                    {formValidation['address'].touched ? showValidation(formValidation['address']) : null}   
                </div>
                <div className={`form_element ${formValidation['accountNumber'].touched&&!formValidation['accountNumber'].valid  ? ' form_invalid' : ''}`}>
                    <input type="number" placeholder='Account Number' value={accountNumber} 
                    onBlur={handleInputChange(setAccountNumber,'accountNumber',true)}
                    onChange={handleInputChange(setAccountNumber,'accountNumber',false)} />
                    {formValidation['accountNumber'].touched ? showValidation(formValidation['accountNumber']) : null}                   
                </div>


                <div className={`form_element ${formValidation['role'].touched&&!formValidation['role'].valid  ? ' form_invalid' : ''}`}>
                    <select value={role} 
                    onBlur={handleInputChange(setRole,'role',true)}
                    onChange={handleInputChange(setRole,'role',false)}>
                        <option value="" key="0">Role</option>
                        {showRoles(user)}
                    </select>
                    {formValidation['role'].touched ? showValidation(formValidation['role']):null}                   
                </div>

                <div className={`form_element ${formValidation['password'].touched&&!formValidation['password'].valid  ? ' form_invalid' : ''}`}>
                    <input type={!showPassword ? 'password' : 'text'} placeholder='Password' value={password} 
                    onBlur={handleInputChange(setPassword,'password',true)}
                    onChange={handleInputChange(setPassword,'password',false)} />
                    <FontAwesomeIcon onClick={showHidePassord} icon={faEye} style={{
                        color:'#a32a29',
                        fontSize:'1.5rem'
                    }}/>
                    {formValidation['password'] ? showValidation(formValidation['password']) : null}   
                </div>

                {
                    user.register ?
                        <div className='error'>
                           {error} 
                        </div>
                        : null
                }

                <button type="submit">Add user</button>
            </form>

            </div>
        </div>

    );
};

const mapStateToProps = (state) => {

    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Register);