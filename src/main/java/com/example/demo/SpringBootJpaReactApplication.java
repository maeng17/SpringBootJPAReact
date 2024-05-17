package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = {"user.*", "spring.conf"})
@EntityScan("user.bean")
@EnableJpaRepositories("user.dao")
@SpringBootApplication
public class SpringBootJpaReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootJpaReactApplication.class, args);
	}

}
