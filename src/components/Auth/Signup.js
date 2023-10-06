import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.module.css';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useEffect } from 'react';
import { authActions } from '../Store/auth';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    // const submitHandler = (data) => {
    //     let signedUpUsers = localStorage.getItem('signed_up_users');
    //     signedUpUsers = _.isEmpty(signedUpUsers) ? [] : JSON.parse(signedUpUsers);
    //     signedUpUsers.push(data);
    //     localStorage.setItem('signed_up_users', JSON.stringify(signedUpUsers));
    //     dispatch(authActions.authStatus(true));
    //     navigate('/shop');
    // };
    const submitHandler = (data) => {
        try {
            let signedUpUsers = localStorage.getItem('signed_up_users');
            signedUpUsers = _.isEmpty(signedUpUsers) ? [] : JSON.parse(signedUpUsers);

            const isEmailRegistered = _.some(signedUpUsers, (user) => _.get(user, 'email') === data.email);

            if (isEmailRegistered) {
                toast.error('Email is already registered. Please log in.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {

                signedUpUsers.push(data);
                localStorage.setItem('signed_up_users', JSON.stringify(signedUpUsers));
                toast.success('Signup successful!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });

                dispatch(authActions.authStatus(true));
                navigate('/shop');
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        let emailId = localStorage.getItem('loggedin');
        if (!_.isEmpty(emailId)) {
            navigate("/shop");
        }
    }, []);
    return (
        <div className='signup-background'>

        
        <div className="container py-5">
            <h2 className=" mb-3 mx-auto " style={{ color: 'white' }}>Signup</h2>
            <Form
                onSubmit={handleSubmit(submitHandler)}
                className="mx-auto border p-4  shadow-sm p-3 mb-5 bg-body rounded"
                
            >

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register('email', { required: true })}
                        aria-invalid={errors.email ? true : false}
                        className=""
                    />
                    {errors.email?.type === 'required' && (
                        <Form.Text className="text-danger">
                            Email is required.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        {...register('username', { required: true })}
                        aria-invalid={errors.username ? true : false}
                    />
                    {errors.username?.type === 'required' && (
                        <Form.Text className="text-danger">
                            username is required.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        {...register('phone', {
                            required: true,
                            minLength: 10,
                        })}
                        aria-invalid={errors.phone ? 'true' : 'false'}
                    />
                    {errors.phone?.type === 'required' && (
                        <Form.Text className="text-danger">
                            Phone Number is required.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register('password', {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                        })}
                        aria-invalid={errors.password ? 'true' : 'false'}
                    />
                    {errors.password?.type === 'required' && (
                        <Form.Text className="text-danger">
                            password is required.
                        </Form.Text>
                    )}
                    {errors.password?.type === 'minLength' && (
                        <Form.Text className="text-danger">
                            minLength is 8 characters.
                        </Form.Text>
                    )}
                    {errors.password?.type === 'maxLength' && (
                        <Form.Text className="text-danger">
                            maxLength is 20 characters.
                        </Form.Text>
                    )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register('confPassword', {
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return 'Your passwords is not match';
                                }
                            },
                        })}
                        aria-invalid={errors.confPassword ? 'true' : 'false'}
                    />
                    {errors.confPassword?.type === 'validate' && (
                        <Form.Text className="text-danger">
                            password is not match.
                        </Form.Text>
                    )}
                </Form.Group>
                <Button
                    variant="dark px-5 fw-bold mx-auto d-block w-auto"
                    type="submit"
                >
                    Signup
                </Button>
                <div className="text-muted text-center mt-3">
                    Already have account?
                    <Link to="/login" className="fw-bold text-decoration-none"> Login</Link>
                </div>
            </Form>
        </div>
        </div>
    );
};

export default Signup;


