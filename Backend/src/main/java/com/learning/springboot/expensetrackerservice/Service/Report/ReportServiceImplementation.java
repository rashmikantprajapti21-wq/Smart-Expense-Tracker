package com.learning.springboot.expensetrackerservice.Service.Report;

import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Models.User;
import com.learning.springboot.expensetrackerservice.Repo.ExpenseRepo;
import com.learning.springboot.expensetrackerservice.Repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReportServiceImplementation implements ReportService {
    private final ExpenseRepo expenseRepo;
    private final UserRepo userRepo;

    public ReportServiceImplementation(ExpenseRepo expenseRepo, UserRepo userRepo) {
        this.expenseRepo = expenseRepo;
        this.userRepo = userRepo;
    }

    @Override
    public Long totalDebited(UUID userId) {
        return expenseRepo.totalDebited(userId);
    }

    @Override
    public Long totalCredited(UUID user_id) {
        return expenseRepo.totalCredited(user_id)!=null ? expenseRepo.totalCredited(user_id) : 0L;
    }

    @Override
    public List<Object[]> categoryWiseSpend(UUID user_id) {
        return expenseRepo.totalSpentByCategory(user_id);
    }

    @Override
    public Long currentBalance(UUID userId){
        Long credit=expenseRepo.totalCredited(userId);
        if(credit==null)
            credit=0L;
        Long debit=expenseRepo.totalDebited(userId);
        if(debit==null)
            debit=0L;
        Long salary=0L;

        Optional<User> userOptional = userRepo.findById(userId);
        if (userOptional.isPresent()) {
            salary = userOptional.get().getSalary();
        }
        return salary+credit-debit;
    }

    @Override
    public Expense mostExpensivePurchase(UUID userId){
        return expenseRepo.mostExpensivePurchase(userId);
    }

    @Override
    public List<Object[]> dailySpendingInAMonth(UUID userId) {
        return expenseRepo.dailySpendingInAMonth(userId);
    }
}
