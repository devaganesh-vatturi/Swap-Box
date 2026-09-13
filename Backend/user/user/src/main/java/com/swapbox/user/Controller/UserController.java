package com.swapbox.user.Controller;



import com.swapbox.user.DTO.*;
import com.swapbox.user.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        RegisterResponse response = userService.register(request);
        return new ResponseEntity<RegisterResponse>(response, HttpStatus.CREATED);
    }
    @GetMapping("/test")
    public String test() {
        return "USER SERVICE REACHED";
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        System.out.println(request);
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getProfile(authentication.getName()));
    }

    @PutMapping("/me")
    public ResponseEntity<UserProfileDto> updateProfile(Authentication authentication,
                                                        @Valid @RequestBody UserUpdateRequest request) {
        return ResponseEntity.ok(userService.updateProfile(authentication.getName(), request));
    }

    @GetMapping("/{userId}/contact")
    public ResponseEntity<UserContactDto> getUserContact(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserContact(userId));
    }
}