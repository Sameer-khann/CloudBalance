package com.samir.cloudbalance.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

//    public static final String SECRET_KEY = "SameerKhanIsAFullStackDeveloperAtCloudKeeper";
//
//    public static final long EXP_TIME = 1000 * 60 * 60 * 2;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXP_TIME;

    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String email, String role){

        System.out.println("JWT exp time : " + EXP_TIME);

        return Jwts.builder()
                .setSubject(email)
//                .claim("role", role)
                .claim("authorities", List.of("ROLE_" + role))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXP_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    public String extractEmail(String token){

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractRole(String token){

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
//        .get("authorities", List.class);
    }

    public boolean validateToken(String token){

        try{
            extractEmail(token);
            return true;
        }
//        catch (JwtException | IllegalArgumentException e)
        catch (Exception e){
            return false;
        }
    }

    public Instant extractExpiry(String token){

        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .toInstant();
    }
}
