import { EmailOutlined, LockOutlined, Person, PersonOutline } from '@mui/icons-material';
import React from 'react';
import Link from "next/link";

const Form=({type})=>{
    return(
        <div className='auth'>
            <div className='cotent'>
                <img src='/assets/logo.png' alt='logo'className='logo'/>
                <form className='form'>
                    {type==='register' && (
                        <div>
                            <input type='text' placeholder='Username' className='input-field'
                            />
                            <PersonOutline sx={{color:"#737373"}}/>
                        </div>)
                        }

                        <div className='input'>
                            <input type='email' placeholder='Email' className='input-field'
                            />
                            <EmailOutlined sx={{color:"#737373"}}/>
                        </div>

                        <div className='input'>
                            <input type='password' placeholder='Password' className='input-field'
                            />
                            <LockOutlined sx={{color:"#737373"}}/>
                        </div>

                        <button className='button' type='submit'>
                            {type==="register" ? "Join Free" : "Let's Chat"}
                        </button>

                        {type==='register' ? (
                            <Link href="/" className="link">
                            <p className='text-center'>Already have an account ? Sign up here</p>
                            </Link>
                        ) : <Link href="/register" className="link">
                        <p className='text-center'>Don't have an account ? Register here</p>
                        </Link>}
                </form>
            </div>
        </div>
    )
}

export default Form

