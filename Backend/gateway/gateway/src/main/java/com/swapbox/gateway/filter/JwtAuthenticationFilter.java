package com.swapbox.gateway.filter;

import com.swapbox.gateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtUtil jwtUtil;

    // Endpoints that do not require JWT
    private static final List<String> EXCLUDED_PATHS = List.of(
            "/users/register",
            "/users/login"
    );


    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            WebFilterChain chain) {
        System.out.println("========== GATEWAY FILTER HIT ==========");

        ServerHttpRequest request = exchange.getRequest();

        // Allow CORS preflight requests
        if (request.getMethod().name().equals("OPTIONS")) {
            return chain.filter(exchange);
        }




        // 1. Get request path
        String path = request.getURI().getPath();
        System.out.println("Gateway path: " + path);

        // 2. Allow public endpoints
        if (isExcluded(path)) {
            System.out.println("Gateway path: " + path);
            return chain.filter(exchange);
        }

        // 3. Get Authorization header
        String authHeader =
                request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        System.out.println("Authorization header: " + authHeader);





        // 4. Check Authorization header
        if (!StringUtils.hasText(authHeader)) {
            return unauthorized(exchange);
        }

        // 5. Check Bearer format
        if (!authHeader.startsWith("Bearer ")) {
            return unauthorized(exchange);
        }

        // 6. Extract JWT
        String token = authHeader.substring(7);

        // 7. Validate JWT
        if (!jwtUtil.validateToken(token)) {
            return unauthorized(exchange);
        }

        // 8. Extract claims
        Claims claims = jwtUtil.getAllClaimsFromToken(token);

        String userId = String.valueOf(
                claims.get("userId")
        );



        String email = claims.getSubject();

        // 9. Add authenticated user information
        ServerHttpRequest modifiedRequest = request.mutate()
                .headers(headers -> {
                    // Remove client-supplied values
                    headers.remove("X-User-Id");
                    headers.remove("X-User-Email");
                })
                .header("X-User-Id", userId)
                .header("X-User-Email", email)
                .build();

        // 10. Create modified exchange
        ServerWebExchange modifiedExchange =
                exchange.mutate()
                        .request(modifiedRequest)
                        .build();

        // 11. Continue request
        return chain.filter(modifiedExchange);
    }

    private boolean isExcluded(String path) {

        return EXCLUDED_PATHS.stream()
                .anyMatch(path::startsWith);
    }

    private Mono<Void> unauthorized(
            ServerWebExchange exchange) {

        exchange.getResponse()
                .setStatusCode(HttpStatus.UNAUTHORIZED);

        return exchange.getResponse().setComplete();
    }
}