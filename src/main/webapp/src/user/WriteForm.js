import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from'../css/WriteForm.module.css';
import mainImg from '../image/image02.jpg';


const WriteForm = () => {
    const nameRef = useRef()
    
    const [userDTO, setUserDTO] = useState({
        name : '',
        id: '',
        pwd: ''
    })
    const{name, id, pwd} = userDTO

    const [nameDiv, setNameDiv] = useState('')
    const [idDiv, setIdDiv] = useState('')
    const [pwdDiv, setPwdDiv] = useState('')

    const navigate = useNavigate()

    const onInput = (e) => {
        const {name, value} = e.target

        setUserDTO({
            ...userDTO, //객체인 상태이므로 덮어쓰기 / 배열이라면 추가
            [name] : value
        })
    }

    //아이디 중복체크
    const onIsExistId = () => {
        axios.get(`http://localhost:8080/user/isExistId?id=${id}`)
            .then(res => {
                setIdDiv(res.data === 'exist' ? '사용 불가능' : '사용 가능')
            })
            .catch(error => console.log(error))
    }

    const onWriteSubmit = (e) => {
        e.preventDefault()

        setNameDiv('')
        setIdDiv('')
        setPwdDiv('')

        if(name === ''){
            setNameDiv('이름 입력')
        } else if(id === ''){
            setIdDiv('아이디 입력')
        } else if(pwd === ''){
            setPwdDiv('비밀번호 입력')
        } else if(idDiv === '사용 불가능'){
            setIdDiv('중복체크 하세요')
        } else if(idDiv === '사용 가능'){

            //첫번째
            /*
            axios.post('http://localhost:8080/user/write', null, {
                params: {
                    name: name,
                    id: id,
                    pwd: pwd
                }
            }) 
            .then(res => {
                alert('회원가입 완료');
                navigate('/user/list/0')
            })
            .catch(error => console.log(error))
            */

            //두번째
            axios.post('http://localhost:8080/user/write', null, { params: userDTO }) 
                .then(res => {
                    alert('회원가입 완료');
                    navigate('/user/list/0')
                })
                .catch(error => console.log(error))
        }
    }

    const onReset = (e) => {
        e.preventDefault()
        setUserDTO({
            name : '',
            id: '',
            pwd: ''
        })

        setNameDiv('')
        setIdDiv('')
        setPwdDiv('')

        nameRef.current.focus()
    }

    return (
        <div>
            <h3>
                <Link to='/'><img src={mainImg} alt='먐몸미' width='50' height='50'/></Link>
            </h3>
            <form className={ styles.writeForm }>
                <table border="1">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type="text" name="name" value={ name } onChange={ onInput } ref={ nameRef } />
                                <div id="nameDiv">{ nameDiv }</div>
                            </td>
                        </tr>
                    
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" name="id" value={ id } onChange={ onInput } onBlur={ onIsExistId }/>
                                <div id="idDiv" style={{color: idDiv === '사용 가능' ? 'blue' : 'red'}}>{ idDiv }</div>
                            </td>
                        </tr>
                        
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input type="password" name="pwd" value={ pwd } onChange={ onInput } />
                                <div id="pwdDiv">{ pwdDiv }</div>
                            </td>
                        </tr>
                        
                        <tr>
                            <td colspan="2" align="center">
                                <button onClick={ onWriteSubmit }>등록</button>&nbsp;
                                <button onClick={ onReset }>취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default WriteForm;