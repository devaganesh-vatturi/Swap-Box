package com.swapbox.credits.repository;


import com.swapbox.credits.entity.UserCredit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCreditRepository extends JpaRepository<UserCredit, Long> {
    Optional<UserCredit> findByUserId(Long userId);
}