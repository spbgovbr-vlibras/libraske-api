import '../index';

import User from "../../models/User";
import { createConnection } from "typeorm";
import Personalization from '../../models/Personalization';
import PersonalizationGroup from '../../models/PersonalizationGroup';
import PersonalizationColor from '../../models/PersonalizationColor';


async function run() {

    const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "libraske",
        entities: [
            User,
            Personalization,
            PersonalizationGroup,
            PersonalizationColor
        ],
        synchronize: true,
        logging: true
    });

    const userRepository = connection.getRepository(User);
    const personalizationRepository = connection.getRepository(Personalization);
    const personalizationGroupRepository = connection.getRepository(PersonalizationGroup);
    const personalizationColorRepository = connection.getRepository(PersonalizationColor);


    /*
    *   Usuário padrão
    */
    await userRepository.save({ id: 1, cpf: "12345678900", name: "SYSTEM", email: "system@libraske.ufpb.br", profilePhoto: "", refreshToken: null, credit: 0 });

    /*
    *   Grupos de personalização
    */

    await personalizationRepository.save({ id: 1, name: "camisa", user_id: 1, description: "", price: 500 });
    await personalizationRepository.save({ id: 2, name: "cabelo", user_id: 1, description: "", price: 500 });


    /*
    *   Grupos de Cores para Camisa
    */
    await personalizationGroupRepository.save({ id: 1, name: "Grupo Camisa Vermelho",  personalization_id: 1, price: 500 });
    await personalizationGroupRepository.save({ id: 2, name: "Grupo Camisa Azul"    ,  personalization_id: 1, price: 500 });
    await personalizationGroupRepository.save({ id: 3, name: "Grupo Camisa Verde"   ,  personalization_id: 1, price: 500 });


    /*
    *   Grupos de cores para Cabelo
    */
    await personalizationGroupRepository.save({ id: 4, name: "Grupo Cabelo Vermelho",  personalization_id: 2, price: 500 });
    await personalizationGroupRepository.save({ id: 5, name: "Grupo Cabelo Azul"    ,  personalization_id: 2, price: 500 });
    await personalizationGroupRepository.save({ id: 6, name: "Grupo Cabelo Verde"   ,  personalization_id: 2, price: 500 });


    /*
    *   Criação de cores e vinculo com os grupos para Camisa
    */

    // Vermelho
    await personalizationColorRepository.save({ personalization_group_id: 1, code: "#ff5e68", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 1, code: "#ff2937", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 1, code: "#94000a", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 1, code: "#f22634", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 1, code: "#ff8088", isDefault: false });

    // BLUE
    await personalizationColorRepository.save({ personalization_group_id: 2, code: "#8280ff", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 2, code: "#4a47ff", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 2, code: "#221fff", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 2, code: "#0400d6", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 2, code: "#03009e", isDefault: false });

    // GREEN
    await personalizationColorRepository.save({ personalization_group_id: 3, code: "#47ff66", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 3, code: "#1fff44", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 3, code: "#00f529", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 3, code: "#00c721", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 3, code: "#008f18", isDefault: false });


    /*
    *   Criação de cores e vinculo com os grupos para Cabelo
    */

    // Vermelho
    await personalizationColorRepository.save({ personalization_group_id: 4, code: "#ff5e68", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 4, code: "#ff2937", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 4, code: "#94000a", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 4, code: "#f22634", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 4, code: "#ff8088", isDefault: false });

    // BLUE
    await personalizationColorRepository.save({ personalization_group_id: 5, code: "#8280ff", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 5, code: "#4a47ff", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 5, code: "#221fff", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 5, code: "#0400d6", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 5, code: "#03009e", isDefault: false });

    // GREEN
    await personalizationColorRepository.save({ personalization_group_id: 6, code: "#47ff66", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 6, code: "#1fff44", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 6, code: "#00f529", isDefault: true  });
    await personalizationColorRepository.save({ personalization_group_id: 6, code: "#00c721", isDefault: false });
    await personalizationColorRepository.save({ personalization_group_id: 6, code: "#008f18", isDefault: false });
}


run()