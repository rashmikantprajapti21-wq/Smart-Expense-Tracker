package com.learning.springboot.expensetrackerservice.Repo;

import com.learning.springboot.expensetrackerservice.Models.Expense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, UUID> {
    List<Expense> findByUserId(UUID userId);

    @Query("select e from Expense e where e.user.id = :userId")
    Page<Expense> findAllByUserId(UUID userId, PageRequest pageRequest);

    @Query(
        "SELECT SUM(e.amount) " +
        "FROM Expense e " +
        "WHERE e.user.id = :userId AND e.type = 'credited' " +
        "AND YEAR(e.date) = YEAR(CURRENT_DATE) " +
        "AND MONTH(e.date) = MONTH(CURRENT_DATE) " +
        "AND DATE(e.date) <= CURDATE() "
    )
    Long totalCredited(UUID userId);


    @Query(
        "SELECT SUM(e.amount) " +
        "FROM Expense e " +
        "WHERE e.user.id = :userId AND e.type = 'debited' " +
        "AND YEAR(e.date) = YEAR(CURRENT_DATE) " +
        "AND MONTH(e.date) = MONTH(CURRENT_DATE) " +
        "AND DATE(e.date) <= CURDATE() "
    )
    Long totalDebited(UUID userId);

    @Query(
            "SELECT e.category.title AS category, SUM(e.amount) AS total_spent, e.type AS type " +
            "FROM Expense e " +
            "WHERE e.user.id = :userId " +
            "AND MONTH(e.date) = MONTH(CURRENT_DATE) " +
            "AND YEAR(e.date) = YEAR(CURRENT_DATE) " +
            "GROUP BY e.category.title, e.type"
        )
        List<Object[]> totalSpentByCategory(UUID userId);
    @Query(
        "SELECT e FROM Expense e " +
        "WHERE e.user.id = :userId " +
        "AND e.type = 'debited' " +
        "AND e.spentWhere != 'Savings' " +
        "AND YEAR(e.date) = YEAR(CURRENT_DATE) " +
        "AND MONTH(e.date) = MONTH(CURRENT_DATE) " +
        "AND DATE(e.date) <= CURDATE() " +
        "ORDER BY e.amount DESC " +
        "LIMIT 1"
    )
    Expense mostExpensivePurchase(UUID userId);


    @Query(
        "SELECT SUM(e.amount) AS total_amount, DATE(e.date) AS expense_date, e.type " +
        "FROM Expense e " +
        "WHERE e.user.id = :userId " +
        "AND YEAR(e.date) = YEAR(CURRENT_DATE) " +
        "AND MONTH(e.date) = MONTH(CURRENT_DATE) " +
        "AND DATE(e.date) <= CURDATE() " +
        "GROUP BY DATE(e.date), e.type " +
        "ORDER BY DATE(e.date)"
    )
    List<Object[]> dailySpendingInAMonth(UUID userId);
}