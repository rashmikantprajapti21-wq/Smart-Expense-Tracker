package com.learning.springboot.expensetrackerservice.Controller;

import com.learning.springboot.expensetrackerservice.Models.Expense;
import com.learning.springboot.expensetrackerservice.Service.Expense.ExpenseService;
import com.learning.springboot.expensetrackerservice.Service.Report.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin
@RestController
@RequestMapping("/expenses")
public class ExpenseController {
    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping
    public Optional<List<Expense>> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/{user_id}")
    public Page<Expense> getAllExpensesInSortedWay(@PathVariable UUID user_id, @RequestParam int offset, @RequestParam int pageSize, @RequestParam String field) {
        return expenseService.getAllExpensePaginatedAndSorted(user_id, offset, pageSize, field);
    }

    @PostMapping
    public void addExpense(@RequestBody Expense e){
        expenseService.addExpense(e);
    }

//    @GetMapping("/{userId}")
//    public List<Expense> getExpensesByUserId(@PathVariable UUID userId) {
//        return expenseService.getExpensesByUserId(userId);
//    }
}