import { User } from "@prisma/client"
import { STATUS_CODES } from "http";
import { type } from "os";
import { useReducer } from "react";
import { UserNormalized } from "../../../../model/User";
import { api } from "../../../../services/api";

export type TypeFormData = {
        name: string,
        socialName: string, 
        nickname: string,
        birthDate: string,
        occupation: string,
        motherName: string,
        fatherName: string,
        cpf: string,
        documentTypeId: number,
        documentNumber: string,
        countryId?: number,
        cep?: string,
        stateId?: string,
        cityId?: string,
        addressLine1: string,
        addressLine2: string,
        alternativeEmail:  string,
        telegram: string,
        whatsapp: string,
        facebook: string,
        instagram: string,
        github: string,
        linkedin: string,
        bio: string
}

export function populateFormWithDataUser(user: UserNormalized) {
    const formData = {
        name: user.name,
        socialName: user.socialName, 
        nickname: user.nickname,
        birthDate: user.birthDate?.substring(0,10),
        occupation: user.occupation,
        motherName: user.motherName,
        fatherName: user.fatherName,
        cpf: user.cpf,
        documentTypeId: user.documentTypeId,
        documentNumber: user.documentNumber,
        countryId: 33,
        cep: user.cep,
        stateId: user.city?.state?.uf,
        cityId: user.cityId as unknown as string,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        alternativeEmail: undefined,
        telegram: undefined,
        whatsapp: undefined,
        facebook: undefined,
        instagram: undefined,
        github: undefined,
        linkedin: undefined,
        bio: user.bio,
    };
    return formData as TypeFormData;
}


export async function getDataDBtoForm() {
    const contries = await api.get('model/country/get-countries');
    const states = await api.get('model/state/get-states');
    const typeDocuments =  [{id:1, name:'Carteira de Identidade'},{id:2, name:'CNH'},{id:3, name:'Passaporte'}];
    let statesFromDB = states.data;
    function compare(a,b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
        }
    statesFromDB.sort(compare);
    return { countries: contries.data, states: statesFromDB, typeDocuments: typeDocuments};
}