package user.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import user.bean.UserUploadDTO;
import user.service.ObjectStorageService;
import user.service.UserUploadService;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserUploadController {
	@Autowired
	private UserUploadService userUploadService;
	
	@Autowired
	private ObjectStorageService objectStorageService;
	
	private String bucketName="bitcamp-6th-bucket-108";
	
	@PostMapping(path="upload")
	public void upload(@RequestPart("userUploadDTO") UserUploadDTO userUploadDTO,
					   @RequestPart("img") List<MultipartFile> list,
					   HttpSession session) {
		System.out.println("userUploadDTO = " + userUploadDTO);
		System.out.println("list = " + list);
		
		//실제 폴더
		String filePath = session.getServletContext().getRealPath("/public/storage");
		System.out.println("실제 폴더 = " + filePath);
		
		File file;
		String originalFileName;
		String fileName;
		
		//파일명만 모아서 DB로 보내기
		List<UserUploadDTO> userImageList = new ArrayList<>();
		
		for(MultipartFile img : list) {
			originalFileName = img.getOriginalFilename();
			
			//fileName = "none";
			fileName = objectStorageService.uploadFile(bucketName, "storage/", img);
			
			file = new File(filePath, originalFileName); //파일 생성
			
			try {
				img.transferTo(file);
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			UserUploadDTO dto = new UserUploadDTO();
			dto.setImageName(userUploadDTO.getImageName());
			dto.setImageContent(userUploadDTO.getImageContent());
			dto.setImageFileName(fileName); //UUID
			dto.setImageOriginalFileName(originalFileName);
			
			userImageList.add(dto);
		}//for
		
		//DB
		userUploadService.upload(userImageList);
			
	}
	
	@GetMapping(path="uploadList")
	public List<UserUploadDTO> uploadList(){
		return userUploadService.uploadList();
	}
	
	@GetMapping(path = "getUploadImage")
	public UserUploadDTO getUploadImage(@RequestPart("seq") int seq) {
		return userUploadService.getUploadImage(seq);
	}
}
