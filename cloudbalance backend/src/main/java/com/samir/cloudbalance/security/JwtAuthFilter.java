package com.samir.cloudbalance.security;

import com.samir.cloudbalance.repository.BlacklistedTokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
//    OncePerRequestFilter for JWTAuthentication filter , Prevents duplicate auth

    @Autowired
    public JwtUtil jwtUtil;

    @Autowired
    public BlacklistedTokenRepository blacklistedTokenRepo;

    @Autowired
    private CustomUserDetailsService userDetailsService;


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException{

//        if (request.getServletPath().equals("/logout")) { //Logout should work even if token is expiring
//            filterChain.doFilter(request, response);
//            return;
//        }

        String header = request.getHeader("Authorization");

//                                           with space Otherwise BearerXYZ → passes
        if (header != null && header.startsWith("Bearer ")){

//            7 characters chhod ke uske baad se
            String token = header.substring(7);

            if(blacklistedTokenRepo.existsById(token)){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }



            if (jwtUtil.validateToken(token) &&
                    SecurityContextHolder.getContext().getAuthentication() == null) {

                String email = jwtUtil.extractEmail(token);

                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(email);

                System.out.println("UserDetails : " + userDetails);
                System.out.println("Authority : " + userDetails.getAuthorities());
//                System.out.println("Authority username : " + userDetails.getUsername());

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                auth.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }

        System.out.println("Auth set: " + SecurityContextHolder
                .getContext()
                .getAuthentication());

        filterChain.doFilter(request, response);
    }

}
