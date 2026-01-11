package com.samir.cloudbalance.configuration;

import com.snowflake.snowpark.Session;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.url}")
    private String url;

    @Value("${snowflake.username}")
    private String username;

    @Value("${snowflake.password}")
    private String password;

    @Value("${snowflake.warehouse}")
    private String warehouse;

    @Value("${snowflake.database}")
    private String database;

    @Value("${snowflake.schema}")
    private String schema;

    @Value("${snowflake.role}")
    private String role;

    @Bean
    public Session snowparkSession(){
        Map<String, String> configs = new HashMap<>();
        configs.put("URL", url);
        configs.put("USER", username);
        configs.put("PASSWORD", password);
        configs.put("WAREHOUSE", warehouse);
        configs.put("DB", database);
        configs.put("SCHEMA", schema);
        configs.put("ROLE", role);

        return Session.builder().configs(configs).create();
    }

}
