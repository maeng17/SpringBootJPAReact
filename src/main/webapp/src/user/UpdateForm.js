import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import mainImg from '../image/image02.jpg';
import styles from '../css/UpdateForm.module.css';



const UpdateForm = () => {
    const { userId } = useParams()

    const [userDTO, setUserDTO] = useState({
        name : '',
        id: userId,
        pwd: ''
    })
    const{name, id, pwd} = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const [reset, setReset] = useState(false)

    const navigate = useNavigate()


    const onInput = (e) => {
        const {name, value} = e.target

        setUserDTO({
            ...userDTO,
            [name] : value
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/user/getUser?id=${id}`)
        .then(res => setUserDTO(res.data))
        .catch(error => console.log(error))

    }, [reset, id])

    const onUpdateSubmit = (e) => {
        e.preventDefault()

        setNameDiv('')
        setPwdDiv('')

        if(name === ''){
            setNameDiv('이름 입력')
        }else if(pwd === ''){
            setPwdDiv('비밀번호 입력')
        }else{
            axios.put('http://localhost:8080/user/update', null, { params : userDTO })
                .then(res => {
                    alert('회원정보가 수정되었습니다')
                    navigate(-1)
                })
                .catch(error => console.log(error))
        }
    }

    const onDeleteSubmit = (e) => {
        e.preventDefault()

        axios.delete(`http://localhost:8080/user/delete?id=${userId}`)
            .then(res => {
                alert('회원정보가 삭제되었습니다')
                navigate('/user/list/0')
            })
            .catch(error => console.log(error))
    }

    const onReset = (e) => {
        e.preventDefault()
        
        setReset( !reset )

        setNameDiv('')
        setPwdDiv('')
    }

    return (
        <div>
            <h3>
                <Link to='/'><img src={mainImg} alt='먐몸미' width='50' height='50'/></Link>
            </h3>
            <form className={styles.updateForm}>

                <table border='1'>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type="text" name="name" value={ name } onChange={ onInput }/>
                                <div id="nameDiv">{ nameDiv }</div>
                            </td>
                        </tr>
                    
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" name="id" value={ id } readOnly />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="password" name="pwd" value={ pwd } onChange={ onInput }/>
                                <div id="pwdDiv">{ pwdDiv }</div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="2" align="center">
                                {/* <button onClick={ (e) => {e.preventDefault(); navigate(-1);} }>목록</button> */}
                                <input type='button' value='목록' onClick={() => navigate(-1)} />&nbsp;
                                <button onClick={ onUpdateSubmit }>수정</button>&nbsp;
                                <button onClick={ onDeleteSubmit }>삭제</button>&nbsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>    
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default UpdateForm;