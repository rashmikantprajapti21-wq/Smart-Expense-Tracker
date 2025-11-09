package com.learning.springboot.expensetrackerservice.Service.Report;

import com.learning.springboot.expensetrackerservice.Models.Expense;

import java.util.List;
import java.util.UUID;

public interface ReportService {
    Long totalDebited(UUID userId);
    Long totalCredited(UUID user_id);
    List<Object[]> categoryWiseSpend(UUID user_id);
    Long currentBalance(UUID userId);
    Expense mostExpensivePurchase(UUID userId);
    List<Object[]> dailySpendingInAMonth(UUID userId);
}
