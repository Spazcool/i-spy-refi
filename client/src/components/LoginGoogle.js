import React from 'react';
import Button from 'react-bootstrap/Button'
import { signInWithGoogle } from "../firebase";

const LoginGoogle = () => <Button onClick={() => signInWithGoogle()}>Googs Sign in</Button>;

export default LoginGoogle;