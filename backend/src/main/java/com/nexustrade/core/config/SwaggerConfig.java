package com.nexustrade.core.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI nexusTradeOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("NexusTrade Core API")
                        .description("REST API for Trading Intelligence Platform with JWT authentication, " +
                                "role-based access control, and asset management")
                        .version("v1.0")
                        .contact(new Contact()
                                .name("NexusTrade Core")
                                .url("https://github.com/shambsinha/nexus-trade-core")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Auth"))
                .schemaRequirement("Bearer Auth", new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("Enter JWT token obtained from /api/v1/auth/login"));
    }
}
