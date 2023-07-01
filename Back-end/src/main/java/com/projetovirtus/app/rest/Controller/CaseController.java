package com.projetovirtus.app.rest.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projetovirtus.app.rest.Data.CaseData;
import com.projetovirtus.app.rest.Services.CaseService;

@RestController
@RequestMapping("/case")
public class CaseController {

    // Injeção do serviço na classe
    @Autowired
    private CaseService caseService;

    // Lista todos os casos
    @GetMapping
    public ResponseEntity<?> listAllCases() {
        CaseData[] listOfCases = caseService.getAllCases();
        return ResponseEntity.status(HttpStatus.OK).body(listOfCases);
    }

    // Retorna um caso específico pelo id
    @GetMapping("/{caseId}")
    public ResponseEntity<?> getCaseById(@PathVariable Integer caseId) {
        CaseData caseData = caseService.getCaseById(caseId);
        return ResponseEntity.status(HttpStatus.OK).body(caseData);
    }
}
