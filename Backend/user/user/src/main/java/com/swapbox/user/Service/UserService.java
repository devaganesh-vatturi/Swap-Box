package com.swapbox.user.Service;



import com.swapbox.user.DTO.*;
import com.swapbox.user.Entity.User;
import com.swapbox.user.Exception.InvalidCredentialsException;
import com.swapbox.user.Exception.ResourceNotFoundException;
import com.swapbox.user.Exception.UserAlreadyExistsException;
import com.swapbox.user.Repository.UserRepository;
import com.swapbox.user.Security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService { // Notice: public class UserService (NOT interface)

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    @Transactional
    public RegisterResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UserAlreadyExistsException("Email is already registered: " + request.getEmail());
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .mobileNumber(request.getMobileNumber())
                .password(passwordEncoder.encode(request.getPassword()))
                .district(request.getDistrict())
                .mandal(request.getMandal())
                .build();

        User savedUser = userRepository.save(user);

        return RegisterResponse.builder()
                .userId(savedUser.getId())
                .email(savedUser.getEmail())
                .message("User registered successfully. Please login to get your authentication token.")
                .build();
    }

    @Transactional(readOnly = true)
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        String token = tokenProvider.generateToken(user.getEmail(), user.getId());
        return new AuthResponse(user.getId(), token, tokenProvider.getExpirationInMs());
    }

    @Transactional(readOnly = true)
    public UserProfileDto getProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return mapToProfileDto(user);
    }

    @Transactional
    public UserProfileDto updateProfile(String email, UserUpdateRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        user.setName(request.getName());
        user.setMobileNumber(request.getMobileNumber());
        user.setDistrict(request.getDistrict());
        user.setMandal(request.getMandal());

        User updatedUser = userRepository.save(user);
        return mapToProfileDto(updatedUser);
    }

    @Transactional(readOnly = true)
    public UserContactDto getUserContact(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        return UserContactDto.builder()
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .build();
    }

    private UserProfileDto mapToProfileDto(User user) {
        return UserProfileDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .mobileNumber(user.getMobileNumber())
                .district(user.getDistrict())
                .mandal(user.getMandal())
                .createdAt(user.getCreatedAt())
                .build();
    }
}