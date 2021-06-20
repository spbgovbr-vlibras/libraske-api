import faker from 'faker';

export const uuidFactory = () => {
    return faker.datatype.uuid()
}

export const firstNameFactory = () => {
    return faker.name.firstName()
}

export const emailFactory = () => {
    return faker.internet.email();
}

export const profilePhotoUrlFactory = () => {
    return faker.internet.url();
}