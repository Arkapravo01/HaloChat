'use client'
import { EmailOutlined, LockOutlined, PersonOutline } from '@mui/icons-material';
import React from 'react';
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { signIn } from "next-auth/react";

const Form = ({ type }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const router = useRouter();

    const onSubmit = async (data) => {
        if (type === "register") {
            const res = await fetch("api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/");
                toast.success("Registration successful!");
            } else {
                toast.error("Something went wrong during registration.");
            }
        }

        if (type === "login") {
            const res = await signIn("credentials", {
                ...data,
                redirect: false
            });

            // Check if signIn was successful
            if (res?.status === 200) {
                router.push("/chats");
                toast.success("Login successful!");
            } else {
                toast.error(res?.error || "Invalid email or password");
            }
        }
    };

    return (
        <div className='auth'>
            <div className='content'>
                <img src='/assets/logo.png' alt='logo' className='logo' />

                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    {type === 'register' && (
                        <>
                            <div className='input'>
                                <input
                                    defaultValue=""
                                    {...register("username", {
                                        required: "Username is required",
                                        validate: (value) => {
                                            if (value.length < 3) {
                                                return "Username must be at least 3 characters"
                                            }
                                        }
                                    })}
                                    type='text' placeholder='Username' className='input-field'
                                />
                                <PersonOutline sx={{ color: "#737373" }} />
                            </div>
                            {errors.username && (
                                <p className='text-red-500'>{errors.username.message}</p>
                            )}
                        </>
                    )}

                    <div className='input'>
                        <input
                            defaultValue=""
                            {...register("email", { required: "Email is required" })}
                            type='email' placeholder='Email' className='input-field'
                        />
                        <EmailOutlined sx={{ color: "#737373" }} />
                    </div>
                    {errors.email && (
                        <p className='text-red-500'>{errors.email.message}</p>
                    )}

                    <div className='input'>
                        <input
                            defaultValue=""
                            {...register("password", {
                                required: "Password is required",
                                validate: (value) => {
                                    if (value.length < 5 || !value.match(/[!@$%^*()_+{}\[\]:;?,.]/)) {
                                        return "Password must be at least 5 characters and contain at least 1 special character"
                                    }
                                }
                            })}
                            type='password' placeholder='Password' className='input-field'
                        />
                        <LockOutlined sx={{ color: "#737373" }} />
                    </div>
                    {errors.password && (
                        <p className='text-red-500'>{errors.password.message}</p>
                    )}

                    <button className='button' type='submit'>
                        {type === "register" ? "Join Free" : "Let's Chat"}
                    </button>

                    {type === 'register' ? (
                        <Link href="/" className="link">
                            <p className='text-center'>Already have an account? Sign in here</p>
                        </Link>
                    ) : (
                        <Link href="/register" className="link">
                            <p className='text-center'>Don't have an account? Register here</p>
                        </Link>
                    )}
                </form>
            </div>
        </div>
    )
}

export default Form;
