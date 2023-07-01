package com.projetovirtus.app.rest.Services;

import org.springframework.stereotype.Service;

import com.projetovirtus.app.rest.Data.GenderData;
import com.projetovirtus.app.rest.Exception.NotFoundException;

@Service
public class GenderService {

    // Dados fixos relacionado aos gêneros
    public static final GenderData[] ALL_GENDER_DATAS = {
            new GenderData(0, "Não Informado"),
            new GenderData(1, "Masculino"),
            new GenderData(2, "Feminimo"),
            new GenderData(3, "Outros")
    };

    // Retorna todos os gêneros
    public GenderData[] getAllGenders() {
        return ALL_GENDER_DATAS;
    }

    // Retorna um gênero específico pelo id
    public GenderData getGenderById(Integer id) {
        for (GenderData genderData : ALL_GENDER_DATAS) {
            if (genderData.getGenderId().equals(id)) {
                return genderData;
            }
        }

        throw new NotFoundException("Não encontrado o gênero com o id " + id);
    }
}
