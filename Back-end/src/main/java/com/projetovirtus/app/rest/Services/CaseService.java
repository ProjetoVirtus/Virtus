package com.projetovirtus.app.rest.Services;

import org.springframework.stereotype.Service;

import com.projetovirtus.app.rest.Data.CaseData;

@Service
public class CaseService {

    // Dados fixos relacionado aos casos
    private static final CaseData[] ALL_CASES = {
        new CaseData(0, "Outros"),
        new CaseData(1, "Família"),
        new CaseData(2, "Consumidor"),
        new CaseData(3, "Previdência"),
        new CaseData(4, "Trabalhista")
    };

    // Retorna todos os casos
    public CaseData[] getAllCases() {
        return ALL_CASES;
    }

    // Retorna um caso específico pelo id
    // Caso não exista, vai retornar "outros"
    public CaseData getCaseById(Integer id) {
        for (CaseData caseData : ALL_CASES) {
            if (caseData.getCaseId().equals(id)) {
                return caseData;
            }
        }

        return ALL_CASES[0];
    }
}