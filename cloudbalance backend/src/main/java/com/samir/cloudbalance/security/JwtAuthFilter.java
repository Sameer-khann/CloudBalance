package com.samir.cloudbalance.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    public JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException{

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer")){

//            7 characters chhod ke uske baad se
            String token = header.substring(7);

            if(jwtUtil.validateToken(token) && SecurityContextHolder.getContext().getAuthentication() == null){

                String email = jwtUtil.extractEmail(token);

                UsernamePasswordAuthenticationToken auth =
//                        new UsernamePasswordAuthenticationToken(email, null, null);
                        new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());

                auth.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }

        filterChain.doFilter(request, response);
    }

}
