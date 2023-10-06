import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import _ from 'lodash';
import { authActions } from '../Store/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        let emailId = localStorage.getItem('loggedin');
        if (!_.isEmpty(emailId)) {
            navigate("/shop");
        }
    }, []);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    // const submitHandler = (data) => {
    //     // Retrieve signedup users data from local storage
    //     let signedUpUsers = localStorage.getItem('signed_up_users');
    //     signedUpUsers = _.isEmpty(signedUpUsers) ? [] : JSON.parse(signedUpUsers);

    //     let currentUser = _.find(signedUpUsers, (user) => _.get(user, "email") === data.email);
    //     if (_.isEmpty(currentUser)) {
    //         alert('User not registered. Please sign up.');
    //         return;
    //     }
    //     if(!_.isEqual(_.get(currentUser, "password"), _.get(data, "password"))) {
    //         alert('Incorrect password');
    //         return;
    //     }
    //     dispatch(authActions.authStatus(true));

    //     localStorage.setItem('loggedin', _.get(currentUser, "email"));
    //     navigate('/shop');
    // }
    const submitHandler = async (data) => {
        try {
            let signedUpUsers = localStorage.getItem('signed_up_users');
            signedUpUsers = _.isEmpty(signedUpUsers) ? [] : JSON.parse(signedUpUsers);

            let currentUser = _.find(signedUpUsers, (user) => _.get(user, "email") === data.email);
            if (_.isEmpty(currentUser)) {
                toast.error('User not registered. Please sign up.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return;
            }

            if (!_.isEqual(_.get(currentUser, "password"), _.get(data, "password"))) {
                toast.error('Incorrect password', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                return;
            }
            dispatch(authActions.authStatus(true));
            localStorage.setItem('loggedin', _.get(currentUser, "email"));
            toast.success('Login successful!', {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });

            navigate('/shop');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className='login-background'>
        <div className="container py-5 ">
            <h2 className=" mb-3 mx-auto "  style={{ color: 'white' }}>Login</h2>
            <Form
                onSubmit={handleSubmit(submitHandler)}
                className="mx-auto border p-4 shadow-sm p-3 mb-5 bg-body rounded "
                
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
                            Enter correct password.
                        </Form.Text>
                    )}
                    {errors.password?.type === 'maxLength' && (
                        <Form.Text className="text-danger">
                            Enter correct password.
                        </Form.Text>
                    )}
                </Form.Group>
                <Button
                    variant="dark px-5 fw-bold mx-auto d-block w-auto"
                    type="submit"
                >
                    Login
                </Button>
                <div className="text-muted text-center mt-3">
                    Don't have account?
                    <Link to="/signup" className="fw-bold text-decoration-none">Signup</Link>
                </div>
            </Form>
        </div>
        </div>
    );
};

export default Login;





