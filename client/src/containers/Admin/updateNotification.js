import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { notifRegistration, getHideHeader, clearHideHeader, clearNotifRegistered, getUsers } from '../../actions';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateNotification = ({dispatch,user}) => {

    let validation = { 
        title: { 
            validation:{
                required:true,
                maxLen:100
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        description: { 
            validation:{
                required:true,
                maxLen:100
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        type: { 
            validation:{
                required:true,
                maxLen:100
            },
            valid:true,
            touched:false,
            validationMessage:''
        },
        delay: { 
            validation:{
                required:true
            },
            valid:true,
            touched:false,
            validationMessage:''
        },
        time: { 
            validation:{
                required:true
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        userId: { 
            validation:{
                required:true
            },
            valid:false,
            touched:false,
            validationMessage:''
        },
        active: { 
            validation:{
                required:true,
                defaultValue:0
            },
            valid:false,
            touched:false,
            validationMessage:''
        }
    }

    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [time, setTime] = useState('');
    const [delay, setDelay] = useState('');
    const [active, setActive] = useState('');
    const [userId, setUserId] = useState('');
    const [error, setError] = useState('');
    const [formValidation, setFormValidation] = useState(validation);
    const navigate = useNavigate();


    useEffect(() => {
    
        dispatch(getUsers());
        dispatch(getHideHeader(true));

        if (user && user.notifications && user.notifications.length && id) {
            const current_notif = user.notifications.filter(item=>parseInt(item.userId) === parseInt(id))
            setTitle(current_notif[0].title);
            setDescription(current_notif[0].description);
            setType(current_notif[0].type);
            setDelay(current_notif[0].delay);
            setTime(current_notif[0].time);
            setActive(current_notif[0].active);
        } 

        return () => {
            dispatch(clearHideHeader());
            dispatch(clearNotifRegistered())
        }
    },[id]);

    useEffect(() => {  
           
            if (user && user.register) {
                setTitle('');
                setDescription('');
                setType('');
                setDelay('');
                setTime('');
                setUserId('');
                setActive('');
                navigate('/notifications');
            }  
            
            if (user && user.notify === false) {
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

    const showUsers = (user) => (
        user && user.users && user.users.length ?
            user.users.map(item => (
                item && item.active === 1 && item.id !== user.login.id  && item.role === 'client' ?
                    <option key={item.id} value={item.id}>{item.firstname} {item.lastname}</option>
                    : null
            )) : null
    )


    const submitForm = (event) => {
        event.preventDefault();

        let formValid= true;
        for(let key in formValidation) {
                formValid = formValid && formValidation[key].valid;
        }

        if (formValid) {
            setError('');
            dispatch(notifRegistration({ title,description,type, time,delay, active, userId}, user.notifications && user.notifications.length > 0 ? user.notifications : []));
        } else {
            setError('Form is invalid !');
        }

    }

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

                    <h2>Register Notification</h2>
                    <p>You have to set all notification the customer will receive.</p>
                    <div className='error'>
                        {
                            !user.notify ?
                                <div>
                                    {error}
                                </div>
                                : null
                        }
                    </div>

                <div className={`form_element ${formValidation['title'].touched &&!formValidation['title'].valid  ? ' form_invalid' : ''}`}>
                    <input type="text" placeholder='Title' value={title} 
                     onBlur={handleInputChange(setTitle,'title',true)}
                    onChange={handleInputChange(setTitle,'title',false)} />
                    {formValidation['title'].touched ? showValidation(formValidation['title']) : null}              
                </div>

                <div className={`form_element ${formValidation['description'].touched&&!formValidation['description'].valid  ? ' form_invalid' : ''}`}>
                    <textarea rows="3" placeholder='Description' value={description} 
                    onBlur={handleInputChange(setDescription,'description',true)}
                    onChange={handleInputChange(setDescription,'description',false)} />
                    {formValidation['description'].touched ? showValidation(formValidation['description']) :null}                  
                </div>

                <div className={`form_element ${formValidation['type'].touched&&!formValidation['type'].valid  ? ' form_invalid' : ''}`}>
                    <select value={type} 
                    onBlur={handleInputChange(setType,'type',true)}
                    onChange={handleInputChange(setType,'type',false)}>
                        <option value="" key="0">Type</option>
                        <option value="normal" key="0">Normal</option>
                        <option value="warning" key="1">Warning</option>
                        <option value="critical" key="2">Critical</option>
                    </select>
                    {formValidation['type'].touched ? showValidation(formValidation['type']):null}                   
                </div>

                <div className={`form_element ${formValidation['delay'].touched&&!formValidation['delay'].valid  ? ' form_invalid' : ''}`}>
                    <select value={delay} 
                    onBlur={handleInputChange(setDelay,'delay',true)}
                    onChange={handleInputChange(setDelay,'delay',false)}>
                        <option value="" key="0">Delay</option>
                        <option value="1" key="0">Yes</option>
                        <option value="0" key="1">No</option>
                    </select>
                    {formValidation['delay'].touched ? showValidation(formValidation['delay']):null}                   
                </div>

                <div className={`form_element ${formValidation['time'].touched&&!formValidation['time'].valid  ? ' form_invalid' : ''}`}>
                    <input type="number" placeholder='Time' value={time}
                    onBlur={handleInputChange(setTime,'time',true)}
                    onChange={handleInputChange(setTime,'time',false)} />
                    {formValidation['time'].touched ? showValidation(formValidation['time']) : null}   
                </div>

                <div className={`form_element ${formValidation['userId'].touched && !formValidation['userId'].valid ? ' form_invalid' : ''}`}>
                        <select value={userId}
                            onBlur={handleInputChange(setUserId, 'userId', true)}
                            onChange={handleInputChange(setUserId, 'userId', false)} >
                            <option key="0" value=''>Receiver</option>
                            {showUsers(user)}
                        </select>
                        {formValidation['userId'].touched ? showValidation(formValidation['userId']) : null}
                </div>

                {
                    user.notify ?
                        <div className='error'>
                           {error} 
                        </div>
                        : null
                }

                <button type="submit">Send</button>
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

export default connect(mapStateToProps)(UpdateNotification);