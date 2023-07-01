package com.projetovirtus.app.rest.ViewObject;

import java.io.Serializable;
import java.util.Date;

import com.projetovirtus.app.rest.Data.GenderData;

public class UserViewObject implements Serializable {
    
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Date birth;
    private Boolean isProfessional;
    private String actuationArea;
    private String OABCode;
    private String phoneNumer;
    private GenderData genderData;
    

    public void setId(Long id) {
        this.id = id;
    }
    public Long getId() {
        return id;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getFirstName() {
        return firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getLastName() {
        return lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getEmail() {
        return email;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }
    public Date getBirth() {
        return birth;
    }

    public void setIsProfessional(Boolean isProfessional) {
        this.isProfessional = isProfessional;
    }
    public Boolean getIsProfessional() {
        return isProfessional;
    }

    public void setActuationArea(String actuationArea) {
        this.actuationArea = actuationArea;
    }
    public String getActuationArea() {
        return actuationArea;
    }

    public void setOABCode(String oABCode) {
        OABCode = oABCode;
    }
    public String getOABCode() {
        return OABCode;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumer = phoneNumber;
    }
    public String getPhoneNumer() {
        return phoneNumer;
    }

    public GenderData getGenderData() {
        return genderData;
    }
    public void setGenderData(GenderData genderData) {
        this.genderData = genderData;
    }
}
