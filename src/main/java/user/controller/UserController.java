package user.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import user.bean.UserDTO;
import user.service.UserService;

@CrossOrigin
@RestController
@RequestMapping(path="user")
public class UserController {
	@Autowired
	private UserService userService;
	
	//axios.get()로 요청했기 때문에 @GetMapping 으로 변경
	@GetMapping(path="isExistId")
	public String isExistId(@RequestParam(value="id") String id) {
		System.out.println("들어오니??");
		return userService.isExistId(id);
	}

	@PostMapping(path="write")
	public void write(@ModelAttribute UserDTO userDTO) {
		System.out.println("write");
		userService.write(userDTO);
	}
	
	
	//axios.get()로 요청했기 때문에 @GetMapping 으로 변경
	@GetMapping(value="getUserList")
	public Page<UserDTO> getUserList(
			//page는 0부터 시작, 0이면 1페이지, 1이면 2페이지,...
			@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable) {
		return userService.getUserList(pageable);
	}
	
	@GetMapping(value="getUser")
	public Optional<UserDTO> getUser(@RequestParam(value="id") String id) {
		return userService.getUser(id);
	}
	
	@PutMapping(value="update")
	public void update(@ModelAttribute UserDTO userDTO) {
		userService.update(userDTO);
	}
	
	@DeleteMapping(value="delete")
	public void delete(@RequestParam(value="id") String id) {
		userService.delete(id);
	}
	
	@GetMapping(path="getUserSearchList")
	public Page<UserDTO> getUserSearchList(
			@RequestParam(value="columnName") String columnName,				   
			@RequestParam(value="value") String value,
			@PageableDefault(page=0, size=3, sort="name", direction = Sort.Direction.DESC) Pageable pageable) {
		
		return userService.getUserSearchList(columnName, value, pageable);
	}
	


}














