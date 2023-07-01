package com.projetovirtus.app.rest.Data;

public class CaseData {

    private Integer caseId;
    private String caseName;

    public CaseData(Integer id, String name) {
        this.caseId = id;
        this.caseName = name;
    }
    
    public Integer getCaseId() {
        return caseId;
    }
    public String getCaseName() {
        return caseName;
    }
}
