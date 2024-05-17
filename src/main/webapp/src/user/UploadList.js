import React, { useEffect, useState } from 'react';

import mainImg from '../image/image02.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
const UploadList = () => {
    const [list, setList] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8080/user/uploadList')
            .then(res => setList(res.data))
            .catch(error => console.log(error))
    }, [])
    
    return (
        <div>
            <h3>
                <Link to='/'><img src={ mainImg } alt='먼저놔라' width='50' height='50' /></Link>
            </h3>
            <table border='1'>
                <thead>
                    <th>번호</th>
                    <th>이미지</th>
                    <th>상품명</th>
                </thead>
                <tbody>
                    {
                        list.map(item => <tr key={ item.seq } style={{textAlign: 'center'}}>
                            <td>{ item.seq }</td>
                            <td>
                                <Link to={`/user/uploadUpdateForm/${item.seq}`}>
                                    {/* //컴 내부의 파일
                                        <img src={`../storage/${ item.imageOriginalFileName }`} 
                                            alt={item.imageName} style={{width: 70, height: 70}}/> */}

                                        {/* cloud storage 이미지 로드 */}
                                        {/* imageFileName는 UUID라서 같은 이미지라도 이름이 서로 다르다. */}
                                        <img src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-108/storage/${ item.imageFileName }`} 
                                            alt={item.imageName} 
                                            style={{width: 70, height: 70}}/>
                                </Link>
                            </td>
                            <td>{ item.imageName }</td>
                        </tr>)
                    }
                </tbody>
                


            </table>
           
        </div>
    );
};

export default UploadList;