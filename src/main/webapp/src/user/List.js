import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import mainImg from '../image/image02.jpg';
import styles from '../css/List.module.css';

const List = () => {
    const { page } = useParams()
    console.log('page = ' + page)

    const [list, setList] = useState([])
    const [pagingHTML, setPagingHTML] = useState([])

    const [columnName, setColumnName] = useState('name')
    const [value, setValue] = useState('')
    
    const [searChList, setSearchList] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        value === ''
            ? 
                axios.get(`http://localhost:8080/user/getUserList?page=${page}`)
                .then(res => {
                    setList(res.data.content)

                    setPagingHTML(Array.from({ length: res.data.totalPages }, (_, index) => index+1))
                    //Array.from() 은 문자열 등 유사 배열(array-list) 객체나 이터러블한 객체를 배열로 만들어주는 메서드이다.

                    console.log(res.data)
                    //res.data를 출력해보면 데이터가 content라는 이름에 들어있는 것을 확인할 수 있더.
                    //  =>스프링 부트에서 page<> 로 리턴했기 때문 

                    //console.log에 결과가 2번 찍히는 것은 index.js에 <React.StrictMode>이 실행되기 때문이다.
                    //  =>index.js에서 <React.StrictMode>에 주석처리 하면 됨
                })
                .catch(error => console.log(error))
        
            :   
                axios.get(`http://localhost:8080/user/getUserSearchList?page=${page}`, { 
                    params: {
                        columnName : columnName,
                        value: value
                    }
                })
                .then( res => {
                    setList(res.data.content)
                    setPagingHTML(Array.from({ length: res.data.totalPages }, (_, index) => index+1))
                    //Array.from() 은 문자열 등 유사 배열(array-list) 객체나 이터러블한 객체를 배열로 만들어주는 메서드이다.
    
                })
                .catch(error => console.log(error))
    }, [page, searChList, columnName, value])

    const onSearchListBtn = (e) => {
        e.preventDefault()
        setSearchList( !searChList )
        navigate('/user/list/0')
    }

    /*
    const onSearchListBtn = (e) => {
        e.preventDefault()

        axios.get(`http://localhost:8080/user/getUserSearchList?page=${page}`, { 
            params: {
                columnName : columnName,
                value: value
            }
        })
        .then( res => {
            setList(res.data.content)
            setPagingHTML(Array.from({ length: res.data.totalPages }, (_, index) => index+1))
            //Array.from() 은 문자열 등 유사 배열(array-list) 객체나 이터러블한 객체를 배열로 만들어주는 메서드이다.

            navigate('/user/list/0')
        })
        .catch(error => console.log(error))
    }
    */
    return (
        <div>
            <input type="hidden" id="page" value={page } />

            <h3>
                <Link to='/'><img src={mainImg} alt='먐몸미' width='50' height='50'/></Link>
            </h3>

            <table border='1' frame='hsides' role='rows'>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>비밀번호</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        list.map(item => {
                            return (
                                <tr key={ item.id }>
                                    <td align='center'>{ item.name }</td>
                                    <td align='center'>
                                        <Link className={styles.idA}
                                            to={`/user/updateForm/${item.id}`}>
                                        { item.id }
                                        </Link>
                                    </td>
                                    <td align='center'>{ item.pwd }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>    
            </table>
            {/* 페이징 처리 */}
            <p style={{width: '650px', textAlign:'center'}}>
                {
                    pagingHTML.map(item => <span key={ item }>
                        {/* page는 userParams()으로 받은 객체라서 parseInt()  사용*/}
                        <Link id={(item-1) === parseInt(page) ? styles.currentPaging : styles.paging }
                            to={`/user/list/${item-1}`}>
                            { item }
                        </Link>
                    </span>)
                }
            </p>
            
            {/* 검색 */}
            <div style={{width: '650px', textAlign:'center'}}>
                <form id="searchListForm">
                    <select name='columnName' style={{width: '100px', margin:5}}
                        onChange={(e)=> setColumnName(e.target.value)}>
                        <option value='name'>이름</option>
                        <option value='id'>아이디</option>
                    </select>&nbsp;
                    <input type="text" name='value' value={value} onChange={(e) => setValue(e.target.value)}/>&nbsp;
                    <button onClick={ onSearchListBtn }>검색</button>
                </form>
            </div>
        </div>
    );
};

export default List;