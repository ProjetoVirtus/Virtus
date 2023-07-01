package com.projetovirtus.app.rest.Data;

public class GenderData {

    private Integer genderId;
    private String genderName;

    public GenderData(Integer id, String name) {
        this.genderId = id;
        this.genderName = name;
    }

    public Integer getGenderId() {
        return genderId;
    }

    public String getGenderName() {
        return genderName;
    }
}
