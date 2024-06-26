package user.service;

import java.util.List;

import user.bean.UserUploadDTO;

public interface UserUploadService {

	public void upload(List<UserUploadDTO> userImageList);

	public List<UserUploadDTO> uploadList();

	public UserUploadDTO getUploadImage(int seq);

}
