import React, { useState } from 'react';
import '../../styles/account.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { changeAccount } from '../../api/AccountApi';

const Account = () => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(e.target.name);
        console.log(e.target.value);
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const clickSubmit = async () => {
        try {
            console.log('data: ', formData);
            if (!formData.newName || !formData.password)
                toast.error('fill the all blanks!')
            else {
                await toast.promise(changeAccount(formData),
                    {
                        loading: 'Saving...',
                        success: <b>Successfully Changed!</b>,
                        error: <b>Could not perform.</b>,
                    })
                navigate('/game');
            }
        } catch (error) {
            toast.error(error);
        }
    };
    return (
        <div className="security">
            <div className="custom--card section-bg">
                <div className="card--body section-bg p-sm-5 p-3">
                    <div className="reset-header mb-5 text-center">
                        <div className="iconImg"><i className="fa fa-user icon"></i></div>
                        <h3 className="mt-3">Reset Account</h3>
                        <p>Enter your current username and new username</p>
                    </div>
                    <form autoComplete="off">
                        <div className="form-group mb-3">
                            <label className="form-label">New User Name</label>
                            <input type="string" className="form-control form--control" name="newName" autoComplete="off" onChange={handleChange} required />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control form--control" name="password" autoComplete="off" onChange={handleChange} required />
                        </div>

                        <div className="form-group mt-4">
                            <div className="cmn--btn active w-100" onClick={clickSubmit}>Change User Name</div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Account;