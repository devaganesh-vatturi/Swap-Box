package com.swapbox.credits.repository;


import com.swapbox.credits.entity.CreditTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CreditTransactionRepository extends JpaRepository<CreditTransaction, Long> {
    List<CreditTransaction> findByUserIdOrderByCreatedAtDesc(Long userId);


    List<CreditTransaction> findByUserId(Long userId);
}