package spring.conf;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:/naver.properties")
@ConfigurationProperties(prefix="ncp")
@Getter
@Setter
public class NaverConfiguration {
    private String accessKey;
    private String secretKey;
    private String regionName;
    private String endPoint;
}
