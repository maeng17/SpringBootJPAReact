import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import cameraImg from '../image/camera.png';
import mainImg from '../image/image02.jpg';

const UploadUpdateForm = () => {

    const {seq} = useParams();
    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName : '',
        imageContent : '',
        imageFileName : '',
        imageOriginalName : ''
    })
    const [files, setFiles] = useState([])
    const imgRef = useRef()
    const navigate = useNavigate();
    
    useEffect(()=>{
        axios.get(`http://localhost:8080/user/getUploadImage?seq=${seq}`)
            .then(res => {
                console.log(res.data)
                setUserUploadDTO(res.data)
            })
            .catch()
    },[])

    const onCamera = () => {
        imgRef.current.click()
    }

    const onInput = (e) => {
        setUserUploadDTO({
            ...userUploadDTO,
            [e.target.name] : e.target.value
        })
    }

    const onUploadSubmit = (e) => {
        e.preventDefault()

        var formData = new FormData()
        {/* 
            formData.append() 사용하여 FormData에 데이터를 추가하는데, 
            new Blob([JSON.stringify(userUploadDTO)], {type: 'application/json}) 부분은
            JSON 데이터를 Blod 객체로 변환하여 FormData에 추가하는 것을 나타낸다

            [JSON.stringify(userUploadDTO)는 javascript 객체인 DTO를 Json 문자열로 변환한다.
            이렇게 하면 객체의 속성과 값을 JSON 형식으로 표현할 수 있다.

            ])  
        */}

        formData.append("seq",seq)
         

        formData.append(
            "userUploadDTO",
             new Blob([JSON.stringify(userUploadDTO)], {type : 'application/json'})
        )
        
        for(var i=0 ; i<files.length ; i++){
            formData.append("img",files[i])
        }
    
        
        console.log(formData)

        axios.put(`http://localhost:8080/user/uploadUpdate?seq=${seq}`, formData, {
            headers : {
                "Content-Type" : 'multipart/form-data'
            }
        })
        .then(res => {
            alert('이미지 업로드 완료')
            navigate('/user/uploadList')
        })
        .catch(error => console.log(error))
    }


    return (
        <div>
            <h3>
                <Link to='/'><img src={ mainImg } alt='먼저놔라' width='50' height='50' /></Link>
            </h3>

            <form id="uploadUpdateForm" >
                <input type="hidden" name="seq" id="seq" />
                <table border="1">
                    <thead></thead>
                    <tbody>
                    <tr>
                        <th>상품명</th>
                        <td>
                            <input type="text" name="imageName" id="imageName" size="35" value={userUploadDTO.imageName} onChange={onInput}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <textarea name="imageContent" id="imageContent" rows="10" cols="50"  value={userUploadDTO.imageContent} onChange={onInput}></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <span id="showImgList">
                                {
                                    <img src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-108/storage/${userUploadDTO.imageFileName}`} width="70" height="70"/>
                                }
                            </span>
                            <img src={cameraImg} id="camera" alt="카메라" width="50" height="50" onClick={onCamera} />
                            <input type="file" name="img" id="img" ref={imgRef} style={{"visibility": "hidden"}} />
                        </td>
                    </tr>

                    <tr>
                        <td colSpan="2" align="center">
                            <input type="button" value="목록" onClick={ () => navigate('/user/upLoadList') }/>&nbsp;
                            <input type="submit" onClick={onUploadSubmit} value="수정" />&nbsp;
                            <input type="reset" value="취소" />
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default UploadUpdateForm;